import { useState } from 'react';
import { ChromalockBoard } from '../features/constellation/components/ChromalockBoard';
import { useChromalockGame } from '../features/constellation/model/useChromalockGame';

export function App() {
  const game = useChromalockGame();
  const [showRules, setShowRules] = useState(false);
  return <main className="app-shell">
    <header className="masthead"><div className="sigil">✦</div><div><span className="kicker">THE CHROMALOCK REMEMBERS</span><h1>CHROMA<span>LOCK</span></h1></div><button className="help" onClick={() => setShowRules(true)}>HOW TO PLAY</button></header>
    <section className="intro"><div><span className="kicker">COOPERATIVE COLOR GAME · ROOM {game.roomCode}</span><h2>Find the shared<br/><em>signal.</em></h2></div><p>Two players restore a pastel factory room. Each choice is visible, but only cooperation can reveal the path to the exit.</p></section>
    <section className="hud"><div><b>{game.player.name}</b><small>{game.player.role}</small></div><div className="status"><i/> PARTNER LINKED <span>{game.partner.name}</span></div><div className="beacon"><small>LANTERNS LIT</small><strong>{game.litCount} / 4</strong><div><i style={{width:`${game.litCount*25}%`}}/></div></div></section>
    <ChromalockBoard {...game} />
    {showRules && <div className="modal-backdrop" onClick={() => setShowRules(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button onClick={()=>setShowRules(false)}>×</button><span className="kicker">CHROMALOCK FIELD GUIDE</span><h3>Read the room together.</h3><p>Both players select lanterns. Matching colors wake the room and reveal the exit. Four correct connections complete the level.</p></div></div>}
  </main>;
}
