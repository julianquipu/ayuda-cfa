# Centro de ayuda CFA × Quipu (PWA de autogestión)

Ayuda para que el asesor de CFA resuelva por sí mismo, en campo y en segundos, las dudas y los problemas del proceso de originación. Si no lo resuelve, reporta por WhatsApp con el mensaje ya armado.

- **Gratis y liviana:** HTML, CSS y JavaScript sin librerías ni compilación. Se aloja en GitHub Pages.
- **Offline:** después de la primera visita abre sin señal (service worker).
- **Distribución v1:** enlace fijado en el grupo de WhatsApp y, después, botón "Ayuda" en la PWA de originación. Sin invitación a instalar (se puede agregar a la pantalla de inicio desde el menú de Chrome).
- **Mantenible sin programar:** todo el contenido vive en `data.js`. Ver **[CONTENIDO.md](CONTENIDO.md)**.

## Estructura

```
index.html        estructura y estilos (diseño)          — rara vez se toca
data.js           CONTENIDO: preguntas, temas, imágenes  — ✏️ se edita seguido
app.js            buscador, navegación, WhatsApp, offline — rara vez se toca
sw.js             service worker (offline)               — no se toca
manifest.json     ficha de app instalable
assets/img/       capturas de pantalla (.webp + .png)    — ✏️ aquí van las imágenes
assets/           isotipo e íconos de la app
CONTENIDO.md      cómo editar el contenido
```

## Probarla en tu computador

El modo offline necesita un servidor (no funciona abriendo el archivo con doble clic). Desde esta carpeta:

```bash
python -m http.server 8000
```

Abre `http://localhost:8000`. Para verla como en el celular: Chrome → F12 → ícono de celular → 360 px de ancho.

## Publicar en GitHub Pages (una sola vez)

1. Crea un repositorio nuevo en github.com (por ejemplo `ayuda-cfa`). Puede ser privado solo con plan de pago; en cuenta gratuita, GitHub Pages requiere repositorio **público**.
2. Sube el contenido de **esta carpeta** (`app/`) a la raíz del repositorio:
   ```bash
   git remote add origin https://github.com/<usuario>/ayuda-cfa.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En 1–2 minutos queda en `https://julianquipu.github.io/ayuda-cfa/`.

Después de eso, cada cambio que subas se publica solo.

> ⚠️ Publica **solo esta carpeta**. Los documentos de trabajo de `pwa_ayuda/` (PRD, insumos de Slack, contenido fuente) son internos y no deben ir al repositorio público.

## Lanzamiento v1: mensaje para fijar en el grupo de WhatsApp

> 📌 **Centro de ayuda CFA × Quipu**
> Si algo falla en una visita, búscalo aquí primero: https://julianquipu.github.io/ayuda-cfa/
> Ábrelo una vez con señal y queda guardado para usarlo sin internet.
> Si no se resuelve, toca **Pedir ayuda**: se abre WhatsApp con el mensaje listo, elige este grupo y envíalo.

Antes de fijarlo: `mostrarImagenesPendientes: false` (ya está) y confirmar el peso máximo de foto/video antes de activar esa línea en `data.js`.

## Integración con la PWA de originación

El acceso es un botón **"Ayuda"** en la PWA de originación que abre este centro en una pestaña nueva:

```html
<a href="https://julianquipu.github.io/ayuda-cfa/" target="_blank" rel="noopener">Ayuda</a>
```

**Enlaces directos** para ayuda contextual (el botón de cada pantalla puede abrir justo lo que necesita):

| Enlace | Abre |
|---|---|
| `…/` | Portada (Soluciones + Lo más frecuente) |
| `…/#quipu-score` · `#paso-a-paso` | Esa sección (`#flujo` también abre Paso a paso) |
| `…/#kyc` · `#qs` · `#ig` · `#media` | Soluciones filtradas por esa categoría (`#conexion` abre Quipu Score) |
| `…/#kyc-enlace-invalido` · `#dns-samsung` · `#paso-3-kyc` … | Esa respuesta o tema, abierto (el `id` está en `data.js`) |
| `…/?q=foto` | La ayuda con esa búsqueda ya hecha |

Ejemplo: en la pantalla del QR de KYC, `<a href="…/#kyc-enlace-invalido" target="_blank" rel="noopener">¿Problemas con el enlace?</a>`.

No requiere backend. El equipo dev de la PWA solo necesita la URL.

## Cómo funciona el offline

- La primera vez que se abre con señal, se guardan la app, el contenido y **todas las imágenes referenciadas en `data.js`** (se detectan solas).
- Los textos se piden a la red primero para estar al día; si no hay señal o tarda más de 3 segundos, se usa la copia guardada.
- Imágenes e íconos se sirven desde la copia guardada (abren al instante).
- Si reemplazas una imagen conservando el nombre, sube `VERSION` en `sw.js`, o mejor usa un nombre nuevo.
- Si cambias `app.js` o `index.html`, sube el `?v=` de las dos etiquetas `<script>` al final de `index.html` (y `VERSION` en `sw.js`). Así ningún celular mezcla una página nueva con código viejo. Editar solo `data.js` no lo requiere.

## Diseño

Variante **Quipu 2031 × Material 3**:
- **De Material 3:** estructura y comportamiento de los componentes (search bar, navigation bar, filter chips, extended FAB, bottom sheet, snackbar, listas), capas de estado, curvas de movimiento, escala tipográfica (pesos 400/500) e íconos **Material Symbols Rounded** en SVG en línea.
- **Voz:** tuteo, neutral de género, "casos" y "soluciones" en lugar de "errores".
- **De Quipu 2031:** colores (primario `#00726C`), Work Sans como única familia, una sola sombra, superficies wash + edge, color semántico (teal = Quipu · azul = aliado/tercero · oro = pide atención) y borde punteado = "aún no real".
- **Accesibilidad:** contraste AA (se oscurecieron `--text-3` y el azul para texto), objetivos táctiles ≥ 44 px, foco visible, navegable con teclado, respeta "reducir movimiento", modo oscuro automático.

## Reporte por WhatsApp

- **v1 (por defecto):** el botón "Pedir ayuda" abre WhatsApp **con el mensaje ya escrito** y el asesor elige el grupo de soporte.
- **Opcional:** con el enlace de invitación en `CONFIG.grupoWhatsApp`, el botón **copia el mensaje** y **abre el grupo** directamente (WhatsApp no permite precargar texto en un grupo; el asesor lo pega).

> ⚠️ El sitio es público: cualquiera con la URL ve lo que esté en `data.js`. Pon el enlace del grupo solo si el grupo tiene activo "Aprobar nuevos participantes".

## Pendientes

- Captura `IMG-01`: ajustes de cámara del Moto G (ver `IMAGENES_pendientes.md` en la carpeta de trabajo).
- Variante de la guía de DNS para otros Android / iPhone.
