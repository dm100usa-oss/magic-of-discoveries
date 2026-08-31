import numpy as np
from PIL import Image
from scipy import ndimage

def clean_ink(a, thr=160, edge=6, frac=0.05):
    """Убирает обрывки соседних рисунков: мелкие куски, прилипшие к краю кадра."""
    ink = a < thr
    lab, n = ndimage.label(ndimage.binary_dilation(ink, np.ones((3,3)), iterations=2))
    if n <= 1: return ink
    sizes = np.array(ndimage.sum(ink, lab, range(1, n+1)))
    main = int(np.argmax(sizes)) + 1
    H, W = ink.shape
    drop = np.zeros_like(ink)
    for i, s in enumerate(ndimage.find_objects(lab), start=1):
        if s is None or i == main: continue
        y0,y1,x0,x1 = s[0].start, s[0].stop, s[1].start, s[1].stop
        touches = (y0 <= edge or x0 <= edge or y1 >= H-edge or x1 >= W-edge)
        if touches and sizes[i-1] < frac*sizes[main-1]:
            drop |= (lab == i)
    return ink & ~drop

from skimage.morphology import skeletonize

def stroke_of(ink):
    """Толщина штриха: медиана ширины вдоль средней линии.
    Устойчива к сплошным залитым пятнам (полоски тигра, зрачки)."""
    if ink.sum() < 50: return 0.0
    dt = ndimage.distance_transform_edt(ink)
    sk = skeletonize(ink)
    v = dt[sk]
    v = v[v > 0.6]
    if len(v) < 20:
        v = dt[dt > 0]
    return float(2*np.median(v))
