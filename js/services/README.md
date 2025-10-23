# Services
Services indeholder overordnet forretningslogik — altså den del, der håndterer data og regler, men som ikke hører direkte til en controller.

De fungerer typisk som et mellemled mellem controllers og models.

## Eksempler:

* *fetch.js* håndterer funktionskald til api
* *auth.js* håndterer login, token og password-hash

## Typisk ansvar:

* Behandle data før/efter databasekald
* Samle funktioner, der bruges af flere controllere
* Holde controllere rene og enkle

## Placering:
```
/js/services/
```