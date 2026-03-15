import { useState, useEffect } from "react";

export interface Player {
  id: string;
  name: string;
  score: number;
}

const STORAGE_KEY = "party-games-players";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const addPlayer = (name: string) => {
    if (!name.trim() || players.some(p => p.name.toLowerCase() === name.trim().toLowerCase())) return;
    setPlayers(prev => [...prev, { id: crypto.randomUUID(), name: name.trim(), score: 0 }]);
  };

  const removePlayer = (id: string) => setPlayers(prev => prev.filter(p => p.id !== id));

  const updateScore = (id: string, delta: number) =>
    setPlayers(prev => prev.map(p => (p.id === id ? { ...p, score: p.score + delta } : p)));

  const resetScores = () => setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));

  return { players, addPlayer, removePlayer, updateScore, resetScores, setPlayers };
}
