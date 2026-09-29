# Cómo editar el contenido — Centro de ayuda CFA × Quipu

> Chuleta para mantener la ayuda **sin programar**. Todo el contenido vive en **un solo archivo: `data.js`**.
> El diseño (`index.html`) y la lógica (`app.js`) no se tocan para agregar o cambiar contenido.

---

## Reglas de oro (para no romper nada)

1. **Copia un bloque que ya exista y cámbiale los textos.** Es la forma más segura.
2. Cada bloque `{ ... }` va **separado del siguiente por una coma**.
3. Los textos van **entre comillas dobles** `"así"`. Si necesitas comillas dentro del texto, usa las curvas `“así”`.
4. Para poner algo en **negrita**, enciérralo en dos asteriscos: `**Nuevo link**`.
5. Después de guardar, abre la ayuda en el navegador. Si la pantalla sale en blanco, casi siempre falta una coma o una comilla: revisa el último cambio.

---

## 1. Agregar una pregunta a "Soluciones"

En `data.js`, busca `const FAQ = [` y pega esto **dentro de los corchetes**, después de la última pregunta (con coma):

```js
  {
    id: "nombre-corto-sin-tildes",
    cat: "conx",
    pregunta: "El título del problema, como lo buscaría el asesor",
    palabras: "palabras clave sin tildes que el asesor podria escribir",
    respuesta: "La solución, clara y directa. Puedes usar **negrita**."
  },
```

| Campo | Qué es |
|---|---|
| `id` | Nombre único, sin espacios ni tildes. Sirve para el enlace directo (`…/#nombre-corto`). |
| `cat` | Categoría: `kyc` · `qs` (Quipu Score) · `ig` (Instagram) · `media` (foto y video) · `gen` (general). |
| `pregunta` | El título, como lo buscaría el asesor. |
| `palabras` | Palabras que activan el resultado al buscar. **Entre más, mejor.** Sin tildes. |
| `respuesta` | El texto principal de la solución. |

**Opcionales** (agrégalos solo si los necesitas):

| Campo | Para qué | Ejemplo |
|---|---|---|
| `rapido` | Mostrarla en **Lo más frecuente** (título de 2–4 palabras). Máximo 4–6 en total. | `rapido: "La app no carga",` |
| `pasos` | Lista numerada. | `pasos: ["Primero…", "Luego…"],` |
| `nota` | Recuadro dorado de "Importante". | `nota: "Las pantallas son ilustrativas…",` |
| `aplica` | A qué celulares aplica. | `aplica: "Samsung Galaxy · One UI",` |
| `cierre` | Texto final, después de los pasos. | `cierre: "¿Sigue sin funcionar? …",` |
| `ver` | Enlaces "Si algo falla" a otras respuestas (van después de la nota; también dentro de un paso). | `ver: [{ id: "dns-samsung", texto: "…" }],` |
| `img` | Imágenes (ver punto 3). | |

Un paso puede ser un texto simple o un bloque con título, subpasos e imagen:

```js
    pasos: [
      "Paso sencillo, solo texto.",
      { titulo: "Paso con título", texto: "Explicación…", subpasos: ["Toca **A**", "Luego **B**"] },
      { final: true, titulo: "Luego, prueba de nuevo", texto: "…" }   // final: true = se marca con ✓
    ],
```

---

## 2. Agregar o cambiar un tema en "Sobre el Score" o "Paso a paso"

En `data.js`, busca `const SECCIONES = [`. Cada sección tiene una lista `temas`. Copia un tema y cámbialo:

```js
      { id: "qs-nuevo-tema", titulo: "¿Pregunta del tema?",
        palabras: "palabras clave sin tildes",
        bloques: [
          { tipo: "texto", texto: "Explicación con **negrita**." },
          { tipo: "decir", texto: "Frase exacta que el asesor le dice al cliente." }
        ] },
```

En **Paso a paso**, agrega `meta: "Paso 10",` para que aparezca el número sobre el título.

**Tipos de bloque** (se combinan en el orden que quieras):

