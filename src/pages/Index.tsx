import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import type { GameMode, Difficulty } from "@/data/questions";
import { usePlayers } from "@/hooks/usePlayers";
import { useNoSleep } from "@/hooks/useNoSleep";
import GameCard from "@/components/GameCard";
import PlayerSetup from "@/components/PlayerSetup";
import DifficultySelector from "@/components/DifficultySelector";
import GameplayScreen from "@/components/GameplayScreen";
import CzolkoScreen from "@/components/CzolkoScreen";
import WinnerScreen from "@/components/WinnerScreen";

type Screen = "home" | "setup" | "play" | "winner";

const accentBgMap: Record<GameMode, string> = {
  "truth-or-dare": "bg-truth-dare",
  "never-have-i-ever": "bg-never-have-i",
  "drink-if": "bg-drink-if",
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedMode, setSelectedMode] = useState<GameMode>("truth-or-dare");
  const [difficulty, setDifficulty] = useState<Difficulty>("party");
  const { players, addPlayer, removePlayer, updateScore, resetScores } = usePlayers();

  useNoSleep(screen === "play");

  const selectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    setScreen("setup");
  };

  const startGame = () => {
    resetScores();
    setScreen("play");
  };

  const endGame = () => setScreen("winner");

  const goHome = () => {
    resetScores();
    setScreen("home");
  };

  const playAgain = () => {
    resetScores();
    setScreen("play");
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.97 },
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <AnimatePresence mode="wait">
        {screen === "home" && (
          <motion.div key="home" className="px-6 py-8 space-y-6" {...pageVariants} transition={{ duration: 0.35 }}>
            <div>
              <h1 className="text-3xl font-black header-gradient flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-truth-dare icon-glow-truth-dare" strokeWidth={1.5} />
                Imprezowe gry
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Wybierz grę</p>
            </div>
            <div className="space-y-4">
              {(["truth-or-dare", "never-have-i-ever", "drink-if"] as GameMode[]).map((mode, i) => (
                <GameCard key={mode} mode={mode} onSelect={selectMode} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {screen === "setup" && (
          <motion.div key="setup" className="px-6 py-8 space-y-6" {...pageVariants} transition={{ duration: 0.35 }}>
            <motion.button
              onClick={() => setScreen("home")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 active:opacity-70 py-2"
              whileTap={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Wróć
            </motion.button>

            <h2 className="text-2xl font-bold header-gradient">Ustawienia gry</h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Poziom trudności</p>
                <DifficultySelector value={difficulty} onChange={setDifficulty} accentClass={accentBgMap[selectedMode]} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Gracze ({players.length})</p>
                <PlayerSetup players={players} onAdd={addPlayer} onRemove={removePlayer} />
              </div>
            </div>

            <motion.button
              onClick={startGame}
              disabled={players.length < 2}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 ${
                players.length >= 2 ? `${accentBgMap[selectedMode]} text-primary-foreground` : "bg-secondary text-muted-foreground"
              }`}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Play className="w-5 h-5" strokeWidth={1.5} /> Rozpocznij grę
            </motion.button>
          </motion.div>
        )}

        {screen === "play" && (
          <motion.div key="play" className="h-full" {...pageVariants} transition={{ duration: 0.35 }}>
            {selectedMode === "never-have-i-ever" ? (
              <CzolkoScreen difficulty={difficulty} players={players} onUpdateScore={updateScore} onEnd={endGame} onExit={goHome} />
            ) : (
              <GameplayScreen mode={selectedMode} difficulty={difficulty} players={players} onUpdateScore={updateScore} onEnd={endGame} onExit={goHome} />
            )}
          </motion.div>
        )}

        {screen === "winner" && (
          <motion.div key="winner" className="h-full" {...pageVariants} transition={{ duration: 0.35 }}>
            <WinnerScreen players={players} onPlayAgain={playAgain} onHome={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
