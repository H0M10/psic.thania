/* ============================================================================
   NIVEL DE DETALLE — lleva a los bocetos las piezas que tenía el sitio real.
     1. Barra de pestañas con scrollspy
     2. Formulario de cotización
     3. Biografía plegable en celular
   Todo se adapta a las secciones que cada boceto realmente tenga.
   ========================================================================== */
(function () {
  'use strict';

  var NUM = '524421375118';
  var WA = 'https://wa.me/' + NUM + '?text=';
  var MSG = encodeURIComponent('Hola Thania, vi tu página web y me gustaría agendar una cita.');

  var IC = {
    inicio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m3 10.5 9-7 9 7"/><path d="M5.5 9v11h13V9"/></svg>',
    persona: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20c0-4.1 3.4-6.5 7.5-6.5s7.5 2.4 7.5 6.5"/></svg>',
    balanza: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v18M5 7h14M7 7l-3 6h6Zm10 0-3 6h6Z"/></svg>',
    corazon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z"/></svg>',
    libro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .1-1.6-.1-.4-.1-.8-.3-1.4-.5-2.5-1.1-4.1-3.6-4.2-3.7-.1-.2-1-1.3-1-2.5s.6-1.8.9-2.1c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.7 1.8c.1.1.1.3 0 .4l-.2.4-.4.4c-.1.1-.2.3-.1.5.1.2.6 1 1.4 1.7.9.8 1.7 1.1 1.9 1.2s.4.1.5-.1l.8-1c.2-.2.3-.2.6-.1l1.7.8c.2.1.4.2.4.3 0 .1 0 .5-.2 1Z"/></svg>',
    abajo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
  };

  /* --------------------------------------------------------------------
     1. BARRA DE PESTAÑAS
     Se arma con las secciones que el boceto realmente tenga, en orden.
     -------------------------------------------------------------------- */
  var CANDIDATAS = [
    ['sobre-mi',          'Sobre mí',    IC.persona],
    ['forense',           'Forense',     IC.balanza],
    ['forense-detalle',   'Forense',     IC.balanza],
    ['terapia',           'Terapia',     IC.corazon],
    ['clinica',           'Terapia',     IC.corazon],
    ['terapia-detalle',   'Terapia',     IC.corazon],
    ['formacion',         'Estudios',    IC.libro],
    ['formacion-detalle', 'Estudios',    IC.libro],
    ['donde',             'Dónde',       IC.pin],
    ['ubicacion',         'Dónde',       IC.pin],
    ['general',           'Dónde',       IC.pin],
    ['informacion',       'Dónde',       IC.pin]
  ];

  function montarBarra() {
    if (document.querySelector('.tb')) return;

    var vistos = {}, elegidas = [];
    CANDIDATAS.forEach(function (c) {
      if (elegidas.length >= 5 || vistos[c[1]]) return;
      var el = document.getElementById(c[0]);
      if (!el) return;
      vistos[c[1]] = true;
      elegidas.push({ id: c[0], txt: c[1], icono: c[2], el: el });
    });
    if (elegidas.length < 2) return;

    var nav = document.createElement('nav');
    nav.className = 'tb';
    nav.setAttribute('aria-label', 'Secciones');

    var mitad = Math.ceil(elegidas.length / 2);
    var html = '';
    elegidas.forEach(function (s, i) {
      if (i === mitad) {
        html += '<a class="tb__wa" href="' + WA + MSG + '" target="_blank" rel="noopener" ' +
                'aria-label="Escribir por WhatsApp">' + IC.wa + '</a>';
      }
      html += '<a class="tb__i" href="#' + s.id + '" data-spy="' + s.id + '">' +
              s.icono + '<span>' + s.txt + '</span></a>';
    });
    nav.innerHTML = html;
    document.body.appendChild(nav);

    // Scrollspy: gana la sección que más superficie ocupa en pantalla
    if (!('IntersectionObserver' in window)) return;
    var pestanas = nav.querySelectorAll('.tb__i[data-spy]');
    var visibles = {};

    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        visibles[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
      });
      var mejor = null, max = 0;
      Object.keys(visibles).forEach(function (id) {
        if (visibles[id] > max) { max = visibles[id]; mejor = id; }
      });
      Array.prototype.forEach.call(pestanas, function (p) {
        var act = p.getAttribute('data-spy') === mejor;
        p.classList.toggle('on', act);
        if (act) p.setAttribute('aria-current', 'true');
        else p.removeAttribute('aria-current');
      });
    }, { threshold: [0, .15, .35, .6, .9], rootMargin: '-70px 0px -45% 0px' });

    elegidas.forEach(function (s) { io.observe(s.el); });
  }

  /* --------------------------------------------------------------------
     2. FORMULARIO DE COTIZACIÓN
     Se coloca justo después del botón de cotización que ya exista.
     -------------------------------------------------------------------- */
  var CAMPOS = [
    ['servicio',    'Tipo de servicio'],
    ['nombre',      'Nombre'],
    ['materia',     'Materia o juzgado'],
    ['descripcion', 'Descripción del asunto'],
    ['plazo',       'Fecha límite']
  ];

  function montarFormulario() {
    if (document.querySelector('.fc')) return;

    // 1. Si ya existe una sección #solicitar con .fc-zona, usarla directamente
    var zona = document.querySelector('#solicitar .fc-zona');
    if (zona) {
      inyectarFormulario(zona);
      return;
    }

    // 2. Si hay un contenedor .cotiza (propuesta-2), usarlo
    var cotiza = document.querySelector('.cotiza');
    if (cotiza) {
      inyectarFormulario(cotiza);
      return;
    }

    // 3. Si ya existe #solicitar pero sin .fc-zona, añadir la zona dentro
    var existente = document.getElementById('solicitar');
    if (existente) {
      var w = existente.querySelector('.w') || existente;
      var fz = document.createElement('div');
      fz.className = 'fc-zona';
      w.appendChild(fz);
      inyectarFormulario(fz);
      return;
    }

    // 4. Crear sección dedicada antes del cierre
    var cierre = document.querySelector('.cierre') || document.querySelector('.fin');
    if (!cierre) return;
    var sec = document.createElement('section');
    // El boceto declara con que fondo va, si no se queda sin tokens de color
    sec.className = 's ' + (document.body.getAttribute('data-fondo-form') || '');
    // El id tiene que ser el mismo al que apuntan los enlaces, si no el
    // ancla no lleva a ningun sitio aunque la seccion exista.
    sec.id = 'cotizacion';
    sec.innerHTML =
      '<div class="w">' +
        '<h2 style="font-family:inherit;font-size:clamp(1.5rem,3.6vw,2.3rem);font-weight:600;margin-bottom:.6rem">Solicita una cotización</h2>' +
        '<p style="opacity:.72;max-width:52ch">Cuéntame el asunto y la fecha límite, y te devuelvo el alcance y el costo. Sin compromiso.</p>' +
        '<div class="fc-zona"></div>' +
      '</div>';
    cierre.parentNode.insertBefore(sec, cierre);
    inyectarFormulario(sec.querySelector('.fc-zona'));
  }

  function inyectarFormulario(contenedor) {
    var caja = document.createElement('div');
    caja.className = 'fc';
    caja.innerHTML =
      '<button class="fc__abre" type="button" aria-expanded="false" aria-controls="fcCuerpo">' +
        '<span>Prefiero llenar un formulario</span>' + IC.abajo +
      '</button>' +
      '<div class="fc__cuerpo" id="fcCuerpo"><div>' +
        '<form novalidate>' +
          '<fieldset>' +
            '<div class="fc__campo"><label for="fcServicio">Tipo de servicio <span class="req">*</span></label>' +
              '<select id="fcServicio" name="servicio" required>' +
                '<option value="">Elige una opción…</option>' +
                '<option>Pericial psicológica en materia familiar</option>' +
                '<option>Metapericial o análisis técnico de un dictamen</option>' +
                '<option>No estoy seguro, necesito orientación</option>' +
              '</select></div>' +
            '<div class="fc__campo"><label for="fcNombre">Tu nombre <span class="req">*</span></label>' +
              '<input type="text" id="fcNombre" name="nombre" required autocomplete="name" placeholder="Cómo te llamas…"></div>' +
            '<div class="fc__campo"><label for="fcMateria">Materia o juzgado</label>' +
              '<input type="text" id="fcMateria" name="materia" placeholder="Por ejemplo: Juzgado Cuarto Familiar…">' +
              '<span class="fc__ayuda">Si aún no hay juzgado asignado, déjalo vacío.</span></div>' +
            '<div class="fc__campo"><label for="fcDesc">Breve descripción <span class="req">*</span></label>' +
              '<textarea id="fcDesc" name="descripcion" required placeholder="Cuéntame en pocas líneas de qué se trata…"></textarea></div>' +
            '<div class="fc__campo"><label for="fcPlazo">¿Hay una fecha límite?</label>' +
              '<input type="text" id="fcPlazo" name="plazo" placeholder="Por ejemplo: audiencia el 12 de octubre…"></div>' +
            '<button class="fc__enviar" type="submit">' + IC.wa + 'Enviar por WhatsApp</button>' +
            '<p class="fc__aviso" role="status" aria-live="polite" hidden></p>' +
          '</fieldset>' +
          '<aside class="fc__vista"><h4>Esto es lo que se enviará</h4><pre></pre></aside>' +
        '</form>' +
      '</div></div>';

    contenedor.appendChild(caja);

    var abre = caja.querySelector('.fc__abre');
    abre.addEventListener('click', function () {
      var ab = caja.classList.toggle('abierto');
      abre.setAttribute('aria-expanded', String(ab));
      abre.querySelector('span').textContent = ab ? 'Ocultar el formulario' : 'Prefiero llenar un formulario';
    });

    var form = caja.querySelector('form');
    var pre = caja.querySelector('.fc__vista pre');
    var aviso = caja.querySelector('.fc__aviso');

    function mensaje() {
      var d = new FormData(form);
      var l = ['Hola Thania, quisiera solicitar una cotización.', ''];
      CAMPOS.forEach(function (c) {
        var v = (d.get(c[0]) || '').toString().trim();
        if (v) l.push('• ' + c[1] + ': ' + v);
      });
      return l.join('\n');
    }
    function pintar() { pre.textContent = mensaje(); }
    form.addEventListener('input', pintar);
    form.addEventListener('change', pintar);
    pintar();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        var malo = form.querySelector(':invalid');
        if (malo) malo.focus();
        form.reportValidity();
        return;
      }
      window.open(WA + encodeURIComponent(mensaje()), '_blank', 'noopener');
      aviso.textContent = 'Se abrió WhatsApp con tus respuestas. Si no se abrió, revisa que el navegador no haya bloqueado la ventana.';
      aviso.hidden = false;
    });
  }

  /* --------------------------------------------------------------------
     3. BIOGRAFÍA PLEGABLE EN CELULAR
     Se pliega a partir del segundo párrafo de la sección "sobre mí".
     -------------------------------------------------------------------- */
  function montarBio() {
    if (document.querySelector('.bio-mas')) return;
    var sec = document.getElementById('sobre-mi');
    if (!sec) return;

    // Todo lo que va después del primer párrafo, dentro del mismo contenedor
    var p1 = sec.querySelector('p:not([class]), p.suave');
    if (!p1) return;
    var cont = p1.parentNode;
    var hijos = Array.prototype.slice.call(cont.children);
    var i = hijos.indexOf(p1);
    var resto = hijos.slice(i + 1).filter(function (n) {
      return /^(P|BLOCKQUOTE|UL|OL)$/.test(n.tagName);
    });
    if (resto.length < 2) return;

    var caja = document.createElement('div');
    caja.className = 'bio-mas';
    var dentro = document.createElement('div');
    caja.appendChild(dentro);
    cont.insertBefore(caja, resto[0]);
    resto.forEach(function (n) { dentro.appendChild(n); });

    var btn = document.createElement('button');
    btn.className = 'bio-mas__btn';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span>Leer más</span>' + IC.abajo;
    caja.parentNode.insertBefore(btn, caja.nextSibling);

    var movil = window.matchMedia('(max-width: 900px)');
    function preparar() {
      // La clase la pone el JS: sin JS el texto se ve completo
      caja.classList.toggle('plegable', movil.matches);
      if (!movil.matches) {
        caja.classList.remove('abierto');
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('span').textContent = 'Leer más';
      }
    }
    preparar();
    if (movil.addEventListener) movil.addEventListener('change', preparar);

    btn.addEventListener('click', function () {
      var ab = caja.classList.toggle('abierto');
      btn.setAttribute('aria-expanded', String(ab));
      btn.querySelector('span').textContent = ab ? 'Leer menos' : 'Leer más';
    });
  }

  function arrancar() { montarBarra(); montarFormulario(); montarBio(); }

  // El bloque _completo.js inyecta secciones; hay que esperar a que termine
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arrancar);
  } else {
    setTimeout(arrancar, 0);
  }
})();
