# Lager public/images/koppen-verden-grupper-beck-1991-2020.png fra Becks verdenskart (CC BY 4.0), se .lisens.txt.
# Kjøres lokalt i en mappe med world.svg (fra Commons). Forutsetter numpy og Pillow. Ikke en del av bygget.
import base64, io, re
import numpy as np
from PIL import Image

# 1. Hent tegnforklaringen (klasse -> farge) og det innebygde rasterbildet fra matplotlib-SVG-en.
svg = open('world.svg', encoding='utf8').read()
leg = svg[svg.find('<g id="legend_1">'):]
pal = dict(zip(re.findall(r'<!-- (\w+) -->', leg), re.findall(r'<g id="patch_\d+">\s*<path[^>]*style="fill:(#[0-9a-f]{6})', leg)))
b64 = re.search(r'xlink:href="data:image/png;base64,\s*([^"]+)"', svg).group(1)
im = np.array(Image.open(io.BytesIO(base64.b64decode(b64))).convert('RGBA'))
rgb=(im[...,0].astype(np.int32)<<16)|(im[...,1].astype(np.int32)<<8)|im[...,2]
alpha=im[...,3]
grp=np.zeros(rgb.shape,np.uint8)
gi={'A':1,'B':2,'C':3,'D':4,'E':5}
unk=0
P=np.array([[int(h[1:3],16),int(h[3:5],16),int(h[5:7],16)] for h in pal.values()],np.int32)
G=np.array([gi[k[0]] for k in pal],np.uint8)
op=alpha>0
px=im[op][:,:3].astype(np.int32)
d=((px[:,None,:]-P[None,:,:])**2).sum(-1)
print('max nearest dist', int(d.min(1).max()))
grp[op]=G[d.argmin(1)]
print('unclassified opaque px:', int(((grp==0)&(alpha>0)).sum()), 'of', int((alpha>0).sum()))
# orientation: which end has E at full width (Antarctica)?
print('row0 E frac', (grp[0]==5).mean(), 'rowlast E frac', (grp[-1]==5).mean())
if (grp[0]==5).mean() > (grp[-1]==5).mean(): grp=grp[::-1]   # row0 = nord
np.save('grp.npy',grp)
A1,A2,A3,A4=1.340264,-0.081106,0.000893,0.003796
XM=2*np.sqrt(3)*np.pi/(3*A1); YM=A4*(np.pi/3)**9+A3*(np.pi/3)**7+A2*(np.pi/3)**3+A1*(np.pi/3)
for W in (1440,):
    H=int(round(W*YM/XM))
    xs=(np.arange(W)+0.5)/W*2*XM-XM; ys=YM-(np.arange(H)+0.5)/H*2*YM
    X,Y=np.meshgrid(xs,ys)
    th=Y/A1
    for _ in range(12):
        f=A4*th**9+A3*th**7+A2*th**3+A1*th-Y; fp=9*A4*th**8+7*A3*th**6+3*A2*th**2+A1; th=th-f/fp
    th=np.clip(th,-np.pi/3,np.pi/3)
    phi=np.arcsin(np.clip(2*np.sin(th)/np.sqrt(3),-1,1))
    lam=3*X*(9*A4*th**8+7*A3*th**6+3*A2*th**2+A1)/(2*np.sqrt(3)*np.cos(th))
    inside=np.abs(lam)<=np.pi
    lat=np.degrees(phi); lon=np.degrees(lam)
    r=np.clip(((90-lat)/0.1).astype(int),0,1799); c=np.clip(((lon+180)/0.1).astype(int),0,3599)
    out=grp[r,c]; out[~inside]=0
    # P-modus: indeks = gruppe, palett grå (R = indeks*40) så klienten kan lese R/40
    p=Image.fromarray(out,'P'); pl=[]
    for k in range(6): pl+= [k*40,k*40,k*40]
    p.putpalette(pl+[0]*(768-len(pl)))
    p.save('koppen-verden-grupper-beck-1991-2020.png',optimize=True)
    print(W,H)
