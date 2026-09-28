/* =====================================================================
   Lógica del centro de ayuda. Normalmente NO necesitas tocar este archivo:
   el contenido vive en data.js.
   Componentes Material 3 (search bar, navigation bar, filter chips,
   extended FAB, bottom sheet, snackbar) sin librerías externas.
   ===================================================================== */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  // Íconos: Material Symbols Rounded (Google · Apache 2.0), peso 400, en SVG en línea:
  // no dependen de internet ni de una fuente externa. Más en fonts.google.com/icons
  const ms = (d) => '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="' + d + '"/></svg>';
  const ICON = {
    chev: ms("M480-357q-6 0-11-2t-10-7L261-564q-9-9-9-21t9-21q9-9 21.5-9t21.5 9l176 176 176-176q9-9 21-9t21 9q9 9 9 21.5t-9 21.5L501-366q-5 5-10 7t-11 2Z"),
    zoom: ms("M346-556h-52q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h52v-51q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v51h51q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-51v52q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-52Zm32 227q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z"),
    img: ms("M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0 0v-600 600Zm86-97h429q8.5 0 12.75-8t-.75-16L590-457q-5-6-12-6t-12 6L446-302l-81-111q-5-6-12-6t-12 6l-86 112q-6 8-1.75 16t12.75 8Z"),
    phone: ms("M260-40q-24.75 0-42.37-17.63Q200-75.25 200-100v-760q0-24 18-42t42-18h438q24.75 0 42.38 17.62Q758-884.75 758-860v150q18 3 30 16.95 12 13.96 12 31.63V-587q0 19-12 33t-30 17v437q0 24.75-17.62 42.37Q722.75-40 698-40H260Zm0-60h438v-760H260v760Zm0 0v-760 760Zm219-620q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Z"),
    search: ms("M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z"),
    close: ms("M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"),
    errores: ms("M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5Zm35-48.5 63-150q-38-13-67.5-41.5T310-421l-150 60q31 71 82 123t117 78Zm-50-378q16-41 45-70t67-42l-60-150q-75 31-127 83.5T160-598l149 60Zm256 143q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm36 235q69-28 120-79.5T800-359l-150-62q-15 42-44.5 70.5T538-310l63 150Zm49-379 150-62q-28-68-79.5-119.5T601-800l-61 150q38 13 66 41.5t44 69.5Z"),
    score: ms("M473.5-303.5Q517-305 537-336l179-280q7-11-1.5-19.5T695-637L418-456q-30 20-32 64t21 67q23 23 66.5 21.5ZM478-799q45 0 94.5 12t97.5 39q11 7 15 19.31 4 12.31-4 23.5t-20.5 12.69Q648-691 636-697q-41-22-83.5-32T478-739q-140.48 0-239.24 100.22Q140-538.57 140-396.02 140-351 152.5-305q12.5 46 35.5 85h579q22-36 35-84t13-94q0-35-9-75.5T776-551q-7-11-5.5-24t12.5-20q10.64-8 23.32-4T825-583q23 45 35.5 89.5T875-404q2 60-12 113t-41 98q-12 23-25.5 28t-33.5 5H192q-17 0-33.5-8.5T134-193q-26-48-40-97.5T80-396q0-83 31.5-156.5t85.5-128Q251-735 323.68-767T478-799Zm-9 331Z"),
    scoreFill: ms("M418-340q25 25 63 23.5t55-27.5l180-271q7-11-1.5-19.5T695-636L424-456q-26 18-28.5 54.5T418-340ZM192-160q-18 0-34-8.5T134-193q-26-48-40-100T80-399q0-83 31.5-156T197-682.5q54-54.5 126.5-86T478-800q83 0 156.5 31.5t128 86Q817-628 848.5-555T880-399q0 54-13 106.5T827-193q-9 16-25 24.5t-34 8.5H192Z"),
    flujo: ms("M245-165.53Q200-211.06 200-275v-349q-35-13-57.5-41.26-22.5-28.27-22.5-64.41Q120-776 152.5-808t78-32q45.5 0 77.5 32.14t32 78.05q0 35.81-22.5 64.31T260-624v349q0 39.19 27.5 67.09Q315-180 355.5-180t67.5-27.91q27-27.9 27-67.09v-410q0-65 45-110t110-45q65 0 110 45t45 110v349q35 13 57.5 41.36Q840-266.27 840-230q0 45-32.08 77.5Q775.83-120 730-120q-45 0-77.5-32.5T620-230q0-36.3 22.5-65.15Q665-324 700-336v-349q0-40-27.5-67.5T605-780q-40 0-67.5 27.5T510-685v410q0 63.94-45 109.47T355-120q-65 0-110-45.53ZM230.5-680q20.5 0 35-15t14.5-35.5q0-20.5-14.37-35Q251.25-780 230-780q-20 0-35 14.37-15 14.38-15 35.63 0 20 15 35t35.5 15Zm500 500q20.5 0 35-15t14.5-35.5q0-20.5-14.37-35Q751.25-280 730-280q-20 0-35 14.37-15 14.38-15 35.63 0 20 15 35t35.5 15ZM230-730Zm500 500Z"),
    flujoFill: ms("M245-165.5Q200-211 200-275v-349q-35-13-57.5-41.5T120-730q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 36-22.5 64.5T260-624v349q0 39 27.5 67t67.5 28q41 0 68-28t27-67v-410q0-65 45-110t110-45q65 0 110 45t45 110v349q35 13 57.5 41.5T840-230q0 45-32 77.5T730-120q-45 0-77.5-32.5T620-230q0-36 22.5-65t57.5-41v-349q0-40-27.5-67.5T605-780q-40 0-67.5 27.5T510-685v410q0 64-45 109.5T355-120q-65 0-110-45.5Z"),
    pasos: ms("M150-80q-13 0-21.5-8.5T120-110q0-13 8.5-21.5T150-140h70v-30h-30q-13 0-21.5-8.5T160-200q0-13 8.5-21.5T190-230h30v-30h-70q-13 0-21.5-8.5T120-290q0-13 8.5-21.5T150-320h90q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80h-90Zm-7-280q-9 0-16-7t-7-16v-87q0-17 11.5-28.5T160-510h60v-30h-70q-13 0-21.5-8.5T120-570q0-13 8.5-21.5T150-600h90q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h70q13 0 21.5 8.5T280-390q0 13-8.5 21.5T250-360H143Zm45.5-288.5Q180-657 180-670v-150h-30q-13 0-21.5-8.5T120-850q0-13 8.5-21.5T150-880h68q9 0 15.5 6.5T240-858v188q0 13-8.5 21.5T210-640q-13 0-21.5-8.5ZM399-209q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h411q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H399Zm0-243q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h411q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H399Zm0-243q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h411q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H399Z"),
    kyc: ms("M232-247h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265-312q-15 5-24 19t-9 32v14Zm361-67h120q11 0 18-7t7-18q0-11-7-18t-18-7H593q-11 0-18 7t-7 18q0 11 7 18t18 7Zm-200.5-65.5Q408-395 408-418t-15.5-38.5Q377-472 354-472t-38.5 15.5Q300-441 300-418t15.5 38.5Q331-364 354-364t38.5-15.5ZM593-427h120q11 0 18-7t7-18q0-11-7-18t-18-7H593q-11 0-18 7t-7 18q0 11 7 18t18 7ZM140-80q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h250v-140q0-24 18-42t42-18h60q24 0 42 18t18 42v140h250q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680v-480H570v30q0 28-18 44t-42 16h-60q-24 0-42-16t-18-44v-30H140v480Zm310-450h60v-230h-60v230Zm30 210Z"),
    camara: ms("M479.5-267q72.5 0 121.5-49t49-121.5q0-72.5-49-121T479.5-607q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5ZM140-120q-24 0-42-18t-18-42v-513q0-23 18-41.5t42-18.5h147l55-66q8-11 20-16t26-5h184q14 0 26 5t20 16l55 66h147q23 0 41.5 18.5T880-693v513q0 24-18.5 42T820-120H140Zm0-60h680v-513H645l-73-87H388l-73 87H140v513Zm340-257Z"),
    conexion: ms("M784-91 411-463q-42 10-78 29.5T267-389q-15 12-33.5 13.5T201-388q-14-14-13-32.5t15-31.5q29-26 62-46t75-37L229-646q-35 18-68.5 40.5T98-558q-15 13-34 13.5T31-558q-14-14-12.5-32.5T34-622q30-27 62-50t65-41l-71-71q-9-9-9-21.5t9-21.5q9-9 21.5-9t21.5 9l694 694q9 9 9 21t-9 21q-9 9-21.5 9T784-91Zm-367-63q-27-27-27-63t27-63q27-27 63-27t63 27q27 27 27 63t-27 63q-27 27-63 27t-63-27Zm343-235q-14 14-33 14t-34-13q-32-27-71.5-57T549-500l-12-9q-15-11-7-29t28-14q57 11 104.5 35.5T754-454q15 13 17.5 32T760-389Zm169-169q-14 14-33.5 13.5T861-558q-83-70-178-111t-203-41q-37 0-71 4.5T352-693q-18 6-34.5-2.5T295-722q-6-18 2.5-35.5T324-780q36-11 75.5-15.5T480-800q128 0 241.5 48.5T926-622q14 13 15.5 31.5T929-558Z"),
    ok: ms("m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z"),
    check: ms("m421-389-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635-603L421-389Zm59 309q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"),
    chat: ms("M920-591q0 80-24.5 142T826-333q-10 12-24.5 13T776-330q-11-11-10.5-26t10.5-27q36-44 55-92.5T850-591q0-67-19-115.5T776-799q-10-12-10.5-27t10.5-26q11-11 25.5-10t24.5 13q45 54 69.5 116T920-591Zm-200 0q0 32-9.5 61T684-475q-8 12-22 13t-25-10q-11-11-12-25t7-27q8-14 13-31t5-36q0-19-5-36t-13-31q-8-13-7-27t12-25q11-11 25-10t22 13q17 26 26.5 55t9.5 61ZM360-441q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40-180v-34q0-38 19-64.5t49-41.5q51-26 120.5-43T360-380q62 0 131 17t120 43q30 15 49.5 41.5T680-214v34q0 25-17.5 42.5T620-120H100q-25 0-42.5-17.5T40-180Zm60 0h520v-34q0-16-8.5-29.5T587-266q-48-27-109-40.5T360-320q-57 0-118.5 14.5T132-266q-14 7-23 21.5t-9 30.5v34Zm324.5-346.5Q450-552 450-591t-25.5-64.5Q399-681 360-681t-64.5 25.5Q270-630 270-591t25.5 64.5Q321-501 360-501t64.5-25.5ZM360-591Zm0 411Z"),
    help: ms("M511-258.03q11-11.03 11-27T510.97-312q-11.03-11-27-11T457-311.97q-11 11.03-11 27T457.03-258q11.03 11 27 11T511-258.03ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Zm2.77-180Q513-660 536-641.5q23 18.5 23 47.2 0 26.3-15.65 45.73Q527.7-529.14 508-512q-23 19-40 42.38-17 23.39-17 52.62 0 11 8.4 17.5T479-393q12 0 19.88-8 7.87-8 10.12-20 3-21 16-38t30.23-30.78Q580-510 596-537q16-27 16-58.61 0-50.39-37.5-83.89T485.55-713Q450-713 417-698t-54 44q-7 10-6.5 21.5t9.47 18.5q11.41 8 23.65 5 12.23-3 20.38-14 12.75-17.9 31.88-27.45Q461-660 482.77-660Z"),
    next: ms("M686-450H190q-13 0-21.5-8.5T160-480q0-13 8.5-21.5T190-510h496L459-737q-9-9-9-21t9-21q9-9 21-9t21 9l278 278q5 5 7 10t2 11q0 6-2 11t-7 10L501-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l227-227Z"),
    offline: ms("M248-171q-88 0-148-59T40-377q0-80 50.5-134T217-577q2-14 6.5-31.5T236-640L91-785q-9-9-9-21t9-21q9-9 21-9t21 9l707 707q9 9 9 21t-9 21q-9 9-21.5 9T797-78l-94-93H248Zm0-60h397L285-591q-11 15-14.5 34t-3.5 37h-19q-62 0-105 39.5t-43 101q0 61.5 43 105T248-231Zm216-181Zm390 210-47-47q25-17 39-38t14-50q0-43-31-73.5T755-441h-67v-81q0-88-61-147.5T478.47-729q-28.47 0-60.97 9T358-691l-42-42q36-29 77.5-42.5T478-789q111 0 190.5 79T748-520v21q72-1 122 45t50 117q0 35-16.5 73.5T854-202ZM583-470Z"),
    wa: '<svg aria-hidden="true"><use href="#i-wa"/></svg>' // WhatsApp no existe en Material: se usa su logo oficial
  };

  /* ---------- Texto ---------- */
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // **negrita** y {PESO}; todo lo demás se escapa (nadie puede romper la página con un "<").
  const fmt = (s) => esc(s)
    .replace(/\{PESO\}/g, esc(CONFIG.pesoMaximo))
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  const plain = (s) => String(s || "").replace(/\*\*/g, "").replace(/\{PESO\}/g, CONFIG.pesoMaximo);
  const plural = (n, a, b) => n + " " + (n === 1 ? a : b);

  // Normaliza para buscar: minúsculas y sin tildes (verificación → verificacion).
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  // Palabras que no ayudan a buscar (también las conversacionales: "tengo problemas con…").
  const STOP = new Set(("a al con de del el en es la las lo los me mi mis para por que se sus su un una y o le les como no ya " +
    "tengo tiene tienen tenemos hay problema problemas ayuda necesito pasa esta este esto eso cuando porque muy").split(" "));
  function tokens(q) {
    return norm(q).split(/[^a-z0-9]+/).filter((t) => t && !STOP.has(t))
      // plural simple: fotos → foto, videos → video
      .map((t) => (t.length > 4 && t.endsWith("es") && !t.endsWith("ies")) ? t.slice(0, -2)
        : (t.length > 3 && t.endsWith("s")) ? t.slice(0, -1) : t);
  }

  // Resalta los términos buscados respetando las tildes del texto original.
  function highlight(text, toks) {
    if (!toks.length) return esc(text);
    const map = []; let n = "";
    for (let i = 0; i < text.length; i++) { const c = norm(text[i]); for (let k = 0; k < c.length; k++) { n += c[k]; map.push(i); } }
    const marks = new Array(text.length).fill(false);
    toks.forEach((t) => { let p = n.indexOf(t); while (p !== -1) { for (let k = p; k < p + t.length; k++) marks[map[k]] = true; p = n.indexOf(t, p + 1); } });
    let out = "", open = false;
    for (let i = 0; i < text.length; i++) {
      if (marks[i] && !open) { out += "<mark>"; open = true; }
      if (!marks[i] && open) { out += "</mark>"; open = false; }
      out += esc(text[i]);
    }
    return out + (open ? "</mark>" : "");
  }

  /* ---------- Entradas: todo lo que se puede buscar y abrir ----------
     Une las preguntas de FAQ y los temas de las demás secciones en una sola lista. */
  const SKIP = new Set(["src", "full", "id", "tipo", "quien", "cat", "icono", "pendiente", "fuente", "ancho", "alto"]);
  function textOf(v, key) {
    if (v == null || SKIP.has(key)) return "";
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v.map((x) => textOf(x)).join(" ");
    if (typeof v === "object") return Object.keys(v).map((k) => textOf(v[k], k)).join(" ");
    return "";
  }
  const QUIEN = { tu: { t: "Tú", c: "teal" }, cliente: { t: "Cliente", c: "azul" }, ambos: { t: "Tú + cliente", c: "oro" } };

  const ENTRIES = [];
  SECCIONES.forEach((sec) => {
    if (sec.tipo === "faq") {
      FAQ.forEach((it) => {
        const cat = CATEGORIAS[it.cat] || { nombre: "", color: "gris" };
        ENTRIES.push({ id: it.id, sec: sec.id, cat: it.cat, meta: cat.nombre, color: cat.color, title: it.pregunta,
          report: true, kw: it.palabras + " " + cat.nombre + " " + (it.aplica || ""),
          body: () => faqBody(it), text: textOf([it.respuesta, it.nota, it.pasos, it.cierre, it.img]) });
      });
    } else if (sec.tipo === "temas") {
      (sec.temas || []).forEach((tm) => {
        ENTRIES.push({ id: tm.id, sec: sec.id, meta: tm.meta || sec.nav, ownMeta: !!tm.meta, color: sec.id === "quipu-score" ? "teal" : "gris",
          title: tm.titulo, kw: (tm.palabras || "") + " " + sec.nav, body: () => bloques(tm.bloques), text: textOf(tm.bloques) });
      });
      if (sec.resumen) {
        const rs = sec.resumen;
        ENTRIES.push({ id: rs.id, sec: sec.id, resumen: true, meta: sec.nav, color: "gris", title: rs.titulo,
          kw: (rs.palabras || "") + " " + sec.nav, body: () => bloques(rs.bloques), text: textOf(rs.bloques) });
      }
    }
  });
  ENTRIES.forEach((e) => { e.tTitle = norm(e.title); e.tKw = norm(e.kw); e.tBody = norm(plain(e.text)); });
  const entry = (id) => ENTRIES.find((e) => e.id === id);

  function search(q) {
    const toks = tokens(q);
    if (!toks.length) return { toks, strict: [], loose: [] };
    const scored = ENTRIES.map((e) => {
      let score = 0, hits = 0;
      toks.forEach((t) => {
        const s = (e.tTitle.includes(t) ? 3 : 0) + (e.tKw.includes(t) ? 2 : 0) + (e.tBody.includes(t) ? 1 : 0);
        if (s) hits++; score += s;
      });
      // A igual puntaje, primero las soluciones a problemas.
      return { e, score: score + (e.report ? 0.5 : 0), hits };
    }).filter((r) => r.hits);
    scored.sort((a, b) => b.hits - a.hits || b.score - a.score);
    const strict = scored.filter((r) => r.hits === toks.length).map((r) => r.e);
    // Sin coincidencia exacta: los 3 más parecidos.
    return { toks, strict, loose: strict.length ? [] : scored.slice(0, 3).map((r) => r.e) };
  }

  /* ---------- WhatsApp ---------- */
  function waMessage(tema) {
    const lines = CONFIG.mensajeWhatsApp.slice();
    if (tema) {
      const i = lines.findIndex((l) => norm(l).includes("que paso"));
      const add = "Revisé en la ayuda “" + tema + "” y no se resolvió. ";
      if (i >= 0) lines[i] = lines[i] + add; else lines.push(add);
    }
    return lines.join("\n");
  }
  const waNumber = () => String(CONFIG.whatsapp || "").replace(/\D/g, "");
  const waGroup = () => String(CONFIG.grupoWhatsApp || "").trim();
  const GROUP_HINT = "En el grupo: mantén presionado el campo de texto y toca Pegar";
  // Grupo: abre la invitación (el texto se copia aparte). Número: wa.me con el texto precargado.
  const waHref = (tema) => waGroup() || ("https://wa.me/" + waNumber() + "?text=" + encodeURIComponent(waMessage(tema)));
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0;top:0";
    (document.querySelector("dialog[open]") || document.body).appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove(); return ok;
  }

  /* ---------- Piezas de contenido ---------- */
  function renderImgs(imgs) {
    return (imgs || []).map((g) => {
      if (g.pendiente) {
        if (!CONFIG.mostrarImagenesPendientes) return "";
        return '<div class="ph" role="note">' + ICON.img + "<div>" +
          '<span class="eyebrow">Imagen pendiente · ' + esc(g.pendiente) + "</span>" +
          "<p>" + fmt(g.describe) + "</p>" +
          (g.fuente ? "<small>Fuente: " + esc(g.fuente) + "</small>" : "") + "</div></div>";
      }
      const dims = (g.ancho && g.alto) ? ' width="' + g.ancho + '" height="' + g.alto + '"' : "";
      return '<figure class="shot' + (g.ancha ? " ancha" : "") + '">' +
        '<button type="button" class="shot-btn" data-full="' + esc(g.full || g.src) + '" data-cap="' + esc(g.cap && !/toca la imagen/i.test(g.cap) ? g.cap : g.alt) + '" data-alt="' + esc(g.alt) + '" aria-label="Ampliar imagen: ' + esc(g.alt) + '">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" decoding="async"' + dims + ">" +
        '<span class="zoom">' + ICON.zoom + "</span></button>" +
        (g.cap ? "<figcaption>" + esc(g.cap) + "</figcaption>" : "") + "</figure>";
    }).join("");
  }

  function renderPasos(pasos) {
    if (!pasos || !pasos.length) return "";
    return '<ol class="steps">' + pasos.map((p) => {
      if (typeof p === "string") return "<li>" + fmt(p) + "</li>";
      return '<li class="' + (p.final ? "final" : "") + '">' +
        (p.titulo ? '<span class="st">' + fmt(p.titulo) + "</span>" : "") +
        (p.texto ? "<div>" + fmt(p.texto) + "</div>" : "") +
        (p.subpasos ? '<ol class="sub">' + p.subpasos.map((s) => "<li>" + fmt(s) + "</li>").join("") + "</ol>" : "") +
        renderImgs(p.img) + "</li>";
    }).join("") + "</ol>";
  }

  const nota = (titulo, texto) => '<div class="nota"><span class="eyebrow">' + esc(titulo || "Importante") + "</span>" + fmt(texto) + "</div>";

  // Bloques de las secciones (ver la lista de tipos en data.js).
  function bloques(list) {
    let html = "", tl = [];
    const flush = () => {
      if (!tl.length) return;
      html += '<ol class="timeline">' + tl.map((m) => {
        const q = QUIEN[m.quien] || QUIEN.tu;
        return "<li><div>" + fmt(m.texto) + '<span class="who ' + q.c + '">' + (m.quien === "cliente" ? ICON.phone : "") + esc(q.t) + "</span></div></li>";
      }).join("") + "</ol>";
      tl = [];
    };
    (list || []).forEach((b) => {
      if (b.tipo === "momento") { tl.push(b); return; }
      flush();
      if (b.tipo === "texto") html += "<p>" + fmt(b.texto) + "</p>";
      else if (b.tipo === "lista") html += '<ul class="bul">' + b.items.map((i) => "<li>" + fmt(i) + "</li>").join("") + "</ul>";
      else if (b.tipo === "pasos") html += renderPasos(b.items);
      else if (b.tipo === "decir") html += '<blockquote class="decir"><span class="eyebrow">' + ICON.chat + "Qué decir al cliente</span>“" + fmt(b.texto) + "”</blockquote>";
      else if (b.tipo === "nota") html += nota(b.titulo, b.texto);
      else if (b.tipo === "tabla") {
        html += '<div class="rows">' + b.filas.map((f) =>
          '<div class="row"><b>' + fmt(f[0]) + "</b>" +
          f.slice(1).map((c, i) => '<span><span class="k">' + esc(b.columnas[i + 1] || "") + "</span> " + fmt(c) + "</span>").join("") +
          "</div>").join("") + "</div>";
      }
      else if (b.tipo === "titulo") html += '<h4 class="sub-t">' + fmt(b.texto) + "</h4>";
      else if (b.tipo === "img") html += renderImgs(b.img);
      else if (b.tipo === "ver") {
        const e = entry(b.id);
        if (e) html += '<button type="button" class="ver sl" data-goto="' + esc(b.id) + '">' + ICON.help + '<span><span class="k">Si algo falla</span>' + esc(b.texto || e.title) + "</span>" + ICON.next + "</button>";
      }
    });
    flush();
    return html;
  }

  function faqBody(it) {
    return (it.aplica ? '<span class="aplica">' + ICON.phone + "Aplica a: " + esc(it.aplica) + "</span>" : "") +
      (it.respuesta ? "<p>" + fmt(it.respuesta) + "</p>" : "") +
      (it.nota ? nota("Importante", it.nota) : "") +
      renderPasos(it.pasos) + renderImgs(it.img) +
      (it.cierre ? "<p>" + fmt(it.cierre) + "</p>" : "");
  }

  function renderCard(e, toks, open) {
    const card = document.createElement("article");
    card.className = "card" + (open ? " open" : "");
    card.id = e.id;
    const aid = "a-" + e.id;
    card.innerHTML =
      '<h3><button type="button" class="q sl" aria-expanded="' + !!open + '" aria-controls="' + aid + '">' +
        '<span class="txt">' +
        // La etiqueta se muestra en búsquedas, en Soluciones y cuando dice algo propio (ej. "Paso 3").
        ((toks.length || e.report || e.ownMeta) ? '<span class="meta"><b class="' + e.color + '">' + esc(e.meta) + "</b></span>" : "") +
        '<span class="ttl">' + highlight(e.title, toks) + "</span></span>" +
        '<span class="chev">' + ICON.chev + "</span>" +
      "</button></h3>" +
      '<div class="a" id="' + aid + '" role="region" aria-label="' + esc(e.title) + '"><div class="a-clip"><div class="in">' +
        e.body() +
      "</div></div></div>";
    return card;
  }

  /* ---------- Estado ---------- */
  let active = SECCIONES[0].id;
  let filter = "all";
  let query = "";
  const list = $("list"), status = $("status"), input = $("q"), clearBtn = $("clear"), app = $("app");
  const section = () => SECCIONES.find((s) => s.id === active);

  /* ---------- Navigation bar ---------- */
  function renderNav() {
    $("nav").innerHTML = SECCIONES.map((s) =>
      '<li><button type="button" class="nav-i" data-nav="' + s.id + '"' + (s.id === active ? ' aria-current="page"' : "") + ">" +
      '<span class="ind">' + ((s.id === active && ICON[s.icono + "Fill"]) || ICON[s.icono] || ICON.errores) + "</span>" + esc(s.nav) + "</button></li>").join("");
  }

  function go(id, opts) {
    opts = opts || {};
    if (!SECCIONES.some((s) => s.id === id)) return;
    const changed = id !== active;
    active = id;
    if (!opts.keepFilter) filter = "all";
    if (query && !opts.keepQuery) { query = ""; input.value = ""; clearBtn.classList.remove("on"); }
    renderAll(opts.openId);
    if (opts.push !== false) history[changed ? "pushState" : "replaceState"](null, "", "#" + id);
    if (changed && opts.scroll !== false) window.scrollTo({ top: 0 });
  }

  // Tocar el logo: vuelve al inicio limpio (sin búsqueda ni filtros, arriba del todo).
  function goHome() {
    const home = SECCIONES[0].id;
    const changed = active !== home;
    active = home; filter = "all";
    if (query) { query = ""; input.value = ""; clearBtn.classList.remove("on"); }
    renderAll();
    history[changed ? "pushState" : "replaceState"](null, "", "#" + home);
    window.scrollTo({ top: 0, behavior: reduce.matches ? "auto" : "smooth" });
  }

  /* ---------- Filter chips ---------- */
  function renderFilters() {
    const box = $("filters");
    const sec = section();
    if (sec.tipo !== "faq") { box.hidden = true; return; }
    box.hidden = false;
    const opts = [{ id: "all", nombre: "Todos" }].concat(FILTROS.filter((k) => CATEGORIAS[k]).map((k) => ({ id: k, nombre: CATEGORIAS[k].nombre })));
    box.innerHTML = opts.map((o) =>
      '<button type="button" class="fchip sl" data-filter="' + o.id + '" aria-pressed="' + (o.id === filter) + '">' +
      ICON.ok + esc(o.nombre) + "</button>").join("");
  }

  /* ---------- Encabezado ---------- */
  function renderHead() {
    const s = section();
    $("head-e").textContent = s.antetitulo || "";
    $("head-e").hidden = !s.antetitulo;
    $("head-t").textContent = s.titulo;
    $("head-s").textContent = s.subtitulo || "";
  }

  /* ---------- Soluciones rápidas (mosaicos) ---------- */
  function renderQuick() {
    const faqTab = section().tipo === "faq";
    const items = FAQ.filter((f) => f.rapido);
    $("quick").hidden = !faqTab || !items.length;
    $("list-h").hidden = !faqTab;
    $("tiles").innerHTML = items.map((f) => {
      const c = CATEGORIAS[f.cat] || { color: "gris", icono: "check" };
      return '<button type="button" class="tile sl" data-open="' + esc(f.id) + '">' + esc(f.rapido) +
        '<span class="ic ' + c.color + '">' + (ICON[c.icono] || ICON.check) + "</span></button>";
    }).join("");
  }

  function renderAll(openId) {
    app.classList.toggle("searching", !!query);
    // Si se entró con ?q=…, al borrar o cambiar la búsqueda se limpia de la dirección.
    if (location.search && !query) history.replaceState(null, "", location.pathname + location.hash);
    // El buscador solo vive en el home (Soluciones); las demás secciones se leen como contenido.
    $("sbar").hidden = section().tipo !== "faq" && !query;
    $("q-help").hidden = $("sbar").hidden;
    renderNav(); renderHead(); renderQuick(); renderFilters(); render(openId);
  }

  /* ---------- Lista ---------- */
  // Contexto del botón "Pedir ayuda": la respuesta que el asesor tiene abierta.
  let ctx = null;
  const ctxLabel = (e) => e.ownMeta ? e.meta + " · " + e.title : e.title;

  function render(openId) {
    list.innerHTML = "";
    const frag = document.createDocumentFragment();

    if (query) {
      const r = search(query);
      if (!r.strict.length && !r.loose.length) return renderEmpty();
      status.textContent = r.strict.length
        ? plural(r.strict.length, "resultado", "resultados") + " para “" + query.trim() + "”"
        : "Sin coincidencia exacta para “" + query.trim() + "”";
      r.strict.forEach((e) => frag.appendChild(renderCard(e, r.toks, r.strict.length === 1 || e.id === openId)));
      ctx = r.strict.length === 1 ? r.strict[0].id : null;
      if (r.loose.length) {
        const h = document.createElement("p");
        h.className = "eyebrow group-h"; h.textContent = "Quizás te sirva";
        frag.appendChild(h);
        r.loose.forEach((e) => frag.appendChild(renderCard(e, r.toks, false)));
      }
      list.appendChild(frag);
      return;
    }

    const sec = section();
    const items = ENTRIES.filter((e) => e.sec === sec.id && !e.resumen && (sec.tipo !== "faq" || filter === "all" || e.cat === filter));
    if (sec.resumen) {
      status.textContent = "";
      const d = document.createElement("div");
      d.className = "recorrido";
      d.innerHTML = '<h2 class="sec-t">' + esc(sec.resumen.titulo) + "</h2>" + bloques(sec.resumen.bloques);
      frag.appendChild(d);
      const h = document.createElement("h2");
      h.className = "sec-t detail-h"; h.textContent = sec.tituloLista || "Detalle";
      frag.appendChild(h);
    } else {
      status.textContent = (sec.tipo === "faq" ? plural(items.length, "caso", "casos") : plural(items.length, "tema", "temas"));
    }
    items.forEach((e) => frag.appendChild(renderCard(e, [], e.id === openId)));
    ctx = openId && items.some((e) => e.id === openId) ? openId : null;
    list.appendChild(frag);
  }

  function renderEmpty() {
    status.textContent = "Sin resultados";
    const sugs = (CONFIG.sugerencias || []).map((s) =>
      '<button type="button" class="fchip sl" data-sug="' + esc(s) + '">' + ICON.search + esc(s) + "</button>").join("");
    list.innerHTML =
      '<div class="empty"><div class="bubble">' + ICON.search + "</div>" +
      "<h2>No encontramos “" + esc(query.trim()) + "”</h2>" +
      "<p>Prueba con otra palabra o escríbele al grupo de soporte.</p>" +
      (sugs ? '<p class="eyebrow" style="margin-top:20px">Búsquedas frecuentes</p><div class="sugs">' + sugs + "</div>" : "") +
      '<p style="margin-top:20px"><button type="button" class="btn outlined sl" data-report="">' + ICON.wa + "Pedir ayuda por WhatsApp</button></p>" +
      "</div>";
  }

  /* ---------- Buscador ---------- */
  let t;
  input.addEventListener("input", () => {
    clearBtn.classList.toggle("on", !!input.value);
    clearTimeout(t);
    t = setTimeout(() => {
      const was = !!query;
      query = input.value;
      if (!!query !== was) renderAll(); else render();
    }, 90);
  });
  input.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && input.value) { ev.preventDefault(); clearBtn.click(); } });
  clearBtn.addEventListener("click", () => {
    input.value = ""; query = ""; clearBtn.classList.remove("on");
    renderAll(); input.focus();
  });

  /* ---------- Clics (delegados) ---------- */
  document.addEventListener("click", (ev) => {
    const el = (sel) => ev.target.closest(sel);
    let x;
    if ((x = el("[data-home]"))) { ev.preventDefault(); return goHome(); }
    if ((x = el("[data-nav]"))) return go(x.getAttribute("data-nav"));
    if ((x = el("[data-open], [data-goto]"))) return openEntry(x.getAttribute("data-open") || x.getAttribute("data-goto"), true);
    if ((x = el("[data-filter]"))) {
      filter = x.getAttribute("data-filter");
      renderFilters(); render();
      history.replaceState(null, "", "#" + (filter === "all" ? active : filter));
      return;
    }
    if ((x = el(".q"))) {
      const card = x.closest(".card");
      const open = !card.classList.contains("open");
      card.classList.toggle("open", open);
      x.setAttribute("aria-expanded", String(open));
      if (open) { ctx = card.id; history.replaceState(null, "", "#" + card.id); }
      else if (ctx === card.id) ctx = null;
      return;
    }
    if ((x = el(".shot-btn"))) return openLightbox(x);
    if ((x = el("[data-report]"))) {
      const e = entry(x.getAttribute("data-report"));
      return openSheet(e ? e.title : "", x);
    }
    if ((x = el("[data-sug]"))) { input.value = x.getAttribute("data-sug"); input.dispatchEvent(new Event("input")); input.focus(); }
  });

  /* Ripple M3 (se omite con "reducir movimiento") */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.addEventListener("pointerdown", (ev) => {
    if (reduce.matches) return;
    const host = ev.target.closest(".sl, .nav-i");
    if (!host) return;
    const target = host.classList.contains("nav-i") ? host.querySelector(".ind") : host;
    const r = target.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.cssText = "width:" + size + "px;height:" + size + "px;left:" + (ev.clientX - r.left - size / 2) + "px;top:" + (ev.clientY - r.top - size / 2) + "px";
    target.appendChild(s);
    setTimeout(() => s.remove(), 500);
  }, { passive: true });

  let st;
  function snack(msg) {
    const el = $("snack"); el.textContent = msg; el.classList.add("on");
    clearTimeout(st); st = setTimeout(() => el.classList.remove("on"), 2600);
  }

  /* ---------- Diálogos: se cierran con X, Esc, fondo o el "atrás" del celular ---------- */
  const stack = [];
  function openModal(dlg, from) {
    dlg._from = from || document.activeElement;
    dlg.classList.remove("closing");
    dlg.showModal();
    stack.push(dlg);
    history.pushState({ modal: dlg.id }, "");
  }
  function closeTop() {
    const dlg = stack.pop();
    if (!dlg) return;
    const done = () => { dlg.close(); dlg.classList.remove("closing"); dlg.style.transform = ""; dlg._from && dlg._from.focus && dlg._from.focus(); };
    if (dlg.classList.contains("sheet") && !reduce.matches) { dlg.classList.add("closing"); setTimeout(done, 200); }
    else done();
  }
  const requestClose = () => { if (stack.length) history.back(); };
  window.addEventListener("popstate", () => { if (stack.length) closeTop(); else route(true); });
  [$("sheet"), $("lb")].forEach((d) => {
    d.addEventListener("cancel", (ev) => { ev.preventDefault(); requestClose(); });
  });

  /* Bottom sheet de reporte */
  const sheet = $("sheet");
  function openSheet(tema, from) {
    $("sheet-tema").hidden = !tema;
    $("sheet-tema-t").textContent = tema ? "Ya revisaste: " + tema : "";
    $("sheet-msg").textContent = waMessage(tema);
    $("sheet-wa").href = waHref(tema);
    readyToOpen = false;
    if (waGroup()) { $("wahint").classList.remove("warn"); $("wahint").textContent = GROUP_HINT; }
    openModal(sheet, from);
  }
  $("fab").addEventListener("click", (ev) => {
    const card = ctx && $(ctx);
    const e = card && card.classList.contains("open") ? entry(ctx) : null;
    openSheet(e ? ctxLabel(e) : "", ev.currentTarget);
  });
  $("sheet-close").addEventListener("click", requestClose);
  let readyToOpen = false;
  $("sheet-wa").addEventListener("click", (ev) => {
    if (!waGroup()) { setTimeout(requestClose, 300); return; }
    const text = $("sheet-msg").textContent;
    if (readyToOpen || fallbackCopy(text)) {
      if (!readyToOpen) snack("Mensaje copiado. En el grupo, mantén presionado y toca Pegar.");
      readyToOpen = false;
      setTimeout(requestClose, 300);
      return; // el enlace abre el grupo
    }
    // No se pudo copiar: no abrimos el grupo vacío. Se intenta otra vía y, si no, se copia a mano.
    ev.preventDefault();
    readyToOpen = true;
    const hint = $("wahint");
    hint.hidden = false; hint.classList.add("warn");
    hint.textContent = "No pudimos copiar el mensaje. Mantén presionado el texto de arriba, toca Copiar y vuelve a tocar el botón.";
    selectText($("sheet-msg"));
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        hint.classList.remove("warn");
        hint.textContent = "Mensaje copiado. Toca de nuevo el botón para abrir el grupo.";
      }, () => {});
    }
  });
  function selectText(node) {
    try { const r = document.createRange(); r.selectNodeContents(node); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); } catch (e) {}
  }
  sheet.addEventListener("click", (ev) => {
    if (ev.target !== sheet) return;
    const r = sheet.getBoundingClientRect();
    if (ev.clientY < r.top) requestClose();
  });
  // Arrastrar la manija hacia abajo cierra la hoja.
  (function drag() {
    const h = $("sheet-handle"); let y0 = null, dy = 0;
    h.addEventListener("click", requestClose);
    h.addEventListener("pointerdown", (e) => { y0 = e.clientY; dy = 0; h.setPointerCapture(e.pointerId); sheet.style.transition = "none"; });
    h.addEventListener("pointermove", (e) => { if (y0 == null) return; dy = Math.max(0, e.clientY - y0); sheet.style.transform = "translateY(" + dy + "px)"; });
    const end = () => {
      if (y0 == null) return; y0 = null; sheet.style.transition = "";
      if (dy > 80) requestClose(); else sheet.style.transform = "";
    };
    h.addEventListener("pointerup", end); h.addEventListener("pointercancel", end);
  })();

  /* Visor de imagen */
  function openLightbox(btn) {
    $("lb-img").src = btn.getAttribute("data-full");
    $("lb-img").alt = btn.getAttribute("data-alt");
    $("lb-cap").textContent = btn.getAttribute("data-cap");
    openModal($("lb"), btn);
  }
  $("lb-close").addEventListener("click", requestClose);
  $("lb").addEventListener("click", (ev) => { if (ev.target.classList.contains("lb-img")) requestClose(); });

  /* ---------- Scroll: borde del buscador y FAB que se encoge al bajar ---------- */
  const sbar = $("sbar"), fab = $("fab");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    sbar.classList.toggle("stuck", sbar.getBoundingClientRect().top <= 0 && y > 0);
    if (Math.abs(y - lastY) > 6) { fab.classList.toggle("small", y > lastY && y > 120); lastY = y; }
  }, { passive: true });

  /* Abre una respuesta o tema en su sección y lo lleva a la vista */
  function openEntry(id, smooth) {
    const e = entry(id);
    if (!e) return;
    const changed = e.sec !== active;
    active = e.sec; filter = "all";
    if (query) { query = ""; input.value = ""; clearBtn.classList.remove("on"); }
    renderAll(e.resumen ? null : id);
    history[changed && smooth ? "pushState" : "replaceState"](null, "", "#" + (e.resumen ? e.sec : id));
    const card = (!e.resumen && $(id)) || $("resultados");
    requestAnimationFrame(() => {
      card.scrollIntoView({ block: "start", behavior: smooth && !reduce.matches ? "smooth" : "auto" });
    });
  }

  /* ---------- Enlaces directos ----------
     #errores, #quipu-score, #paso-a-paso → abre esa sección (#flujo → Paso a paso)
     #kyc, #conx (o #conexion) → Soluciones con ese filtro
     #dns-samsung, #paso-3-kyc → abre esa respuesta o tema
     ?q=foto                   → llega con la búsqueda hecha (útil desde la PWA de originación) */
  function route(fromHistory) {
    let hash = decodeURIComponent(location.hash.slice(1));
    if (hash === "flujo") hash = "paso-a-paso"; // la sección Flujo ahora vive dentro de Paso a paso
    const q = new URLSearchParams(location.search).get("q");
    if (q) { input.value = q; query = q; clearBtn.classList.add("on"); return renderAll(); }
    if (SECCIONES.some((s) => s.id === hash)) return go(hash, { push: false, scroll: !!fromHistory });
    const cat = hash === "conexion" ? "conx" : hash;
    if (CATEGORIAS[cat]) {
      const faqSec = SECCIONES.find((s) => s.tipo === "faq");
      active = faqSec.id; filter = cat; return renderAll();
    }
    if (entry(hash)) return openEntry(hash, false);
    active = SECCIONES[0].id; filter = "all";
    renderAll();
    if (fromHistory) window.scrollTo({ top: 0 });
  }

  /* ---------- Offline e instalación ---------- */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
  window.addEventListener("offline", () => snack("Sin conexión. La ayuda sigue funcionando."));
  window.addEventListener("online", () => snack("Conexión recuperada"));

  // v1 sin invitación a instalar: se distribuye como enlace fijado en WhatsApp.
  // Se evita también el aviso automático de Chrome ("Agregar a pantalla de inicio").
  window.addEventListener("beforeinstallprompt", (ev) => ev.preventDefault());

  /* ---------- Inicio ---------- */
  $("ver").textContent = "CFA × Quipu · " + CONFIG.version;
  if (waGroup()) {
    $("sheet-lede").textContent = "Te copiamos el mensaje ya armado y te abrimos el grupo de soporte en WhatsApp. Allá lo pegas, completas tus datos y adjuntas una foto o video del problema.";
    $("sheet-wa-t").textContent = "Copiar mensaje y abrir el grupo";
    $("wahint").textContent = GROUP_HINT;
    $("wahint").hidden = false;
  } else $("wahint").hidden = !!waNumber();
  route();
  if (!navigator.onLine) snack("Sin conexión. La ayuda sigue funcionando.");
})();
