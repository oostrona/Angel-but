# Angel But: strona internetowa

Strona pracowni szewskiej i tapicerskiej Angel But (ul. Wyszyńskiego 102, Wrocław) w dwóch językach: polski (`site/index.html`) i ukraiński (`site/uk/index.html`).

## Co jest gdzie

- `site/`: gotowa strona. Na hosting wgrywasz **tylko zawartość tego folderu**.
- `.tooling/`: źródła i narzędzia (nie wgrywać):
  - `src/i18n/pl.json`, `src/i18n/uk.json`: wszystkie teksty strony,
  - `src/css/style.css`: style,
  - `build.mjs`: składa obie wersje językowe, fonty, ikony i zdjęcia,
  - `photos-src/`: oryginalne zdjęcia właściciela,
  - `serve.mjs`: lokalny podgląd.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: dokumentacja projektu dla pluginu Impeccable.

## Zmiana tekstów

Edytuj `.tooling/src/i18n/pl.json` lub `uk.json`, potem w folderze `.tooling`:

```
R:\Dev\nodejs\node.exe build.mjs --no-images
```

(bez `--no-images`, jeśli zmieniły się zdjęcia w `photos-src/`).

## Podgląd

```
R:\Dev\nodejs\node.exe .tooling\serve.mjs
```

i otwórz http://localhost:4174/ (wersja ukraińska: http://localhost:4174/uk/).

## Przed publikacją (do potwierdzenia z właścicielem)

1. Zgoda na użycie jego 7 zdjęć z Google Maps na stronie.
2. Czy odpisuje na SMS-y ze zdjęciem z wyceną (strona to obiecuje w sekcji „Wycena ze zdjęcia”).
3. Godziny: Google Maps podaje pn-pt 9-17, sobota nieczynne; Panorama Firm podaje 9-18. Na stronie są godziny z Google.
4. Przykłady przeróbek krawieckich (skracanie, zwężanie, wymiana zamków) i zdanie o kluczniku ze skóry na zamówienie.
5. Zgoda na cytowanie 3 opinii z Google.
6. Zdjęcia do kart bez zdjęć (torby, walizki, klucze): wstawią się zamiast podpowiedzi „co sfotografować”.
7. Plik z logo (uskrzydlony but), jeśli właściciel chce go na stronie.
8. Po wyborze domeny: dopisać `<link rel="alternate" hreflang>` z pełnymi adresami i pełny adres `og:image`.
