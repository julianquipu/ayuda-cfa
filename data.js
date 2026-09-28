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
  pesoMaximo: "[PESO MÁXIMO — pendiente de confirmar]",

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

  version: "v0.4.2 · piloto"
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
  gen:   { nombre: "General",      color: "gris", icono: "check" },
  conx:  { nombre: "Conexión",     color: "oro",  icono: "conexion" }
};

/* ---------- 4. SOLUCIONES (casos frecuentes en campo) ----------
   Campos de cada pregunta:
     id        → nombre corto, único, sin espacios ni tildes (sirve para el enlace directo)
     cat       → una de las CATEGORIAS de arriba (kyc, qs, ig, media, conx, gen)
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
    palabras: "kyc enlace link invalido caducado vencido truora qr identidad codigo no abre verificacion no funciona se vencio",
    respuesta: "Genera un **Nuevo link** desde la pantalla del KYC y muéstraselo otra vez al cliente para que lo escanee. El enlace se renueva y el cliente puede continuar con la validación de identidad.",
    img: [
      { src: "assets/img/kyc_enlace_invalido.webp", full: "assets/img/kyc_enlace_invalido.png", ancho: 828, alto: 1792,
        alt: "Pantalla de KYC con los enlaces Nuevo link y Copiar link resaltados debajo del código QR",
        cap: "Toca “Nuevo link”, debajo del QR" }
    ]
  },
  {
    id: "quipu-score-en-blanco",
    cat: "qs",
    rapido: "Quipu Score en blanco",
    pregunta: "La app de Quipu Score se queda cargando o en blanco",
    palabras: "quipu score cargando blanco pantalla congelada trabada no avanza otp telefono codigo reinstalar desinstalar sin respuesta no responde se queda pegada lenta se cierra",
    respuesta: "Pídele al cliente que **cierre la app, la desinstale y la vuelva a instalar** desde el enlace o el QR. Al abrirla de nuevo, el proceso suele funcionar con normalidad."
  },
  {
    id: "quipu-score-no-descarga",
    cat: "qs",
    pregunta: "El cliente no logra descargar la app de Quipu Score",
    palabras: "descargar instalar play store no baja conexion internet wifi datos senal quipu score no carga lenta",
    respuesta: "Casi siempre es un tema de **conexión**. Verifica que tenga buena señal o Wi-Fi; si puedes, ayúdalo a conectarse a una red estable o inténtalo desde una zona con mejor señal. Con buena conexión, la descarga se completa."
  },
  {
    id: "quipu-score-version-cfa",
    cat: "qs",
    pregunta: "El cliente debe descargar Quipu Score desde tu QR, no desde la Play Store",
    palabras: "play store tienda google descargar buscar version cfa correcta logos marcas no aparecen deep link enlace qr escanear instalar desinstalar escalar app quipu score",
    respuesta: "El cliente **no puede** buscar ni descargar Quipu Score desde la Play Store. Siempre debe **escanear el QR de tu pantalla**: ese código trae el enlace que descarga la **versión de Quipu Score para CFA**.",
    pasos: [
      "En el paso de Quipu Score, muéstrale al cliente el **QR** de tu pantalla y pídele que lo escanee con su celular.",
      { texto: "Cuando la app se abra en su celular, **verifica que se vean los logos de las dos marcas, CFA y Quipu Score**, y el título “Ingresa a Quipu Score (Aliado CFA)”.",
        img: [
          { src: "assets/img/qs_cobrand_cfa.webp", full: "assets/img/qs_cobrand_cfa.png", ancho: 414, alto: 896,
            alt: "Pantalla de inicio de Quipu Score con los logos de CFA y Quipu Score y el título Ingresa a Quipu Score (Aliado CFA)",
            cap: "Así se ve la versión correcta: logos de CFA y Quipu Score" }
        ] },
      { titulo: "Si no ves los dos logos, no continúes", texto: "Revisa con el cliente:",
        subpasos: [
          "¿**Descargó la app desde la Play Store** sin escanear tu QR? Pídele que la **desinstale** y la vuelva a descargar escaneando tu QR.",
          "¿**Escaneó tu QR**? Si no, muéstraselo y pídele que lo escanee."
        ] }
    ],
    nota: "Regla: si no se ven **los dos logos**, no es la versión para CFA y **no se puede continuar**.",
    cierre: "Si el cliente **escaneó tu QR** y aun así no aparecen los dos logos, **escala el caso**: repórtalo con el botón de abajo."
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
    pregunta: "La foto o el video del negocio no cargan",
    palabras: "foto video no carga error procesar peso tamano subir galeria negocio evidencia pesado resolucion camara comprimir squoosh no sube subida lento lenta se queda cargando internet megapixeles",
    respuesta: "Suele ser por la **conexión** o por el **tamaño del archivo**. Haz esto, en orden:",
    pasos: [
      "Verifica que tengas buena señal e inténtalo de nuevo.",
      {
        texto: "Si sigue fallando, es el peso del archivo. **Toma la foto o el video con menor resolución**: abre la Cámara → Ajustes → baja la calidad/resolución → vuelve a capturar.",
        img: [
          { pendiente: "IMG-01", describe: "Ajustes de la cámara de un Motorola (Moto G) con la opción de resolución/calidad resaltada.",
            fuente: "Captura real en un Moto G del piloto" }
        ]
      },
      "Como respaldo, comprime la foto gratis en **squoosh.app** (no necesitas instalar nada) y súbela de nuevo."
    ],
    // cierre: "Peso máximo recomendado: **{PESO}**."   ← activar cuando dev confirme el peso (CONFIG.pesoMaximo)
  },
  {
    id: "qr-no-se-refleja",
    cat: "gen",
    pregunta: "Un paso del cliente (QR) no se refleja en tu pantalla",
    palabras: "qr no se refleja no avanza cliente termino completo confirmar manual paso instagram quipu score kyc boton se queda pegado no pasa esperando",
    respuesta: "Los pasos que el cliente hace en su celular (KYC, Instagram, Quipu Score) **los confirmas tú manualmente**. Verifica con el cliente que ya terminó y presiona el botón de confirmación en tu pantalla (“Cliente terminó” / “Cliente completó”).",
    img: [
      { src: "assets/img/qs_qr_cliente_completo.webp", full: "assets/img/qs_qr_cliente_completo.png", ancho: 414, alto: 896,
        alt: "Pantalla de Quipu Score con el código QR para descargar la app y el botón Cliente completó Quipu Score abajo",
        cap: "Cuando el cliente termine, toca “Cliente completó Quipu Score”" }
    ]
  },
  {
    id: "dns-samsung",
    cat: "conx",
    rapido: "La app no carga",
    aplica: "Samsung Galaxy · One UI · 3 pasos, 2 minutos",
    pregunta: "La app no carga o da error de conexión (posible bloqueo de DNS)",
    palabras: "no carga app error conexion dns adguard vpn bloqueo bloquea samsung galaxy internet no abre dns privado desinstalar llave blokada nextdns intra dns66 publicidad sin respuesta no responde no funciona pagina",
    respuesta: "A veces un ajuste o una app (como **AdGuard**) bloquea el internet para filtrar publicidad y también bloquea nuestra app. En celulares **Samsung Galaxy**, revisa estos 3 pasos.",
    nota: "Las pantallas son ilustrativas: los nombres y la posición de los menús pueden cambiar un poco según el modelo. Si no encuentras una opción, usa la **lupa de Ajustes** y busca “DNS privado” o “VPN”.",
    pasos: [
      {
        titulo: "Desactiva el DNS privado",
        texto: "Abre **Ajustes → Conexiones → Más ajustes de conexión → DNS privado**. Si ves “adguard” u otro nombre extraño (nextdns, cloudflare, family), ese es el bloqueo: cámbialo a **Automático** y toca **Guardar**.",
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
        texto: "Apaga y prende el **Wi-Fi** o los **datos móviles** (o reinicia el celular) y vuelve a abrir la app."
      }
    ],
    cierre: "¿Sigue sin funcionar? Repórtalo con una captura de **Ajustes → Conexiones → Más ajustes de conexión**."
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
        palabras: "puntaje credito score obligatorio perfil habitos financieros centrales riesgo",
        bloques: [
          { tipo: "texto", texto: "Es el **puntaje de crédito de Quipu**. En lugar de mirar solo el historial en centrales de riesgo, **entiende el perfil financiero y los hábitos financieros del cliente** para calcular el monto, el plazo, la cuota y las condiciones del crédito. Por eso es un paso **obligatorio**: sin él, la solicitud no puede evaluarse." }
        ] },
      { id: "qs-que-mira", titulo: "¿Qué mira el Quipu Score?",
        palabras: "capacidad pago endeudamiento antiguedad negocio instagram preaprobado resultado puntaje",
        bloques: [
          { tipo: "texto", texto: "Evalúa, en conjunto, señales del negocio y del cliente como:" },
          { tipo: "lista", items: [
            "Su **capacidad de pago** (cuánto le queda después de sus gastos).",
            "Su **nivel de endeudamiento**.",
            "La **antigüedad y el comportamiento** del negocio.",
            "Su actividad y hábitos, incluida —si el cliente quiere— la actividad de su **Instagram del negocio**."
          ] },
          { tipo: "texto", texto: "Con esas señales, el modelo decide si el crédito queda **pre-aprobado** y en qué condiciones. Al cliente **no se le muestra el puntaje desagregado**: ve un **resultado general** (pre-aprobado o no)." }
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
            "Cada crédito bien manejado **construye su historial** para futuros créditos."
          ] }
        ] },
      { id: "qs-no-aprobado", titulo: "Si el resultado es “no aprobado”",
        palabras: "no aprobado rechazo rechazado negado capacidad pago endeudamiento antiguedad comunicar",
        bloques: [
          { tipo: "texto", texto: "No es un rechazo personal ni definitivo. Suele deberse a razones generales del modelo: **no se observó capacidad de pago suficiente**, **un nivel alto de endeudamiento**, o **poca antigüedad del negocio**. Comunícalo con respeto y sin entrar en detalles técnicos." }
        ] },
      { id: "qs-tres-momentos", titulo: "Los tres momentos en el celular del cliente",
        palabras: "tres momentos kyc instagram quipu score obligatorio opcional qr confirmar manual",
        bloques: [
          { tipo: "tabla", columnas: ["Momento", "¿Obligatorio?", "Para qué"], filas: [
            ["Verificación de identidad (KYC)", "Sí", "Confirmar que es quien dice ser."],
            ["Instagram del negocio", "No (opcional)", "Sumar data alternativa del negocio, si lo tiene."],
            ["Quipu Score", "Sí", "Entender el perfil financiero y calcular las condiciones del crédito."]
          ] },
          { tipo: "texto", texto: "En los tres, el cliente lo hace en su celular y **tú confirmas manualmente** cuando termina." }
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
        { tipo: "momento", quien: "tu",      texto: "**Inicias una visita nueva** desde el home." },
        { tipo: "momento", quien: "cliente", texto: "**Verificación de identidad (KYC):** muestras el QR; el cliente valida su identidad en su celular con Truora." },
        { tipo: "momento", quien: "tu",      texto: "**Datos personales:** registras la información del cliente — 9 pasos." },
        { tipo: "momento", quien: "tu",      texto: "**Datos del negocio + evidencias:** actividad, finanzas, foto y video del negocio — 10 pasos." },
        { tipo: "momento", quien: "cliente", texto: "**Momentos QR finales:** Instagram del negocio (opcional) y Quipu Score (obligatorio), en el celular del cliente." },
        { tipo: "momento", quien: "tu",      texto: "**Revisión:** verificas que todo esté completo y envías la solicitud." },
        { tipo: "momento", quien: "ambos",   texto: "**Resultado y condiciones:** si queda pre-aprobado, ajustas monto, plazo y cuotas, y revisas las condiciones con el cliente." },
        { tipo: "momento", quien: "tu",      texto: "**Cierre:** envías a formalización y la solicitud continúa en CFA." },
        { tipo: "nota", titulo: "Regla de oro", texto: "En KYC, Instagram y Quipu Score, el cliente hace el paso en su celular y **tú confirmas manualmente**. No esperes bloqueado: cuando el cliente termina, lo confirmas y sigues." }
      ] },
    tituloLista: "Cada paso en detalle",
    temas: [
      { id: "paso-1-sesion", meta: "Paso 1", titulo: "Iniciar sesión",
        palabras: "login ingresar entrar sesion documento celular codigo whatsapp sms otp politicas",
        bloques: [
          { tipo: "pasos", items: [
            "Abre la PWA. Verás el logo CFA y “Módulo de crédito”.",
            "Ingresa **tu tipo y número de documento** y **tu celular**.",
            "Elige recibir el código por **WhatsApp** o **SMS**.",
            "Escribe el código de 6 dígitos y acepta las políticas."
          ] },
          { tipo: "nota", titulo: "Ojo", texto: "Aquí ingresas **tú, el asesor** — no el cliente." },
          { tipo: "img", img: [
            { src: "assets/img/paso1_ingreso.webp", full: "assets/img/paso1_ingreso.png", ancho: 414, alto: 896,
              alt: "Pantalla de ingreso con tipo y número de identificación, número de celular y los botones Enviar código por WhatsApp o por SMS",
              cap: "Tu documento y tu celular; luego WhatsApp o SMS" }
          ] }
        ] },
      { id: "paso-2-visita", meta: "Paso 2", titulo: "Iniciar la visita",
        palabras: "iniciar visita nueva home ultimas visitas retomar en curso",
        bloques: [
          { tipo: "texto", texto: "En el home ves tus **últimas visitas**. Para una nueva, toca **Iniciar visita**. Para retomar una en curso, tócala en la lista." }
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
          { tipo: "decir", texto: "Este código verifica tu identidad. Escanéalo y sigue las instrucciones: te pedirá una foto de tu documento y un video de tu rostro." },
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
          { tipo: "ver", id: "kyc-enlace-invalido", texto: "El enlace del KYC aparece como “inválido”" }
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
          { tipo: "nota", titulo: "Evidencias", texto: "Toma una foto del punto de venta y un video corto (máx. 1 minuto) del negocio en funcionamiento." },
          { tipo: "ver", id: "foto-video-no-carga", texto: "La foto o el video del negocio no cargan" }
        ] },
      { id: "paso-6-qr", meta: "Paso 6", titulo: "Momentos QR finales",
        palabras: "instagram negocio vincular iniciar sesion contrasena clave permisos permitir omitir opcional quipu score qr descargar app cliente completo",
        bloques: [
          { tipo: "texto", texto: "Son dos QR, uno después del otro: **Instagram del negocio (opcional)** y **Quipu Score (obligatorio)**." },
          { tipo: "titulo", texto: "Instagram del negocio (opcional)" },
          { tipo: "nota", titulo: "Es opcional", texto: "Vincular o no el Instagram **no detiene la evaluación**. Si el cliente no tiene Instagram del negocio o **no recuerda su contraseña**, presiona **Omitir este paso** y sigue." },
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
            { final: true, titulo: "Instagram vinculado", texto: "Queda vinculado. Confírmalo en tu pantalla y sigue con Quipu Score." }
          ] },
          { tipo: "ver", id: "instagram-sin-contrasena", texto: "El cliente no recuerda su contraseña de Instagram" },
          { tipo: "titulo", texto: "Quipu Score (obligatorio)" },
          { tipo: "texto", texto: "Muestra el QR; el cliente descarga la app y completa el puntaje. Cuando termina, presiona **Cliente completó Quipu Score**." },
          { tipo: "decir", texto: "Escanea este código para descargar la app y completar un puntaje. Instálala en el celular que más uses." },
          { tipo: "nota", titulo: "Siempre desde tu QR", texto: "El cliente **no** descarga Quipu Score desde la Play Store: tu QR trae la **versión para CFA**. Verifica que en su pantalla se vean **los logos de Quipu y CFA**." },
          { tipo: "ver", id: "quipu-score-version-cfa", texto: "El cliente buscó Quipu Score en la Play Store" },
          { tipo: "img", img: [
            { src: "assets/img/qs_qr_cliente_completo.webp", full: "assets/img/qs_qr_cliente_completo.png", ancho: 414, alto: 896,
              alt: "Pantalla de Quipu Score con el código QR para descargar la app y el botón Cliente completó Quipu Score abajo",
              cap: "Cuando el cliente termine, toca “Cliente completó Quipu Score”" }
          ] }
        ] },
      { id: "paso-7-revision", meta: "Paso 7", titulo: "Revisar la información",
        palabras: "revisar revision estado bloques enviar solicitud",
        bloques: [
          { tipo: "texto", texto: "Revisa el estado de cada bloque (KYC, datos personales, datos del negocio, fotos, Instagram, Quipu Score). Cuando todo esté en orden, presiona **Enviar solicitud**." }
        ] },
      { id: "paso-8-resultado", meta: "Paso 8", titulo: "Resultado y condiciones",
        palabras: "resultado preaprobado monto ajustar reducir cuotas periodicidad condiciones intereses entrevista",
        bloques: [
          { tipo: "texto", texto: "Si queda **pre-aprobado**: verás el monto aprobado. Puedes **ajustar** el monto (solo se puede **reducir**, nunca subir por encima del aprobado), el número de cuotas y la periodicidad. Luego, en **Ver condiciones con el cliente**, gira el celular hacia él y revisen juntos cuota, plazo, intereses y total. Registra el resultado de la entrevista y confirma." },
          { tipo: "img", img: [
            { src: "assets/img/paso8_preaprobado.webp", full: "assets/img/paso8_preaprobado.png", ancho: 414, alto: 896,
              alt: "Pantalla de crédito pre-aprobado con el monto, el plazo, la periodicidad del pago y el botón Ver condiciones con el cliente",
              cap: "Ajusta plazo y periodicidad; luego “Ver condiciones con el cliente”" }
          ] }
        ] },
      { id: "paso-9-cierre", meta: "Paso 9", titulo: "Cierre",
        palabras: "cierre formalizacion enviar listo terminar",
        bloques: [
          { tipo: "texto", texto: "Presiona **Enviar a formalización**. Verás la confirmación de que la solicitud quedó registrada y continúa el proceso en CFA. Toca **Listo** para volver al home. Con eso, tu trabajo en la herramienta para esa visita termina." }
        ] }
    ] }
];

/* Filtros dentro de "Soluciones" (en este orden). Usan las CATEGORIAS de arriba. */
const FILTROS = ["kyc", "qs", "ig", "media", "conx", "gen"];
