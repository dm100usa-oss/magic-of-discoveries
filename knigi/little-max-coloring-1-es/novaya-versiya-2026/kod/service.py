import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage
exec(open('build2.py').read())
REG='fonts/nunito-latin-700-normal.ttf'
LGT='fonts/nunito-latin-400-normal.ttf'

def centered(dr, y, text, font, fill=0):
    w = dr.textlength(text, font=font)
    dr.text(((PW-w)//2, y), text, font=font, fill=fill)
    return y

def page_title():
    pg=Image.new('L',(PW,PH),255); dr=ImageDraw.Draw(pg)
    y=int(2.6*DPI)
    t=hollow('COLOREAR', int(6.6*DPI), int(1.6*DPI))
    f1=ImageFont.truetype(REG,150); f2=ImageFont.truetype(LGT,86); f3=ImageFont.truetype(LGT,72)
    centered(dr,y,'El primer libro de',f2); y+=int(0.9*DPI)
    if t:
        s=min((PW-2*int(MARG*DPI))/t.width,1.0)
        t=t.resize((int(t.width*s),int(t.height*s)))
        pg.paste(t,((PW-t.width)//2,y)); y+=t.height+int(0.7*DPI)
    centered(dr,y,'del pequeño Max',f1); y+=int(1.1*DPI)
    centered(dr,y,'111 dibujos para bebés de 1 a 3 años',f3); y+=int(0.6*DPI)
    centered(dr,y,'La Magia de los Descubrimientos',f3)
    return pg

def page_owner():
    pg=Image.new('L',(PW,PH),255); dr=ImageDraw.Draw(pg)
    f=ImageFont.truetype(REG,110)
    y=int(3.2*DPI)
    centered(dr,y,'Este libro pertenece a',f)
    y+=int(1.6*DPI)
    x0,x1=int(1.6*DPI),int(6.9*DPI)
    for k in range(2):
        yy=y+k*int(1.2*DPI)
        dr.line([(x0,yy),(x1,yy)],fill=0,width=10)
    return pg

def page_copyright():
    pg=Image.new('L',(PW,PH),255); dr=ImageDraw.Draw(pg)
    f=ImageFont.truetype(LGT,58); fb=ImageFont.truetype(REG,58)
    lines=[('El primer libro de colorear del pequeño Max',fb),
           ('111 dibujos para bebés de 1 a 3 años',f),
           ('Serie "La Magia de los Descubrimientos"',f),(' ',f),
           ('Derechos de autor © 2026 Ricardo Demi',f),
           ('Todos los derechos reservados.',f),(' ',f),
           ('Ninguna parte de esta publicación puede ser reproducida,',f),
           ('almacenada o transmitida de ninguna forma ni por ningún',f),
           ('medio sin el permiso previo por escrito del titular de los',f),
           ('derechos de autor.',f),(' ',f),
           ('Publicado por Magic of Discoveries LLC.',f),
           ('Para la obtención de permisos, escríbenos:',f),
           ('magicofdiscoveries@gmail.com',f),(' ',f),
           ('ISBN: 978-1-963328-59-2',f),
           ('Segunda edición 2026',f),(' ',f),
           ('Este libro se presenta únicamente con fines',f),
           ('motivadores e informativos.',f)]
    y=int(3.0*DPI)
    for t,ff in lines:
        centered(dr,y,t,ff); y+=int(0.30*DPI)
    return pg
