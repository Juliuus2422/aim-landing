/* =============================================================================
   L'AIM : landing V4 « Produit »
   Page SaaS product-led : hero sombre où l'app tourne dans une fenêtre de
   navigateur, corps de page clair en blocs alternés texte / interface,
   bento grid pour la mécanique, terminal pour le développement, bande
   sombre finale. Les mots-clés passent en serif italique.
   ============================================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Bug, Brain, Check, ChevronDown, Sparkles } from "lucide-react";
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

/* --------------------------------- nav ------------------------------------- */

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-[#0f0f10] px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            AI Manager by Hit The Record
          </motion.span>
          <div className="font-mono text-left text-[clamp(0.85rem,2.4vw,1.15rem)] leading-relaxed">
            <motion.p
              className="text-white/60"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
            >
              <span className="text-[#9cfd00]">➜</span> une IA qui discute, tu en as déjà une.
            </motion.p>
            <motion.p
              className="text-white"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.9 }}
            >
              <span className="text-[#9cfd00]">➜</span> voici celle qui travaille. <span className="text-[#72fd4e]">✓</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <a
        href="#dev"
        className="block bg-[#72fd4e] text-[#0f0f10] text-center font-mono text-[11px] font-semibold tracking-wide py-2 px-4 hover:bg-[#9cfd00] transition-colors"
      >
        Cette page a été conçue, codée et mise en ligne par L'AIM lui-même.
        Voir comment ↓
      </a>
      <div className="border-b border-white/[0.07] bg-[#0f0f10]/85 backdrop-blur-md">
        <div className="px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-extrabold tracking-tight text-lg">AI&nbsp;Manager</span>
          <span className="font-mono text-[10px] text-white/40 tracking-wider hidden sm:inline">
            by Hit The Record
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-5 font-medium text-[13px] text-white/55">
          <a href="#constat" className="hover:text-white transition-colors">Le constat</a>
          <a href="#probleme" className="hover:text-white transition-colors">Le problème</a>
          <a href="#mecanique" className="hover:text-white transition-colors">Le système</a>
          <a href="#difference" className="hover:text-white transition-colors">La différence</a>
          <a href="#dev" className="hover:text-white transition-colors">Le développement</a>
          <a href="#metiers" className="hover:text-white transition-colors">Pour qui</a>
          <a href="#souverainete" className="hover:text-white transition-colors">Souveraineté</a>
        </nav>
        <a href={BOOKING_URL} className="btn-primary !py-2.5 !px-5 !text-sm">
          Réserver une démo
        </a>
        </div>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- hero ------------------------------------
   Sombre, centré, product-led : la promesse au-dessus, l'app qui tourne
   en dessous, dans une vraie fenêtre. */

function Hero() {
  return (
    <section className="relative pt-40 sm:pt-48 pb-20 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_at_top,rgba(114,253,78,0.09),transparent_60%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-3 mb-8 flex-wrap"
        >
          <span className="fr-badge">
            <span className="fr-flag" /> Conçu & hébergé en France
          </span>
          <span className="pill-tag-dark">L'ère de l'autonomisation</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2.7rem] leading-[1.06] sm:text-6xl font-extrabold tracking-[-0.03em] mb-7"
        >
          Une IA qui <span className="serif-accent">discute</span>, tu en as
          déjà une.
          <br />
          Voici celle qui{" "}
          <span className="grad-text serif-accent">travaille.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-white/55 leading-relaxed max-w-xl mx-auto mb-9"
        >
          L'AI Manager est branché sur tes outils, applique ta logique métier
          et exécute : relances, reporting, devis, suivi. Pendant ce temps, tu
          fais ce que personne ne peut faire à ta place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center items-center gap-4 max-w-xl mx-auto"
        >
          <a href={BOOKING_URL} className="btn-primary flex-1 justify-center">
            Réserver une démo <ArrowRight size={18} />
          </a>
          <a href="#produit" className="btn-ghost flex-1 justify-center">
            Voir le produit
          </a>
        </motion.div>
      </div>

      <motion.div
        id="produit"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto mt-16 scroll-mt-24 relative"
      >
        <div className="browser-chrome">
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-url">app.aim · file d'attente de validation</span>
          </div>
          <div className="p-5 sm:p-8">
            <ValidationScene />
          </div>
        </div>
        <p className="text-center font-mono text-[11px] text-white/35 mt-5 tracking-wide max-w-md mx-auto leading-relaxed">
          Ce n'est pas une maquette : c'est la mécanique réelle de l'AIM sur
          six situations, en boucle. Clique pour naviguer.
        </p>
      </motion.div>
    </section>
  );
}

