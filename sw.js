/* =====================================================================
   Service worker: guarda la ayuda en el celular para que abra SIN INTERNET.
   No necesitas tocar este archivo:
   - Los textos (data.js) se actualizan solos cuando hay señal.
   - Las imágenes que pongas en data.js se guardan solas para uso offline.
   Solo si REEMPLAZAS una imagen conservando el mismo nombre de archivo,
   sube el número de VERSION (ej. v1 → v2) para que los celulares la renueven.
   ===================================================================== */
const VERSION = "ayuda-cfa-v2";
const FONTS = "ayuda-cfa-fuentes";
const ESPERA_RED = 3000; // ms: con señal débil, pasado este tiempo se usa la copia guardada

importScripts("data.js"); // lee FAQ y SECCIONES para saber qué imágenes guardar

const SHELL = [
  "./", "index.html", "data.js", "app.js", "manifest.json",
  "assets/quipu-isotipo.svg", "assets/icon-192.png", "assets/icon-512.png",
  "assets/icon-maskable-512.png", "assets/apple-touch-icon.png"
];

function imagenesDelContenido() {
  const out = new Set();
  const walk = (v) => {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) return v.forEach(walk);
    if (typeof v.src === "string") out.add(v.src);
    if (typeof v.full === "string") out.add(v.full);
    Object.keys(v).forEach((k) => walk(v[k]));
  };
  walk(FAQ); walk(SECCIONES);
  return [...out];
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(SHELL);
    // Las imágenes una por una: si falta alguna, no se cae la instalación.
    await Promise.all(imagenesDelContenido().map((u) => cache.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION && k !== FONTS).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Red primero (contenido fresco), con copia guardada si no hay señal o tarda demasiado.
async function redPrimero(request, event) {
  const cache = await caches.open(VERSION);
  // cache:"no-cache" → siempre pregunta al servidor si hay versión nueva (respuesta corta si no cambió).
  const deRed = fetch(request, { cache: "no-cache" }).then((res) => {
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  });
  event.waitUntil(deRed.catch(() => {}));
  const guardado = () => cache.match(request, { ignoreSearch: true })
    .then((r) => r || (request.mode === "navigate" ? cache.match("index.html") : undefined));
  try {
    const res = await Promise.race([
      deRed,
      new Promise((_, rej) => setTimeout(() => rej(new Error("lento")), ESPERA_RED))
    ]);
    return res;
  } catch (e) {
    const g = await guardado();
    return g || deRed; // sin copia guardada, espera a la red
  }
}

// Guardado primero (imágenes e íconos): abre al instante.
async function guardadoPrimero(request) {
  const cache = await caches.open(VERSION);
  const g = await cache.match(request, { ignoreSearch: true });
  if (g) return g;
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
}

// Fuentes de Google: usa la guardada y la renueva en segundo plano.
async function fuentes(request, event) {
  const cache = await caches.open(FONTS);
  const g = await cache.match(request);
  const red = fetch(request).then((res) => {
    if (res && (res.ok || res.type === "opaque")) cache.put(request, res.clone());
    return res;
  }).catch(() => g);
  if (g) { event.waitUntil(red); return g; }
  return red;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(fuentes(request, event));
    return;
  }
  if (url.origin !== self.location.origin) return; // WhatsApp y demás enlaces externos: normal

  if (/\.(webp|png|jpe?g|svg|gif|ico)$/i.test(url.pathname)) {
    event.respondWith(guardadoPrimero(request));
  } else {
    event.respondWith(redPrimero(request, event));
  }
});
