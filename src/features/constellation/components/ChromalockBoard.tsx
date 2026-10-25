import { Badge, Button, Paper, Text } from '@mantine/core';
import type { Lantern } from '../model/useChromalockGame';

type BoardProps = {
  lanterns: Lantern[];
  choose: (id: number) => void;
  selected: number[];
  litCount: number;
};

export function ChromalockBoard({ lanterns, choose, selected, litCount }: BoardProps) {
  const complete = litCount === 4;
  return (
    <section className="factory-room" aria-label="Chromalock factory room">
      <Paper component="aside" className="room-panel room-objective" radius="md" shadow="sm">
        <span className="kicker">ROOM OBJECTIVE</span>
        <Text fw={700}>Wake four lanterns together.</Text>
        <Text size="sm" c="dimmed">Match the shared signals to unlock the exit.</Text>
      </Paper>
      <Paper component="section" className="play-zone" radius="md" shadow="sm">
        <div className="shoreline"><span>CHROMALOCK FACTORY · EAST BREAKWATER</span><Badge color={complete ? 'teal' : 'yellow'}>{complete ? 'EXIT UNLOCKED' : 'EXIT LOCKED'}</Badge></div>
        <div className="active-object"><span className="active-dot" aria-hidden="true" /><span>ACTIVE OBJECT · COLOR LANTERN ARRAY</span></div>
        <div className="lantern-grid">{lanterns.map((lantern) => <Button key={lantern.id} variant="subtle" className={`lantern ${lantern.color} ${lantern.revealed ? 'revealed' : ''} ${lantern.lit ? 'lit' : ''} ${selected.includes(lantern.id) ? 'selected' : ''}`} onClick={() => choose(lantern.id)} aria-label={`Lantern ${lantern.id + 1}`}>{(lantern.revealed || lantern.lit) && <span>{lantern.glyph}</span>}</Button>)}</div>
        <div className="turn-note" aria-live="polite"><span className="signal-line" />{selected.length === 1 ? 'SIGNAL SENT · PARTNER IS LISTENING' : 'SELECT A LANTERN TO SEND A SIGNAL'}</div>
      </Paper>
      <Paper component="aside" className="room-panel room-exit" radius="md" shadow="sm"><span className="kicker">EXIT</span><Text fw={700} c={complete ? 'teal' : 'yellow'}>{complete ? 'OPEN' : 'LOCKED'}</Text><Text size="sm" c="dimmed">{complete ? 'The room is clear. Move together.' : `${4 - litCount} lanterns remain.`}</Text></Paper>
    </section>
  );
}