| Tipo | Se ve como | Ejemplo |
|---|---|---|
| `texto` | Párrafo | `{ tipo: "texto", texto: "…" }` |
| `lista` | Viñetas | `{ tipo: "lista", items: ["…", "…"] }` |
| `pasos` | Lista numerada | `{ tipo: "pasos", items: ["…", "…"] }` |
| `decir` | Recuadro "Qué decir al cliente" | `{ tipo: "decir", texto: "…" }` |
| `nota` | Recuadro dorado | `{ tipo: "nota", titulo: "Ojo", texto: "…" }` |
| `tabla` | Tarjetas (una por fila) | `{ tipo: "tabla", columnas: ["A","B"], filas: [["…","…"]] }` |
| `img` | Imagen (ver punto 3) | `{ tipo: "img", img: [ … ] }` |
| `ver` | Enlace a una respuesta de Soluciones | `{ tipo: "ver", id: "foto-video-no-carga", texto: "…" }` |

El resumen **"La visita de un vistazo"** (arriba de Paso a paso) está en `resumen` dentro de esa sección. Cada momento es `{ tipo: "momento", quien: "tu", texto: "…" }`, donde `quien` es `"tu"`, `"cliente"` o `"ambos"`.

---

## 3. Agregar una imagen (captura de pantalla)

1. Toma la captura (por ejemplo, exportada de Figma).
2. Entra a **[squoosh.app](https://squoosh.app)**, arrastra la imagen, elige **WebP** y descárgala. Objetivo: **menos de 100 KB**.
3. Guarda el archivo en `assets/img/` (por ejemplo `mi_captura.webp`). Si quieres una versión grande para el zoom, guarda también el PNG (`mi_captura.png`).
4. En la pregunta o tema, agrega:

```js
    img: [
      { src: "assets/img/mi_captura.webp", full: "assets/img/mi_captura.png",
        ancho: 828, alto: 1792,
        alt: "Qué muestra la imagen (para lectores de pantalla)",
        cap: "Toca “Nuevo link”, debajo del QR" }
    ]
```

- `ancho` y `alto` son las medidas reales del archivo en píxeles (en Windows: clic derecho → Propiedades → Detalles). Evitan que la pantalla "salte" al cargar.
- Para capturas horizontales (varias pantallas en fila) agrega `ancha: true`.
- La imagen se guarda sola para uso **sin internet**; no tienes que hacer nada más.
- Si **reemplazas** una imagen, usa un **nombre de archivo nuevo** (ej. `mi_captura_v2.webp`). Así todos los celulares ven la versión nueva.

**Imagen pendiente** (recuadro punteado mientras consigues la captura):

```js
      { pendiente: "IMG-05", describe: "Qué debe mostrar la captura", fuente: "De dónde sale" }
```

Para **ocultar todos los recuadros pendientes** al publicar: `mostrarImagenesPendientes: false` en `CONFIG`.

---

## 4. Cambiar datos generales (`CONFIG`, al inicio de `data.js`)

| Qué | Dónde |
|---|---|
| **Grupo de soporte en WhatsApp** | `grupoWhatsApp: "https://chat.whatsapp.com/…"`. El botón copia el mensaje armado y abre el grupo; el asesor lo pega. |
| **Número de WhatsApp** (alternativa) | `whatsapp: "573001234567"`: solo se usa si `grupoWhatsApp` está vacío. Con número, el mensaje llega ya escrito. |
| **Mensaje prellenado del reporte** | `mensajeWhatsApp: [ … ]` (una línea por elemento). |
| **Peso máximo de foto/video** | Confirmado en el manual v1.0: foto hasta 30 MB, video hasta 60 s en MP4. |
| **Búsquedas sugeridas** | `sugerencias: [ … ]` (aparecen cuando una búsqueda no encuentra nada). |
| **Título y subtítulo de la portada** | `INTRO` (debajo de `CONFIG`). |
| **Versión que se ve en el pie** | `version: "v0.3 · piloto"` |

---

## 5. Publicar el cambio

- **Sin terminal:** en github.com abre el archivo → botón del lápiz ✏️ → edita → **Commit changes**. En 1–2 minutos está en línea.
- **Con terminal:** `git add . && git commit -m "nueva pregunta" && git push`

Los asesores ven el cambio la próxima vez que abran la ayuda con señal. No tienen que reinstalar nada.
