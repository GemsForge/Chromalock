export type ChromalockColor = 'blush' | 'butter' | 'sky' | 'mint' | 'lilac';

export const pastelColors: Record<ChromalockColor, string> = {
  blush: '#F6C6C6',
  butter: '#F5E6A8',
  sky: '#C7DDF5',
  mint: '#C6E8D5',
  lilac: '#DCCCF2',
};

export function colorsMatch(
  left: ChromalockColor,
  right: ChromalockColor,
): boolean {
  return left === right;
}

export function cooperativeMatch(
  playerOne: ChromalockColor | null,
  playerTwo: ChromalockColor | null,
  target: ChromalockColor,
): boolean {
  return playerOne === target && playerTwo === target;
}

export function nextColor(
  current: ChromalockColor,
  direction: 'next' | 'previous',
): ChromalockColor {
  const palette = Object.keys(pastelColors) as ChromalockColor[];
  const index = palette.indexOf(current);
  const offset = direction === 'next' ? 1 : -1;
  return palette[(index + offset + palette.length) % palette.length];
}
