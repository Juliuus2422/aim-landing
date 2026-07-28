/* =============================================================================
   L'AIM : landing V3 « Studio »
   Page claire d'atelier : ciel d'aube pleine largeur dans le hero avec le
   système orbital en pleine lumière à côté du titre, checklist éditoriale
   pour le problème, timeline verticale pour la méthode, objections en
   accordéon, et coucher de soleil miroir en bas de page.
   ============================================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Bug, Brain, Check, Minus, Plus, Sparkles } from "lucide-react";
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

/* -------------------------------- intro ------------------------------------ */

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#fef7ec] px-6 text-center"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-900/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            AI Manager by Hit The Record
          </motion.span>
          <div className="font-extrabold tracking-tight leading-[1.12] text-[clamp(1.5rem,4.2vw,2.9rem)]">
            <motion.span
              className="block text-stone-900/55"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Une IA qui discute, tu en as déjà une.
            </motion.span>
            <motion.span
              className="grad-text block"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Voici celle qui travaille.
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- nav ------------------------------------- */

const NAV_LINKS = [
  ["#constat", "Le constat"],
  ["#probleme", "Le problème"],
  ["#atelier", "Le système"],
  ["#objections", "La différence"],
  ["#dev", "Le développement"],
  ["#metiers", "Pour qui"],
  ["#souverainete", "Souveraineté"],
];

function Nav() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      {/* Pilule en position relative : les liens sont centrés en absolu pour
          un centrage optique parfait, indépendant des largeurs du logo et du
          CTA. Ils n'apparaissent qu'à partir de xl : en dessous, sept liens
          ne tiennent pas sur une seule ligne. */}
      <div className="relative max-w-6xl mx-auto flex items-center justify-between gap-3 rounded-full border border-stone-900/[0.09] bg-[#fffdf8]/85 backdrop-blur-md shadow-[0_12px_40px_-18px_rgba(38,24,10,0.3)] pl-5 pr-2 py-2">
        <a href="#" className="flex items-baseline gap-2 shrink-0">
          <span className="font-extrabold tracking-tight text-[17px]">AI&nbsp;Manager</span>
          <span className="font-mono text-[9px] text-stone-900/45 tracking-wider hidden sm:inline">
            by Hit The Record
          </span>
        </a>
        <nav className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center whitespace-nowrap font-medium text-[13px] text-stone-900/60">
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-full hover:text-stone-900 hover:bg-stone-900/[0.05] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a href={BOOKING_URL} className="nav-cta shrink-0">
          Réserver une démo
        </a>
      </div>
    </header>
  );
}

/* --------------------------------- hero ------------------------------------
   Un ciel d'aube pleine largeur : le texte à gauche, le système orbital en
   pleine lumière à droite. Sur mobile, l'orbital descend sous le texte et
   reste entier : plus rien n'est coupé. */

function Hero() {
  return (
    <section className="sky-dawn relative pt-28 sm:pt-32 pb-14 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start gap-3 mb-8 flex-wrap"
          >
            <span className="fr-badge">
              <span className="fr-flag" /> Conçu & hébergé en France
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-[-0.03em] mb-7"
          >
            Une IA qui discute, tu en as déjà une.{" "}
            <span className="grad-text">Voici celle qui travaille.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-stone-900/65 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9"
          >
            L'AI Manager est branché sur tes outils, applique ta logique métier
            et exécute : relances, reporting, devis, suivi. Pendant ce temps, tu
            fais ce que personne ne peut faire à ta place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-6 max-w-xl mx-auto lg:mx-0"
          >
            <a href={BOOKING_URL} className="btn-primary flex-1 justify-center">
              Réserver une démo <ArrowRight size={18} />
            </a>
            <a href="#atelier" className="btn-ghost flex-1 justify-center">
              Visiter l'atelier
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="studio-card flex items-start gap-3 text-left max-w-xl mx-auto lg:mx-0 px-5 py-4"
          >
            <Sparkles size={18} className="text-[#d7722d] shrink-0 mt-0.5" />
            <p className="text-[13.5px] leading-relaxed text-stone-900/65">
              <span className="font-semibold text-stone-900">
                Cette page a été conçue, codée et mise en ligne par l'AIM
                lui-même.
              </span>{" "}
              Pas une métaphore : on te montre les coulisses en démo.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[560px] mx-auto lg:max-w-none px-3 sm:px-6 lg:px-2"
        >
          <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(255,175,90,0.5),rgba(215,114,45,0.22)_45%,transparent_70%)] blur-2xl pointer-events-none" />
          <SystemMap />
        </motion.div>
      </div>

      {/* La ligne d'horizon garde l'identité « lever de soleil » de la version. */}
      <div className="horizon absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}

