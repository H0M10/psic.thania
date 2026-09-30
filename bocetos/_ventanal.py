# -*- coding: utf-8 -*-
u"""
Genera ventanal.html, la propuesta que Thania eligio.

El contenido sale de _indicio.py, que lo guarda una sola vez. La plantilla
usa marcas $nombre en vez de llaves para no chocar con nada del HTML.
"""
import io, os, string
from _indicio import (D, WA, TEL, LAT, LNG, firma, ENTRADA, ENTRADA_2, MARCO,
                      BIO_LEAD, BIO, CITA, SUPUESTOS, OTROS, ENFOQUE, MOTIVOS,
                      ACADEMICA, CURSOS)

def lista(items, fmt):
    return u''.join(u'\n      ' + fmt(i, x) for i, x in enumerate(items))

def creds(filas):
    return lista(filas, lambda i, f: (
        u'<li><strong>%s</strong><span>%s</span><time>%s</time></li>' % f))

datos = dict(
    v=firma('_detalle.css', '_nav.css', '_ventanal.css'),
    vj=firma('_mapa.js', '_nav.js', '_detalle.js', '_rv.js'),
    # El titular es su frase; se subraya en arena la parte que mira adelante
    entrada=ENTRADA.replace(u'construir nuevas formas de avanzar',
                            u'<em>construir nuevas formas de avanzar</em>'),
    entrada2=ENTRADA_2, marco=MARCO,
    wa=WA, tel=TEL, lat=LAT, lng=LNG,
    supuestos=lista(SUPUESTOS, lambda i, s: (
        u'<li><span class="sup__n">%02d</span><span>%s</span></li>' % (i + 1, s))),
    otros=lista(OTROS, lambda i, o: (
        u'<article class="otro rv"><h3>%s</h3><p>%s</p></article>' % o)),
    enfoque=ENFOQUE,
    motivos=lista(MOTIVOS, lambda i, m: u'<li>%s</li>' % m),
    bio0=BIO_LEAD, bio1=BIO[0][1], bio2=BIO[1][1], bio3=BIO[2][1], cita=CITA,
    academica=creds(ACADEMICA), cursos=creds(CURSOS),
)

if __name__ == '__main__':
    p = io.open(D + '_ventanal.plantilla.html', encoding='utf-8').read()
    p = p.replace('content="$entrada"', 'content="%s"' % ENTRADA)
    h = string.Template(p).substitute(datos)
    io.open(D + 'ventanal.html', 'w', encoding='utf-8').write(h)
    print('ventanal.html  %d bytes' % os.path.getsize(D + 'ventanal.html'))
