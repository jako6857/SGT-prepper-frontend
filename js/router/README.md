# Router
Routeren styrer, hvilket view (side) der vises i browseren, baseret på URL’ens hash (f.eks. #/products, #/login).

Når hash’en ændres, udskiftes indholdet i et bestemt HTML-element — uden at siden genindlæses.

Den matcher hash’en med en liste af ruter og viser det tilsvarende view.
Hvis ruten ikke findes, vises en standard- eller “Not Found”-side.

Routeren gør det muligt at navigere mellem flere sider i en single-page-applikation (SPA), hvor alt indhold håndteres med JavaScript.

## Bemærk
Denne router er en *hash-router* og skrevet særligt til dette projekt. Det betyder at vi arbejder med nogle lidt specielle url'er:

**Eksempel**
```
http://127.0.0.1:5500/index.htm#/products

http://127.0.0.1:5500/index.htm#/cart
```
Når vi skal arbejde med routers i Express og React ser det lidt anderledes ud og her vil vi kunne bruge normale url'er igen.