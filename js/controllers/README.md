# Controllers

Controllers indeholder logikken for, hvad der skal ske, når API’et modtager en forespørgsel.

De bruger modellerne til at hente, ændre eller gemme data og sender et svar tilbage til klienten.

## Eksempler:

* productController.js håndterer visning af produkter

* cartController.js håndterer CRUD-funktioner for indkøbskurv

## Typisk ansvar:

* Modtage request og parametre

* Kalde model-funktioner

* Returnere JSON-respons eller fejl

## Placering:
```
/js/controllers/
```