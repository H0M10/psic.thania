/* ============================================================================
   Barra de navegación superior, compartida.
   Se arma leyendo las secciones que cada boceto realmente tiene, así que
   ninguno declara la lista dos veces. Se tiñe con las variables --mv-* que
   cada boceto ya define, para que no desentone con su diseño.

   Los bocetos que ya traen su propia barra arriba se dejan en paz.
   ========================================================================== */
(function () {
  if (document.querySelector('header.top nav') ||
      document.querySelector('.tn') ||
      document.querySelector('header.cab nav')) return;

  // El orden manda: se muestran en el orden en que aparecen en la página
  var CANDIDATAS = [
    ['sobre-mi',   'Sobre mí'],
    ['forense',    'Área forense'],
    ['terapia',    'Psicoterapia'],
    ['formacion',  'Formación'],
    ['donde',      'Consultorio'],
    ['ubicacion',  'Consultorio'],
    ['contacto',   'Contacto']
  ];

  var vistos = {}, secciones = [];
  CANDIDATAS.forEach(function (c) {
    if (vistos[c[1]]) return;
    var el = document.getElementById(c[0]);
    if (!el) return;
    vistos[c[1]] = true;
    secciones.push({ id: c[0], txt: c[1], el: el });
  });
  if (secciones.length < 2) return;

  var barra = document.createElement('header');
  barra.className = 'tn';

  var marca = '<a class="tn__m" href="#inicio">INDICIO<span>Psic. Thania Huerta</span></a>';
  var enlaces = secciones.map(function (s) {
    return '<a class="tn__i" href="#' + s.id + '" data-spy="' + s.id + '">' + s.txt + '</a>';
  }).join('');

  // WhatsApp al final de la barra. El enlace se toma del primero que haya en
  // la pagina, asi el numero y el mensaje viven en un solo sitio.
  var waEl = document.querySelector('a[href*="wa.me"]');
  var wa = waEl ? (
    '<a class="tn__wa" href="' + waEl.getAttribute('href') + '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .1-1.6-.1-.4-.1-.8-.3-1.4-.5-2.5-1.1-4.1-3.6-4.2-3.7-.1-.2-1-1.3-1-2.5s.6-1.8.9-2.1c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.7 1.8c.1.1.1.3 0 .4l-.2.4-.4.4c-.1.1-.2.3-.1.5.1.2.6 1 1.4 1.7.9.8 1.7 1.1 1.9 1.2s.4.1.5-.1l.8-1c.2-.2.3-.2.6-.1l1.7.8c.2.1.4.2.4.3 0 .1 0 .5-.2 1Z"/></svg>' +
      '<span>WhatsApp</span></a>') : '';

  barra.innerHTML =
    '<div class="tn__w">' + marca +
    '<nav class="tn__n" aria-label="Secciones">' + enlaces + '</nav>' + wa + '</div>';
  document.body.insertBefore(barra, document.body.firstChild);

  // Se ilumina sola la sección que se está mirando
  if (!('IntersectionObserver' in window)) return;
  var pestanas = barra.querySelectorAll('.tn__i[data-spy]');
  var visibles = {};

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      visibles[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
    });
    var mejor = null, max = 0;
    secciones.forEach(function (s) {
      if ((visibles[s.id] || 0) > max) { max = visibles[s.id]; mejor = s.id; }
    });
    Array.prototype.forEach.call(pestanas, function (p) {
      var act = p.getAttribute('data-spy') === mejor;
      p.classList.toggle('on', act);
      if (act) { p.setAttribute('aria-current', 'true'); }
      else { p.removeAttribute('aria-current'); }
    });
  }, { threshold: [0, .12, .3, .55, .8], rootMargin: '-64px 0px -45% 0px' });

  secciones.forEach(function (s) { obs.observe(s.el); });
})();
