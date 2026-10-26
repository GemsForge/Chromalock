import { useEffect, useMemo, useState } from 'react';
import { multiplayerConfigured, subscribeToRoom } from '../../../infrastructure/multiplayer/supabaseRoom';

export type Lantern = { id:number; glyph:string; color:string; revealed:boolean; lit:boolean };
export type RoomState = { code:string; status:'idle'|'host'|'joined'; partnerConnected:boolean };

const colors = ['coral','gold','aqua','violet'];
const makeRoomCode = () => `CHRM-${Math.floor(100 + Math.random() * 900)}`;

export function useChromalockGame() {
  const [lanterns, setLanterns] = useState<Lantern[]>(() => colors.flatMap((color, pair) => [0,1].map(n => ({id:pair*2+n,glyph:['✦','◈','✧','◇'][pair],color,revealed:false,lit:false}))).sort(()=>Math.random()-.5));
  const [selected, setSelected] = useState<number[]>([]);
  const [litCount, setLitCount] = useState(0);
  const [room, setRoom] = useState<RoomState>({ code:'', status:'idle', partnerConnected:false });
  const playerId = 'player-' + Math.random().toString(36).slice(2, 10);

  useEffect(() => {
    if (!room.code || !multiplayerConfigured) return;
    return subscribeToRoom(room.code, playerId, (count) => {
      setRoom(current => ({ ...current, partnerConnected: count > 1 }));
    }) ?? undefined;
  }, [room.code]);

  const createRoom = () => setRoom({ code:makeRoomCode(), status:'host', partnerConnected:false });
  const joinRoom = (code:string) => {
    const normalized = code.trim().toUpperCase();
    if (/^CHRM-\\d{3}$/.test(normalized)) setRoom({ code:normalized, status:'joined', partnerConnected:false });
  };

  const choose = (id:number) => {
    if(selected.length===2 || lanterns.find(l=>l.id===id)?.lit || selected.includes(id)) return;
    const next=[...selected,id];
    setLanterns(ls=>ls.map(l=>l.id===id?{...l,revealed:true}:l));
    setSelected(next);
    if(next.length===2){
      const [a,b]=next;
      const match=lanterns.find(l=>l.id===a)?.color===lanterns.find(l=>l.id===b)?.color;
      if(match){setLanterns(ls=>ls.map(l=>next.includes(l.id)?{...l,lit:true}:l));setLitCount(c=>c+1)}
      setTimeout(()=>{setLanterns(ls=>ls.map(l=>next.includes(l.id)&&!l.lit?{...l,revealed:false}:l));setSelected([])},650)
    }
  };

  return useMemo(()=>({
    lanterns,choose,selected,litCount,room,createRoom,joinRoom,
    player:{name:'ASTRA',role:'COLOR NAVIGATOR'},
    partner:{name:room.partnerConnected?'MICA':'WAITING FOR PARTNER',role:'SIGNAL KEEPER'}
  }),[lanterns,selected,litCount,room]);
}
