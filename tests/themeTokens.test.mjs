import assert from 'node:assert/strict';
import test from 'node:test';
import { accessibilityCue, colorThemes } from '../src/shared/theme/themeTokens.ts';

test('provides all Chromalock color theme contracts', () => {
  assert.deepEqual(Object.keys(colorThemes), ['pastel', 'primary', 'blueish', 'grayscale']);
  assert.equal(colorThemes.pastel.sky, '#C7DDF5');
  assert.equal(colorThemes.grayscale[900], '#1E293B');
});

test('defines non-color accessibility cues', () => {
  assert.match(accessibilityCue.border, /border/i);
  assert.match(accessibilityCue.icon, /symbol|icon/i);
  assert.match(accessibilityCue.text, /text label/i);
});
