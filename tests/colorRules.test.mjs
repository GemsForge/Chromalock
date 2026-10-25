import assert from 'node:assert/strict';
import test from 'node:test';
import { colorsMatch, nextColor, pastelColors } from '../src/features/color-match/model/colorRules.ts';

test('defines the soft pastel palette', () => {
  assert.deepEqual(Object.keys(pastelColors), ['blush', 'butter', 'sky', 'mint', 'lilac']);
});

test('matches only identical cooperative target colors', () => {
  assert.equal(colorsMatch('sky', 'sky'), true);
  assert.equal(colorsMatch('sky', 'mint'), false);
});

test('cycles the palette in both directions', () => {
  assert.equal(nextColor('lilac', 'next'), 'blush');
  assert.equal(nextColor('blush', 'previous'), 'lilac');
});
