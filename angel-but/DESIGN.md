---
name: Angel But
description: An upholsterer's sample book for a Wrocław shoe and upholstery workshop. White pinked sample cards on a grey board, colours sampled from the owner's photos.
colors:
  board: "#e9e9e5"
  board-dark: "#1f1a17"
  card: "#fcfcfa"
  ink: "#1d1b19"
  ink-2: "#55524d"
  walnut: "#563224"
  walnut-deep: "#3f2419"
  upholstery-blue: "#8094a2"
  boot-suede: "#3c3936"
  car-seat: "#a29d9a"
  cream-fabric: "#cecfc7"
  steel: "#b0babb"
  rope-blue: "#024596"
typography:
  display:
    fontFamily: "Commissioner, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.2rem + 3.2vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Commissioner, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.2vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Commissioner, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.2rem + 1.1vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.08
  label:
    fontFamily: "Commissioner, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Commissioner, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(72px, 9vw, 128px)"
  tooth: "12px"
components:
  button-primary:
    backgroundColor: "{colors.walnut}"
    textColor: "{colors.card}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "52px"
    padding: "0 22px"
  button-primary-hover:
    backgroundColor: "{colors.walnut-deep}"
  button-outline:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "52px"
    padding: "0 22px"
  sample-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "44px 32px 32px"
  index-tab-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "52px"
---

# Design System: Angel But

## Overview

The site is the workshop's sample book. An upholsterer shows customers a book of fabric and leather samples; Angel But shows its seven trades the same way: a spine of numbered index tabs, each with a tiny square of real material, and one open sample card with a real photo of the work and the two ways to ask for a quote (text a photo, or call). Everything else on the page reuses the sample card: the chairs in the "Wycena ze zdjęcia" section and the shop sign in "Dojazd" are pasted onto the same pinked cards.

Persuade surface, bilingual (Polish at `/`, Ukrainian at `/uk/`, same content). Built from `.tooling/src` by `.tooling/build.mjs`; recorded after the build (2026-09-28). Direction chosen by the user from an Impeccable concept roll (seed key 2a8010d8).

## Colors

### Primary
- **Walnut** `#563224`, sampled from the old wooden door of the building: every primary action (Wyślij zdjęcie, Wyznacz trasę) and the skip link. `#3f2419` on hover.

### Sample colours (one per trade, all sampled from owner photos)
- Buty `#3c3936` boot suede; Tapicerka meblowa `#8094a2` chair upholstery; Tapicerka samochodowa i medyczna `#a29d9a` car-seat vinyl; Torby i skóra `#563224` walnut; Walizki `#024596` blue rope; Szycie i przeróbki `#cecfc7` cream chair fabric; Klucze i ostrzenie `#b0babb` steel. Used only as that trade's chip, swatch field and caption marker. Upholstery blue also marks "open now" and today's row in the hours table.

### Neutral
- **Board** `#e9e9e5` (a tint of the cream fabric): the page ground. In dark mode the board becomes a dark walnut workbench `#1f1a17`; the cards stay white.
- **Card** `#fcfcfa`, **ink** `#1d1b19`, **ink 2** `#55524d` (7:1 on the board).

### Named Rules
- **Samples only.** A colour on this page is either a real material from the owner's photos or black/white. No invented accents.
- **At rest, dimmed.** Inactive tab chips sit at 70% opacity and 35% saturation; the active sample is full strength.

## Typography

Commissioner (Kostas Bartsokas, OFL), self-hosted woff2 in latin, latin-ext, cyrillic and cyrillic-ext, weights 400 / 700 / 800. One family for everything: 800 for display, section and card titles, 700 for buttons and the active tab, 400 for text. Sentence case in both languages.

### Hierarchy
Display (h1, one line on desktop) > headline (h2 per section) > card title > body. Swatch hints use 800 at card-title size with 1.3 line height.

### Named Rules
- **No dashes in visible text:** ranges use a hyphen (`9:00-17:00`, `Poniedziałek-piątek`).
- **Keep words together:** single-letter words and the phone number are joined with non-breaking spaces; brand name carries `translate="no"`.

## Layout

- 1280px content width plus a `clamp(16px, 4vw, 40px)` gutter (safe-area aware).
- First viewport: header; full-width display line with intro and the two actions; then the book: spine 4/12, open card 8/12, tops aligned; a 2px rule and the live open/closed line close it.
- Card inside: photo or swatch 7fr, text and actions 5fr; stacks under 1024px.
- Under 1024px the spine becomes a horizontal scroll-snap strip above the card.
- Sections: 7/5 splits (quote steps + chair sample; review quotes), 5/3/4 for the visit (info, sign sample, map sample).
- Mobile adds a fixed action bar (Zadzwoń, Wyślij zdjęcie) once the first actions scroll away.

## Elevation & Depth

Flat cards on a flat board. The open sample card gets one soft two-layer drop shadow on screens 1024px and wider (skipped on phones for paint cost). No other shadows.

## Shapes

Square corners everywhere. The only curves: the punched ring hole on each sample card and the status dot. The pinked top edge (12px teeth) is drawn with a CSS mask, the real shape a pinking shear cuts.

## Components

### Buttons
52px, square, 700 label, icon + verb. Primary walnut with white text; outline in current ink, fills ink on hover. Press `scale(0.97)` 160ms. One label per intent on the whole page: "Wyślij zdjęcie" (SMS with a prefilled message naming the trade) and "Zadzwoń". The number itself appears as text in the header and footer.

### Index tabs (signature)
Links with `role="tab"`: number, 32px square material chip, trade name. The active tab turns card-white and attaches to the open card. Pointer selection lays the new card over the old one (translateX -18px to 0 with a clip reveal, 260ms `cubic-bezier(0.23, 1, 0.32, 1)`); keyboard arrows, Home and End switch instantly; the hash (`#card-<trade>`) opens a trade directly. Without JavaScript every card is listed.

### Sample card
White, pinked top edge, ring hole top-left, 7/5 media and text. Trades without a photo show their sample colour with a practical hint of what to photograph.

### Live status
Mon-Fri 9:00-17:00 evaluated in Europe/Warsaw time: "Otwarte teraz, do 17:00" or "Zamknięte. Otwieramy … o 9:00", localised for Ukrainian. Before JavaScript it reads as the plain opening hours.

## Do's and Don'ts

### Do:
- Add real photos of the missing trades (bags, suitcases, keys, sharpening) as the owner supplies them; they replace the swatch hint in that card.
- Keep one open card and the tab spine as the page's first view.
- Honour `prefers-reduced-motion` (tabs switch without motion; the opening settle is skipped).

### Don't:
- Don't use customer review photos without their authors' consent.
- Don't show the 4.1 Google rating as a headline, and don't promise speed or punctuality.
- Don't add eyebrows over headings, extra accent colours, gradients, glass or imitation textures.
- Don't turn the index tabs into coloured side stripes; the chip is a square sample.

Known intentional detector finding: inactive tab panels are `visibility: hidden` (the tabs pattern), which the detector reports as content hidden at rest.
