/* =====================================================================
   CONTENIDO DEL CENTRO DE AYUDA · CFA × Quipu
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para cambiar textos,
   agregar preguntas o imágenes. Guía completa en CONTENIDO.md.

   Formato de texto (en cualquier campo de texto):
     **texto**   → se ve en negrita
     {PESO}      → se reemplaza por CONFIG.pesoMaximo

   Reglas rápidas:
     - Cada bloque { ... } va separado por una coma.
     - Los textos van entre comillas dobles "así".
     - Si el texto lleva comillas dobles adentro, usa “comillas curvas”.
   ===================================================================== */

/* ---------- 1. CONFIGURACIÓN GENERAL ---------- */
const CONFIG = {
  // Grupo de soporte en WhatsApp (enlace de invitación). Si está lleno, se usa este:
  // el botón copia el mensaje armado y abre el grupo para pegarlo.
  // (WhatsApp no permite precargar texto en un grupo, solo en un número.)
  // ⚠️ El sitio es público: pon aquí el enlace SOLO si el grupo tiene activo "Aprobar nuevos participantes".
  // Vacío = se abre WhatsApp con el mensaje ya escrito y el asesor elige el grupo de soporte.
  grupoWhatsApp: "",

  // O un número directo (se usa solo si grupoWhatsApp está vacío).
  // Número de WhatsApp de soporte: formato internacional, sin "+" ni espacios.
  // Ej: "573001234567". Vacío = pendiente (WhatsApp abre y el asesor elige el chat).
  whatsapp: "",

  // Peso máximo de foto/video. Lo confirma el equipo dev (pendiente B3).
  pesoMaximo: "foto hasta 30 MB · video hasta 60 s en MP4",

  // true = muestra los recuadros punteados de "imagen pendiente" (útil mientras armas las capturas).
  // false = los oculta (úsalo cuando publiques para los asesores).
  mostrarImagenesPendientes: false,

  // Plantilla del mensaje de reporte por WhatsApp (una línea por elemento).
  mensajeWhatsApp: [
    "Buenas 👋 Reporte de novedad:",
    "• Asesor (cédula): ",
    "• Cliente (cédula): ",
    "• Celular (marca y modelo): ",
    "• Qué pasó y en qué pantalla: ",
    "• Adjunto: (foto o video del problema)"
  ],

  // Búsquedas que se sugieren cuando una búsqueda no encuentra nada.
  sugerencias: ["foto no carga", "kyc", "quipu score", "dns"],

  version: "v0.6.1 · piloto"
};

/* ---------- 2. INTRO (portada) ---------- */
const INTRO = {
  titulo: "Hola, bienvenido al centro de ayuda",
  subtitulo: "Resuelve en minutos lo que se te presente en campo, aprende sobre Quipu Score y repasa el paso a paso de la originación con data alternativa."
};

/* ---------- 3. CATEGORÍAS (la etiqueta de color de cada pregunta) ----------
   color: "azul" = aliado/tercero (Truora) · "teal" = Quipu · "oro" = pide atención · "gris" = general
   icono: "kyc" | "score" | "camara" | "conexion" | "check" (se usa en "Soluciones rápidas") */
const CATEGORIAS = {
  kyc:   { nombre: "KYC",          color: "azul", icono: "kyc" },
  qs:    { nombre: "Quipu Score",  color: "teal", icono: "score" },
  ig:    { nombre: "Instagram",    color: "azul", icono: "check" },
  media: { nombre: "Foto y video", color: "gris", icono: "camara" },
  gen:   { nombre: "General",      color: "gris", icono: "check" }
};

