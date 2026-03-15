import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Crown } from "lucide-react";
import type { Player } from "@/hooks/usePlayers";

interface Props {
  open: boolean;
  onClose: () => void;
  players: Player[];
}

export default function Scoreboard({ open, onClose, players }: Props) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl p-6 w-full max-w-sm relative z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold header-gradient flex items-center gap-2">
                <Trophy className="w-5 h-5" strokeWidth={1.5} /> Tablica wyników
              </h3>
              <motion.button onClick={onClose} whileTap={{ scale: 0.85 }}>
                <X className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </motion.button>
            </div>
            <div className="space-y-2">
              {sorted.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                  <span className="text-sm text-muted-foreground w-6">#{i + 1}</span>
                  {i === 0 && <Crown className="w-4 h-4 text-never-have-i" strokeWidth={1.5} />}
                  <span className="flex-1 font-medium">{p.name}</span>
                  <span className="font-bold tabular-nums">{p.score}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
