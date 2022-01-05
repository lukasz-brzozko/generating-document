# Wymagane programy

Do działania aplikacji wymagane jest posiadanie

1. Node.js (co najmniej wersja 14)
2. LibreOffice

## Instalacja

Instalacja wymaganych zależności projektu odbywa się z wykorzystaniem npm poprzez wpisanie komendy:

```bash
npm install
```

## Możliwe błędy

Podczas próby generowania dokumentu może wystąpić następujący błąd :

> The application cannot be started.
> The configuration file path/bootstrap.ini is corrupt.

W takim wypadku należy dokonać modyfikacji w pliku document-generator/node_modules/libreoffice-convert/index.js

```javascript
/* document-generator/node_modules/libreoffice-convert/index.js */

// tę linię kodu

let command = `-env:UserInstallation=file://${installDir.name} --headless --convert-to ${format}`;

// należy zmienić na

let command = `${installDir.name} --headless --convert-to ${format}`;
```

## Licencja

[MIT](https://choosealicense.com/licenses/mit/)
