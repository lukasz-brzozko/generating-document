# Wymagane programy

Do działania aplikacji wymagane jest posiadanie

1. Node.js (co najmniej wersja 14)
2. LibreOffice

## Instalacja

Instalacja wymaganych zależności projektu odbywa się z wykorzystaniem npm poprzez wpisanie komendy:

```bash
npm install
```

Aplikacja wykorzystuje pliki, znajdujące się w folderze dist. Przed pierwszym uruchomieniem, należy wykonać komendę:

```bash
npm run build
```

Uruchomienie aplikacji:

```bash
npm start
```

## Działanie

Aplikacja wyszukuje pliki z rozszerzeniem **docx**, znajdujące się w folderze **templates**. Następnie, po wybraniu jednego z nich, należy uzupełnić zawartość dostępnych znaczników. Uzupełniony dokument można wygenerować i pobrać w formacie docx oraz pdf.

## Legenda

Składnia znaczników jest tożsama z [docxtemplater](https://docxtemplater.com/docs/tag-types/)

Ponadto, dostępne są następujące prefiksy znaczników:

- bez prefiksu - zwraca standardowy input type text np. {Name}
- `$o` - zwraca opcjonalny input np. {$oName}
- `$n` - zwraca input typu number np. {$nName}
- `$d` - zwraca input typu date np. {$dName}
- `$c{id}$` - zwraca input, którego wypełnienie spowoduje zablokowanie innego inputa o takim samym prefiksie np. uzupełnienie inputa {$c1$Name} zablokuje inputa o znaczniku {$c1$Address}

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
