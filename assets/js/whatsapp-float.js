/* ============================================================================
   WIDGET DE WHATSAPP FLOTANTE — JS
   
   Crea el botón flotante de WhatsApp con:
   - Aparición retardada (3 segundos)
   - Tooltip con mensaje (se puede cerrar)
   - Se oculta cuando el footer es visible
   - Rastreo de clics integrado con tracking.js
   ========================================================================== */
(function () {
  'use strict';

  var NUM = '524421375118';
  var WA_URL = 'https://wa.me/' + NUM + '?text=' +
    encodeURIComponent('Hola Thania, vi la página de Indicio y me gustaría preguntarte algo.');
  var TOOLTIP_MSG = '¿Tienes dudas? Escríbeme';
  var DELAY_MS = 3000;

  function crear() {
    // No duplicar
    if (document.querySelector('.wa-float')) return;

    var contenedor = document.createElement('div');
    contenedor.className = 'wa-float';
    contenedor.setAttribute('role', 'complementary');
    contenedor.setAttribute('aria-label', 'Contacto por WhatsApp');

    contenedor.innerHTML =
      '<div class="wa-float__tip" role="status">' +
        '<button class="wa-float__cerrar" type="button" aria-label="Cerrar mensaje">✕</button>' +
        TOOLTIP_MSG +
      '</div>' +
      '<a class="wa-float__btn" href="' + WA_URL + '" target="_blank" rel="noopener" ' +
        'aria-label="Escribir por WhatsApp" id="wa-float-btn">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          '<path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .1-1.6-.1-.4-.1-.8-.3-1.4-.5-2.5-1.1-4.1-3.6-4.2-3.7-.1-.2-1-1.3-1-2.5s.6-1.8.9-2.1c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.7 1.8c.1.1.1.3 0 .4l-.2.4-.4.4c-.1.1-.2.3-.1.5.1.2.6 1 1.4 1.7.9.8 1.7 1.1 1.9 1.2s.4.1.5-.1l.8-1c.2-.2.3-.2.6-.1l1.7.8c.2.1.4.2.4.3 0 .1 0 .5-.2 1Z"/>' +
        '</svg>' +
      '</a>';

    document.body.appendChild(contenedor);

    // Mostrar después de un delay
    setTimeout(function () {
      contenedor.classList.add('visible');
    }, DELAY_MS);

    // Cerrar tooltip
    var cerrar = contenedor.querySelector('.wa-float__cerrar');
    var tip = contenedor.querySelector('.wa-float__tip');
    cerrar.addEventListener('click', function () {
      tip.style.display = 'none';
    });

    // Ocultar cuando el footer es visible
    if ('IntersectionObserver' in window) {
      var pie = document.querySelector('.pie, footer');
      if (pie) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              contenedor.classList.add('oculto');
              contenedor.classList.remove('visible');
            } else {
              contenedor.classList.remove('oculto');
              contenedor.classList.add('visible');
            }
          });
        }, { threshold: 0.15 });
        obs.observe(pie);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crear);
  } else {
    crear();
  }
})();
