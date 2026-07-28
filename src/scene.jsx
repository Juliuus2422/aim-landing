// Scene de validation animee, extraite du squelette V1 (theme propre a cette version).
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Database } from "lucide-react";
import { PHASE_MS, SCENARIOS, V_STEPS } from "./content.jsx";

const PHASE_BADGE = [
  { label: "événement", cls: "border-sky-600/30 text-sky-700/90 bg-sky-600/5" },
  { label: "analyse", cls: "border-orange-600/30 text-orange-700/90 bg-orange-600/5" },
  { label: "en attente", cls: "border-amber-600/30 text-amber-700/90 bg-amber-600/5" },
  { label: "en attente", cls: "border-amber-600/30 text-amber-700/90 bg-amber-600/5" },
  { label: "résolu", cls: "border-emerald-600/30 text-emerald-700/90 bg-emerald-600/5" },
];

// Durées de lecture par phase : voir PHASE_MS dans content.jsx.

export function ValidationScene() {
  const [phase, setPhase] = useState(0);
  const [scenario, setScenario] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (phase === 4) {
        setScenario((s) => (s + 1) % SCENARIOS.length);
        setPhase(0);
      } else {
        setPhase((p) => p + 1);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(timerRef.current);
  }, [phase, scenario]);

  const goTo = (i) => {
    setScenario(i);
    setPhase(0);
  };

  const sc = SCENARIOS[scenario];
  const active = Math.min(phase + 1, V_STEPS.length);

  return (
    <div className="w-full max-w-[640px] mx-auto">
      {/* pipeline */}
      <div className="flex items-center justify-between mb-6 px-1">
        {V_STEPS.map((s, i) => (
          <div key={s} className="flex-1 flex items-center min-w-0">
            <div className="flex flex-col items-center gap-2 min-w-0 flex-1">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  i < active
                    ? "bg-orange-600 shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                    : "bg-stone-900/15"
                }`}
              />
              <span
                className={`font-mono text-[9px] sm:text-[10px] tracking-wide uppercase transition-colors duration-500 truncate ${
                  i < active ? "text-orange-700" : "text-stone-900/30"
                }`}
              >
                {s}
              </span>
            </div>
            {i < V_STEPS.length - 1 && (
              <div className="h-px flex-shrink-0 w-3 sm:w-6 mx-0.5 mb-4 bg-stone-900/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-orange-600/70 transition-all duration-700"
                  style={{ width: i < active - 1 ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* carte */}
      <div className="vcard p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] text-stone-900/40 tracking-wider">
            aim · carte interactive
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-stone-900/10 text-stone-900/40">
              {sc.tag}
            </span>
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded-full border transition-colors duration-500 ${PHASE_BADGE[phase].cls}`}
            >
              {PHASE_BADGE[phase].label}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`head-${scenario}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold text-[15px] mb-1">{sc.title}</p>
            <p className="text-sm text-stone-900/45 mb-4">{sc.sub}</p>
          </motion.div>
        </AnimatePresence>

        <div className="min-h-[230px] sm:min-h-[190px]">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key={`ev-${scenario}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="vfield p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-sky-700/70 mb-1.5">
                    Événement entrant · {sc.event.source}
                  </p>
                  <p className="text-[13px] leading-relaxed text-stone-900/75">
                    {sc.event.text}
                  </p>
                </div>
              </motion.div>
            )}
            {phase === 1 && (
              <motion.div
                key={`an-${scenario}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-orange-700/70 mb-2.5">
                  Analyse · croisée avec ta mémoire
                </p>
                <div className="space-y-2">
                  {sc.analysis.map((line, i) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.75, duration: 0.45 }}
                      className="vfield flex items-start gap-2.5 p-2.5"
                    >
                      <Check size={13} className="text-emerald-700 mt-0.5 shrink-0" />
                      <span className="text-[13px] leading-relaxed text-stone-900/70">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {(phase === 2 || phase === 3) && (
              <motion.div
                key={`prop-${scenario}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="vfield p-3.5 mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-stone-900/35 mb-1.5">
                    {sc.label}
                  </p>
                  <p className="text-[13px] leading-relaxed text-stone-900/75">
                    {sc.proposal}
                  </p>
                </div>
                <motion.div
                  className="flex gap-2.5"
                  animate={{ opacity: phase === 3 ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.button
                    className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-stone-900 text-[#fef7ec]"
                    animate={
                      phase === 3
                        ? { scale: [1, 0.94, 1], boxShadow: "0 0 30px rgba(167,139,250,0.5)" }
                        : { scale: 1, boxShadow: "0 0 0px rgba(167,139,250,0)" }
                    }
                    transition={{ duration: 0.45, delay: phase === 3 ? 0.35 : 0 }}
                  >
                    {sc.cta}
                  </motion.button>
                  <button className="flex-1 rounded-xl py-2.5 text-sm font-medium border border-stone-900/12 text-stone-900/60">
                    Reformuler
                  </button>
                </motion.div>
              </motion.div>
            )}
            {phase === 4 && (
              <motion.div
                key={`done-${scenario}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-3 rounded-xl border border-emerald-600/25 bg-emerald-600/5 p-4 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600/15 text-emerald-700">
                    <Check size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      {sc.doneTitle}
                    </p>
                    <p className="text-xs text-stone-900/45">{sc.doneSub}</p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="vfield flex items-start gap-2.5 p-3"
                >
                  <Database size={13} className="text-orange-700 mt-0.5 shrink-0" />
                  <span className="text-[12px] leading-relaxed text-stone-900/55">
                    {sc.memory}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* navigation entre scénarios */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.tag}
            onClick={() => goTo(i)}
            className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
              i === scenario
                ? "border-orange-600/60 text-orange-800 bg-orange-600/10"
                : "border-stone-900/10 text-stone-900/40 hover:text-stone-900/75 hover:border-stone-900/25"
            }`}
          >
            {s.tag}
          </button>
        ))}
      </div>
    </div>
  );
}

