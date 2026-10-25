# Multiplayer room contract

## Story

This contract supports Story #4: cooperative multiplayer core.

## First vertical slice

- A player can create a room with a short code.
- A second player can join the room.
- The first player receives the Navigator role.
- The second player receives the Signal Keeper role.
- A room cannot accept more than two players.
- The room enters the playing phase only after both players are ready.

## Boundary

This module is a pure domain contract. It does not open sockets, persist data, or trust client authority. A transport adapter will dispatch typed commands to an authoritative room service in a follow-up change.

## Verification targets

- Creating a room creates one waiting player.
- Joining adds the second player with the complementary role.
- A third player is rejected.
- Duplicate joins are idempotent.
- Both ready players transition the room to playing.
