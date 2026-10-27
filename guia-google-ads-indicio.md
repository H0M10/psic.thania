# 🎯 GUÍA COMPLETA: Google Ads + Integraciones para INDICIO

**Página:** [psic.thania.com.mx](https://psic.thania.com.mx/)
**Negocio:** INDICIO · Psicología forense y psicoterapia · Psic. Thania Huerta
**Ubicación:** Col. La Joya, Santiago de Querétaro, Qro.
**Fecha:** 26 de octubre de 2026

---

## 📋 RESUMEN DE LO QUE YA SE INTEGRÓ EN LA PÁGINA

> [!IMPORTANT]
> Estos archivos ya están creados e integrados. Solo necesitas configurar las cuentas externas y reemplazar los IDs placeholder.

### Archivos nuevos creados:
| Archivo | Función |
|---------|---------|
| [`tracking.js`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/assets/js/tracking.js) | Rastreo centralizado de conversiones, scroll, tiempo, UTMs |
| [`whatsapp-float.js`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/assets/js/whatsapp-float.js) | Widget flotante de WhatsApp con tooltip |
| [`whatsapp-float.css`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/assets/css/whatsapp-float.css) | Estilos del widget flotante |

### Archivos modificados:
| Archivo | Cambios |
|---------|---------|
| [`index.html`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/index.html) | GA4, Google Ads tag, Schema.org, Open Graph, meta SEO, Clarity |
| [`robots.txt`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/robots.txt) | Permitir AdsBot-Google explícitamente |
| [`sitemap.xml`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/sitemap.xml) | Todas las secciones con lastmod |
| [`CNAME`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/CNAME) | Conflicto de merge resuelto |

### Lo que ya rastrea automáticamente `tracking.js`:
- ✅ Clics en WhatsApp (todos los botones y el widget flotante)
- ✅ Clics en teléfono
- ✅ Envío de formulario de cotización
- ✅ Scroll depth (25%, 50%, 75%, 90%, 100%)
- ✅ Tiempo en página (30s, 60s, 2min, 5min)
- ✅ Vistas de cada sección
- ✅ Clics en CTAs (botones)
- ✅ Clics en rutas (Google Maps, Waze)
- ✅ Eventos de Calendly (cuando se integre)
- ✅ Parseo de UTMs y gclid para atribución de campañas
- ✅ Disparo de conversiones de Google Ads

---

## FASE 1: CREAR CUENTAS (30 min)

### 1.1 — Crear cuenta de Google Analytics 4

1. Ve a **[analytics.google.com](https://analytics.google.com/)**
2. Inicia sesión con la cuenta de Gmail de Thania (o crea una nueva)
3. Clic en **"Empezar a medir"**
4. Nombre de la cuenta: `INDICIO - Thania Huerta`
5. Nombre de la propiedad: `psic.thania.com.mx`
6. Zona horaria: **México (GMT-6)**
7. Moneda: **Peso mexicano (MXN)**
8. Categoría: **Salud → Salud mental**
9. En **Data Streams** → **Web** → URL: `psic.thania.com.mx`
10. **COPIA el ID de medición** — se ve como `G-ABC123XYZ`

> [!TIP]
> Activa "Enhanced Measurement" para rastrear automáticamente scrolls, outbound clicks, búsquedas y descargas.

### 1.2 — Pegar el ID en la página

Abre [`index.html`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/index.html) y busca `G-XXXXXXXXXX` (aparece **2 veces**). Reemplázalo con tu ID real:

```diff
-<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
+<script async src="https://www.googletagmanager.com/gtag/js?id=G-TU-ID-REAL"></script>
```

```diff
-  gtag('config', 'G-XXXXXXXXXX', {
+  gtag('config', 'G-TU-ID-REAL', {
```

### 1.3 — Crear cuenta de Google Ads

1. Ve a **[ads.google.com](https://ads.google.com/)**
2. Clic en **"Empezar ahora"**
3. **IMPORTANTE:** Al preguntar el objetivo, selecciona **"Crear una cuenta sin una campaña"** (abajo a la izquierda, texto pequeño)
4. País: **México**
5. Zona horaria: **México (GMT-6)**
6. Moneda: **Peso mexicano (MXN)**
7. Una vez dentro, ve a **Herramientas y configuración** → **Conversiones**
8. **COPIA tu ID de conversión** — se ve como `AW-123456789`

### 1.4 — Pegar el ID de Google Ads en la página

Busca `AW-XXXXXXXXXXX` en [`index.html`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/index.html) y reemplázalo:

```diff
-  gtag('config', 'AW-XXXXXXXXXXX');
+  gtag('config', 'AW-TU-ID-REAL');
```

```diff
-  window.GADS_CONVERSION_ID = 'AW-XXXXXXXXXXX';
+  window.GADS_CONVERSION_ID = 'AW-TU-ID-REAL';
```

---

## FASE 2: CONFIGURAR CONVERSIONES EN GOOGLE ADS (45 min)

### 2.1 — Crear las 4 conversiones

En **Google Ads → Herramientas → Conversiones → + Nueva acción de conversión**:

#### Conversión 1: WhatsApp Click
| Campo | Valor |
|-------|-------|
| Categoría | Contacto |
| Nombre | WhatsApp Click |
| Valor | $50 MXN (cada clic) |
| Modelo de atribución | Basado en datos |
| Ventana de conversión | 30 días |

#### Conversión 2: Llamada Telefónica
| Campo | Valor |
|-------|-------|
| Categoría | Contacto |
| Nombre | Llamada Telefónica |
| Valor | $50 MXN |
| Modelo de atribución | Basado en datos |
| Ventana de conversión | 30 días |

#### Conversión 3: Formulario Enviado
| Campo | Valor |
|-------|-------|
| Categoría | Envío de formulario de contacto |
| Nombre | Formulario Cotización |
| Valor | $100 MXN |
| Modelo de atribución | Basado en datos |
| Ventana de conversión | 30 días |

#### Conversión 4: Cita Agendada (Calendly)
| Campo | Valor |
|-------|-------|
| Categoría | Reserva/Cita |
| Nombre | Cita Agendada Calendly |
| Valor | $200 MXN |
| Modelo de atribución | Basado en datos |
| Ventana de conversión | 30 días |

### 2.2 — Pegar las etiquetas de conversión

Cada conversión te da una **etiqueta** (label) como `AbCdEfGh`. Pégalas en [`index.html`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/index.html):

```diff
-  window.GADS_WA_LABEL = '';
+  window.GADS_WA_LABEL = 'AbCdEfGh';  // Tu label de WhatsApp

-  window.GADS_PHONE_LABEL = '';
+  window.GADS_PHONE_LABEL = 'IjKlMnOp';  // Tu label de teléfono

-  window.GADS_FORM_LABEL = '';
+  window.GADS_FORM_LABEL = 'QrStUvWx';  // Tu label de formulario

-  window.GADS_CALENDLY_LABEL = '';
+  window.GADS_CALENDLY_LABEL = 'YzAbCdEf';  // Tu label de Calendly
```

---

## FASE 3: VINCULAR GA4 CON GOOGLE ADS (10 min)

1. Ve a **Google Ads → Herramientas → Cuentas vinculadas**
2. Busca **Google Analytics (GA4)** → Clic en **Vincular**
3. Selecciona la propiedad `psic.thania.com.mx`
4. Activa **"Importar datos de Analytics"**
5. Confirma

> [!NOTE]
> Esto te permite ver en Google Ads: tasa de rebote, páginas por sesión, duración de sesión, y crear audiencias de remarketing basadas en comportamiento.

---

## FASE 4: CREAR LA CAMPAÑA DE GOOGLE ADS (1-2 horas)

### 4.1 — Configuración general

| Campo | Valor |
|-------|-------|
| Tipo de campaña | **Búsqueda (Search)** |
| Objetivo | **Leads** |
| Presupuesto diario | **$67 MXN** (~$2,000/mes) |
| Estrategia de puja | **Maximizar conversiones** |
| Red de búsqueda | ✅ Activada |
| Red de Display | ❌ **Desactivada** |
| Ubicación | **Estado de Querétaro** |
| Tipo de ubicación | **Personas EN esta ubicación** (no "interesadas en") |
| Idioma | **Español** |
| Rotación de anuncios | **Optimizar** |

### 4.2 — Grupos de anuncios

Crea **3 grupos de anuncios** separados:

---

#### Grupo 1: Terapia Adolescentes

**Palabras clave positivas:**
```
"terapia adolescentes querétaro"
"psicólogo para adolescentes querétaro"
"terapia cognitivo conductual querétaro"
"psicoterapia adolescentes"
"psicóloga para jóvenes querétaro"
"terapia para jóvenes querétaro"
"ansiedad adolescentes querétaro"
"depresión adolescentes querétaro"
"psicóloga juvenil querétaro"
"terapia emocional adolescentes"
terapia +adolescentes +querétaro
psicólogo +jóvenes +querétaro
```

**Anuncio (Responsive Search Ad):**

| Elemento | Texto |
|----------|-------|
| Titular 1 | Terapia para Adolescentes \| Qro |
| Titular 2 | Enfoque Cognitivo Conductual |
| Titular 3 | Psic. Thania Huerta \| La Joya |
| Titular 4 | Ansiedad y Depresión Juvenil |
| Titular 5 | Primera Sesión Sin Compromiso |
| Titular 6 | Cédula Profesional Verificable |
| Titular 7 | Agenda Tu Cita por WhatsApp |
| Titular 8 | Consultorio Col. La Joya, Qro |
| Titular 9 | Tratamiento Basado en Evidencia |
| Titular 10 | ¡Escríbenos Hoy Mismo! |
| Descripción 1 | Terapia enfocada en adolescentes y juventudes. Ansiedad, depresión, autoestima. Enfoque cognitivo conductual basado en evidencia. |
| Descripción 2 | Psicóloga certificada con maestría en psicoterapia. Consultorio en Col. La Joya, Querétaro. Escríbenos por WhatsApp. |
| Descripción 3 | Atención personalizada para adolescentes. Regulación emocional, habilidades sociales, presión académica. Agenda tu cita. |
| Descripción 4 | Psic. Thania Huerta. Cédula 14661976. Lunes a viernes 9-14 y 16-21. Sábados 9-13. |
| URL final | https://psic.thania.com.mx/#terapia |
| Ruta 1 | terapia |
| Ruta 2 | adolescentes |

---

#### Grupo 2: Psicología Forense / Peritajes

**Palabras clave positivas:**
```
"peritaje psicológico querétaro"
"psicología forense querétaro"
"perito psicólogo querétaro"
"peritaje guarda y custodia"
"peritaje familiar querétaro"
"evaluación psicológica forense"
"dictamen psicológico"
"perito en psicología"
"psicóloga forense querétaro"
"metapericial psicológico"
peritaje +psicológico +querétaro
```

**Anuncio:**

| Elemento | Texto |
|----------|-------|
| Titular 1 | Peritajes Psicológicos \| Qro |
| Titular 2 | Materia Familiar y Forense |
| Titular 3 | Psic. Thania Huerta \| Perito |
| Titular 4 | Guarda, Custodia y Convivencia |
| Titular 5 | Cotización Sin Compromiso |
| Titular 6 | Certificada en Psicología Forense |
| Titular 7 | Para Abogados y Particulares |
| Titular 8 | Análisis de Contexto Incluido |
| Titular 9 | Metapericiales Disponibles |
| Titular 10 | Solicita Tu Cotización Hoy |
| Descripción 1 | Peritajes psicológicos en materia familiar: guarda y custodia, régimen de convivencia, competencias parentales. Perspectiva de derechos humanos. |
| Descripción 2 | Psicóloga certificada en análisis de contexto e investigación criminal. Metapericiales, asesorías y dictámenes. Cotización sin compromiso. |
| Descripción 3 | Servicios para abogados, juzgados y particulares. 7 supuestos en materia familiar. Enfoque diferencial con perspectiva de género e infancia. |
| Descripción 4 | INDICIO · Psicología forense. Cédula 14661976. Consejo certificador 25-08-63. Querétaro, Qro. |
| URL final | https://psic.thania.com.mx/#forense |
| Ruta 1 | peritajes |
| Ruta 2 | forense |

---

#### Grupo 3: Psicóloga General Querétaro (captación amplia)

**Palabras clave positivas:**
```
"psicóloga querétaro"
"psicólogo querétaro"
"consultorio psicológico querétaro"
"terapia psicológica querétaro"
"psicoterapia querétaro"
"mejor psicóloga querétaro"
"psicóloga cerca de mí"
"consulta psicológica querétaro"
psicóloga +querétaro +consulta
```

**Anuncio:**

| Elemento | Texto |
|----------|-------|
| Titular 1 | Psicóloga en Querétaro |
| Titular 2 | INDICIO · Psic. Thania Huerta |
| Titular 3 | Col. La Joya \| Agenda Hoy |
| Titular 4 | Terapia y Peritajes |
| Titular 5 | Escríbenos por WhatsApp |
| Descripción 1 | Atención psicológica especializada en adolescentes y psicología forense. Terapia cognitivo conductual. Consultorio en Col. La Joya, Querétaro. |
| Descripción 2 | Psic. Thania Huerta. Peritajes en materia familiar y psicoterapia para jóvenes. Cédula profesional 14661976. Contáctanos hoy. |
| URL final | https://psic.thania.com.mx/ |
| Ruta 1 | psicologa |
| Ruta 2 | queretaro |

---

### 4.3 — Palabras clave NEGATIVAS (para todos los grupos)

```
gratis
pdf
ejemplo
"qué es"
carrera
estudiar
licenciatura
universidad
psiquiatra
psiquiatría
medicamentos
receta
urgencias
emergencia
DIF
gobierno
becas
salario
sueldo
trabajo
vacante
empleo
definición
investigación
tesis
curso online
certificación online
```

### 4.4 — Extensiones de anuncio (Ad Extensions)

Configura **todas** estas extensiones para mejorar el CTR:

#### Extensiones de enlace de sitio (Sitelinks)
| Título | Descripción | URL |
|--------|-------------|-----|
| Peritajes Psicológicos | Guarda y custodia, convivencia, competencias parentales | #forense |
| Terapia Adolescentes | Ansiedad, depresión, autoestima, habilidades sociales | #terapia |
| Conoce a Thania | Formación, experiencia y enfoque terapéutico | #sobre-mi |
| Cómo Llegar | Col. La Joya, Querétaro. Ver mapa y rutas | #donde |

#### Extensión de llamada
- Número: **442 137 5118**
- País: México

#### Extensión de ubicación
- Dirección: Calle Mauricio Garcés 102, Col. La Joya, Santiago de Querétaro

#### Extensiones de texto destacado (Callouts)
- Cédula Profesional Verificable
- Tratamiento Basado en Evidencia
- WhatsApp Disponible
- Lunes a Sábado
- Consultorio Propio

#### Extensiones de fragmento estructurado
- Encabezado: **Servicios**
- Valores: Peritajes psicológicos, Terapia adolescentes, Regulación emocional, Metapericiales, Análisis de contexto

---

## FASE 5: HERRAMIENTAS GRATUITAS EXTRA (opcionales pero recomendadas)

### 5.1 — Microsoft Clarity (Heatmaps gratis)

1. Ve a **[clarity.microsoft.com](https://clarity.microsoft.com/)**
2. Crea cuenta con el email de Thania
3. Añade proyecto → URL: `psic.thania.com.mx`
4. Copia tu **Clarity ID**
5. En [`index.html`](file:///c:/Users/hanni/Desktop/THPSICOLOGOA/index.html), descomenta el bloque de Clarity y reemplaza `CLARITY-ID`:

```html
<!-- Descomenta este bloque y pon tu ID -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script","TU-CLARITY-ID");
</script>
```

> [!TIP]
> Clarity te da **grabaciones de sesión** y **heatmaps** gratis. Puedes ver exactamente dónde hacen clic los visitantes y cómo se mueven por la página. Es invaluable para optimizar la landing page de los ads.

### 5.2 — Google Search Console

1. Ve a **[search.google.com/search-console](https://search.google.com/search-console/)**
2. Agrega propiedad → `psic.thania.com.mx`
3. Verifica con el método DNS (agrega un registro TXT en tu proveedor de dominio)
4. Envía el sitemap: `https://psic.thania.com.mx/sitemap.xml`

### 5.3 — Google Business Profile (Perfil de Negocio)

> [!IMPORTANT]
> Esto es **CRÍTICO** para aparecer en Google Maps y en los resultados locales.

1. Ve a **[business.google.com](https://business.google.com/)**
2. Crea un perfil de negocio:
   - Nombre: `INDICIO · Psicología forense y psicoterapia`
   - Categoría principal: `Psicólogo`
   - Categorías adicionales: `Psicoterapeuta`, `Psicólogo forense`
   - Dirección: Calle Mauricio Garcés 102, Col. La Joya
   - Teléfono: 442 137 5118
   - Sitio web: `https://psic.thania.com.mx`
   - Horarios: Los que ya tienes
3. Verifica (por correo postal generalmente)
4. Sube fotos del consultorio
5. **Vincula este perfil con Google Ads** para mostrar extensiones de ubicación

---

## FASE 6: INTEGRACIONES FUTURAS (Ideas adicionales)

### 6.1 — Calendly (Agendar citas online)

1. Crea cuenta en **[calendly.com](https://calendly.com/)** (gratis)
2. Configura un tipo de evento: "Sesión inicial — 30 min"
3. Conecta tu Google Calendar
4. Para embeber en la página, agrega este código donde quieras el botón:

```html
<!-- Widget de Calendly (ya funciona con tracking.js) -->
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
<a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/THANIA-URL'});return false;" 
   class="b b--mostaza" id="btn-calendly">
  Agendar una cita
</a>
```

> El tracking.js ya escucha los eventos de Calendly automáticamente.

### 6.2 — HubSpot CRM (gratis)

1. Crea cuenta en **[hubspot.com](https://www.hubspot.com/)** → CRM gratuito
2. Ve a **Marketing → Formularios → Crear formulario**
3. Campos: Nombre, Teléfono, Email, Motivo de consulta
4. Copia el código embed
5. Para conectar el formulario actual al CRM, se necesitaría modificar `detalle.js` para enviar datos vía API

**Alternativa más simple:** Usa **Google Forms** embebido en la sección de cotización.

### 6.3 — Zapier/Make (Automatizaciones)

Flujos sugeridos:
- **Nuevo contacto → Email de confirmación** al cliente
- **Cita agendada en Calendly → Recordatorio 24h antes** por email
- **Formulario enviado → Notificación** en WhatsApp a Thania
- **Nuevo contacto → Agregar a Google Sheets** (para dashboard simple)

### 6.4 — Pixel de Meta/Facebook (si quiere hacer ads en Instagram)

Si en el futuro Thania quiere anunciarse en Instagram o Facebook:
```html
<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'TU-PIXEL-ID');
  fbq('track', 'PageView');
</script>
```

### 6.5 — Testimonios / Reseñas

Agregar una sección de testimonios puede mejorar la conversión un 30-40%. Se podría:
- Pedir reseñas en Google Business
- Agregar una sección en la página con testimonios anonimizados
- Incluir el rating de Google en Schema.org

### 6.6 — Blog / Contenido SEO

Para mejorar el SEO orgánico a largo plazo:
- Crear una sección `/blog/` con artículos sobre:
  - "¿Cuándo llevar a mi hijo adolescente al psicólogo?"
  - "¿Qué es un peritaje psicológico en materia familiar?"
  - "Terapia cognitivo conductual: qué esperar de tu primera sesión"
  - "Ansiedad en adolescentes: señales y cómo ayudar"
- Cada artículo atrae tráfico orgánico y refuerza las palabras clave

---

## FASE 7: TESTING Y VERIFICACIÓN (Checklist)

### Antes de activar la campaña:

- [ ] **GA4 funciona:** Ve a analytics.google.com → Tiempo Real. Abre la página en otra pestaña. Debe aparecer 1 usuario activo.
- [ ] **Google Ads tag funciona:** Instala la extensión [Google Tag Assistant](https://tagassistant.google.com/) y verifica que el tag se dispara.
- [ ] **Conversiones se disparan:** Haz clic en WhatsApp, verifica que el evento `whatsapp_click` aparece en GA4 Tiempo Real → Eventos.
- [ ] **Widget WhatsApp aparece:** Espera 3 segundos después de cargar la página. Debe aparecer el botón verde flotante.
- [ ] **Schema.org válido:** Pega la URL en [Rich Results Test](https://search.google.com/test/rich-results) de Google.
- [ ] **Open Graph correcto:** Pega la URL en [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
- [ ] **Formulario funciona:** Llena el formulario de cotización y verifica que abre WhatsApp.
- [ ] **Velocidad de carga:** Prueba en [PageSpeed Insights](https://pagespeed.web.dev/). Objetivo: >80 en móvil.
- [ ] **Mobile friendly:** Prueba en [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly).
- [ ] **robots.txt:** Verifica que `https://psic.thania.com.mx/robots.txt` carga correctamente.
- [ ] **sitemap.xml:** Verifica que `https://psic.thania.com.mx/sitemap.xml` carga correctamente.

### Prueba de campaña (con presupuesto bajo):

1. Activa la campaña con **$30 MXN/día** por 3 días
2. Genera **10-20 clics**
3. Verifica en GA4 que:
   - Los clics de Ads aparecen con `utm_source = google` y `utm_medium = cpc`
   - Las conversiones se registran
4. Verifica en Google Ads que:
   - Las conversiones aparecen en la columna "Conversiones"
   - El "Estado de conversión" muestra "Registrando conversiones"
5. Si todo funciona, sube el presupuesto a **$67 MXN/día**

---

## FASE 8: OPTIMIZACIÓN POST-LANZAMIENTO (Semanas 2-4)

### Semana 2:
- [ ] Revisar términos de búsqueda reales → agregar negativos
- [ ] Pausar palabras clave con CTR < 1%
- [ ] Revisar Quality Score → mejorar anuncios con QS < 5

### Semana 3:
- [ ] Revisar Clarity: ¿dónde se quedan los visitantes?
- [ ] A/B test: probar nuevos titulares
- [ ] Revisar horarios de conversión → programar anuncios

### Semana 4:
- [ ] Primer reporte para Thania
- [ ] Revisar CPA (costo por adquisición)
- [ ] Ajustar presupuesto según resultados
- [ ] Considerar remarketing si hay >500 visitantes/mes

---

## 📊 MÉTRICAS CLAVE A MONITOREAR

| Métrica | Dónde verla | Objetivo |
|---------|-------------|----------|
| Clics | Google Ads | >200/mes |
| CTR | Google Ads | >3% |
| CPC | Google Ads | <$10 MXN |
| Conversiones | Google Ads + GA4 | >15/mes |
| Costo por conversión | Google Ads | <$130 MXN |
| Tasa de rebote | GA4 | <60% |
| Tiempo en página | GA4 | >1:30 min |
| Scroll 75%+ | GA4 (tracking.js) | >30% |
| WhatsApp clicks | GA4 (tracking.js) | >20/mes |

---

## 💡 IDEAS EXTRA PARA MAXIMIZAR RESULTADOS

### Corto plazo (esta semana):
1. **Landing page dedicada** para cada grupo de anuncios — en vez de enviar todo a `#terapia` o `#forense`, crear versiones específicas de la página que hablen directamente al buscador
2. **Número de teléfono con seguimiento** — Google Ads puede asignar un número de rastreo para medir llamadas reales
3. **Extensión de precios** — Mostrar el rango de precios en el anuncio

### Mediano plazo (mes 2):
4. **Campaña de Display remarketing** — Mostrar anuncios de banner a quienes ya visitaron la página
5. **Campaña de YouTube** — Video corto de 15 segundos presentando INDICIO
6. **Google Business optimizado** — Publicaciones semanales, fotos, responder reseñas

### Largo plazo (mes 3+):
7. **Blog SEO** — 2 artículos/mes para tráfico orgánico
8. **Google Ads Smart Bidding** — Cuando haya >30 conversiones/mes, cambiar a "CPA objetivo"
9. **Expansión geográfica** — Si el presupuesto lo permite, expandir a "Querétaro + alrededores"

---

## 📁 ESTRUCTURA DE ARCHIVOS FINAL

```
THPSICOLOGOA/
├── index.html                    ← ✅ Actualizado (GA4, Ads, Schema, OG, Clarity)
├── robots.txt                    ← ✅ Actualizado (AdsBot permitido)
├── sitemap.xml                   ← ✅ Actualizado (todas las secciones)
├── CNAME                         ← ✅ Arreglado (conflicto de merge)
├── assets/
│   ├── css/
│   │   ├── estilo.css
│   │   ├── detalle.css
│   │   ├── nav.css
│   │   └── whatsapp-float.css    ← ✅ NUEVO
│   ├── js/
│   │   ├── mapa.js
│   │   ├── nav.js
│   │   ├── detalle.js
│   │   ├── rv.js
│   │   ├── tracking.js           ← ✅ NUEVO
│   │   └── whatsapp-float.js     ← ✅ NUEVO
│   └── img/
└── .agents/
```

---

> [!CAUTION]
> **No olvides desplegar los cambios a GitHub Pages después de hacer los reemplazos de IDs.** Usa `git add .`, `git commit -m "Integración GA4 + Google Ads + tracking"`, `git push`.