/* ---------- 4. SOLUCIONES (casos frecuentes en campo) ----------
   Campos de cada pregunta:
     id        → nombre corto, único, sin espacios ni tildes (sirve para el enlace directo)
     cat       → una de las CATEGORIAS de arriba (kyc, qs, ig, media, gen)
     pregunta  → el título, como lo buscaría el asesor
     palabras  → palabras clave para el buscador (sin tildes, entre más mejor)
     respuesta → el texto principal
   Opcionales:
     rapido    → título corto (2–4 palabras) para mostrarla en "Lo más frecuente" (máx. 4–6 en total)
     aplica    → a qué equipos aplica (ej. "Samsung Galaxy · One UI")
     nota      → recuadro de "Importante"
     pasos     → lista numerada; cada paso puede ser un texto o { titulo, texto, subpasos:[...], img:[...] }
     img       → imágenes (ver CONTENIDO.md)
     cierre    → texto final, después de los pasos
     ver       → enlaces a otras respuestas: [{ id:"dns-samsung", texto:"..." }] (también dentro de un paso: ver:{ id, texto })
   En "pasos", final:true marca el último paso con ✓ en lugar de número.
   Imagen real:      { src:"assets/img/x.webp", full:"assets/img/x.png", ancho:760, alto:392, alt:"...", cap:"..." }
   Imagen pendiente: { pendiente:"IMG-03", describe:"qué debe mostrar", fuente:"de dónde sale" }
*/
const FAQ = [
  {
    id: "kyc-enlace-invalido",
    cat: "kyc",
    rapido: "Enlace KYC inválido",
    pregunta: "El enlace de verificación (KYC) aparece como “inválido” o no abre",
    palabras: "kyc enlace link invalido caducado vencido truora qr identidad codigo no abre verificacion no funciona se vencio dejo de servir refrescar inactividad",
    respuesta: "El enlace **caduca tras un rato de inactividad**. Genera un **Nuevo link** desde la pantalla del KYC y muéstraselo otra vez al cliente para que lo escanee. El enlace se renueva y el cliente puede continuar con la validación de identidad.",
    img: [
      { src: "assets/img/kyc_enlace_invalido.webp", full: "assets/img/kyc_enlace_invalido.png", ancho: 828, alto: 1792,
        alt: "Pantalla de KYC con los enlaces Nuevo link y Copiar link resaltados debajo del código QR",
        cap: "Toca “Nuevo link”, debajo del QR" }
    ]
  },
  {
    id: "kyc-no-validado",
    cat: "kyc",
    pregunta: "“No fue posible validar la identidad”",
    palabras: "no fue posible validar identidad kyc fallo novedades motivo problema tecnico falta documento verificacion no completada cliente no continuar cancelar retomar",
    respuesta: "Se abre el **menú de novedades** para que registres el motivo: **problema técnico**, **falta de documento**, **verificación no completada** o **el cliente decidió no continuar**.",
    cierre: "Si el cliente ya se fue, la solicitud **queda guardada**: puedes cancelarla o retomarla desde el home."
  },
  {
    id: "cliente-iphone",
    cat: "qs",
    pregunta: "El cliente tiene iPhone",
    palabras: "iphone apple ios celular cliente android quipu score no se puede completar descargar app compatible",
    respuesta: "La app Quipu Score es **obligatoria** y, por el momento, **solo está disponible para celulares Android** (no está disponible para iPhone). Si el cliente tiene iPhone, la solicitud **no se puede completar**.",
    nota: "Confírmalo **antes de empezar** la visita: pregúntale al cliente qué celular tiene. Debe ser **su** celular, no el de un familiar.",
    ver: [ { id: "qs-celular-titular", texto: "¿En qué celular se instala?" } ]
  },
  {
    id: "quipu-score-version-cfa",
    cat: "qs",
    rapido: "No sale el logo de CFA",
    pregunta: "La app de Quipu Score no muestra el logo de CFA",
    palabras: "logo cfa logos marcas no aparece no sale play store tienda google descargar version cfa correcta vinculada deep link enlace qr escanear reescanear instalar desinstalar dns escalar app quipu score",
    respuesta: "Sin el logo de CFA, la app **no quedó vinculada a esta solicitud**. El cliente siempre descarga Quipu Score **escaneando tu QR**, nunca desde la Play Store: ese código trae la **versión de Quipu Score para CFA**.",
    nota: "Regla: si no se ven **los dos logos**, no es la versión para CFA y **no se puede continuar**.",
    ver: [ { id: "dns-samsung", texto: "Reescaneó el QR y el logo de CFA sigue sin aparecer" } ],
    pasos: [
      { texto: "Cuando la app se abra en su celular, **verifica con el cliente la primera pantalla**: deben verse los logos de **CFA y Quipu Score** y el título “Ingresa a Quipu Score (Aliado CFA)”. Si aparecen, todo bien: continúa.",
        img: [
          { src: "assets/img/qs_cobrand_cfa.webp", full: "assets/img/qs_cobrand_cfa.png", ancho: 414, alto: 896,
            alt: "Pantalla de inicio de Quipu Score con los logos de CFA y Quipu Score y el título Ingresa a Quipu Score (Aliado CFA)",
            cap: "Así se ve la versión correcta: logos de CFA y Quipu Score" }
        ] },
      { titulo: "¿No aparece? Que vuelva a escanear tu QR", texto: "Pídele al cliente que **vuelva a escanear el código QR** desde tu pantalla. Si descargó la app desde la Play Store, que primero la **desinstale**." },
      { titulo: "¿Sigue sin aparecer? Es el DNS privado del celular", texto: "Pasa en Android: un **DNS privado** (por ejemplo AdGuard) bloquea los datos del enlace y Quipu Score no reconoce que viene de CFA. Cámbialo a **Automático** o **Desactivado**.",
        ver: { id: "dns-samsung", texto: "Cómo desactivar el DNS privado" } }
    ],
    cierre: "Si ya revisaste el DNS y el logo sigue sin aparecer, **escala el caso** con **Pedir ayuda**."
  },
  {
    id: "dns-samsung",
    cat: "qs",
    aplica: "Android · guía con Samsung Galaxy (One UI) · 3 pasos, 2 minutos",
    pregunta: "El logo de CFA sigue sin aparecer o la app no carga (bloqueo de DNS)",
    palabras: "logo cfa no aparece reescanear no carga app error conexion dns adguard vpn bloqueo bloquea samsung galaxy android internet no abre dns privado desinstalar llave blokada nextdns intra dns66 publicidad sin respuesta no responde no funciona pagina",
    respuesta: "Pasa cuando el celular del cliente tiene un **DNS privado** o una app de bloqueo (como **AdGuard**): filtra publicidad, pero también **bloquea los datos del enlace de CFA**. Por eso Quipu Score no reconoce que viene de CFA (no aparece el logo) o la app no carga. En celulares **Samsung Galaxy**, revisa estos 3 pasos.",
    nota: "Las pantallas son ilustrativas: los nombres y la posición de los menús pueden cambiar un poco según el modelo. Si no encuentras una opción, usa la **lupa de Ajustes** y busca “DNS privado” o “VPN”.",
    pasos: [
      {
        titulo: "Desactiva el DNS privado",
        texto: "Abre **Ajustes → Conexiones → Más ajustes de conexión → DNS privado**. Si está en “Nombre de host del proveedor de DNS privado” (por ejemplo adguard, nextdns, cloudflare, family), ese es el bloqueo: cámbialo a **Automático** o **Desactivado** y toca **Guardar**.",
        subpasos: ["Toca **Conexiones**", "Baja hasta **Más ajustes de conexión**", "Toca **DNS privado**", "Elige **Automático** y toca **Guardar**"],
        img: [
          { src: "assets/img/dns_paso1.webp", full: "assets/img/dns_paso1.png", ancho: 760, alto: 392, ancha: true,
            alt: "Cuatro pantallas: Ajustes, Conexiones, Más ajustes de conexión y la ventana DNS privado con la opción Automático seleccionada",
            cap: "Toca la imagen para verla en grande" }
        ]
      },
      {
        titulo: "Revisa si hay una VPN activa",
        texto: "Si arriba de la pantalla ves una **llave**, hay una VPN o app de bloqueo encendida. En el mismo menú del paso 1 toca **VPN** → el engranaje de la app → apaga todo y toca **Desconectar**.",
        subpasos: ["Toca **VPN**", "Toca el engranaje de la app que aparezca", "Apaga todo y toca **Desconectar**"],
        img: [
          { src: "assets/img/dns_paso2.webp", full: "assets/img/dns_paso2.png", ancho: 760, alto: 390, ancha: true,
            alt: "Cuatro pantallas: la llave de VPN en la barra superior, el menú VPN, AdGuard conectado y el botón Desconectar",
            cap: "Toca la imagen para verla en grande" }
        ]
      },
      {
        titulo: "Pausa o desinstala la app de bloqueo",
        texto: "Si el cliente tiene **AdGuard, Blokada, DNS66, NextDNS, Intra** o similar: que la abra y apague la protección, o mantenga presionado su ícono → **Desinstalar**. Estas apps no vienen con el Samsung; si no la reconoce, es seguro quitarla."
      },
      {
        final: true,   // se marca con ✓ en vez de número
        titulo: "Luego, prueba de nuevo",
        texto: "Apaga y prende el **Wi-Fi** o los **datos móviles** (o reinicia el celular) y pídele al cliente que **vuelva a escanear tu QR**."
      }
    ],
    cierre: "¿Sigue sin funcionar? Pide ayuda con una captura de **Ajustes → Conexiones → Más ajustes de conexión**."
  },
  {
    id: "quipu-score-en-blanco",
    cat: "qs",
    rapido: "Quipu Score en blanco",
    pregunta: "La app de Quipu Score se queda cargando o en blanco",
    palabras: "quipu score cargando blanco pantalla congelada trabada no avanza otp telefono codigo reinstalar desinstalar sin respuesta no responde se queda pegada lenta se cierra",
    respuesta: "Pídele al cliente que **cierre la app, la desinstale y la vuelva a instalar** escaneando tu QR. Al abrirla de nuevo, el proceso suele funcionar con normalidad."
  },
  {
    id: "quipu-score-no-descarga",
    cat: "qs",
    pregunta: "El cliente no logra descargar la app de Quipu Score",
    palabras: "descargar instalar play store no baja conexion internet wifi datos senal quipu score no carga lenta",
    respuesta: "Casi siempre es un tema de **conexión**. Verifica que tenga buena señal o Wi-Fi; si puedes, ayúdalo a conectarse a una red estable o inténtalo desde una zona con mejor señal. Con buena conexión, la descarga se completa."
  },
  {
    id: "falta-quipu-score",
    cat: "qs",
    pregunta: "No deja enviar la solicitud: avisa que falta Quipu Score",
    palabras: "no deja enviar solicitud falta quipu score aviso procesando esperar revision cliente completo boton antes de tiempo",
    respuesta: "Quipu Score **todavía no terminó de procesar**. Toca ese aviso: te devuelve a la pantalla de Quipu Score. **Espera ahí**: cuando el proceso termine, la pantalla avanza sola.",
    nota: "Pasa si tocas **Cliente completó Quipu Score** antes de que el cliente termine. En Quipu Score no tienes que confirmar nada: la pantalla avanza sola."
  },
  {
    id: "instagram-sin-contrasena",
    cat: "ig",
    pregunta: "El cliente no recuerda su contraseña de Instagram",
    palabras: "instagram contrasena clave olvido olvidada no recuerda iniciar sesion login vincular omitir opcional negocio",
    respuesta: "Es muy común y **no afecta la solicitud**: vincular el Instagram del negocio es **opcional** y no detiene la evaluación. Presiona **Omitir este paso** y sigue con Quipu Score.",
    cierre: "Si el cliente sí recuerda su contraseña, el paso a paso está en **Paso a paso → Paso 6**."
  },
  {
    id: "foto-video-no-carga",
    cat: "media",
    rapido: "Foto o video no cargan",
    pregunta: "La foto o el video no cargan (“Imagen no compatible o muy pesada”)",
    palabras: "foto video no carga error procesar peso tamano subir galeria negocio evidencia pesado imagen no compatible muy pesada heic mp4 resolucion camara comprimir squoosh no sube subida lento lenta se queda cargando internet megapixeles",
    respuesta: "Suele ser el **peso del archivo** o la **conexión**. La foto admite hasta **30 MB** y el video hasta **60 segundos en MP4**; las fotos de iPhone (HEIC) se convierten solas. Haz esto, en orden:",
    pasos: [
      "Verifica que tengas buena señal e inténtalo de nuevo.",
      {
        texto: "Si sigue fallando, **vuelve a tomar la foto o el video con la cámara en menor resolución**: abre la Cámara → Ajustes → baja la calidad/resolución → vuelve a capturar.",
        img: [
          { pendiente: "IMG-01", describe: "Ajustes de la cámara de un Motorola (Moto G) con la opción de resolución/calidad resaltada.",
            fuente: "Captura real en un Moto G del piloto" }
        ]
      },
      "Como respaldo, comprime la foto gratis en **squoosh.app** (no necesitas instalar nada) y súbela de nuevo."
    ]
  },
  {
    id: "editar-foto-no-vuelve",
    cat: "media",
    pregunta: "Al “Editar” una foto o video, no vuelve a la pantalla de confirmación",
    palabras: "editar foto video no vuelve confirmacion grabar otra vez navegacion error conocido",
    respuesta: "Es un **problema conocido** de navegación: puede mandarte de nuevo a grabar el video. **Vuelve a cargarlo y continúa**.",
    cierre: "Repórtalo con **Pedir ayuda** para que el equipo lo tenga presente."
  },
  {
    id: "qr-no-se-refleja",
    cat: "gen",
    pregunta: "Un paso del cliente (QR) no se refleja en tu pantalla",
    palabras: "qr no se refleja no avanza cliente termino completo confirmar manual paso instagram vinculo quipu score kyc boton se queda pegado no pasa esperando avanza sola",
    respuesta: "Depende del paso:",
    pasos: [
      "**KYC:** cuando el cliente termine, confírmalo tú con **Cliente terminó**.",
      "**Instagram:** confírmalo con **Cliente vinculó su IG**, o toca **Omitir este paso**.",
      { texto: "**Quipu Score:** la pantalla **avanza sola** cuando el cliente termina. Espera; **no toques Cliente completó Quipu Score** antes de tiempo.",
        img: [
          { src: "assets/img/qs_qr_cliente_completo.webp", full: "assets/img/qs_qr_cliente_completo.png", ancho: 414, alto: 896,
            alt: "Pantalla de Quipu Score con el código QR para descargar la app y el botón Cliente completó Quipu Score abajo",
            cap: "Aquí espera: la pantalla avanza sola" }
        ] }
    ],
    ver: [ { id: "falta-quipu-score", texto: "Toqué el botón antes de tiempo y no deja enviar" } ]
  }
];