/* --------------------------- le systeme en orbite ---------------------------
   La carte orbitale de la V1, en pleine lumière : le cerveau au centre,
   les outils qui gravitent, les données qui circulent en temps réel. */

function Orbit() {
  return (
    <section className="relative py-24 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(114,253,78,0.07),transparent_60%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative">
        <div>
          <span className="pill-tag-dark mb-5 inline-flex">L'infrastructure</span>
          <h2 className="text-3xl sm:text-[2.6rem] leading-[1.08] font-extrabold tracking-[-0.03em] mb-6">
            Un cerveau au centre.{" "}
            <span className="grad-text serif-accent">Ton système autour.</span>
          </h2>
          <p className="text-white/55 leading-relaxed mb-4">
            L'AIM n'est pas un chatbot posé à côté de tes outils : il est
            branché au milieu. CRM, facturation, mails, agenda, drive : les
            données remontent vers le cerveau, les actions repartent vers les
            outils.
          </p>
          <p className="text-white/55 leading-relaxed">
            Chaque point qui circule sur cette carte est un flux réel : une
            facture qui arrive, une relance qui part, un reporting qui se met à
            jour.
          </p>
        </div>
        <Reveal className="relative">
          <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(114,253,78,0.1),transparent_65%)] blur-2xl pointer-events-none" />
          <SystemMap />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ bande outils -------------------------------- */

