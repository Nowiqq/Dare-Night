import { motion } from "framer-motion";
import type { Difficulty } from "@/data/questions";

interface Props {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
  accentClass: string;
}

const levels: { key: Difficulty; label: string; emoji: string }[] = [
  { key: "soft", label: "Łagodne", emoji: "😇" },
  { key: "party", label: "Imprezowe", emoji: "🥳" },
  { key: "extreme", label: "18+", emoji: "🔥" },
];

export default function DifficultySelector({ value, onChange, accentClass }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {levels.map((l) => (
        <motion.button
          key={l.key}
          onClick={() => onChange(l.key)}
          className="relative w-full aspect-square max-h-20 text-xs sm:text-sm focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 overflow-visible"
          whileTap={{ scale: 0.96 }}
        >
          <div
            className={`difficulty-pill w-full h-full flex flex-col items-center justify-center gap-1 glass ${
              value === l.key ? `${accentClass} text-primary-foreground font-bold` : "text-muted-foreground"
            }`}
          >
            <span className="text-xl">{l.emoji}</span>
            <span>{l.label}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
