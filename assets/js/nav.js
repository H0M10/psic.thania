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

  barra.innerHTML =
    '<div class="tn__w">' + marca +
    '<nav class="tn__n" aria-label="Secciones">' + enlaces + '</nav></div>';
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
