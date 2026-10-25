# MVP foundation

Story #5 establishes the first playable foundation for Chromalock.

## Current slice

- The color-matching rule is isolated in `src/features/color-match/model/colorRules.ts`.
- The palette uses soft pastel contracts: blush, butter, sky, mint, and lilac.
- Color matching is deterministic and cooperative: both players must select the same target color.
- Palette navigation wraps in both directions so keyboard controls can reuse the same rule.

## Verification

Run:

```bash
npm run build
npm test
```

The first factory room and keyboard interaction remain in the existing constellation feature; this slice provides the reusable color-rule boundary needed to connect that room to the MVP loop.