/* ------------------------------ le lever du jour ---------------------------- */

function Manifeste() {
  return (
    <section id="constat" className="py-20 sm:py-24 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-6">
            Le constat
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mb-7">
            L'automatisation exécute des scripts.{" "}
            <span className="grad-text">L'autonomisation opère ton entreprise.</span>
          </h2>
          <p className="text-stone-900/60 text-lg leading-relaxed">
            Un script s'arrête au premier imprévu. Un système autonome comprend
            le contexte, décide, agit, et vient te chercher quand l'enjeu
            mérite ta validation. C'est cette bascule que l'AIM te fait
            franchir : tu ne programmes plus des tâches, tu confies un
            périmètre.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-stone-900/40 mb-5">
            Quelques outils déjà branchés dans notre propre système
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="font-mono text-[12px] text-stone-900/60 border border-stone-900/12 rounded-full px-3.5 py-1.5 bg-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- le problème --------------------------------
   Pas de grille de cartes : une checklist éditoriale pleine largeur, comme
   un état des lieux d'atelier, ligne par ligne. */

function Probleme() {
  return (
    <section id="probleme" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-5">
            Le problème
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            L'IA que tout le monde utilise{" "}
            <span className="grad-text">n'opère rien du tout.</span>
          </h2>
        </Reveal>

        <div>
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="check-row py-6 flex items-start gap-5 sm:gap-8">
                <span className="font-mono text-[13px] text-orange-700/70 pt-1 shrink-0 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-orange-700/80 pt-0.5 shrink-0 hidden sm:block">
                  <p.icon size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-1.5">{p.title}</h3>
                  <p className="text-stone-900/55 text-[15px] leading-relaxed">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="studio-card !border-rose-700/25 p-7 sm:p-9">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-rose-700/10 border border-rose-700/25 text-rose-700 shrink-0">
                <Bug size={20} />
              </span>
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-rose-700/80 mb-3">
                  Et la nouvelle mode n'arrange rien
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Tout le monde vibe code. Presque personne ne construit.
                </h3>
                <p className="text-[15px] leading-relaxed text-stone-900/55 max-w-3xl">
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
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- l'atelier ---------------------------------
   La scène de validation trône au centre, comme l'établi de l'atelier. */

function Atelier() {
  return (
    <section id="atelier" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-5">
            Le système
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mb-5">
            Un opérateur. <span className="grad-text">Pas un chatbot.</span>
          </h2>
          <p className="text-stone-900/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Un impayé, un lead, un avis client, un post à publier : la vraie
            mécanique de l'AIM sur six situations réelles. Clique pour
            naviguer, ou laisse tourner.
          </p>
        </Reveal>

        <Reveal>
          <div className="studio-card p-6 sm:p-10">
            <ValidationScene />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 mt-16 items-start">
          <Reveal>
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-700/10 border border-orange-700/20 text-orange-700 mb-5">
              <Brain size={20} />
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] leading-snug mb-4">
              Un cerveau central.{" "}
              <span className="grad-text">Il connaît ton business par cœur.</span>
            </h3>
            <p className="text-[15px] leading-relaxed text-stone-900/60">
              Avant d'exécuter quoi que ce soit, l'AIM construit une mémoire
              structurée de ton entreprise. Chaque client, chaque échange,
              chaque décision l'enrichit. Et c'est précisément ce qui lui
              permet de travailler : il n'attend pas qu'on lui réexplique ton
              contexte, il le connaît déjà. Un outil exécute des tâches. Un
              système qui connaît ton business prend les bonnes.
            </p>
          </Reveal>
          {/* auto-rows-fr : les quatre cartes partagent la même hauteur. */}
          <div className="grid sm:grid-cols-2 auto-rows-fr gap-4">
            {BRAIN_KNOWS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="h-full">
                <div className="studio-card p-6 h-full">
                  <p className="font-semibold text-[15px] mb-1.5">{b.title}</p>
                  <p className="text-[13px] leading-relaxed text-stone-900/50">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- la méthode ---------------------------------
   Les cinq piliers déroulés comme une timeline verticale : la méthode de
   travail de l'atelier, étape par étape. */

function Methode() {
  return (
    <section id="methode" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-14">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-5">
            La méthode
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            Comment l'AIM travaille,{" "}
            <span className="grad-text">concrètement.</span>
          </h2>
        </Reveal>

        <div className="relative pl-0">
          <div className="tl-line" />
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="relative flex gap-6 pb-12 last:pb-0">
                <span className="tl-dot">
                  <p.icon size={17} />
                </span>
                <div className="pt-1.5">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-700/70 mb-1.5">
                    Étape {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                  <p className="text-stone-900/55 text-[15px] leading-relaxed">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ souveraineté --------------------------------
   Section claire comme le reste de la page : la bande sombre isolée cassait
   l'unité visuelle, le passage vers la nuit est réservé au final sky-dusk. */

function Souverainete() {
  return (
    <section id="souverainete" className="py-20 sm:py-24 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-5">
            Souveraineté
          </p>
          <span className="fr-badge mb-6 inline-flex">
            <span className="fr-flag" /> Made in France
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mb-5">
            Tes données ne quittent{" "}
            <span className="grad-text">jamais tes serveurs.</span>
          </h2>
          <p className="text-stone-900/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Pendant que le marché envoie tout dans des clouds étrangers, on a
            fait le choix inverse : un système souverain, français, qui
            t'appartient entièrement.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 auto-rows-fr gap-5">
          {SOUV.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="h-full">
              <div className="studio-card p-7 h-full">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-700/10 border border-orange-700/20 text-orange-700 mb-5">
                  <s.icon size={20} />
                </span>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-stone-900/55">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- objections ---------------------------------
   Le face-à-face moteur / voiture, déroulé comme des objections qu'on ouvre
   une à une. Chaque ligne répond à un réflexe du marché. */

function Objections() {
  const [open, setOpen] = useState(0);

  return (
    <section id="objections" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-5">
            La différence
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mb-5">
            L'IA, c'est le moteur.{" "}
            <span className="grad-text">L'AIM, c'est la voiture.</span>
          </h2>
          <p className="text-stone-900/60 text-lg leading-relaxed max-w-2xl">
            Un moteur seul n'a jamais emmené personne nulle part. Nous, on
            livre le véhicule complet : châssis, commandes, sécurité, carnet
            d'entretien.
          </p>
        </Reveal>

        <div>
          {COMPARE.map((row, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="obj-row">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-5 py-6 text-left"
                >
                  <span className="flex items-start gap-4">
                    <span className="font-mono text-[13px] text-stone-900/40 pt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-bold text-lg sm:text-xl transition-colors ${isOpen ? "text-stone-900" : "text-stone-900/70"}`}>
                      {row.left}
                    </span>
                  </span>
                  <span className={`shrink-0 mt-1 transition-colors ${isOpen ? "text-orange-700" : "text-stone-900/40"}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-7 pl-10 sm:pl-11">
                    <div className="vs-right rounded-2xl p-5 sm:p-6 text-[15px] leading-relaxed font-medium max-w-2xl">
                      {row.right}
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

/* ------------------------------ développement ------------------------------- */

function Developpement() {
  return (
    <section id="dev" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-5">
            Le développement
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mb-5">
            Il n'exécute pas seulement.{" "}
            <span className="grad-text">Il construit.</span>
          </h2>
          <p className="text-stone-900/60 text-lg leading-relaxed max-w-3xl">
            C'est LA différence avec tout ce que tu verras ailleurs. Les
            plateformes d'exécution s'arrêtent là où ton besoin devient
            spécifique. L'AIM franchit cette limite : il développe avec toi les
            outils sur mesure que ton métier réclame, avec un niveau
            d'exigence digne d'une agence de développement.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {DEV_POINTS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <div className="studio-card p-7 h-full">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-700/10 border border-orange-700/20 text-orange-700 mb-5">
                  <d.icon size={20} />
                </span>
                <h3 className="text-lg font-bold mb-3">{d.title}</h3>
                <p className="text-[15px] leading-relaxed text-stone-900/55">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="studio-card px-6 py-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-3 mb-4">
              {DEV_PIPELINE.map((s, i) => (
                <span key={s} className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="font-mono text-[11px] sm:text-xs tracking-wider text-stone-900/75 border border-stone-900/12 rounded-full px-3.5 py-1.5 bg-[#fef7ec] w-full text-center sm:w-auto">
                    <span className="text-orange-700/70 sm:hidden">
                      {String(i + 1).padStart(2, "0")} ·{" "}
                    </span>
                    {s}
                  </span>
                  {i < DEV_PIPELINE.length - 1 && (
                    <ArrowRight size={13} className="text-orange-700/60 hidden sm:block" />
                  )}
                </span>
              ))}
            </div>
            <p className="text-center font-mono text-[11px] text-stone-900/45 tracking-wide">
              Chaque outil traverse les sept étapes. Aucune n'est optionnelle.
              Pas même la sécurité. Surtout pas la sécurité.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div className="studio-card px-6 py-5 flex items-start gap-4">
            <span className="text-orange-700 mt-0.5">
              <Sparkles size={18} />
            </span>
            <p className="text-[15px] leading-relaxed text-stone-900/65">
              <span className="font-semibold text-stone-900">
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

/* --------------------------------- métiers ----------------------------------
   Master-detail : la liste des métiers à gauche comme un menu d'atelier,
   le dossier détaillé à droite. */

function Metiers() {
  const [active, setActive] = useState(ICPS[0].id);
  const icp = ICPS.find((i) => i.id === active);

  return (
    <section id="metiers" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange-700/80 mb-5">
            Pour qui
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            Ton métier. <span className="grad-text">Ta réalité.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[minmax(240px,320px)_1fr] gap-6 items-start">
          <Reveal>
            <div className="studio-card p-2.5 lg:sticky lg:top-24">
              {ICPS.map((i) => (
                <button
                  key={i.id}
                  onClick={() => setActive(i.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-300 ${
                    active === i.id
                      ? "bg-stone-900 text-[#fef7ec]"
                      : "text-stone-900/65 hover:bg-stone-900/[0.05]"
                  }`}
                >
                  <i.icon size={17} className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-semibold text-[14px] leading-tight">{i.tab}</span>
                    <span className={`block text-[11px] ${active === i.id ? "text-[#fef7ec]/60" : "text-stone-900/40"}`}>
                      {i.subtitle}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            key={icp.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="studio-card p-7 sm:p-9"
          >
            <h3 className="text-2xl font-extrabold tracking-[-0.01em] mb-7">{icp.title}</h3>
            {/* Ordre de lecture : les freins et les missions d'abord, la
                synthèse « Ce que l'AIM change » ensuite, le CTA en clôture. */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-rose-700/80 mb-4">
                  Là où ça coince
                </p>
                <ul className="space-y-2.5">
                  {icp.pains.map((pain) => (
                    <li key={pain} className="flex items-start gap-3 text-[14px] text-stone-900/60 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-600/70 shrink-0" />
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-700/80 mb-4">
                  Ce que vous pouvez lui confier
                </p>
                <div className="space-y-2.5">
                  {icp.missions.map((m) => (
                    <div key={m} className="flex items-start gap-2.5 text-[14px] text-stone-900/65 leading-relaxed">
                      <span className="mt-0.5 text-emerald-700/80 shrink-0">
                        <Check size={14} />
                      </span>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-7 border-t border-stone-900/[0.09]">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-700/80 mb-3">
                Ce que l'AIM change
              </p>
              <p className="text-[15px] leading-relaxed text-stone-900/75 border-l-2 border-orange-700/40 pl-4 max-w-3xl">
                {icp.value}
              </p>
              <a href={BOOKING_URL} className="btn-ghost mt-7">
                Voir l'AIM sur votre cas <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- final : coucher de soleil ------------------------ */

function Demo() {
  return (
    <section className="sky-dusk pt-28 pb-20 px-5 sm:px-8 mt-10">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-stone-900/70 mb-6">
            La suite
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] mb-6 leading-[1.08] text-stone-900">
            30 minutes.
            <br />
            Ton cas, pas des slides.
          </h2>
          <p className="text-stone-900/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            On te montre l'AIM en fonctionnement sur un environnement qui
            ressemble au tien, et les coulisses de cette page, construite par
            le système lui-même.
          </p>
          <motion.a
            href={BOOKING_URL}
            className="btn-primary !text-lg !px-10 !py-4 !bg-stone-900 !text-[#fef7ec] inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Réserver une démo <ArrowRight size={20} />
          </motion.a>
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-[#200a00]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-[#fef7ec]">
        <div className="flex items-baseline gap-2">
          <span className="font-extrabold tracking-tight">AI&nbsp;Manager</span>
          <span className="font-mono text-[10px] text-[#fef7ec]/60 tracking-wider">
            by Hit The Record
          </span>
        </div>
        <p className="font-mono text-[11px] text-[#fef7ec]/55 tracking-wide text-center">
          Self-hosted · Souverain · Autonome · Conçu et hébergé en France
        </p>
        <span className="fr-badge !border-white/25 !text-[#fef7ec]">
          <span className="fr-flag" /> FR
        </span>
      </div>
    </section>
  );
}

/* ---------------------------------- app ------------------------------------- */

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Manifeste />
        <Probleme />
        <Atelier />
        <Methode />
        <Objections />
        <Developpement />
        <Metiers />
        <Souverainete />
        <Demo />
      </main>
    </>
  );
}
