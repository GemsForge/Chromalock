# Cooperative color matching

Story #8 makes the pastel color lock a shared action.

## Rule

The lock opens only when both players select the same target color. A single player selecting the right color is not enough.

## Player clarity

- Each player sees their current selection.
- The shared target remains visible in the room HUD.
- A lock-open state must use color plus text, border, or icon feedback.
- Keyboard navigation continues to use the existing palette cycle.

The pure rule is `cooperativeMatch(playerOne, playerTwo, target)` in `src/features/color-match/model/colorRules.ts`.
