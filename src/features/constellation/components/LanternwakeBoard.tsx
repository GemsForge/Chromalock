import type { Lantern } from '../model/useLanternwakeGame';

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
      <aside className="room-panel room-objective">
        <span className="kicker">ROOM OBJECTIVE</span>
        <strong>Wake four lanterns together.</strong>
        <p>Match the shared signals to unlock the exit.</p>
      </aside>
      <section className="play-zone">
        <div className="shoreline">
          <span>CHROMALOCK FACTORY · EAST BREAKWATER</span>
          <span>{complete ? 'EXIT UNLOCKED' : 'EXIT LOCKED'}</span>
        </div>
        <div className="active-object"><span className="active-dot" aria-hidden="true" /><span>ACTIVE OBJECT · COLOR LANTERN ARRAY</span></div>
        <div className="lantern-grid">
          {lanterns.map((lantern) => (
            <button key={lantern.id} className={`lantern ${lantern.color} ${lantern.revealed ? 'revealed' : ''} ${lantern.lit ? 'lit' : ''} ${selected.includes(lantern.id) ? 'selected' : ''}`} onClick={() => choose(lantern.id)} aria-label={`Lantern ${lantern.id + 1}`}>
              {(lantern.revealed || lantern.lit) && <span>{lantern.glyph}</span>}
            </button>
          ))}
        </div>
        <div className="turn-note" aria-live="polite"><span className="signal-line" />{selected.length === 1 ? 'SIGNAL SENT · PARTNER IS LISTENING' : 'SELECT A LANTERN TO SEND A SIGNAL'}</div>
      </section>
      <aside className="room-panel room-exit"><span className="kicker">EXIT</span><strong>{complete ? 'OPEN' : 'LOCKED'}</strong><p>{complete ? 'The room is clear. Move together.' : `${4 - litCount} lanterns remain.`}</p></aside>
    </section>
  );
}
