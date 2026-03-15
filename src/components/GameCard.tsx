import { motion } from "framer-motion";
import { Flame, Beer, SmilePlus, Users } from "lucide-react";
import type { GameMode } from "@/data/questions";

interface GameCardProps {
  mode: GameMode;
  onSelect: (mode: GameMode) => void;
  index?: number;
}

const config: Record<GameMode, {
  title: string;
  subtitle: string;
  icon: typeof Flame;
  cardClass: string;
  neonClass: string;
  iconGlowClass: string;
  playerRange: string;
  ageRating?: string;
}> = {
  "truth-or-dare": {
    title: "Prawda czy Wyzwanie",
    subtitle: "Wyjaw sekrety lub zmierz się z wyzwaniem",
    icon: Flame,
    cardClass: "game-card-truth-dare",
    neonClass: "neon-text-truth-dare",
    iconGlowClass: "icon-glow-truth-dare",
    playerRange: "2-10",
    ageRating: "18+",
  },
  "never-have-i-ever": {
    title: "Czółko",
    subtitle: "Przyłóż telefon do czoła i zgaduj hasła!",
    icon: SmilePlus,
    cardClass: "game-card-never-have-i",
    neonClass: "neon-text-never-have-i",
    iconGlowClass: "icon-glow-never-have-i",
    playerRange: "3-10",
  },
  "drink-if": {
    title: "Wypij shota jeśli...",
    subtitle: "Pij, jeśli to Cię dotyczy",
    icon: Beer,
    cardClass: "game-card-drink-if",
    neonClass: "neon-text-drink-if",
    iconGlowClass: "icon-glow-drink-if",
    playerRange: "2-12",
    ageRating: "18+",
  },
};

export default function GameCard({ mode, onSelect, index = 0 }: GameCardProps) {
  const c = config[mode];
  const Icon = c.icon;

  return (
    <motion.button
      onClick={() => onSelect(mode)}
      className={`glass ${c.cardClass} w-full px-6 py-5 text-left transition-all active:scale-[0.97] flex flex-col min-h-[132px]`}
      style={{ borderRadius: "20px" }}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.12 }}
    >
      <div className="flex items-start gap-4 mb-3">
        <Icon className={`w-8 h-8 ${c.iconGlowClass} shrink-0`} strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          <h2 className={`text-lg font-bold ${c.neonClass} leading-tight`}>{c.title}</h2>
          <p className="text-sm text-muted-foreground mt-1 leading-snug">{c.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
          {c.playerRange} osób
        </span>
        {c.ageRating && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-destructive/20 text-destructive">
            {c.ageRating}
          </span>
        )}
      </div>
    </motion.button>
  );
}
