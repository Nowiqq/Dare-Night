import { useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, RotateCcw, Home, Star } from "lucide-react";
import type { Player } from "@/hooks/usePlayers";
import { playWinner } from "@/hooks/useFeedback";

interface Props {
  players: Player[];
  onPlayAgain: () => void;
  onHome: () => void;
}

export default function WinnerScreen({ players, onPlayAgain, onHome }: Props) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  useEffect(() => {
    playWinner();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center relative overflow-hidden">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-never-have-i/30"
          initial={{ y: "100%", x: `${15 + i * 15}%`, opacity: 0 }}
          animate={{ y: "-100%", opacity: [0, 1, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Crown className="w-20 h-20 text-never-have-i icon-glow-never-have-i" strokeWidth={1.5} />
      </motion.div>

      <motion.h1
        className="text-2xl font-bold header-gradient mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Król Imprezy
      </motion.h1>

      <motion.p
        className="text-4xl font-black neon-text-never-have-i mt-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        {winner?.name}
      </motion.p>

      <motion.p
        className="text-muted-foreground mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {winner?.score} punktów
      </motion.p>

      <motion.div
        className="mt-6 space-y-2 w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {sorted.slice(1, 4).map((p, i) => (
          <div key={p.id} className="flex items-center gap-3 glass rounded-xl px-4 py-2">
            <span className="text-sm text-muted-foreground">#{i + 2}</span>
            <span className="flex-1">{p.name}</span>
            <span className="font-bold tabular-nums">{p.score}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex gap-3 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <motion.button
          onClick={onPlayAgain}
          className="glass rounded-2xl px-6 py-3 flex items-center gap-2 font-semibold"
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.5} /> Jeszcze raz
        </motion.button>
        <motion.button
          onClick={onHome}
          className="glass rounded-2xl px-6 py-3 flex items-center gap-2 text-muted-foreground"
          whileTap={{ scale: 0.95 }}
        >
          <Home className="w-4 h-4" strokeWidth={1.5} />
        </motion.button>
      </motion.div>
    </div>
  );
}
