export type PlayerRole = 'navigator' | 'signal-keeper';

export type RoomPlayer = {
  id: string;
  displayName: string;
  role: PlayerRole;
  ready: boolean;
};

export type RoomState = {
  code: string;
  phase: 'waiting' | 'playing' | 'complete';
  players: RoomPlayer[];
};

export type RoomCommand =
  | { type: 'create-room'; player: Omit<RoomPlayer, 'role'> }
  | { type: 'join-room'; player: Omit<RoomPlayer, 'role'> }
  | { type: 'set-ready'; playerId: string; ready: boolean };

export function createRoom(code: string, player: Omit<RoomPlayer, 'role'>): RoomState {
  return {
    code,
    phase: 'waiting',
    players: [{ ...player, role: 'navigator' }],
  };
}

export function joinRoom(room: RoomState, player: Omit<RoomPlayer, 'role'>): RoomState {
  if (room.players.some((candidate) => candidate.id === player.id)) return room;
  if (room.players.length >= 2) throw new Error('Room is full');

  return {
    ...room,
    players: [...room.players, { ...player, role: 'signal-keeper' }],
  };
}

export function setPlayerReady(room: RoomState, playerId: string, ready: boolean): RoomState {
  const playerExists = room.players.some((player) => player.id === playerId);
  if (!playerExists) throw new Error('Player is not in the room');

  const players = room.players.map((player) =>
    player.id === playerId ? { ...player, ready } : player,
  );

  return {
    ...room,
    players,
    phase: players.length === 2 && players.every((player) => player.ready) ? 'playing' : room.phase,
  };
}
