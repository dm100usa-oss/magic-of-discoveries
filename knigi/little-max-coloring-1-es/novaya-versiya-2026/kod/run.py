exec(open('service.py').read())
import json, os, sys
book=json.load(open('book.json'))
os.makedirs('pages2', exist_ok=True)
a,b = int(sys.argv[1]), int(sys.argv[2])
for i in range(a,b):
    if i==0: pg=page_title()
    elif i==1: pg=page_owner()
    elif i==113: pg=page_copyright()
    else:
        es,en,p = book[i-2]; pg=page(p,es)
    pg.save(f'pages2/{i:03d}.png', optimize=True)
print('готово', a, b)
