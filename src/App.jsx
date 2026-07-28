/* =============================================================================
   L'AIM : landing V2 « Récit »
   Architecture narrative verticale : la page se lit comme un film, chapitre
   par chapitre. Typo massive alignée à gauche, numéros fantômes, cartes qui
   s'empilent au scroll, bande de stats, accordéon plein écran pour les ICP.
   ============================================================================= */

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, Bug, Brain, Check, Menu, Minus, Plus, Sparkles, X } from "lucide-react";
import {
  BOOKING_URL,
  TOOLS,
  ICPS,
  COMPARE,
  PROBLEMS,
  PILLARS,
  BRAIN_KNOWS,
  DEV_POINTS,
  DEV_PIPELINE,
  SOUV,
} from "./content.jsx";
import { Reveal, SystemMap } from "./orbital.jsx";
import { ValidationScene } from "./scene.jsx";

/* ------------------------------- chapitre ----------------------------------
   Chaque chapitre s'ouvre sur un numéro fantôme géant et un filet orange.
   C'est la colonne vertébrale visuelle du récit. */

function Chapter({ num, label, children }) {
  return (
    <div className="relative">
      <Reveal>
        <div className="relative mb-2">
          <span className="ghost-num absolute -top-10 -left-2 sm:-left-4">{num}</span>
          <div className="chapter-rule relative pt-16 sm:pt-20">
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-orange-300/80">
              {label}
            </span>
          </div>
        </div>
      </Reveal>
      {children}
    </div>
  );
}

/* --------------------------------- nav ------------------------------------- */

/* --------------------------------- intro -----------------------------------
   Écran d'ouverture : la promesse s'affiche, puis le rideau se lève
   sur le récit. */

