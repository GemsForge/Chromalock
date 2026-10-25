# Pastel theme contracts

Story #7 defines the shared color vocabulary for Chromalock.

## Theme libraries

- **Pastel** is the default game palette.
- **Primary** is reserved for strong status and action states.
- **Blue-ish** supports cool environmental surfaces and secondary states.
- **Grayscale** provides readable text, borders, and neutral UI.

## Accessibility contract

Color is never the only signal. Interactive states must also provide at least one of:

- a border or outline
- a symbol or icon
- a text label

The contracts live in `src/shared/theme/themeTokens.ts` so game features can consume them without duplicating hex values.
