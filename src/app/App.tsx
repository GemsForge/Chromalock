import { Button, Modal, Progress, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { ChromalockBoard } from '../features/constellation/components/ChromalockBoard';
import { useChromalockGame } from '../features/constellation/model/useChromalockGame';

export function App() {
  const game = useChromalockGame();
  const [showRules, setShowRules] = useState(false);
  return <main className="app-shell">
    <header className="masthead"><div className="sigil">✦</div><div><span className="kicker">THE CHROMALOCK REMEMBERS</span><Title order={1}>CHROMA<span>LOCK</span></Title></div><Button className="help" variant="outline" onClick={() => setShowRules(true)}>HOW TO PLAY</Button></header>
    <section className="intro"><div><span className="kicker">COOPERATIVE COLOR GAME · ROOM {game.roomCode}</span><Title order={2}>Find the shared<br/><em>signal.</em></Title></div><Text component="p">Two players restore a pastel factory room. Each choice is visible, but only cooperation can reveal the path to the exit.</Text></section>
    <section className="hud"><div><b>{game.player.name}</b><small>{game.player.role}</small></div><div className="status"><i/> PARTNER LINKED <span>{game.partner.name}</span></div><div className="beacon"><small>LANTERNS LIT</small><strong>{game.litCount} / 4</strong><Progress value={game.litCount * 25} color="yellow" /></div></section>
    <ChromalockBoard {...game} />
    <Modal opened={showRules} onClose={() => setShowRules(false)} title="CHROMALOCK FIELD GUIDE" centered><Text>Both players select lanterns. Matching colors wake the room and reveal the exit. Four correct connections complete the level.</Text></Modal>
  </main>;
}
