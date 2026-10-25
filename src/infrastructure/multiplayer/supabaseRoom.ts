import { createClient, type RealtimeChannel } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const multiplayerConfigured = Boolean(url && anonKey);

const client = multiplayerConfigured ? createClient(url, anonKey) : null;

export function subscribeToRoom(
  roomCode: string,
  playerId: string,
  onPresence: (count: number) => void,
): (() => void) | null {
  if (!client || !roomCode) return null;

  const channel: RealtimeChannel = client.channel(`room:${roomCode}`, {
    config: { presence: { key: playerId } },
  });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      onPresence(Object.keys(state).length);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ playerId, joinedAt: new Date().toISOString() });
      }
    });

  return () => {
    void client.removeChannel(channel);
  };
}
