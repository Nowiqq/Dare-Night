import { useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import type { Player } from "@/hooks/usePlayers";

interface Props {
  players: Player[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

const ANIMAL_EMOJIS = ["🐱", "🐶", "🦊", "🐻", "🐼", "🐯", "🦁", "🐸", "🐵", "🦄", "🐰", "🐹", "🐨", "🐙", "🐧"];

const getEmojiForName = (name: string) => {
  if (!name) return "🐾";
  const sum = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ANIMAL_EMOJIS[sum % ANIMAL_EMOJIS.length];
};

export default function PlayerSetup({ players, onAdd, onRemove }: Props) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input);
      setInput("");
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="space-y-3">
      <div className="glass rounded-2xl flex items-center overflow-hidden">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Wpisz imię gracza..."
          className="flex-1 bg-transparent px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground outline-none"
          autoFocus
        />
        <motion.button onClick={handleAdd} className="p-3 mr-1" whileTap={{ scale: 0.85 }}>
          <Plus className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        </motion.button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {players.map((p, i) => (
            <motion.div
              key={p.id}
              className="player-pill"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.03 }}
            >
              <span>{getEmojiForName(p.name)}</span>
              <span className="text-foreground">{p.name}</span>
              <motion.button
                onClick={() => onRemove(p.id)}
                className="ml-1 opacity-50 hover:opacity-100 transition-opacity p-1"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
