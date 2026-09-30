/* ============================================================================
   Mapa compartido por los 10 bocetos.
   Cada boceto lo estiliza a su manera desde su propio CSS; aquí solo va
   el comportamiento, que es idéntico en todos.

   - Sin globo emergente: tapa el mapa y repite lo que ya está al lado
   - La rueda del ratón no hace zoom hasta que el mapa recibe el foco
   - En pantalla táctil arranca bloqueado, para no secuestrar el scroll
   ========================================================================== */
(function () {
  var caja = document.getElementById('mapa');
  if (!caja) return;

  var lat = parseFloat(caja.dataset.lat);
  var lng = parseFloat(caja.dataset.lng);
  var aviso = document.getElementById('mapaAviso');

  if (typeof L === 'undefined' || isNaN(lat) || isNaN(lng)) {
    if (aviso) aviso.hidden = false;
    return;
  }

  var tactil = window.matchMedia('(pointer: coarse)').matches;

  try {
    var mapa = L.map('mapa', {
      center: [lat, lng],
      zoom: parseInt(caja.dataset.zoom || '16', 10),
      scrollWheelZoom: false,
      dragging: !tactil,
      attributionControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    // El marcador lo dibuja cada boceto con su propio CSS (.pin)
    L.marker([lat, lng], {
      icon: L.divIcon({
        className: '',
        html: '<span class="pin"><span class="pin__c"></span></span>',
        iconSize: [30, 40],
        iconAnchor: [15, 36]
      }),
      title: 'Consultorio',
      keyboard: false
    }).addTo(mapa);

    mapa.on('focus', function () { mapa.scrollWheelZoom.enable(); });
    mapa.on('blur',  function () { mapa.scrollWheelZoom.disable(); });

    var escudo = document.getElementById('mapaToque');
    if (tactil && escudo) {
      escudo.hidden = false;
      escudo.addEventListener('click', function () {
        mapa.dragging.enable();
        escudo.hidden = true;
      });
    }

    setTimeout(function () { mapa.invalidateSize(); }, 350);
    window.addEventListener('resize', function () { mapa.invalidateSize(); }, { passive: true });

  } catch (e) {
    if (aviso) aviso.hidden = false;
  }
})();
