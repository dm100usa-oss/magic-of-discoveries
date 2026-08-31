"""Режет листы из listy-ishodnye на отдельные рисунки в risunki-narezannye.
Воспроизводит ровно тот набор из 165 файлов, на который ссылается book.json."""
from PIL import Image
import numpy as np, glob, os
from scipy import ndimage

SRC='listy-ishodnye'; DST='risunki-narezannye'

def gap(a,b):
    dx=max(0,max(a[0],b[0])-min(a[2],b[2])); dy=max(0,max(a[1],b[1])-min(a[3],b[3]))
    return (dx*dx+dy*dy)**0.5

def merge_small(bs):
    bs=list(bs)
    while len(bs)>1:
        ar=[(b[2]-b[0])*(b[3]-b[1]) for b in bs]; mx=max(ar)
        i=min(range(len(bs)),key=lambda k:ar[k])
        if ar[i]>=0.15*mx: break
        j=min([k for k in range(len(bs)) if k!=i],key=lambda k:gap(bs[i],bs[k]))
        a,b=bs[i],bs[j]; bs[j]=(min(a[0],b[0]),min(a[1],b[1]),max(a[2],b[2]),max(a[3],b[3])); bs.pop(i)
    return bs

def boxes(ink,it):
    d=ndimage.binary_dilation(ink,structure=np.ones((3,3)),iterations=it)
    lab,_=ndimage.label(d); out=[]
    for sl in ndimage.find_objects(lab):
        y,x=sl
        if ink[sl].sum()<400: continue
        out.append((x.start,y.start,x.stop,y.stop))
    return merge_small(out)

# сколько рисунков ждать на каждом листе; по умолчанию 6
WANT={'09.png':4, '011.png':4, '012.png':1}
# лист 09 в прошлый раз резался запасным путём, поэтому рамка чуть шире
FALLBACK={'09.png'}

os.makedirs(DST, exist_ok=True)
total=0
for f in sorted(glob.glob(os.path.join(SRC,'*.png'))):
    name=os.path.basename(f); want=WANT.get(name,6)
    im=Image.open(f).convert('L'); ink=np.array(im)<200
    if want==1:
        a=np.array(im); a=np.where(a>200,255,a)
        ys,xs=np.where(a<200); best=[(xs.min(),ys.min(),xs.max(),ys.max())]
    else:
        best=None
        if name not in FALLBACK:
            for it in range(4,60):
                b=boxes(ink,it)
                if len(b)==want: best=b; break
        if best is None: best=boxes(ink,14)
        a=np.array(im); a=np.where(a>200,255,a)
    im=Image.fromarray(a)
    best.sort(key=lambda t:(t[1]//200,t[0]))
    base=os.path.splitext(name)[0][:8]
    for i,(x0,y0,x1,y1) in enumerate(best):
        p=10
        im.crop((max(0,x0-p),max(0,y0-p),min(im.width,x1+p),min(im.height,y1+p))).save(f'{DST}/{base}_{i:02d}.png')
        total+=1
print('нарезано', total)