function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col justify-center px-5 sm:px-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="max-w-[1400px] mx-auto w-full">
            <motion.span
              className="block font-mono text-[11px] tracking-[0.3em] uppercase text-white/40 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              AI Manager by Hit The Record
            </motion.span>
            <motion.p
              className="font-extrabold tracking-[-0.04em] leading-[1.02] text-[clamp(1.9rem,5vw,4.5rem)] text-white/55"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Une IA qui discute, tu en as déjà une.
            </motion.p>
            <motion.p
              className="font-extrabold tracking-[-0.04em] leading-[1.02] text-[clamp(2.2rem,6vw,5.5rem)] grad-text mt-1"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Voici celle qui travaille.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const MENU_LINKS = [
  { num: "01", label: "Le constat", href: "#chapitre-1" },
  { num: "02", label: "Le problème", href: "#chapitre-2" },
  { num: "03", label: "Le système", href: "#chapitre-3" },
  { num: "04", label: "La différence", href: "#chapitre-4" },
  { num: "05", label: "Le développement", href: "#chapitre-5" },
  { num: "06", label: "Pour qui", href: "#chapitre-6" },
  { num: "07", label: "Souveraineté", href: "#chapitre-7" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-black/75 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="px-5 sm:px-10">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20">
          <a href="#" className="flex items-baseline gap-2">
            <span className="font-extrabold tracking-tight text-lg">AI&nbsp;Manager</span>
            <span className="font-mono text-[10px] text-white/40 tracking-wider hidden sm:inline">
              by Hit The Record
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href={BOOKING_URL}
              className="btn-primary !py-2.5 !px-5 !text-sm hidden sm:inline-flex"
            >
              Réserver ma démo
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="menu-btn"
              aria-label="Ouvrir le menu"
            >
              <Menu size={16} />
              <span className="font-mono text-[11px] tracking-widest uppercase">
                Menu
              </span>
            </button>
          </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md overflow-y-auto px-5 sm:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-[1400px] mx-auto min-h-full flex flex-col">
              <div className="flex items-center justify-between h-20 shrink-0">
                <span className="font-extrabold tracking-tight text-lg">AI&nbsp;Manager</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="menu-btn"
                  aria-label="Fermer le menu"
                >
                  <X size={16} />
                  <span className="font-mono text-[11px] tracking-widest uppercase">
                    Fermer
                  </span>
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center py-10">
                {MENU_LINKS.map((l, i) => (
                  <motion.a
                    key={l.num}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="menu-link group"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-mono text-[12px] text-orange-300/70 w-10 shrink-0">
                      {l.num}
                    </span>
                    <span className="menu-link-label">{l.label}</span>
                    <ArrowRight
                      size={22}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-300 shrink-0"
                    />
                  </motion.a>
                ))}
                <motion.a
                  href={BOOKING_URL}
                  onClick={() => setOpen(false)}
                  className="menu-link group"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.43, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-mono text-[12px] text-orange-300/70 w-10 shrink-0">
                    08
                  </span>
                  <span className="menu-link-label grad-text">Réserver ma démo</span>
                  <ArrowRight
                    size={22}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-300 shrink-0"
                  />
                </motion.a>
              </nav>
              <p className="shrink-0 pb-8 font-mono text-[11px] text-white/35 tracking-wide">
                Cette page a été conçue, codée et mise en ligne par l'AIM lui-même.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* --------------------------------- hero ------------------------------------
   Plein écran. La typo prend toute la largeur, le système orbital vit
   derrière le texte comme une machine qui tourne déjà. */

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-5 sm:px-10 pt-20 pb-20">
      <div className="max-w-[1400px] mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <span className="fr-badge">
            <span className="fr-flag" /> Conçu & hébergé en France
          </span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/40">
            L'ère de l'autonomisation
          </span>
        </motion.div>

        <h1 className="font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(2.8rem,8vw,7.5rem)] max-w-[13ch]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Une IA qui discute,
          </motion.span>
          <motion.span
            className="block text-white/35"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            tu en as déjà une.
          </motion.span>
          <motion.span
            className="block grad-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Voici celle qui travaille.
          </motion.span>
        </h1>

        <div className="mt-6 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <p className="text-lg text-white/55 leading-relaxed max-w-xl">
              L'AI Manager est branché sur tes outils, applique ta logique
              métier et exécute : relances, reporting, devis, suivi. Pendant ce
              temps, tu fais ce que personne ne peut faire à ta place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 max-w-xl">
              <a href={BOOKING_URL} className="btn-primary flex-1 justify-center">
                Réserver ma démo <ArrowRight size={18} />
              </a>
              <a href="#chapitre-1" className="btn-ghost flex-1 justify-center">
                Lire le récit
              </a>
            </div>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-orange-400/25 bg-orange-400/[0.06] px-6 py-4 max-w-xl">
              <Sparkles size={18} className="text-orange-300 shrink-0 mt-0.5" />
              <p className="text-[14px] leading-relaxed text-white/60">
                <span className="text-white/90 font-semibold">
                  Cette page a été conçue, codée et mise en ligne par l'AIM
                  lui-même.
                </span>{" "}
                Pas une métaphore : on te montre les coulisses en démo.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-7 relative w-full max-w-md mx-auto lg:max-w-none lg:-mt-20"
          >
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,172,67,0.16),transparent_65%)] blur-2xl pointer-events-none" />
            <SystemMap />
            <p className="mt-5 text-center font-mono text-[10px] tracking-[0.3em] uppercase text-white/35">
              Ton système, en temps réel
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- ticker ----------------------------------- */