/* ---------- 5. SECCIONES (barra de navegación inferior) ----------
   nav        → texto corto bajo el ícono (máx. ~12 letras)
   antetitulo → texto pequeño sobre el título (opcional)
   icono      → "errores" | "score" | "flujo" | "pasos"
   tipo       → "faq"       muestra las preguntas de FAQ, con filtros por categoría
                "temas"     lista de temas que se expanden (como las preguntas)
                (opcional) resumen:{ id, titulo, palabras, bloques } → línea de tiempo arriba de los temas
   La primera sección es la que abre por defecto.

   Cada tema: { id, meta, titulo, palabras, bloques:[ ... ] }
     meta → texto pequeño sobre el título (ej. "Paso 3")
   Tipos de bloque (se combinan como quieras, en orden):
     { tipo:"texto",  texto:"..." }
     { tipo:"lista",  items:["...", "..."] }                  → viñetas
     { tipo:"pasos",  items:["...", "..."] }                  → lista numerada
     { tipo:"decir",  texto:"..." }                           → “Qué decir al cliente”
     { tipo:"nota",   titulo:"Importante", texto:"..." }      → recuadro dorado
     { tipo:"tabla",  columnas:["A","B","C"], filas:[["..","..",".."]] }
     { tipo:"img",    img:[ ...igual que en FAQ... ] }
     { tipo:"ver",    id:"id-de-otra-respuesta", texto:"..." } → enlace a otra respuesta
     { tipo:"titulo", texto:"..." }                           → subtítulo dentro del tema
   En el resumen: { tipo:"momento", texto:"...", quien:"tu" | "cliente" | "ambos" } */
