"""Делает полый шрифт из обычного: буква склеивается в одну форму, внутри вырезается середина."""
import numpy as np, subprocess, re, os, sys
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage
from fontTools.ttLib import TTFont, newTable
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.ttGlyphPen import TTGlyphPen

SRC='fredoka-latin-700-normal.ttf'   # из пакета @fontsource/fredoka
SLANT=0.30   # наклон черточки ударения
OUT='MagicHollow-Bold.ttf'
S=1000                 # пикселей на кегельную площадку при обводке
RING_REL=0.0480        # толщина контура по отношению к высоте прописной буквы

src=TTFont(SRC)
upem=src['head'].unitsPerEm
cmap=src.getBestCmap()
hmtx=src['hmtx']
glyphOrder=src.getGlyphOrder()
capH=src['OS/2'].sCapHeight if hasattr(src['OS/2'],'sCapHeight') else int(0.72*upem)
ring_units=RING_REL*capH
ring_px=ring_units*S/upem

font=ImageFont.truetype(SRC, S)

def parse_svg_path(d):
    """potrace выдает путь из прямых и кубических кривых, в масштабе 1/100."""
    toks=re.findall(r'[MmCcLlVvHhZz]|-?\d+\.?\d*', d)
    paths=[]; cur=None; pos=(0.0,0.0); start=(0.0,0.0); cmd=None; i=0
    while i<len(toks):
        t=toks[i]
        if t.isalpha():
            cmd=t; i+=1
            if cmd in 'Zz':
                if cur: paths.append(cur); cur=None
                pos=start
            continue
        n=lambda k: float(toks[i+k])
        if cmd in 'Mm':
            x,y=n(0),n(1); i+=2
            if cmd=='m': x+=pos[0]; y+=pos[1]
            pos=(x,y); start=pos; cur=[('m',pos)]
            cmd='l' if cmd=='m' else 'L'
        elif cmd in 'Ll':
            x,y=n(0),n(1); i+=2
            if cmd=='l': x+=pos[0]; y+=pos[1]
            pos=(x,y); cur.append(('l',pos))
        elif cmd in 'Cc':
            p=[n(k) for k in range(6)]; i+=6
            if cmd=='c': p=[p[0]+pos[0],p[1]+pos[1],p[2]+pos[0],p[3]+pos[1],p[4]+pos[0],p[5]+pos[1]]
            cur.append(('c',((p[0],p[1]),(p[2],p[3]),(p[4],p[5])))); pos=(p[4],p[5])
        elif cmd in 'Vv':
            y=n(0); i+=1
            if cmd=='v': y+=pos[1]
            pos=(pos[0],y); cur.append(('l',pos))
        elif cmd in 'Hh':
            x=n(0); i+=1
            if cmd=='h': x+=pos[0]
            pos=(x,pos[1]); cur.append(('l',pos))
        else:
            i+=1
    if cur: paths.append(cur)
    return paths

import unicodedata

def fix_B(a):
    """У Fredoka средняя перекладина B не доходит до палки. Доводим."""
    ys,xs=np.where(a); y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
    H=y1-y0; W=x1-x0
    col=a[y0:y1+1, x0+int(0.55*W)]
    idx=np.where(col)[0]
    if not len(idx): return a
    gr=[(int(g[0]),int(g[-1])) for g in np.split(idx,np.where(np.diff(idx)!=1)[0]+1) if len(g)>3]
    mid=[g for g in gr if 0.30*H<(g[0]+g[1])/2<0.70*H]
    if not mid: return a
    m=mid[0]
    a[y0+m[0]:y0+m[1]+1, x0:x0+int(0.55*W)]=True
    return a

def slant_acute(a, k=SLANT):
    """Наклоняет черточку ударения снизу слева вверх направо."""
    lab,n=ndimage.label(a)
    if n<2: return a
    objs=ndimage.find_objects(lab)
    i=sorted(range(1,n+1), key=lambda t: objs[t-1][0].start)[0]
    sl=objs[i-1]
    mark=(lab[sl]==i)
    h,w=mark.shape
    new=np.zeros((h+int(k*w)+4, w), bool)
    for x in range(w):
        sh=int(k*(w-1-x))
        new[sh:sh+h, x] |= mark[:,x]
    a[sl]=False
    y0=max(0, sl[0].start-int(k*w))
    a[y0:y0+new.shape[0], sl[1].start:sl[1].start+w] |= new
    return a

