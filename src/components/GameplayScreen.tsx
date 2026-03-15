import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Check, X, ChevronRight, Award, HelpCircle, Zap, LogOut } from "lucide-react";
import type { GameMode, Difficulty, Question } from "@/data/questions";
import { getQuestions, shuffleArray } from "@/data/questions";
import type { Player } from "@/hooks/usePlayers";
import { playSwipe, playScore, playFail, playSelect } from "@/hooks/useFeedback";
import Scoreboard from "./Scoreboard";

interface Props {
  mode: GameMode;
  difficulty: Difficulty;
  players: Player[];
  onUpdateScore: (id: string, delta: number) => void;
  onEnd: () => void;
  onExit: () => void;
}

const modeColors: Record<GameMode, { text: string; neon: string; glow: string; bg: string }> = {
  "truth-or-dare": { text: "text-truth-dare", neon: "neon-text-purple", glow: "glow-purple", bg: "bg-truth-dare" },
  "never-have-i-ever": { text: "text-never-have-i", neon: "neon-text-coral", glow: "glow-coral", bg: "bg-never-have-i" },
  "drink-if": { text: "text-drink-if", neon: "neon-text-cyan", glow: "glow-cyan", bg: "bg-drink-if" },
};

export default function GameplayScreen({ mode, difficulty, players, onUpdateScore, onEnd, onExit }: Props) {
  const allQuestions = useMemo(() => shuffleArray(getQuestions(mode, difficulty)), [mode, difficulty]);

  const truthQuestions = useMemo(() => shuffleArray(allQuestions.filter(q => q.type === "truth")), [allQuestions]);
  const dareQuestions = useMemo(() => shuffleArray(allQuestions.filter(q => q.type === "dare")), [allQuestions]);

  const [qIndex, setQIndex] = useState(0);
  const [pIndex, setPIndex] = useState(0);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [direction, setDirection] = useState(1);

  const [choosingType, setChoosingType] = useState(mode === "truth-or-dare");
  const [truthIdx, setTruthIdx] = useState(0);
  const [dareIdx, setDareIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const colors = modeColors[mode];
  const currentPlayer = players[pIndex % players.length];

  const regularQuestion = allQuestions[qIndex % allQuestions.length];
  const displayQuestion = mode === "truth-or-dare" ? currentQuestion : regularQuestion;

  const totalQuestions = mode === "truth-or-dare"
    ? truthQuestions.length + dareQuestions.length
    : allQuestions.length;
  const currentNum = mode === "truth-or-dare" ? truthIdx + dareIdx : qIndex;
  const isLastQuestion = currentNum >= totalQuestions - 1;

  const chooseTruth = () => {
    if (truthIdx < truthQuestions.length) {
      setCurrentQuestion(truthQuestions[truthIdx]);
      setChoosingType(false);
      playSelect();
    }
  };

  const chooseDare = () => {
    if (dareIdx < dareQuestions.length) {
      setCurrentQuestion(dareQuestions[dareIdx]);
      setChoosingType(false);
      playSelect();
    }
  };

  const next = () => {
    setDirection(1);
    playSwipe();
    if (isLastQuestion) {
      onEnd();
      return;
    }

    if (mode === "truth-or-dare") {
      if (currentQuestion?.type === "truth") {
        setTruthIdx(i => i + 1);
      } else {
        setDareIdx(i => i + 1);
      }
      setCurrentQuestion(null);
      setChoosingType(true);
    } else {
      setQIndex((i) => i + 1);
    }
    setPIndex((i) => i + 1);
  };

  const handleScore = (delta: number) => {
    onUpdateScore(currentPlayer.id, delta);
    if (delta > 0) playScore();
    else playFail();
    next();
  };

  const variants = {
    enter: (d: number) => ({ x: d * 300, opacity: 0, rotateZ: d * 8, scale: 0.9 }),
    center: { x: 0, opacity: 1, rotateZ: 0, scale: 1 },
    exit: (d: number) => ({ x: d * -300, opacity: 0, rotateZ: d * -8, scale: 0.9 }),
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="h-1 bg-secondary rounded-full mx-4 mt-2 overflow-hidden">
        <motion.div className={`h-full ${colors.bg} rounded-full`} animate={{ width: `${((currentNum + 1) / totalQuestions) * 100}%` }} />
      </div>

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
          <p className={`text-xs ${colors.text} font-semibold`}>{currentNum + 1} / {totalQuestions}</p>
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

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait" custom={direction}>
          {mode === "truth-or-dare" && choosingType ? (
            <motion.div
              key="choosing"
              className="w-full space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="text-center text-muted-foreground text-sm mb-4">Wybierz:</p>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={chooseTruth}
                  disabled={truthIdx >= truthQuestions.length}
                  className="glass glow-purple rounded-3xl p-10 flex flex-col items-center justify-center gap-3 transition-transform disabled:opacity-30"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <HelpCircle className="w-8 h-8 text-truth-dare" strokeWidth={1.5} />
                  <span className="font-bold text-lg">Prawda</span>
                </motion.button>
                <motion.button
                  onClick={chooseDare}
                  disabled={dareIdx >= dareQuestions.length}
                  className="glass glow-purple rounded-3xl p-10 flex flex-col items-center justify-center gap-3 transition-transform disabled:opacity-30"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Zap className="w-8 h-8 text-truth-dare" strokeWidth={1.5} />
                  <span className="font-bold text-lg">Wyzwanie</span>
                </motion.button>
              </div>
            </motion.div>
          ) : displayQuestion ? (
            <motion.div
              key={currentNum}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`glass ${colors.glow} rounded-3xl p-8 w-full max-w-md text-center`}
            >
              {displayQuestion.type && (
                <p className={`text-xs font-semibold ${colors.text} mb-3 uppercase tracking-wider`}>
                  {displayQuestion.type === "truth" ? "Prawda" : "Wyzwanie"}
                </p>
              )}
              <p className="text-xl font-semibold leading-relaxed">{displayQuestion.text}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="px-6 pb-8 pt-4">
        {mode === "truth-or-dare" && choosingType ? null : (
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={() => handleScore(0)}
              className="w-18 h-18 rounded-2xl glass flex items-center justify-center"
              whileTap={{ scale: 0.85, rotate: -10 }}
              style={{ width: 72, height: 72 }}
            >
              <X className="w-7 h-7 text-destructive" strokeWidth={1.5} />
            </motion.button>
            <motion.button
              onClick={() => handleScore(1)}
              className={`rounded-2xl ${colors.bg} flex items-center justify-center`}
              whileTap={{ scale: 0.85 }}
              animate={{ boxShadow: ["0 0 0px transparent", "0 0 25px hsl(var(--primary) / 0.4)", "0 0 0px transparent"] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              style={{ width: 88, height: 88 }}
            >
              <Check className="w-9 h-9 text-primary-foreground" strokeWidth={2} />
            </motion.button>
            <motion.button
              onClick={next}
              className="w-18 h-18 rounded-2xl glass flex items-center justify-center"
              whileTap={{ scale: 0.85 }}
              style={{ width: 72, height: 72 }}
            >
              {isLastQuestion ? (
                <Award className="w-7 h-7 text-never-have-i" strokeWidth={1.5} />
              ) : (
                <ChevronRight className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
              )}
            </motion.button>
          </div>
        )}
      </div>

      <Scoreboard open={showScoreboard} onClose={() => setShowScoreboard(false)} players={players} />
    </div>
  );
}
