import assert from 'node:assert/strict';
import test from 'node:test';
import { completeLevel, createProgression, levels } from '../src/features/progression/model/progression.ts';

test('introduces one new obstacle idea per level', () => {
  assert.equal(levels.length, 3);
  assert.notEqual(levels[0].obstacle, levels[1].obstacle);
  assert.notEqual(levels[1].obstacle, levels[2].obstacle);
});

test('awards points and upgrades the avatar as levels complete', () => {
  let state = createProgression();
  state = completeLevel(state, 1);
  assert.equal(state.score, 100);
  assert.equal(state.avatarStage, 'uniform');

  state = completeLevel(state, 2);
  assert.equal(state.score, 300);
  assert.equal(state.avatarStage, 'accent');

  state = completeLevel(state, 3);
  assert.equal(state.score, 600);
  assert.equal(state.avatarStage, 'spark');
});

test('does not award duplicate completion points', () => {
  const state = completeLevel(completeLevel(createProgression(), 1), 1);
  assert.equal(state.score, 100);
});