function ToolsStrip() {
  const items = [...TOOLS, ...TOOLS];
  return (
    <section className="py-8 border-y border-white/[0.06]">
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

/* --------------------------- corps clair : constat -------------------------- */

function Manifeste() {
  return (
    <div id="constat" className="py-20 sm:py-24 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="pill-tag mb-6 inline-flex">Le constat</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mb-7 mt-6">
            L'automatisation exécute des{" "}
            <span className="serif-accent">scripts.</span>
            <br />
            L'autonomisation opère ton{" "}
            <span className="serif-accent">entreprise.</span>
          </h2>
          <p className="text-[#17191c]/60 text-lg leading-relaxed">
            Un script s'arrête au premier imprévu. Un système autonome comprend
            le contexte, décide, agit, et vient te chercher quand l'enjeu
            mérite ta validation. C'est cette bascule que l'AIM te fait
            franchir : tu ne programmes plus des tâches, tu confies un
            périmètre.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/* ------------------------------- le problème -------------------------------- */

function Probleme() {
  return (
    <div id="probleme" className="py-16 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="pill-tag mb-6 inline-flex">Le problème</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mt-6">
            L'IA que tout le monde utilise
            <br />
            n'opère <span className="serif-accent">rien du tout.</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="light-card p-7 h-full">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#72fd4e]/15 border border-[#3f7a1f]/25 text-[#3f7a1f] mb-5">
                  <p.icon size={20} />
                </span>
                <h3 className="text-lg font-bold mb-3">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#17191c]/55">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="light-card !border-rose-600/30 p-7 sm:p-9">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-rose-600/10 border border-rose-600/25 text-rose-700 shrink-0">
                <Bug size={20} />
              </span>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-rose-700/80 mb-3">
                  Et la nouvelle mode n'arrange rien
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Tout le monde <span className="serif-accent">vibe code</span>.
                  Presque personne ne construit.
                </h3>
                <p className="text-[15px] leading-relaxed text-[#17191c]/55 max-w-3xl">
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
    </div>
  );
}

/* ------------------------ la mécanique : bento grid -------------------------
   Le cerveau central en tuile majeure sombre, les cinq piliers autour. */

function Mecanique() {
  return (
    <div id="mecanique" className="py-16 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="pill-tag mb-6 inline-flex">Le système</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mt-6">
            Un <span className="serif-accent">opérateur.</span> Pas un chatbot.
          </h2>
        </Reveal>

        <Reveal>
          <div className="bento-big p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#72fd4e]/10 blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#72fd4e]/10 border border-[#72fd4e]/25 text-[#9cfd00] mb-6">
                  <Brain size={20} />
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] leading-snug mb-4">
                  Un cerveau central. Il connaît ton business{" "}
                  <span className="grad-text serif-accent">par cœur.</span>
                </h3>
                <p className="text-[15px] leading-relaxed text-white/55">
                  Avant d'exécuter quoi que ce soit, l'AIM construit une
                  mémoire structurée de ton entreprise. Chaque client, chaque
                  échange, chaque décision l'enrichit. Il n'attend pas qu'on
                  lui réexplique ton contexte : il le connaît déjà. Un outil
                  exécute des tâches. Un système qui connaît ton business
                  prend les bonnes.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {BRAIN_KNOWS.map((b) => (
                  <div key={b.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-semibold text-[13.5px] mb-1 text-white/85">{b.title}</p>
                    <p className="text-[12.5px] leading-relaxed text-white/45">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="light-card p-7 h-full">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#72fd4e]/15 border border-[#3f7a1f]/25 text-[#3f7a1f] mb-4">
                  <p.icon size={18} />
                </span>
                <h3 className="font-bold text-[16px] mb-2">{p.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#17191c]/55">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- la différence ------------------------------ */

function Difference() {
  return (
    <div id="difference" className="py-16 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="pill-tag mb-6 inline-flex">La différence</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mt-6 mb-5">
            L'IA, c'est le <span className="serif-accent">moteur.</span>
            <br />
            L'AIM, c'est la <span className="serif-accent">voiture.</span>
          </h2>
          <p className="text-[#17191c]/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Un moteur seul n'a jamais emmené personne nulle part. Nous, on
            livre le véhicule complet : châssis, commandes, sécurité, carnet
            d'entretien.
          </p>
        </Reveal>

        <div className="light-card overflow-hidden">
          <div className="hidden md:grid grid-cols-2 border-b border-[#17191c]/[0.08]">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#17191c]/40 text-center py-4">
              Le moteur seul
            </p>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#3f7a1f] text-center py-4 border-l border-[#17191c]/[0.08] bg-[#72fd4e]/[0.06]">
              La voiture complète
            </p>
          </div>
          {COMPARE.map((row, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className={`grid md:grid-cols-2 ${i > 0 ? "border-t border-[#17191c]/[0.07]" : ""}`}>
                <div className="p-6 text-[15px] leading-relaxed text-[#17191c]/55">
                  {row.left}
                </div>
                <div className="p-6 text-[15px] leading-relaxed font-medium md:border-l border-[#17191c]/[0.08] bg-[#72fd4e]/[0.06]">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#3f7a1f] shrink-0">
                      <Check size={16} />
                    </span>
                    {row.right}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------- développement : le terminal ------------------------ */

function Developpement() {
  return (
    <div id="dev" className="py-16 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="pill-tag mb-6 inline-flex">Le développement</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-[1.12] mt-6 mb-5">
              Il n'exécute pas seulement.
              <br />
              Il <span className="serif-accent">construit.</span>
            </h2>
            <p className="text-[#17191c]/60 leading-relaxed mb-8">
              C'est LA différence avec tout ce que tu verras ailleurs. Les
              plateformes d'exécution s'arrêtent là où ton besoin devient
              spécifique. L'AIM franchit cette limite : il développe avec toi
              les outils sur mesure que ton métier réclame, avec un niveau
              d'exigence digne d'une agence de développement.
            </p>
            <div className="light-card px-5 py-4 flex items-start gap-4">
              <span className="text-[#3f7a1f] mt-0.5">
                <Sparkles size={18} />
              </span>
              <p className="text-[14px] leading-relaxed text-[#17191c]/65">
                <span className="font-semibold text-[#17191c]">
                  La preuve est sous tes yeux.
                </span>{" "}
                Cette page a été développée dans ce cadre : structurée,
                versionnée, déployée et maintenue par l'AIM.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="term">
              <div className="term-bar">
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="font-mono text-[11px] text-white/40 ml-2">
                  aim · pipeline de livraison
                </span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[2.1]">
                {DEV_PIPELINE.map((s, i) => (
                  <p key={s}>
                    <span className="text-[#9cfd00]">➜</span>{" "}
                    <span className="text-white/40">
                      étape {String(i + 1).padStart(2, "0")}/07
                    </span>{" "}
                    <span className="text-white/90">{s.toLowerCase()}</span>{" "}
                    <span className="text-[#72fd4e]">✓</span>
                  </p>
                ))}
                <p className="mt-2 text-white/40">
                  7/7 étapes validées · aucune n'est optionnelle.
                  <br />
                  pas même la sécurité. surtout pas la sécurité.
                </p>
                <p className="mt-2">
                  <span className="text-[#9cfd00]">➜</span>{" "}
                  <span className="text-white/90">
                    cette page ? livrée par ce même pipeline.
                  </span>{" "}
                  <span className="text-[#72fd4e]">✓</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-14">
          {DEV_POINTS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <div className="light-card p-6 h-full">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#72fd4e]/15 border border-[#3f7a1f]/25 text-[#3f7a1f] mb-4">
                  <d.icon size={18} />
                </span>
                <h3 className="font-bold text-[15.5px] mb-2">{d.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-[#17191c]/55">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- métiers ----------------------------------
   Six dossiers compacts, chacun s'ouvre sur ses missions. */

function Metiers() {
  const [openId, setOpenId] = useState(null);

  return (
    <div id="metiers" className="py-16 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="pill-tag mb-6 inline-flex">Pour qui</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mt-6">
            Ton métier. <span className="serif-accent">Ta réalité.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {ICPS.map((icp, idx) => {
            const isOpen = openId === icp.id;
            return (
              <Reveal key={icp.id} delay={idx * 0.04}>
                <div className="light-card p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#72fd4e]/15 border border-[#3f7a1f]/25 text-[#3f7a1f] shrink-0">
                      <icp.icon size={18} />
                    </span>
                    <div>
                      <h3 className="font-bold text-[16px] leading-tight">{icp.tab}</h3>
                      <p className="font-mono text-[10.5px] tracking-wider text-[#17191c]/40 uppercase">
                        {icp.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#17191c]/60 mb-5">
                    {icp.value}
                  </p>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5">
                      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-rose-700/80 mb-3">
                        Là où ça coince
                      </p>
                      <ul className="space-y-2 mb-5">
                        {icp.pains.map((pain) => (
                          <li key={pain} className="flex items-start gap-2.5 text-[13px] text-[#17191c]/55 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-600/70 shrink-0" />
                            {pain}
                          </li>
                        ))}
                      </ul>
                      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#3f7a1f] mb-3">
                        Ce que vous pouvez lui confier
                      </p>
                      <ul className="space-y-2">
                        {icp.missions.map((m) => (
                          <li key={m} className="flex items-start gap-2.5 text-[13px] text-[#17191c]/60 leading-relaxed">
                            <span className="mt-0.5 text-[#3f7a1f] shrink-0">
                              <Check size={13} />
                            </span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  <button
                    onClick={() => setOpenId(isOpen ? null : icp.id)}
                    className="mt-auto flex items-center gap-2 font-medium text-[13.5px] text-[#3f7a1f] hover:text-[#17191c] transition-colors"
                  >
                    {isOpen ? "Replier le dossier" : "Ouvrir le dossier"}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- souveraineté ------------------------------- */

function Souverainete() {
  return (
    <div id="souverainete" className="py-16 pb-24 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="pill-tag inline-flex">Souveraineté</span>
            <span className="fr-badge !border-[#17191c]/20 !text-[#17191c] inline-flex">
              <span className="fr-flag" /> Made in France
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12] mb-5">
            Tes données ne quittent
            <br />
            <span className="serif-accent">jamais</span> tes serveurs.
          </h2>
          <p className="text-[#17191c]/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Pendant que le marché envoie tout dans des clouds étrangers, on a
            fait le choix inverse : un système souverain, français, qui
            t'appartient entièrement.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {SOUV.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="light-card p-7 h-full">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#72fd4e]/15 border border-[#3f7a1f]/25 text-[#3f7a1f] mb-5">
                  <s.icon size={20} />
                </span>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#17191c]/55">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- bande finale sombre -------------------------- */

function Demo() {
  return (
    <section className="relative py-28 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-x-0 bottom-[-40%] h-[80%] bg-[radial-gradient(ellipse_at_bottom,rgba(114,253,78,0.12),transparent_65%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto text-center relative">
        <Reveal>
          <span className="pill-tag-dark mb-8 inline-flex">La suite</span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] mb-6 leading-[1.08] mt-6">
            30 minutes.
            <br />
            Ton cas, pas des{" "}
            <span className="grad-text serif-accent">slides.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            On te montre l'AIM en fonctionnement sur un environnement qui
            ressemble au tien, et les coulisses de cette page, construite par
            le système lui-même.
          </p>
          <motion.a
            href={BOOKING_URL}
            className="btn-primary !text-lg !px-10 !py-4 inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Réserver une démo <ArrowRight size={20} />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
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
        <Orbit />
        <ToolsStrip />
        <div className="light-body">
          <Manifeste />
          <Probleme />
          <Mecanique />
          <Difference />
          <Developpement />
          <Metiers />
          <Souverainete />
        </div>
        <Demo />
      </main>
      <Footer />
    </>
  );
}
