# -*- coding: utf-8 -*-
u"""
Contraste contra los pixeles reales, para texto sobre fotografia.

_audita.py mide contra el color de fondo del CSS, y no puede ver una foto.
Esto hace dos capturas -con el texto y sin el-; donde difieren esta la letra,
y ahi se mide el fondo verdadero. Se toma el percentil 10, no el peor pixel
suelto, para que el antialias del borde de la letra no dispare falsos fallos.
"""
import sys, io
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops

def lum(c):
    s=[v/255.0 for v in c[:3]]; s=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in s]
    return 0.2126*s[0]+0.7152*s[1]+0.0722*s[2]
def r(a,b):
    la,lb=lum(a),lum(b)
    if la<lb: la,lb=lb,la
    return (la+0.05)/(lb+0.05)

def mide(url, ancho, alto, sel, ocultar, espera=3400):
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':ancho,'height':alto})
        pg.goto(url, wait_until='networkidle'); pg.wait_for_timeout(espera)
        # el grano se quita en las dos capturas: es ruido que no es letra
        pg.add_style_tag(content='body::after{display:none!important}')
        pg.wait_for_timeout(150)
        cajas = pg.evaluate('''(sel)=>Array.from(document.querySelectorAll(sel)).map(e=>{
          const r=e.getBoundingClientRect(), s=getComputedStyle(e);
          return {n:(e.className||e.tagName).toString().split(' ')[0]||e.tagName,
                  t:e.textContent.trim().slice(0,22), x:r.x,y:r.y,w:r.width,h:r.height,
                  px:parseFloat(s.fontSize), fw:parseInt(s.fontWeight),
                  c:s.color.match(/[0-9.]+/g).map(Number)};})''', sel)
        con = Image.open(io.BytesIO(pg.screenshot())).convert('RGB')
        pg.add_style_tag(content=ocultar + '{color:transparent!important;text-shadow:none!important}')
        pg.wait_for_timeout(150)
        sin = Image.open(io.BytesIO(pg.screenshot())).convert('RGB')
        b.close()
    dif = ImageChops.difference(con, sin).convert('L')
    out = []
    for k in cajas:
        if k['w'] < 2 or k['y'] > alto or k['y'] + k['h'] < 0: continue
        x0,y0 = max(0,int(k['x'])), max(0,int(k['y']))
        x1,y1 = min(ancho,int(k['x']+k['w'])), min(alto,int(k['y']+k['h']))
        vals = []
        for yy in range(y0,y1):
            for xx in range(x0,x1):
                if dif.getpixel((xx,yy)) > 40:          # aqui hay letra
                    vals.append(r(k['c'], sin.getpixel((xx,yy))))
        if not vals: continue
        vals.sort()
        p10 = vals[len(vals)//10]
        grande = k['px'] >= 24 or (k['px'] >= 18.66 and k['fw'] >= 700)
        out.append((k['n'], k['t'], p10, 3.0 if grande else 4.5))
    return out

if __name__ == '__main__':
    url = sys.argv[1]
    sel = sys.argv[2]
    ocultar = sys.argv[3]
    for ancho, alto in [(1440,900),(1280,800),(1024,768),(768,1024),(390,844),(320,640)]:
        res = mide(url, ancho, alto, sel, ocultar)
        malos = [x for x in res if x[2] < x[3]]
        peor = min((x[2]/x[3] for x in res), default=9)
        print('%4d x %-4d  %d textos · %s' % (ancho, alto, len(res),
              'sin fallos' if not malos else '%d FALLAN' % len(malos)))
        for n,t,v,pide in malos:
            print('        %-10s %-22s %.2f (pide %.1f)' % (n[:10], t, v, pide))