const SECCIONES = [
  { id: "errores", nav: "Soluciones", icono: "errores", tipo: "faq",
    titulo: INTRO.titulo, subtitulo: INTRO.subtitulo },

  { id: "quipu-score", nav: "Sobre el Score", icono: "score", tipo: "temas",
    titulo: "Sobre Quipu Score y data alternativa",
    subtitulo: "Argumentos claros para que entiendas el porqué y se lo puedas explicar al cliente con confianza.",
    temas: [
      { id: "qs-que-es", titulo: "¿Qué es el Quipu Score?",
        palabras: "puntaje credito score obligatorio perfil habitos financieros inteligencia artificial datos alternativos",
        bloques: [
          { tipo: "texto", texto: "Es el **puntaje de crédito de Quipu**. Con **inteligencia artificial**, analiza **datos alternativos** del cliente para entender su perfil financiero y sus hábitos, y así calcular las condiciones del crédito." },
          { tipo: "texto", texto: "Es un paso **obligatorio**: si el cliente no descarga la app, no hay forma de analizarlo y la solicitud no puede evaluarse." }
        ] },
      { id: "qs-fuentes", titulo: "¿De dónde saca la información?",
        palabras: "fuentes informacion analiza mensajes texto sms transaccionales foto video formulario ingresos recurrentes mora fraude capacidad pago",
        bloques: [
          { tipo: "texto", texto: "Cruza tres fuentes:" },
          { tipo: "lista", items: [
            "Los **datos del formulario** que registras en la visita.",
            "La **foto y el video del negocio**, analizados con inteligencia artificial.",
            "Los **mensajes de texto transaccionales** del celular del cliente: notificaciones del banco, pagos recibidos, recordatorios de pago."
          ] },
          { tipo: "texto", texto: "Con eso identifica si la persona tiene **ingresos recurrentes**, si está **en mora** y si hay **señales de fraude**. Al cliente **no se le muestra el puntaje**: ve un resultado general (pre-aprobado o no)." }
        ] },
      { id: "qs-por-que-app", titulo: "¿Por qué el cliente tiene que descargar una app?",
        palabras: "por que descargar app aplicacion mensajes texto sms permiso seguro obligatorio documentos facturas segundos",
        bloques: [
          { tipo: "texto", texto: "Antes el cliente tenía que demostrar su negocio con facturas, órdenes de compra y documentos. Con la app, Quipu lee **solo los mensajes de código corto** (del banco, de pagos y promocionales) y los analiza **en segundos**." },
          { tipo: "texto", texto: "El permiso que pide la app es **seguro**, pero **obligatorio** para calcular el puntaje." },
          { tipo: "decir", texto: "Esta app revisa solo los mensajes de tu banco y de tus pagos, no tus conversaciones. Así no tienes que mostrarme facturas ni documentos." }
        ] },
      { id: "qs-celular-titular", titulo: "¿En qué celular se instala?",
        palabras: "celular titular familiar hijo papa vecino dos celulares doble sim linea nueva numero nuevo celular nuevo estrenando equipo",
        bloques: [
          { tipo: "lista", items: [
            "**Siempre en el celular del titular**, el que más usa para su negocio: los mensajes reflejan sus propias transacciones.",
            "**Nunca en el de un familiar** (hijo, papá, vecino): ese celular no tiene su información.",
            "**Si tiene dos celulares:** el que más use para el negocio.",
            "**Doble SIM:** no importa; Quipu lee el celular, no la línea.",
            "**Si cambió de número hace poco:** no hay problema.",
            "**Si estrena celular ese día:** casi seguro sale rechazado, porque no hay mensajes para analizar. Conviene volver cuando tenga más uso."
          ] }
        ] },
      { id: "qs-celulares", titulo: "¿Qué celulares funcionan?",
        palabras: "celulares compatibles android version 6 redmi xiaomi samsung oppo motorola iphone gama internet",
        bloques: [
          { tipo: "texto", texto: "Android desde la versión **6.0**; no tiene que ser de gama alta. Funcionan **Redmi** (el más usado del segmento), **Samsung**, **Oppo** y **Motorola**." },
          { tipo: "nota", titulo: "Solo Android", texto: "Por el momento, la app **solo está disponible para celulares Android** (no está disponible para iPhone). Además, el cliente necesita **conexión a internet** para descargarla." }
        ] },
      { id: "qs-foto-video", titulo: "¿Por qué importan tanto la foto y el video?",
        palabras: "foto video negocio inteligencia artificial buenos pagadores evidencia camara grabar consejos",
        bloques: [
          { tipo: "texto", texto: "Quipu los analiza con inteligencia artificial y los compara con más de **500.000 fotos y videos** de clientes que pagaron bien. Tu papel es clave:" },
          { tipo: "lista", items: [
            "Que el cliente **salga en cámara** contando **qué vende y cómo trabaja**.",
            "Buena luz y sin movimientos bruscos.",
            "Grábalo **desde la PWA**, no desde la galería."
          ] }
        ] },
      { id: "qs-clientes", titulo: "¿A qué clientes está dirigido?",
        palabras: "perfil cliente ideal negocio informal punto venta tienda miscelanea salon belleza comidas ambulante servicios antiguedad meses sin historial reporte negativo centrales riesgo mujer",
        bloques: [
          { tipo: "lista", items: [
            "**Personas naturales** con un **negocio informal**, idealmente con **punto de venta**: tiendas, misceláneas, salones de belleza, comidas preparadas, venta al por menor. También venta ambulante, si se puede mostrar el carrito o el puesto.",
            "Negocios con **al menos 6 meses** funcionando. Los recién abiertos no tienen cómo demostrar su capacidad de pago.",
            "**Difícil:** negocios solo de servicios, porque no se ven en foto y video.",
            "**Perfil típico:** una mujer de unos 45 años, con un negocio de más de un año que sostiene a su familia, sin cuentas a nombre del negocio."
          ] },
          { tipo: "nota", titulo: "La oportunidad", texto: "Personas **sin historial crediticio** o con un **reporte negativo** (sobre todo de crédito de consumo). **El pre-aprobado no se decide con las centrales de riesgo.**" }
        ] },
      { id: "qs-tiempo", titulo: "¿Cuánto tarda el resultado?",
        palabras: "cuanto tarda tiempo demora resultado preaprobado minutos visita duracion",
        bloques: [
          { tipo: "texto", texto: "Una vez completa la información, el pre-aprobado debe salir en **menos de 5 minutos**. La visita completa dura entre **45 y 90 minutos**, y se acorta a medida que dominas la herramienta." }
        ] },
      { id: "qs-data-alternativa", titulo: "¿Qué es la “data alternativa”?",
        palabras: "data alternativa informacion negocio sin historial banco tradicional evaluacion justa",
        bloques: [
          { tipo: "texto", texto: "Es información del día a día del negocio que **no aparece en un banco tradicional** pero que dice mucho sobre cómo le va. Con esa data, personas que **nunca han tenido crédito** —o que un banco tradicional rechazaría— **sí pueden ser evaluadas de forma justa**." }
        ] },
      { id: "qs-celular-propio", titulo: "¿Por qué el cliente usa su propio celular?",
        palabras: "celular propio proteger informacion datos sensibles privacidad identidad",
        bloques: [
          { tipo: "texto", texto: "Porque **protege su información**. Los datos sensibles (su identidad, su puntaje) los ingresa él mismo en su teléfono; tú no los manipulas. Tú ves el **resultado**, no sus datos privados." },
          { tipo: "decir", texto: "Este paso lo haces desde tu celular para proteger tu información. Yo solo veo el resultado, no tus datos personales." }
        ] },
      { id: "qs-que-gana", titulo: "¿Qué gana el cliente?",
        palabras: "beneficios ventajas gana cliente historial rapido minutos",
        bloques: [
          { tipo: "lista", items: [
            "Puede **acceder a crédito aunque no tenga historial** en el banco.",
            "Su negocio se evalúa por lo que **realmente** produce y por sus hábitos, no solo por un puntaje frío.",
            "El proceso pasa de **días a minutos**: la respuesta llega en la misma visita.",
            "Cada crédito bien manejado **construye su historial** para futuros créditos (con Quipu)."
          ] }
        ] },
      { id: "qs-no-aprobado", titulo: "Si el resultado es “no aprobado”",
        palabras: "no aprobado rechazo rechazado negado capacidad pago endeudamiento antiguedad comunicar",
        bloques: [
          { tipo: "texto", texto: "No es un rechazo personal ni definitivo. Suele deberse a razones generales del modelo: **no se observó capacidad de pago suficiente**, **un nivel alto de endeudamiento**, o **poca antigüedad del negocio**. Comunícalo con respeto y sin entrar en detalles técnicos. **Más adelante podrá volver a aplicar.**" },
          { tipo: "ver", id: "paso-8-resultado", texto: "Cómo cerrar una solicitud no aprobada" }
        ] },
      { id: "qs-tres-momentos", titulo: "Los tres momentos en el celular del cliente",
        palabras: "tres momentos kyc instagram quipu score obligatorio opcional qr confirmar manual avanza sola",
        bloques: [
          { tipo: "tabla", columnas: ["Momento", "¿Obligatorio?", "Para qué", "Cómo avanza"], filas: [
            ["Verificación de identidad (KYC)", "Sí", "Confirmar que es quien dice ser.", "Tú confirmas: “Cliente terminó”"],
            ["Instagram del negocio", "No (opcional)", "Sumar data alternativa del negocio, si lo tiene.", "Tú confirmas: “Cliente vinculó su IG” u “Omitir este paso”"],
            ["Quipu Score", "Sí", "Entender el perfil financiero y calcular las condiciones del crédito.", "Avanza sola al terminar: no toques el botón antes de tiempo"]
          ] },
          { tipo: "texto", texto: "En los tres, el cliente lo hace en su celular. En KYC e Instagram **confirmas tú**; en Quipu Score **la pantalla avanza sola**." }
        ] }
    ] },

  { id: "paso-a-paso", nav: "Paso a paso", icono: "pasos", tipo: "temas",
    titulo: "Paso a paso",
    subtitulo: "La visita de un vistazo y cada paso en detalle, con lo que tienes que hacer y qué decirle al cliente.",
    // resumen → se muestra arriba de la lista, siempre visible. Cada momento indica quién actúa.
    resumen: { id: "flujo-completo", titulo: "La visita de un vistazo",
      palabras: "flujo proceso visita completo momentos orden etapas originacion resumen",
      bloques: [
        { tipo: "momento", quien: "tu",      texto: "**Inicias sesión** en la PWA con tu documento y tu celular." },
        { tipo: "momento", quien: "tu",      texto: "**Inicias una visita nueva** desde el home (o retomas una en curso)." },
        { tipo: "momento", quien: "cliente", texto: "**Verificación de identidad (KYC) · QR 1, obligatorio:** el cliente valida su identidad en su celular con Truora." },
        { tipo: "momento", quien: "tu",      texto: "**Datos personales:** registras la información del cliente — 9 pasos." },
        { tipo: "momento", quien: "tu",      texto: "**Datos del negocio + evidencias:** actividad, finanzas, foto y video del negocio — 10 pasos." },
        { tipo: "momento", quien: "cliente", texto: "**Instagram del negocio · QR 2, opcional:** si lo tiene y recuerda la contraseña, lo vincula." },
        { tipo: "momento", quien: "cliente", texto: "**Quipu Score · QR 3, obligatorio:** descarga la app escaneando tu QR y completa el puntaje." },
        { tipo: "momento", quien: "tu",      texto: "**Revisión:** verificas que todo esté completo y envías la solicitud." },
        { tipo: "momento", quien: "ambos",   texto: "**Resultado y condiciones:** si queda pre-aprobado, definen plazo y periodicidad y revisan juntos las condiciones." },
        { tipo: "momento", quien: "tu",      texto: "**Cierre:** envías a formalización y la solicitud continúa en CFA." },
        { tipo: "nota", titulo: "Regla de oro", texto: "En KYC e Instagram **confirmas tú** cuando el cliente termina. En Quipu Score **la pantalla avanza sola**: no toques el botón antes de tiempo. Mientras el cliente hace su parte, puedes seguir con el formulario." }
      ] },
    tituloLista: "Cada paso en detalle",
    temas: [
      { id: "antes-de-empezar", meta: "Antes de salir", titulo: "Antes de empezar la visita",
        palabras: "antes de empezar preparar internet bateria cargar documento cliente android iphone celular tres momentos visita duracion",
        bloques: [
          { tipo: "lista", items: [
            "Ten **internet estable**: el formulario necesita conexión.",
            "Ten a mano el **número de documento del cliente**.",
            "**Carga el celular**: una visita puede durar entre **45 y 90 minutos**.",
            "Avísale al cliente que usará **su propio celular en tres momentos**."
          ] },
          { tipo: "nota", titulo: "Solo clientes Android", texto: "Confirma antes de empezar que el cliente tiene un celular **Android**. La app Quipu Score es obligatoria y hoy solo existe para Android: si el cliente tiene **iPhone**, la solicitud **no se puede completar**." },
          { tipo: "decir", texto: "Durante la visita voy a necesitar que tengas tu documento de identidad original en físico a la mano y que uses tu celular en tres momentos: para validar tu identidad, opcionalmente para conectar tu Instagram, y al final para completar un puntaje alternativo que te permitirá acceder a la mejor oferta." }
        ] },
      { id: "paso-1-sesion", meta: "Paso 1", titulo: "Iniciar sesión",
        palabras: "login ingresar entrar sesion documento celular codigo whatsapp sms otp politicas",
        bloques: [
          { tipo: "pasos", items: [
            "Abre la PWA. Verás el logo CFA y “Módulo de crédito”.",
            "Ingresa **tu tipo y número de documento** y **tu celular**.",
            "Elige recibir el código por **WhatsApp** o **SMS**.",
            "Escribe el código de 6 dígitos y acepta las políticas."
          ] },
          { tipo: "nota", titulo: "Ojo", texto: "Aquí ingresas **tú, el asesor**, no el cliente. El sistema valida tu documento contra la base de asesores autorizados de CFA." },
          { tipo: "img", img: [
            { src: "assets/img/paso1_ingreso.webp", full: "assets/img/paso1_ingreso.png", ancho: 414, alto: 896,
              alt: "Pantalla de ingreso con tipo y número de identificación, número de celular y los botones Enviar código por WhatsApp o por SMS",
              cap: "Tu documento y tu celular; luego WhatsApp o SMS" }
          ] }
        ] },
      { id: "paso-2-visita", meta: "Paso 2", titulo: "Iniciar la visita",
        palabras: "iniciar visita nueva home ultimas visitas retomar en curso continuar solicitud paso incompleto",
        bloques: [
          { tipo: "texto", texto: "En el home ves tus **últimas visitas**, con su estado. Para retomar una, tócala en la lista: la PWA te pregunta si quieres retomarla y te lleva al **primer paso incompleto**." },
          { tipo: "nota", titulo: "Ojo", texto: "**Iniciar visita** crea una solicitud nueva desde cero, sin avisar. Úsalo solo con clientes nuevos." }
        ] },
      { id: "paso-3-kyc", meta: "Paso 3", titulo: "Verificación de identidad (KYC)",
        palabras: "kyc identidad qr truora documento cedula rostro video selfie centrales cliente termino terminos politicas ubicacion whatsapp sms codigo frente reverso flash",
        bloques: [
          { tipo: "pasos", items: [
            "Muestra el **QR** al cliente para que lo escanee con su celular.",
            "El cliente acepta términos, autoriza la consulta en centrales y **valida su identidad** (documento por ambos lados + video del rostro).",
            "Cuando termina, presiona **Cliente terminó**."
          ] },
          { tipo: "nota", titulo: "Que tenga a la mano", texto: "Su **cédula de ciudadanía original y física** y **su celular**, donde recibirá un código por WhatsApp o SMS. El proceso toma unos **5 minutos**." },
          { tipo: "decir", texto: "Este código verifica tu identidad. Escanéalo con la cámara de tu celular y sigue las instrucciones: te pedirá una foto de tu documento, un video de tu rostro y una validación de tu teléfono." },
          { tipo: "titulo", texto: "Lo que verá el cliente en su celular" },
          { tipo: "pasos", items: [
            { titulo: "Acepta términos y políticas", texto: "Acepta los términos y condiciones de uso y la política de tratamiento de datos personales, y toca **Continuar**." },
            { titulo: "Revisa qué va a necesitar", texto: "Su documento de identidad en buen estado y un video corto de su rostro. Toca **Comenzar**." },
            { titulo: "Ingresa su WhatsApp", texto: "Si algo falla, Truora le envía un enlace para recuperar el proceso." },
            { titulo: "Inicia la verificación en Truora", texto: "Ve lo que se le va a pedir (ubicación, documento, video del rostro y celular), toca **Iniciar verificación** y acepta la autorización de tratamiento de datos.",
              img: [
                { src: "assets/img/kyc_truora_resumen.webp", full: "assets/img/kyc_truora_resumen.png", ancho: 412, alto: 915,
                  alt: "Pantalla de Truora Verificaremos tu identidad: permisos de ubicación, escanear el documento, grabar un video del rostro y verificar el celular, con el botón Iniciar verificación",
                  cap: "Lo que Truora le pedirá al cliente" }
              ] },
            { titulo: "Escanea su cédula", texto: "Elige **Colombia · Cédula de ciudadanía** (original y en formato físico) y toma la foto del **frente** y del **reverso** dentro del marco. Sin flash, porque causa reflejos, y con la cámara limpia." },
            { titulo: "Graba un video corto de su rostro", texto: "Con el celular frente a la cara, el rostro despejado, sin accesorios y con buena iluminación." },
            { titulo: "Verifica su celular", texto: "Elige recibir el código por **WhatsApp** o **SMS** y escribe los 6 dígitos." },
            { final: true, titulo: "Identidad verificada", texto: "Verá “¡Tu identidad fue verificada con éxito!”, toca **Finalizar proceso** y le aparece **Verificación completada**. En ese momento tú presionas **Cliente terminó**.",
              img: [
                { src: "assets/img/kyc_completada.webp", full: "assets/img/kyc_completada.png", ancho: 414, alto: 896,
                  alt: "Pantalla Verificación completada: ahora puedes continuar la solicitud con tu asesor, con el botón Listo",
                  cap: "Al ver esta pantalla, toca “Cliente terminó”" }
              ] }
          ] },
          { tipo: "texto", texto: "Mientras el cliente lo hace, puedes seguir con el formulario. Si el enlace sale inválido, genera un **Nuevo link**." },
          { tipo: "ver", id: "kyc-enlace-invalido", texto: "El enlace del KYC aparece como “inválido”" },
          { tipo: "ver", id: "kyc-no-validado", texto: "“No fue posible validar la identidad”" }
        ] },
      { id: "paso-4-personales", meta: "Paso 4", titulo: "Datos personales (9 pasos)",
        palabras: "datos personales documento contacto nacimiento ocupacion direccion gps vivienda pep residencia fiscal referencias canales",
        bloques: [
          { tipo: "texto", texto: "Registra, en orden: documento y contacto · nacimiento y perfil · ocupación · dirección (con vista previa y GPS) · vivienda · PEP y residencia fiscal · referencias · canales de contacto. Llena cada campo tal como aparece y toca **Continuar**." }
        ] },
      { id: "paso-5-negocio", meta: "Paso 5", titulo: "Datos del negocio (10 pasos)",
        palabras: "negocio actividad ciiu antiguedad destino ingresos gastos foto video evidencias activos pasivos costos",
        bloques: [
          { tipo: "texto", texto: "Registra: actividad económica (CIIU), nombre y antigüedad del negocio, destino del crédito, ingresos y gastos, **foto y video del negocio**, gastos familiares, activos/pasivos, otros ingresos y reporte de costos." },
          { tipo: "titulo", texto: "Foto y video del negocio" },
          { tipo: "lista", items: [
            "**Foto:** del cliente con su negocio, con buena iluminación y sin movimientos bruscos. Que el cliente salga visible y se vean el negocio o los productos.",
            "**Video:** en vertical y de **máximo 1 minuto**. Muestra el lugar, los productos o las herramientas, con el cliente en cámara contando qué vende y cómo trabaja."
          ] },
          { tipo: "nota", titulo: "Límites", texto: "La foto admite hasta **30 MB** y el video hasta **60 segundos en MP4**. Las fotos de iPhone (HEIC) se convierten solas." },
          { tipo: "ver", id: "foto-video-no-carga", texto: "La foto o el video del negocio no cargan" }
        ] },
      { id: "paso-6-qr", meta: "Paso 6", titulo: "Momentos QR finales",
        palabras: "instagram negocio vincular vinculo iniciar sesion contrasena clave permisos permitir omitir opcional quipu score qr descargar app cliente completo avanza sola logo cfa",
        bloques: [
          { tipo: "texto", texto: "Son dos QR, uno después del otro: **Instagram del negocio (opcional)** y **Quipu Score (obligatorio)**." },
          { tipo: "titulo", texto: "Instagram del negocio (opcional)" },
          { tipo: "nota", titulo: "Es opcional", texto: "Vincular o no el Instagram **no detiene la evaluación**. Si el cliente no tiene Instagram del negocio o **no recuerda su contraseña**, presiona **Omitir este paso** y sigue." },
          { tipo: "decir", texto: "Si tienes Instagram de tu negocio, escanéalo para conectarlo. Si no lo tienes o no recuerdas la clave, lo saltamos sin problema." },
          { tipo: "pasos", items: [
            "Muestra el **QR de Instagram** y pídele al cliente que lo escanee con su celular.",
            { titulo: "Inicia sesión en Instagram", texto: "Se abre Instagram y le pide su usuario (o correo o celular) y su **contraseña**. Debe ser el **Instagram del negocio**.",
              img: [
                { src: "assets/img/ig_login.webp", full: "assets/img/ig_login.png", ancho: 575, alto: 1143,
                  alt: "Pantalla de inicio de sesión de Instagram con los campos de usuario y contraseña y el botón Iniciar sesión",
                  cap: "Usuario y contraseña del Instagram del negocio" }
              ] },
            { titulo: "Permite el acceso", texto: "Aparece una pantalla con los permisos que pide la vinculación. **Todos son necesarios**: debe dejarlos activados y tocar **Permitir**.",
              img: [
                { src: "assets/img/ig_permisos.webp", full: "assets/img/ig_permisos.png", ancho: 575, alto: 898,
                  alt: "Pantalla de Instagram que solicita acceso al perfil, a los comentarios y a las estadísticas, con los permisos activados y el botón Permitir",
                  cap: "Permisos activados y luego “Permitir”" }
              ] },
            { final: true, titulo: "Instagram vinculado", texto: "Queda vinculado. Confírmalo en tu pantalla con **Cliente vinculó su IG** y sigue con Quipu Score." }
          ] },
          { tipo: "ver", id: "instagram-sin-contrasena", texto: "El cliente no recuerda su contraseña de Instagram" },
          { tipo: "titulo", texto: "Quipu Score (obligatorio)" },
          { tipo: "texto", texto: "Muestra el QR; el cliente descarga la app y completa un proceso corto de scoring. Cuando termina, **la pantalla avanza sola**: no tienes que confirmar nada." },
          { tipo: "decir", texto: "Escanea este código para descargar la app y completar un puntaje. Instálala en el celular que más uses." },
          { tipo: "nota", titulo: "Antes de seguir: verifica el logo de CFA", texto: "El cliente **no** descarga Quipu Score desde la Play Store: tu QR trae la **versión para CFA**. Mira con él la primera pantalla que abre: deben verse **los logos de CFA y Quipu Score**." },
          { tipo: "ver", id: "quipu-score-version-cfa", texto: "La app no muestra el logo de CFA" },
          { tipo: "nota", titulo: "No te adelantes", texto: "Si tocas **Cliente completó Quipu Score** antes de que el proceso termine, no podrás enviar la solicitud: el sistema te avisará que falta Quipu Score y te devolverá a esta misma pantalla." },
          { tipo: "ver", id: "falta-quipu-score", texto: "No deja enviar: avisa que falta Quipu Score" },
          { tipo: "img", img: [
            { src: "assets/img/qs_qr_cliente_completo.webp", full: "assets/img/qs_qr_cliente_completo.png", ancho: 414, alto: 896,
              alt: "Pantalla de Quipu Score con el código QR para descargar la app y el botón Cliente completó Quipu Score abajo",
              cap: "Aquí espera: la pantalla avanza sola cuando el cliente termina" }
          ] }
        ] },
      { id: "paso-7-revision", meta: "Paso 7", titulo: "Revisar la información",
        palabras: "revisar revision estado bloques enviar solicitud",
        bloques: [
          { tipo: "texto", texto: "La pantalla **Revisión de la información** muestra el estado de cada bloque: KYC, datos personales, datos del negocio, fotos del negocio, Instagram (opcional) y Quipu Score. Cuando todo esté en orden, presiona **Enviar solicitud**." },
          { tipo: "ver", id: "falta-quipu-score", texto: "No deja enviar: avisa que falta Quipu Score" }
        ] },
      { id: "paso-8-resultado", meta: "Paso 8", titulo: "Resultado y condiciones",
        palabras: "resultado preaprobado no aprobado rechazado monto plazo cuotas periodicidad condiciones intereses entrevista declaracion cerrar solicitud resumen visita banner",
        bloques: [
          { tipo: "titulo", texto: "Si queda pre-aprobado" },
          { tipo: "texto", texto: "Verás el monto aprobado, el plazo y la periodicidad del pago. Luego, en **Ver condiciones con el cliente**, gira el celular hacia él y revisen juntos cuota, plazo, intereses y total. En la pantalla de declaración, registra el resultado de la entrevista, marca si el cliente acepta y confirma." },
          { tipo: "img", img: [
            { src: "assets/img/paso8_preaprobado.webp", full: "assets/img/paso8_preaprobado.png", ancho: 414, alto: 896,
              alt: "Pantalla de crédito pre-aprobado con el monto, el plazo, la periodicidad del pago y el botón Ver condiciones con el cliente",
              cap: "Ajusta plazo y periodicidad; luego “Ver condiciones con el cliente”" }
          ] },
          { tipo: "titulo", texto: "Si no es aprobada" },
          { tipo: "texto", texto: "Verás el banner **“En este momento no podemos aprobar el crédito”**, con el motivo. Comunica el resultado con empatía y acláralo: podrá **volver a aplicar más adelante**, cuando su perfil mejore." },
          { tipo: "texto", texto: "La solicitud **no se cierra sola**. Ciérrala tú:" },
          { tipo: "pasos", items: [
            "Escribe un **resumen de la visita** (obligatorio, hasta 300 caracteres).",
            "Marca la casilla de **confirmación**.",
            "Presiona **Cerrar solicitud**."
          ] },
          { tipo: "texto", texto: "Queda registrada como no aprobada, y todo lo que capturaste durante la visita queda archivado." },
          { tipo: "ver", id: "qs-no-aprobado", texto: "Cómo explicarle al cliente un “no aprobado”" }
        ] },
      { id: "paso-9-cierre", meta: "Paso 9", titulo: "Cierre",
        palabras: "cierre formalizacion enviar listo terminar",
        bloques: [
          { tipo: "pasos", items: [
            "Al confirmar la declaración, presiona **Enviar a formalización**.",
            "Verás la confirmación de que la solicitud quedó registrada y continúa el proceso de formalización en CFA.",
            "Presiona **Listo** para volver al home: la solicitud queda marcada como **Completado**."
          ] },
          { tipo: "texto", texto: "Si el cliente no acepta el crédito en este momento, la solicitud queda registrada como no formalizada y podrá volver a aplicar más adelante." }
        ] }
    ] }
];

/* Filtros dentro de "Soluciones" (en este orden). Usan las CATEGORIAS de arriba. */
const FILTROS = ["kyc", "qs", "ig", "media", "gen"];
