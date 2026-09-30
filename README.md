# INDICIO · Psicología forense y psicoterapia

Sitio de la Psic. Thania Huerta. Una sola página, HTML y CSS sin compilar,
publicada con GitHub Pages.

```
index.html          la página
assets/css/
  estilo.css        el diseño
  detalle.css       barra inferior, formulario de cotización, biografía plegable
  nav.css           barra superior
assets/js/
  mapa.js           mapa (Leaflet + OpenStreetMap, sin clave)
  detalle.js        barra inferior, formulario que se envía por WhatsApp
  nav.js            barra superior con la sección activa
  rv.js             entrada de los bloques al hacer scroll
assets/img/         las cuatro fotos del consultorio, su sello y su patrón
```

## Paleta

Terracota `#A03812` · Negro `#000000` · Mostaza `#AC8632` · Olivo `#5C6046`
· Arena `#C7B296` · Cacao `#513029`. El crema `#EAE2D7` sale del trazo de sus
insignias y solo se usa como texto sobre fondos oscuros. Sin blanco.

## Antes de lanzar

1. Cambiar `robots.txt` y quitar la etiqueta `noindex` de `index.html`
   (instrucciones dentro de `robots.txt`).
2. Apuntar el dominio y añadir el archivo `CNAME`.

Todo lo anterior —bocetos, análisis, documentos de marca— sigue en el
historial de git.
