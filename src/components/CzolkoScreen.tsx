import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, LogOut, Check, X, Smartphone } from "lucide-react";
import type { Difficulty } from "@/data/questions";
import { getCzolkoWords, shuffleArray } from "@/data/questions";
import type { Player } from "@/hooks/usePlayers";
import { playScore, playFail, playSwipe, playSelect } from "@/hooks/useFeedback";
import Scoreboard from "./Scoreboard";

interface Props {
  difficulty: Difficulty;
  players: Player[];
  onUpdateScore: (id: string, delta: number) => void;
  onEnd: () => void;
  onExit: () => void;
}

const ROUND_TIME = 60;
type Phase = "ready" | "playing" | "result";

export default function CzolkoScreen({ difficulty, players, onUpdateScore, onEnd, onExit }: Props) {
  const words = useMemo(() => shuffleArray(getCzolkoWords(difficulty)), [difficulty]);

  const [pIndex, setPIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [roundScore, setRoundScore] = useState(0);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentPlayer = players[pIndex % players.length];
  const currentWord = words[wordIndex % words.length];
  const isLastPlayer = pIndex >= players.length - 1;

  // Blokuj/odblokuj orientację ekranu
  useEffect(() => {
    if (phase === "playing") {
      (screen.orientation as any)?.lock?.("landscape").catch(() => {});
    } else {
      (screen.orientation as any)?.unlock?.();
    }
    return () => {
      (screen.orientation as any)?.unlock?.();
    };
  }, [phase]);

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      setPhase("result");
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const startRound = useCallback(() => {
    setPhase("playing");
    setTimeLeft(ROUND_TIME);
    setRoundScore(0);
    playSelect();
  }, []);

  const handleCorrect = useCallback(() => {
    playScore();
    onUpdateScore(currentPlayer.id, 1);
    setRoundScore((s) => s + 1);
    setDirection(1);
    setWordIndex((i) => i + 1);
  }, [currentPlayer.id, onUpdateScore]);

  const handleSkip = useCallback(() => {
    playFail();
    setDirection(-1);
    setWordIndex((i) => i + 1);
  }, []);

  const nextPlayer = useCallback(() => {
    playSwipe();
    if (isLastPlayer) {
      onEnd();
      return;
    }
    setPIndex((i) => i + 1);
    setPhase("ready");
  }, [isLastPlayer, onEnd]);

  const timerColor = timeLeft <= 10 ? "text-destructive" : "text-never-have-i";

  const cardVariants = {
    enter: (d: number) => ({ x: d * 200, opacity: 0, scale: 0.8 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d * -200, opacity: 0, scale: 0.8 }),
  };

  // Widok poziomy podczas gry
  if (phase === "playing") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        style={{ transform: "rotate(90deg)", transformOrigin: "center center", width: "100vh", height: "100vw", top: "50%", left: "50%", marginTop: "-50vw", marginLeft: "-50vh" }}
      >
        <div className="w-full h-full flex flex-row items-center justify-between px-8 gap-6">
          {/* Pomiń */}
          <motion.button
            onClick={handleSkip}
            className="w-20 h-20 rounded-2xl bg-destructive/20 flex items-center justify-center flex-shrink-0"
            whileTap={{ scale: 0.85 }}
          >
            <X className="w-10 h-10 text-destructive" strokeWidth={2} />
          </motion.button>

          {/* Środek */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <div className={`text-6xl font-black tabular-nums ${timerColor}`}>
              {timeLeft}
            </div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={wordIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="glass glow-coral rounded-3xl px-10 py-8 w-full text-center"
              >
                <p className="text-5xl font-black">{currentWord}</p>
              </motion.div>
            </AnimatePresence>
            <p className="text-sm text-muted-foreground">{currentPlayer.name}</p>
          </div>

          {/* Poprawnie */}
          <motion.button
            onClick={handleCorrect}
            className="w-20 h-20 rounded-2xl bg-never-have-i flex items-center justify-center flex-shrink-0"
            whileTap={{ scale: 0.85 }}
          >
            <Check className="w-10 h-10 text-primary-foreground" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <motion.button
          onClick={onExit}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          <LogOut className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        </motion.button>
        <div className="text-center">
          <p className="text-xs text-never-have-i font-semibold">
            Gracz {pIndex + 1} / {players.length}
          </p>
          <p className="text-lg font-bold">{currentPlayer.name}</p>
        </div>
        <motion.button
          onClick={() => setShowScoreboard(true)}
          className="w-14 h-14 rounded-2xl glass flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          <Trophy className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {phase === "ready" && (
            <motion.div
              key="ready"
              className="text-center space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Smartphone className="w-16 h-16 mx-auto text-never-have-i icon-glow-never-have-i animate-float" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold header-gradient">Tura: {currentPlayer.name}</h2>
              <p className="text-muted-foreground">Przyłóż telefon do czoła.</p>
              <p className="text-sm text-muted-foreground">Inni gracze opisują hasło, a Ty zgadujesz!</p>
              <p className="text-xs text-muted-foreground">⏱ Masz {ROUND_TIME}s na turę</p>
              <motion.button
                onClick={startRound}
                className="bg-never-have-i text-primary-foreground font-bold px-8 py-4 rounded-2xl text-lg"
                whileTap={{ scale: 0.95 }}
              >
                Start! 🎯
              </motion.button>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              className="text-center space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="text-5xl">{roundScore >= 5 ? "🔥" : roundScore >= 3 ? "👏" : "😅"}</p>
              <h2 className="text-2xl font-bold header-gradient">Koniec czasu!</h2>
              <p className="text-muted-foreground">{currentPlayer.name} zgadł/a</p>
              <p className="text-5xl font-black neon-text-never-have-i">{roundScore}</p>
              <p className="text-muted-foreground">
                {roundScore === 1 ? "hasło" : roundScore >= 2 && roundScore <= 4 ? "hasła" : "haseł"}
              </p>
              <motion.button
                onClick={nextPlayer}
                className="bg-never-have-i text-primary-foreground font-bold px-8 py-4 rounded-2xl text-lg mt-4"
                whileTap={{ scale: 0.95 }}
              >
                {isLastPlayer ? <>Podsumowanie 🏆</> : <>Następny gracz</>}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Scoreboard open={showScoreboard} onClose={() => setShowScoreboard(false)} players={players} />
    </div>
  );
}