import { Badge, Button, Group, Modal, Paper, Progress, Stack, Text, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { ChromalockBoard } from '../features/constellation/components/ChromalockBoard';
import { useChromalockGame } from '../features/constellation/model/useChromalockGame';

export function App() {
  const game = useChromalockGame();
  const [showRules, setShowRules] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  return <main className="app-shell">
    <header className="masthead"><div className="sigil">✦</div><div><span className="kicker">THE CHROMALOCK REMEMBERS</span><Title order={1}>CHROMA<span>LOCK</span></Title></div><Button className="help" variant="outline" onClick={() => setShowRules(true)}>HOW TO PLAY</Button></header>
    <section className="intro"><div><span className="kicker">COOPERATIVE COLOR GAME · ROOM {game.room.code || 'UNASSIGNED'}</span><Title order={2}>Find the shared<br/><em>signal.</em></Title></div><Text component="p">Two players restore a pastel factory room. Each choice is visible, but only cooperation can reveal the path to the exit.</Text></section>

    <Paper className="room-lobby" radius="md" shadow="sm" p="lg" withBorder>
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <span className="kicker">ROOM LINK</span>
          <Text fw={700}>{game.room.status === 'idle' ? 'Create or join a room' : game.room.status === 'host' ? 'Room ready to share' : 'Room joined'}</Text>
          <Text size="sm" c="dimmed">Use the room code so both players can identify the same session.</Text>
        </Stack>
        <Badge color={game.room.partnerConnected ? 'teal' : game.room.status === 'host' ? 'yellow' : 'gray'}>
          {game.room.partnerConnected ? 'PARTNER CONNECTED' : game.room.status === 'host' ? 'WAITING FOR PARTNER' : game.room.status === 'joined' ? 'SYNC PENDING' : 'NO ROOM'}
        </Badge>
      </Group>
      <Group mt="md" align="end">
        <Button onClick={game.createRoom}>CREATE ROOM</Button>
        <TextInput label="Room code" placeholder="CHRM-123" value={joinCode} onChange={(event) => setJoinCode(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === 'Enter') game.joinRoom(joinCode); }} />
        <Button variant="light" onClick={() => game.joinRoom(joinCode)} disabled={!joinCode.trim()}>JOIN ROOM</Button>
      </Group>
      {game.room.code && <Text size="sm" mt="sm" c="yellow">Room <strong>{game.room.code}</strong> joined. Multiplayer sync will begin when the server confirms the room.</Text>}
    </Paper>

    <section className="hud"><div><b>{game.player.name}</b><small>{game.player.role}</small></div><div className="status"><i/> {game.partner.name === 'WAITING FOR PARTNER' ? 'WAITING FOR PARTNER' : 'PARTNER LINKED'} <span>{game.partner.name}</span></div><div className="beacon"><small>LANTERNS LIT</small><strong>{game.litCount} / 4</strong><Progress value={game.litCount * 25} color="yellow" /></div></section>
    <ChromalockBoard {...game} />
    <Modal opened={showRules} onClose={() => setShowRules(false)} title="CHROMALOCK FIELD GUIDE" centered><Text>Both players select lanterns. Matching colors wake the room and reveal the exit. Four correct connections complete the level.</Text></Modal>
  </main>;
}
