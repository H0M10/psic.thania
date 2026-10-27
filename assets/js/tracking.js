/* ============================================================================
   TRACKING & CONVERSIONES — INDICIO · Psic. Thania Huerta
   
   Este archivo centraliza todo el rastreo de la página:
   1. Data Layer para Google Tag Manager
   2. Eventos de conversión para Google Ads
   3. Rastreo de clics en WhatsApp, teléfono, formulario y Calendly
   4. Tiempo en página y scroll depth
   5. UTM parsing para atribución de campañas
   ========================================================================== */
(function () {
  'use strict';

  /* ── 0. Data Layer ─────────────────────────────────────────────────────── */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  /* ── 1. UTM Parsing — guarda los parámetros de campaña ──────────────── */
  function parseUTMs() {
    var params = new URLSearchParams(window.location.search);
    var utms = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(function (k) {
      var v = params.get(k);
      if (v) utms[k] = v;
    });
    if (Object.keys(utms).length > 0) {
      // Guardar en sessionStorage para atribución posterior
      try { sessionStorage.setItem('indicio_utms', JSON.stringify(utms)); } catch (e) {}
      // Guardar gclid por separado (dura 90 días para Google Ads)
      if (utms.gclid) {
        try {
          var exp = new Date(); exp.setDate(exp.getDate() + 90);
          document.cookie = '_gcl_aw=' + utms.gclid + ';expires=' + exp.toUTCString() + ';path=/;SameSite=Lax';
        } catch (e) {}
      }
    }
    return utms;
  }
  var utmData = parseUTMs();

  /* ── 2. Eventos de conversión ──────────────────────────────────────────── */
  // Función helper para disparar eventos
  function trackEvent(eventName, params) {
    params = params || {};
    // Google Analytics 4
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
    // Data Layer para GTM
    window.dataLayer.push(Object.assign({ event: eventName }, params));
  }

  /* ── 3. Rastreo de clics en WhatsApp ───────────────────────────────────── */
  function trackWhatsAppClicks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="wa.me"]');
      if (!link) return;

      trackEvent('whatsapp_click', {
        event_category: 'contacto',
        event_label: link.textContent.trim().substring(0, 50),
        link_url: link.href,
        page_section: getSectionName(link),
        conversion_type: 'whatsapp_lead'
      });

      // Google Ads Conversion (se configura después con el ID real)
      if (typeof gtag === 'function' && window.GADS_CONVERSION_ID) {
        gtag('event', 'conversion', {
          send_to: window.GADS_CONVERSION_ID + '/' + (window.GADS_WA_LABEL || ''),
          value: 1.0,
          currency: 'MXN'
        });
      }
    });
  }

  /* ── 4. Rastreo de clics en teléfono ───────────────────────────────────── */
  function trackPhoneClicks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="tel:"]');
      if (!link) return;

      trackEvent('phone_click', {
        event_category: 'contacto',
        event_label: link.textContent.trim(),
        phone_number: link.href.replace('tel:', ''),
        page_section: getSectionName(link),
        conversion_type: 'phone_lead'
      });

      if (typeof gtag === 'function' && window.GADS_CONVERSION_ID) {
        gtag('event', 'conversion', {
          send_to: window.GADS_CONVERSION_ID + '/' + (window.GADS_PHONE_LABEL || ''),
          value: 1.0,
          currency: 'MXN'
        });
      }
    });
  }

  /* ── 5. Rastreo del formulario de cotización ───────────────────────────── */
  function trackFormSubmissions() {
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('.fc form, .contacto-form');
      if (!form) return;

      var formData = new FormData(form);
      var nombre = (formData.get('nombre') || '').toString().trim();

      trackEvent('form_submit', {
        event_category: 'lead',
        event_label: 'cotizacion_formulario',
        form_name: nombre ? 'con_nombre' : 'sin_nombre',
        page_section: getSectionName(form),
        conversion_type: 'form_lead'
      });

      if (typeof gtag === 'function' && window.GADS_CONVERSION_ID) {
        gtag('event', 'conversion', {
          send_to: window.GADS_CONVERSION_ID + '/' + (window.GADS_FORM_LABEL || ''),
          value: 5.0,
          currency: 'MXN'
        });
      }
    });
  }

  /* ── 6. Rastreo de navegación por sección ──────────────────────────────── */
  function trackSectionViews() {
    if (!('IntersectionObserver' in window)) return;

    var secciones = document.querySelectorAll('section[id], .hero[id], .terapia[id]');
    var vistas = {};

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !vistas[entry.target.id]) {
          vistas[entry.target.id] = true;
          trackEvent('section_view', {
            event_category: 'engagement',
            event_label: entry.target.id,
            section_name: entry.target.id
          });
        }
      });
    }, { threshold: 0.3 });

    secciones.forEach(function (sec) { obs.observe(sec); });
  }

  /* ── 7. Scroll Depth Tracking ──────────────────────────────────────────── */
  function trackScrollDepth() {
    var marcas = [25, 50, 75, 90, 100];
    var alcanzadas = {};

    function check() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      var pct = Math.round((scrollTop / docHeight) * 100);

      marcas.forEach(function (marca) {
        if (pct >= marca && !alcanzadas[marca]) {
          alcanzadas[marca] = true;
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            event_label: marca + '%',
            scroll_percentage: marca
          });
        }
      });
    }

    var timeout;
    window.addEventListener('scroll', function () {
      clearTimeout(timeout);
      timeout = setTimeout(check, 200);
    }, { passive: true });
  }

  /* ── 8. Tiempo en página ───────────────────────────────────────────────── */
  function trackTimeOnPage() {
    var marcas = [30, 60, 120, 300]; // segundos
    var inicio = Date.now();

    marcas.forEach(function (seg) {
      setTimeout(function () {
        trackEvent('time_on_page', {
          event_category: 'engagement',
          event_label: seg + '_segundos',
          time_seconds: seg
        });
      }, seg * 1000);
    });

    // Al salir, enviar tiempo total
    window.addEventListener('beforeunload', function () {
      var total = Math.round((Date.now() - inicio) / 1000);
      trackEvent('page_exit', {
        event_category: 'engagement',
        event_label: 'tiempo_total',
        time_on_page_seconds: total
      });
    });
  }

  /* ── 9. Rastreo de clics en botones de mapa ────────────────────────────── */
  function trackMapClicks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="google.com/maps"], a[href*="waze.com"]');
      if (!link) return;

      var plataforma = link.href.indexOf('waze') > -1 ? 'waze' : 'google_maps';
      trackEvent('directions_click', {
        event_category: 'engagement',
        event_label: plataforma,
        platform: plataforma
      });
    });
  }

  /* ── 10. Rastreo de enlaces a secciones (CTA clicks) ───────────────────── */
  function trackCTAClicks() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.b, .puerta, .acc a');
      if (!btn) return;
      // No rastrear si ya es WhatsApp/tel (se rastrea aparte)
      if (btn.href && (btn.href.indexOf('wa.me') > -1 || btn.href.indexOf('tel:') === 0)) return;

      trackEvent('cta_click', {
        event_category: 'engagement',
        event_label: btn.textContent.trim().substring(0, 60),
        cta_url: btn.href || '',
        page_section: getSectionName(btn)
      });
    });
  }

  /* ── 11. Rastreo de Calendly (si se integra) ───────────────────────────── */
  function trackCalendly() {
    // Escuchar eventos de Calendly embebido
    window.addEventListener('message', function (e) {
      if (!e.data || !e.data.event) return;

      if (e.data.event === 'calendly.event_scheduled') {
        trackEvent('calendly_scheduled', {
          event_category: 'lead',
          event_label: 'cita_agendada',
          conversion_type: 'calendly_lead'
        });

        if (typeof gtag === 'function' && window.GADS_CONVERSION_ID) {
          gtag('event', 'conversion', {
            send_to: window.GADS_CONVERSION_ID + '/' + (window.GADS_CALENDLY_LABEL || ''),
            value: 10.0,
            currency: 'MXN'
          });
        }
      }

      if (e.data.event === 'calendly.event_type_viewed') {
        trackEvent('calendly_viewed', {
          event_category: 'engagement',
          event_label: 'calendario_visto'
        });
      }
    });
  }

  /* ── Utilidades ────────────────────────────────────────────────────────── */
  function getSectionName(el) {
    var sec = el.closest('section[id], header[id], footer, .terapia, .pie');
    if (!sec) return 'desconocido';
    return sec.id || sec.className.split(' ')[0] || 'footer';
  }

  /* ── Inicializar todo ──────────────────────────────────────────────────── */
  function init() {
    trackWhatsAppClicks();
    trackPhoneClicks();
    trackFormSubmissions();
    trackSectionViews();
    trackScrollDepth();
    trackTimeOnPage();
    trackMapClicks();
    trackCTAClicks();
    trackCalendly();

    // Evento de page load con datos de campaña
    trackEvent('page_loaded', {
      event_category: 'pageview',
      event_label: document.title,
      page_url: window.location.href,
      utm_source: utmData.utm_source || '(directo)',
      utm_medium: utmData.utm_medium || '(ninguno)',
      utm_campaign: utmData.utm_campaign || '(ninguna)'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
