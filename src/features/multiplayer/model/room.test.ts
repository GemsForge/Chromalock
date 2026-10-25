import assert from 'node:assert/strict';
import test from 'node:test';
import { createRoom, joinRoom, setPlayerReady } from './room.ts';

const player = (id: string) => ({ id, displayName: id, ready: false });

test('creates a room with the navigator role', () => {
  const room = createRoom('ABCD', player('one'));
  assert.equal(room.phase, 'waiting');
  assert.deepEqual(room.players.map(({ role }) => role), ['navigator']);
});

test('joins a second player as signal keeper', () => {
  const room = joinRoom(createRoom('ABCD', player('one')), player('two'));
  assert.deepEqual(room.players.map(({ role }) => role), ['navigator', 'signal-keeper']);
});

test('rejects a third player and preserves duplicate joins', () => {
  const room = joinRoom(createRoom('ABCD', player('one')), player('two'));
  assert.deepEqual(joinRoom(room, player('two')), room);
  assert.throws(() => joinRoom(room, player('three')), /Room is full/);
});

test('starts play only when both players are ready', () => {
  let room = joinRoom(createRoom('ABCD', player('one')), player('two'));
  room = setPlayerReady(room, 'one', true);
  assert.equal(room.phase, 'waiting');
  room = setPlayerReady(room, 'two', true);
  assert.equal(room.phase, 'playing');
});

test('rejects readiness changes for unknown players', () => {
  assert.throws(
    () => setPlayerReady(createRoom('ABCD', player('one')), 'missing', true),
    /Player is not in the room/,
  );
});
