import numpy as np, json
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage
exec(open('clean.py').read())

DPI   = 314
PW,PH = int(8.5*DPI), int(11*DPI)
MARG  = 0.95
TARGET = 28.0          # толщина линии рисунка, px  (2,26 мм)
RING   = 24.0          # толщина буквы, чуть тоньше рисунка
MINFILL = 1.00         # рисунок заполняет поле
FONT  = 'fonts/nunito-latin-900-normal.ttf'
SS    = 2              # работаем с двойным запасом и потом сглаживаем

def smooth_thickness(ink, delta):
    """Плавно утолщает (delta>0) или утончает (delta<0) линию без рваных краёв."""
    if abs(delta) < 0.4: return ink
    if delta > 0:
        d = ndimage.distance_transform_edt(~ink)
        return d <= delta
    d = ndimage.distance_transform_edt(ink)
    return d > -delta

def prep(path, box_w, box_h):
    a = np.array(Image.open(path).convert('L'))
    ink = clean_ink(a)
    ys,xs = np.where(ink)
    ink = ink[ys.min():ys.max()+1, xs.min():xs.max()+1]
    h,w = ink.shape
    th  = stroke_of(ink)
    s_fit = min(box_w/w, box_h/h)
    s = min(max(TARGET/th, MINFILL*s_fit), s_fit)
    W2,H2 = max(1,int(w*s*SS)), max(1,int(h*s*SS))
    im = Image.fromarray(np.where(ink,0,255).astype('uint8')).resize((W2,H2), Image.LANCZOS)
    b = np.array(im) < 128
    b = smooth_thickness(b, (TARGET*SS - stroke_of(b))/2)
    out = Image.fromarray(np.where(b,0,255).astype('uint8')).resize((W2//SS, H2//SS), Image.LANCZOS)
    return out

def hollow(word, box_w, cap_h):
    lines=[word]
    if len(word)>11 and ' ' in word:
        p=word.split(' '); best=None
        for i in range(1,len(p)):
            a=' '.join(p[:i]); b=' '.join(p[i:]); m=max(len(a),len(b))
            if best is None or m<best[0]: best=(m,a,b)
        lines=[best[1],best[2]]
    size = 470 if len(lines)==1 else 430
    for _ in range(80):
        f=ImageFont.truetype(FONT, size*SS)
        tmp=Image.new('L',(9000,4200),255); d=ImageDraw.Draw(tmp)
        for i,L in enumerate(lines): d.text((300,300+i*int(size*SS*1.12)), L, font=f, fill=0)
        fill=np.array(tmp)<128
        if not fill.any(): return None
        ys,xs=np.where(fill)
        if (xs.max()-xs.min())<=box_w*SS and (ys.max()-ys.min())<=(cap_h-30)*SS: break
        size=int(size*0.95)
    d_in = ndimage.distance_transform_edt(fill)
    ringpx = RING*SS
    out = np.where(fill & (d_in <= ringpx), 0, 255).astype('uint8')
    ys,xs=np.where(out<128)
    im=Image.fromarray(out).crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
    return im.resize((max(1,im.width//SS), max(1,im.height//SS)), Image.LANCZOS)

def page(path, word):
    two = len(word)>11 and ' ' in word
    dtop,dbot = (1.00,7.75) if two else (1.00,8.10)
    ctop,cbot = (8.05,9.80) if two else (8.40,9.75)
    bw = int((8.5-2*MARG)*DPI); bh=int((dbot-dtop)*DPI); ch=int((cbot-ctop)*DPI)
    pg=Image.new('L',(PW,PH),255)
    d=prep(path,bw,bh)
    pg.paste(d, ((PW-d.width)//2, int(dtop*DPI)+(bh-d.height)//2))
    t=hollow(word,bw,ch)
    if t: pg.paste(t, ((PW-t.width)//2, int(ctop*DPI)+(ch-t.height)//2))
    return pg