function Ticker() {
  const items = [...TOOLS, ...TOOLS];
  return (
    <section className="py-8 border-y border-white/[0.06] bg-white/[0.015]">
      <p className="text-center font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5">
        Quelques outils déjà branchés dans notre propre système
      </p>
      <div className="ticker-mask overflow-hidden">
        <div className="ticker-track">
          {items.map((t, i) => (
            <span key={i} className="font-mono text-sm text-white/40 whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- chapitre 1 : constat --------------------------- */

function Constat() {
  return (
    <section id="chapitre-1" className="px-5 sm:px-10 py-24 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto">
        <Chapter num="01" label="Chapitre 1 · Le constat">
          <div className="mt-10">
            <h2 className="font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.3rem,4.3vw,3.75rem)]">
              <span className="block">L'automatisation exécute des scripts.</span>
              <span className="grad-text block">
                L'autonomisation opère ton entreprise.
              </span>
            </h2>
            <div className="mt-8">
              <p className="text-white/50 text-lg leading-relaxed">
                Un script s'arrête au premier imprévu. Un système autonome
                comprend le contexte, décide, agit, et vient te chercher quand
                l'enjeu mérite ta validation.
                <br />
                C'est cette bascule que l'AIM te
                fait franchir : tu ne programmes plus des tâches, tu confies
                un périmètre.
              </p>
            </div>
          </div>
        </Chapter>
      </div>
    </section>
  );
}

/* --------------------------- chapitre 2 : problème --------------------------
   Les six problèmes s'empilent au scroll : chaque carte vient recouvrir la
   précédente, comme des couches de friction qui s'accumulent. */

function Probleme() {
  return (
    <section id="chapitre-2" className="px-5 sm:px-10 py-24 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto">
        <Chapter num="02" label="Chapitre 2 · Le problème">
          <div className="mt-10 mb-16">
            <h2 className="font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.3rem,4.3vw,3.75rem)]">
              <span className="block">L'IA que tout le monde utilise</span>
              <span className="grad-text block">n'opère rien du tout.</span>
            </h2>
          </div>
        </Chapter>

        <div className="relative">
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className="stack-card p-8 sm:p-12 mb-6"
              style={{ top: `${96 + i * 14}px`, zIndex: i + 1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
                <span className="font-mono text-orange-300/70 text-sm tracking-widest shrink-0 pt-1">
                  {String(i + 1).padStart(2, "0")} / 06
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-400/10 border border-orange-400/20 text-orange-300">
                      <p.icon size={20} />
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.01em]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-white/50 text-base sm:text-lg leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div
            className="stack-card !border-rose-400/25 p-8 sm:p-12"
            style={{ top: `${96 + 6 * 14}px`, zIndex: 8 }}
          >
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 relative">
              <span className="font-mono text-rose-300/80 text-sm tracking-widest shrink-0 pt-1">
                ALERTE
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-rose-400/10 border border-rose-400/25 text-rose-300">
                    <Bug size={20} />
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.01em]">
                    Tout le monde vibe code. Presque personne ne construit.
                  </h3>
                </div>
                <p className="text-white/50 text-base sm:text-lg leading-relaxed">
                  Ouvrir Claude Code, générer son outil interne en un week-end,
                  le montrer fièrement sur LinkedIn. Trois mois plus tard : un
                  code que personne ne comprend, aucune sécurité, aucune
                  maintenance possible, un outil abandonné. Générer du code n'a
                  jamais été aussi facile. Construire un système fiable n'a
                  jamais demandé autant de méthode.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ bande de stats ------------------------------
   Des chiffres vrais, vérifiables sur cette page même. */

const STATS = [
  { num: "2", unit: "ans", text: "de cadre de développement forgé avant la première ligne vendue" },
  { num: "7", unit: "étapes", text: "traversées par chaque outil livré, sécurité comprise" },
  { num: String(TOOLS.length), unit: "outils", text: "déjà branchés dans notre propre instance, et ça grandit" },
  { num: "0", unit: "donnée", text: "qui quitte tes serveurs : hébergé en France, chez toi" },
];

function Stats() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015]">
      <div className="max-w-[1400px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.unit}
            delay={i * 0.08}
            className={`px-8 py-14 ${i > 0 ? "sm:border-l border-white/[0.06]" : ""}`}
          >
            <p className="stat-num grad-text">{s.num}</p>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-300/80 mt-3 mb-4">
              {s.unit}
            </p>
            <p className="text-white/50 text-[15px] leading-relaxed">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- chapitre 3 : système --------------------------- */

function Systeme() {
  return (
    <section id="chapitre-3" className="px-5 sm:px-10 py-24 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto">
        <Chapter num="03" label="Chapitre 3 · Le système">
          <div className="grid lg:grid-cols-12 gap-10 mt-10 mb-14">
            <h2 className="lg:col-span-8 font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.3rem,4.3vw,3.75rem)]">
              <span className="block">Un opérateur.</span>
              <span className="grad-text block">Pas un chatbot.</span>
            </h2>
            <p className="lg:col-span-4 text-white/50 text-lg leading-relaxed lg:pt-4">
              Un impayé, un lead, un avis client, un post à publier : la vraie
              mécanique de l'AIM sur six situations réelles. Clique pour
              naviguer, ou laisse tourner.
            </p>
          </div>
        </Chapter>

        <Reveal>
          <div className="card p-6 sm:p-10">
            <ValidationScene />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 mt-20 items-start">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-400/10 border border-orange-400/20 text-orange-300 mb-6">
              <Brain size={20} />
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-[1.08] mb-5">
              Un cerveau central.{" "}
              <span className="grad-text">Il connaît ton business par cœur.</span>
            </h3>
            <p className="text-white/55 leading-relaxed">
              Avant d'exécuter quoi que ce soit, l'AIM construit une mémoire
              structurée de ton entreprise. Chaque client, chaque échange,
              chaque décision l'enrichit. Et c'est précisément ce qui lui
              permet de travailler : il n'attend pas qu'on lui réexplique ton
              contexte, il le connaît déjà. Un outil exécute des tâches. Un
              système qui connaît ton business prend les bonnes.
            </p>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
            {BRAIN_KNOWS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07} className="bg-black p-7">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-300/70 mb-3">
                  Mémoire · {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-bold text-lg mb-2">{b.title}</p>
                <p className="text-white/45 text-[14px] leading-relaxed">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="acc-row py-7 grid sm:grid-cols-12 gap-4 items-start">
                <span className="sm:col-span-1 font-mono text-orange-300/60 text-sm pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="sm:col-span-4 flex items-center gap-3">
                  <span className="text-orange-300/80 shrink-0">
                    <p.icon size={18} />
                  </span>
                  <h4 className="font-bold text-xl tracking-[-0.01em]">{p.title}</h4>
                </div>
                <p className="sm:col-span-7 text-white/50 text-[15px] leading-relaxed">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- chapitre 4 : différence ------------------------- */

function Difference() {
  return (
    <section id="chapitre-4" className="px-5 sm:px-10 py-24 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto">
        <Chapter num="04" label="Chapitre 4 · La différence">
          <div className="grid lg:grid-cols-12 gap-10 mt-10 mb-14">
            <h2 className="lg:col-span-8 font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.3rem,4.3vw,3.75rem)]">
              <span className="block">L'IA, c'est le moteur.</span>
              <span className="grad-text block">L'AIM, c'est la voiture.</span>
            </h2>
            <p className="lg:col-span-4 text-white/50 text-lg leading-relaxed lg:pt-4">
              Un moteur seul n'a jamais emmené personne nulle part. Nous, on
              livre le véhicule complet : châssis, commandes, sécurité, carnet
              d'entretien.
            </p>
          </div>
        </Chapter>

        <div className="hidden md:grid grid-cols-2 gap-5 mb-4">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/35 text-center">
            Le moteur seul
          </p>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-300/80 text-center">
            La voiture complète
          </p>
        </div>
        <div className="space-y-4">
          {COMPARE.map((row, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="vs-left rounded-2xl p-6 text-[15px] leading-relaxed">
                  {row.left}
                </div>
                <div className="vs-right rounded-2xl p-6 text-[15px] leading-relaxed font-medium">
                  {row.right}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ chapitre 5 : développement ------------------------ */

function Developpement() {
  return (
    <section id="chapitre-5" className="px-5 sm:px-10 py-24 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto">
        <Chapter num="05" label="Chapitre 5 · Le développement">
          <div className="grid lg:grid-cols-12 gap-10 mt-10 mb-14">
            <h2 className="lg:col-span-8 font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.3rem,4.3vw,3.75rem)]">
              <span className="block">Il n'exécute pas seulement.</span>
              <span className="grad-text block">Il construit.</span>
            </h2>
            <p className="lg:col-span-4 text-white/50 text-lg leading-relaxed lg:pt-4">
              C'est LA différence avec tout ce que tu verras ailleurs. Les
              plateformes d'exécution s'arrêtent là où ton besoin devient
              spécifique. L'AIM franchit cette limite : il développe avec toi
              les outils sur mesure que ton métier réclame, avec un niveau
              d'exigence digne d'une agence de développement.
            </p>
          </div>
        </Chapter>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
          {DEV_POINTS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06} className="bg-black p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-5">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-400/10 border border-orange-400/20 text-orange-300">
                  <d.icon size={20} />
                </span>
                <span className="font-mono text-[11px] tracking-[0.3em] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{d.title}</h3>
              <p className="text-white/50 text-[15px] leading-relaxed">{d.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="hairline rounded-2xl px-6 py-6 bg-white/[0.02]">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-3 mb-4">
              {DEV_PIPELINE.map((s, i) => (
                <span key={s} className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="font-mono text-[11px] sm:text-xs tracking-wider text-white/75 border border-white/10 rounded-full px-3.5 py-1.5 bg-white/[0.03] w-full text-center sm:w-auto">
                    <span className="text-orange-300/70 sm:hidden">
                      {String(i + 1).padStart(2, "0")} ·{" "}
                    </span>
                    {s}
                  </span>
                  {i < DEV_PIPELINE.length - 1 && (
                    <ArrowRight size={13} className="text-orange-300/60 hidden sm:block" />
                  )}
                </span>
              ))}
            </div>
            <p className="text-center font-mono text-[11px] text-white/35 tracking-wide">
              Chaque outil traverse les sept étapes. Aucune n'est optionnelle.
              Pas même la sécurité. Surtout pas la sécurité.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div className="hairline rounded-2xl px-6 py-5 flex items-start gap-4 bg-white/[0.02]">
            <span className="text-orange-300 mt-0.5">
              <Sparkles size={18} />
            </span>
            <p className="text-[15px] leading-relaxed text-white/60">
              <span className="text-white/85 font-medium">
                La preuve est sous tes yeux.
              </span>{" "}
              Cette page a été développée dans ce cadre : structurée,
              versionnée, déployée et maintenue par l'AIM. Ton futur outil
              interne suivra exactement le même chemin.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- chapitre 6 : pour qui --------------------------
   Accordéon plein écran : chaque métier est une ligne massive qui s'ouvre
   sur ses douleurs, la valeur, et les missions confiables. */

function Icp() {
  const [open, setOpen] = useState(ICPS[0].id);

  return (
    <section id="chapitre-6" className="px-5 sm:px-10 py-24 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto">
        <Chapter num="06" label="Chapitre 6 · Pour qui">
          <div className="grid lg:grid-cols-12 gap-10 mt-10 mb-14">
            <h2 className="lg:col-span-8 font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.3rem,4.3vw,3.75rem)]">
              <span className="block">Ton métier.</span>
              <span className="grad-text block">Ta réalité.</span>
            </h2>
            <p className="lg:col-span-4 text-white/50 text-lg leading-relaxed lg:pt-4">
              Six profils, la même mécanique : l'AIM apprend tes outils, ta
              logique et ton vocabulaire, puis opère dans ton contexte.
              Déplie le tien pour voir ce qu'il prend en charge.
            </p>
          </div>
        </Chapter>

        <div className="border-b border-white/[0.08]">
          {ICPS.map((icp) => {
            const isOpen = open === icp.id;
            return (
              <div key={icp.id} className={`acc-row ${isOpen ? "open" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : icp.id)}
                  className="w-full flex items-center justify-between gap-6 py-7 px-2 sm:px-4 text-left"
                >
                  <span className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <span className={`shrink-0 transition-colors ${isOpen ? "text-orange-300" : "text-white/40"}`}>
                      <icp.icon size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-extrabold tracking-[-0.02em] text-xl sm:text-3xl transition-colors ${isOpen ? "text-white" : "text-white/70"}`}>
                        {icp.title}
                      </span>
                      <span className="font-mono text-[11px] tracking-widest text-white/35 uppercase">
                        {icp.subtitle}
                      </span>
                    </span>
                  </span>
                  <span className={`shrink-0 transition-colors ${isOpen ? "text-orange-300" : "text-white/40"}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-2 sm:px-4 pb-10 grid lg:grid-cols-3 gap-8">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rose-300/80 mb-4">
                        Là où ça coince
                      </p>
                      <ul className="space-y-2.5">
                        {icp.pains.map((pain) => (
                          <li key={pain} className="flex items-start gap-3 text-[14px] text-white/55 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400/70 shrink-0" />
                            {pain}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-300/80 mb-4">
                        Ce que l'AIM change
                      </p>
                      <p className="text-[15px] leading-relaxed text-white/70">
                        {icp.value}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-300/80 mb-4">
                        Ce que vous pouvez lui confier
                      </p>
                      <div className="space-y-2.5">
                        {icp.missions.map((m) => (
                          <div key={m} className="flex items-start gap-2.5 text-[14px] text-white/60 leading-relaxed">
                            <span className="mt-0.5 text-emerald-300/80 shrink-0">
                              <Check size={14} />
                            </span>
                            {m}
                          </div>
                        ))}
                      </div>
                      <a href={BOOKING_URL} className="btn-ghost mt-6 !text-sm">
                        Voir l'AIM sur votre cas <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ chapitre 7 : souveraineté ------------------------- */

function Souverainete() {
  return (
    <section id="chapitre-7" className="px-5 sm:px-10 py-24 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto">
        <Chapter num="07" label="Chapitre 7 · Souveraineté">
          <span className="fr-badge mt-10 inline-flex">
            <span className="fr-flag" /> Made in France
          </span>
          <div className="grid lg:grid-cols-12 gap-10 mt-6 mb-14">
            <h2 className="lg:col-span-8 font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.3rem,4.3vw,3.75rem)]">
              <span className="block">Tes données ne quittent</span>
              <span className="grad-text block">jamais tes serveurs.</span>
            </h2>
            <p className="lg:col-span-4 text-white/50 text-lg leading-relaxed lg:pt-4">
              Pendant que le marché envoie tout dans des clouds étrangers, on a
              fait le choix inverse : un système souverain, français, qui
              t'appartient entièrement.
            </p>
          </div>
        </Chapter>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
          {SOUV.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="bg-black p-8 sm:p-10">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-400/10 border border-orange-400/20 text-orange-300 mb-5">
                <s.icon size={20} />
              </span>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/50 text-[15px] leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- final ------------------------------------ */

function Demo() {
  return (
    <section className="px-5 sm:px-10 py-32 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-[-40%] h-[80%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,144,25,0.14),transparent_65%)] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-orange-300/80 mb-8">
            Épilogue · La suite t'appartient
          </p>
          <h2 className="font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(3rem,9vw,8rem)] mb-10">
            30 minutes.
            <br />
            <span className="grad-text">Ton cas, pas des slides.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <a href={BOOKING_URL} className="btn-primary !text-lg !px-10 !py-4 w-fit">
              Réserver ma démo <ArrowRight size={20} />
            </a>
            <p className="text-white/50 leading-relaxed max-w-md">
              On te montre l'AIM en fonctionnement sur un environnement qui
              ressemble au tien, et les coulisses de cette page, construite
              par le système lui-même.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-baseline gap-2">
          <span className="font-extrabold tracking-tight">AI&nbsp;Manager</span>
          <span className="font-mono text-[10px] text-white/40 tracking-wider">
            by Hit The Record
          </span>
        </div>
        <p className="font-mono text-[11px] text-white/35 tracking-wide text-center">
          Self-hosted · Souverain · Autonome · Conçu et hébergé en France
        </p>
        <span className="fr-badge">
          <span className="fr-flag" /> FR
        </span>
      </div>
    </footer>
  );
}

/* --------------------------------- embers ----------------------------------- */
/*  Braises incandescentes : de fines particules montent lentement dans le
    noir, avec un léger balancement et un scintillement doux. Canvas léger
    (40 particules, 24 sur mobile), DPR plafonné à 2, teinte synchronisée
    sur la variable --glow-h pilotée par le scroll. Entièrement désactivé
    quand l'utilisateur préfère réduire les animations.                      */

function Embers() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = canvas.getContext("2d");
    let raf = 0;
    let width = 0;
    let height = 0;
    let particles = [];

    const spawn = (anywhere) => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 12,
      r: 1 + Math.random() * 2.6,
      speed: 0.18 + Math.random() * 0.5,
      sway: 6 + Math.random() * 24,
      phase: Math.random() * Math.PI * 2,
      pulse: 0.4 + Math.random() * 1.1,
      alpha: 0.35 + Math.random() * 0.55,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(
        140,
        Math.max(45, Math.round((width * height) / 26000)),
      );
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const tick = (now) => {
      const t = now / 1000;
      const hue =
        parseFloat(
          document.documentElement.style.getPropertyValue("--glow-h"),
        ) || 28;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -12) Object.assign(p, spawn(false));
        const x = p.x + Math.sin(t * 0.4 + p.phase) * p.sway;
        const twinkle = 0.55 + 0.45 * Math.sin(t * p.pulse + p.phase);
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue + 6}, 100%, 64%, ${p.alpha * twinkle})`;
        ctx.shadowColor = `hsla(${hue + 6}, 100%, 55%, 0.9)`;
        ctx.shadowBlur = 14;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reducedMotion) {
      /* Une seule frame statique : les braises restent visibles sans bouger. */
      tick(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="embers" aria-hidden="true" />;
}

/* ---------------------------------- app ------------------------------------- */

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /* La teinte des halos suit le récit : orange au constat, rouge sombre au
     problème, doré au système, retour orange, puis bleu froid à la
     souveraineté. Écrite en variable CSS pour l'aurora et les braises. */
  const glowHue = useTransform(
    scrollYProgress,
    [0, 0.15, 0.33, 0.55, 0.82, 0.92, 1],
    [28, 2, 48, 26, 30, 210, 210],
  );
  useMotionValueEvent(glowHue, "change", (v) => {
    document.documentElement.style.setProperty("--glow-h", v.toFixed(1));
  });

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="aurora" />
      <Embers />
      <div className="grain" />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Constat />
        <Probleme />
        <Stats />
        <Systeme />
        <Difference />
        <Developpement />
        <Icp />
        <Souverainete />
        <Demo />
      </main>
      <Footer />
    </>
  );
}