def hollow_glyph(ch, tmp='gg'):
    box=int(3*S)
    im=Image.new('L',(box,box),255)
    ox,oy=S, 2*S
    ImageDraw.Draw(im).text((ox,oy),ch,font=font,fill=0,anchor='ls')
    a=np.array(im)<128
    if a.sum()<20: return None
    if ch=='B': a=fix_B(a)
    d=unicodedata.decomposition(ch)
    if '0301' in d: a=slant_acute(a)
    dt=ndimage.distance_transform_edt(a)
    out=np.where(a & (dt<=ring_px),0,255).astype('uint8')
    Image.fromarray(out).convert('1').save(tmp+'.pbm')
    subprocess.run(['potrace','-b','svg','-a','1.0','-O','0.35','-u','100','-o',tmp+'.svg',tmp+'.pbm'],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    svg=open(tmp+'.svg').read()
    ds=re.findall(r'<path d="(.*?)"',svg,re.S)
    if not ds: return None
    k=upem/S/100.0                     # 1/100 из potrace плюс перевод в единицы шрифта
    def conv(p):
        x,y=p
        return (round((x*0.01-ox)*upem/S), round((oy-(box-y*0.01))*upem/S))
    res=[]
    for d in ds:
        for path in parse_svg_path(d):
            pts=[]
            for op,arg in path:
                if op=='c': pts.append(('c',tuple(conv(q) for q in arg)))
                else: pts.append((op,conv(arg)))
            res.append(pts)
    return res

# ---- сборка файла шрифта ----
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
import pathops

def draw_to(pen, contours):
    for c in contours:
        started=False
        for op,arg in c:
            if op=='m': pen.moveTo(arg); started=True
            elif op=='l': pen.lineTo(arg)
            elif op=='c': pen.curveTo(*arg)
        if started: pen.closePath()

def build():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    chars=sorted(cmap.keys())
    glyphs={}; widths={}; order=['.notdef']
    cm={}
    glyphs['.notdef']=[]; widths['.notdef']=hmtx['.notdef'][0] if '.notdef' in hmtx.metrics else 500
    done=0
    for cp in chars:
        gname=cmap[cp]; ch=chr(cp)
        adv=hmtx[gname][0]
        if ch.isspace() or adv==0 and gname not in ('space',):
            pass
        name='u%04X'%cp
        cont=None
        if not ch.isspace():
            try: cont=hollow_glyph(ch)
            except Exception: cont=None
        rec=RecordingPen()
        if cont: draw_to(rec, cont)
        # приводим направление контуров в порядок
        path=pathops.Path()
        rec.replay(path.getPen())
        path.simplify(fix_winding=True, keep_starting_points=False)
        rec2=RecordingPen(); path.draw(rec2)
        tp=TTGlyphPen(None)
        rec2.replay(Cu2QuPen(tp, 1.0))
        glyphs[name]=tp.glyph(); widths[name]=adv; order.append(name); cm[cp]=name
        done+=1
        if done%40==0: print('  готово', done, flush=True)
    fb=FontBuilder(upem, isTTF=True)
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap(cm)
    gp=TTGlyphPen(None)
    glyphs['.notdef']=gp.glyph()
    fb.setupGlyf(glyphs)
    fb.setupHorizontalMetrics({g:(widths.get(g,500),0) for g in order})
    hhea=src['hhea']
    fb.setupHorizontalHeader(ascent=hhea.ascent, descent=hhea.descent, lineGap=hhea.lineGap)
    fb.setupNameTable({
        'familyName':'Magic Hollow 2',
        'styleName':'Regular',
        'uniqueFontIdentifier':'MagicHollow2-Regular 1.000',
        'fullName':'Magic Hollow 2 Regular',
        'psName':'MagicHollow2-Regular',
        'version':'Version 1.000',
        'copyright':'Based on Fredoka by Milena Brandao, Hafontia (SIL Open Font License 1.1). '
                    'Hollow version by Magic of Discoveries LLC, 2026.',
        'licenseDescription':'This Font Software is licensed under the SIL Open Font License, Version 1.1. '
                             'It is a modified version of Fredoka.',
        'licenseInfoURL':'https://openfontlicense.org',
    })
    fb.setupOS2(sTypoAscender=hhea.ascent, sTypoDescender=hhea.descent, sCapHeight=capH,
                usWinAscent=hhea.ascent, usWinDescent=abs(hhea.descent))
    fb.setupPost()
    fb.save(OUT)
    print('шрифт сохранен:', OUT, 'символов:', len(cm))

if __name__=='__main__':
    build()
