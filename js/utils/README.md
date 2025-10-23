# Utils
Utils (utilities) er små hjælpefunktioner, der kan bruges overalt i projektet.
De indeholder genanvendelig logik, som ikke er knyttet til et bestemt område.

## Eksempler:

* formatDate.js formaterer datoer
* generateToken.js laver JWT-tokens
* validateEmail.js tjekker email-format

## Typisk ansvar:

* Simple helper-funktioner
* Ingen database- eller API-kald
* Bruges på tværs af services, controllere og modeller

## Placering:
```
/js/utils/
```