import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Brain,
  Plug,
  Database,
  ShieldCheck,
  Server,
  Lock,
  ArrowRight,
  Building2,
  Store,
  ShoppingCart,
  Briefcase,
  User,
  Rocket,
  Check,
  Sparkles,
  Zap,
  Layers,
  Moon,
  GitBranch,
  Wrench,
  PackageCheck,
  Bug,
  Smartphone,
  Activity,
  Network,
} from "lucide-react";

/* -------------------------------- config ---------------------------------- */

// TODO: remplacer par le lien iClosed AIM dès qu'il existe
const BOOKING_URL = "mailto:contact@hittherecord.com?subject=D%C3%A9mo%20AI%20Manager";

/* ---------------------------------- data ----------------------------------
   Les nœuds ci-dessous ne sont pas décoratifs : ce sont de vrais packages
   du système AIM qui a produit cette page. */

const NODES_INNER = ["Gmail", "Telegram", "Notion", "Agenda", "iClosed"];

const NODES_MID = [
  "ERP",
  "WhatsApp",
  "Slack",
  "Discord",
  "Fathom",
  "Meta Ads",
  "Instagram",
];

const NODES_OUTER = [
  "YouTube",
  "Images IA",
  "Voix IA",
  "Vidéo IA",
  "Navigateur",
  "Recherche web",
  "Transcription",
  "Déploiement",
  "Scraping",
];

const TOOLS = [
  "Gmail",
  "Telegram",
  "WhatsApp",
  "Notion",
  "Google Calendar",
  "Calendly",
  "iClosed",
  "Slack",
  "Discord",
  "Instagram",
  "Meta Ads",
  "YouTube",
  "Fathom",
  "CRM",
  "HubSpot",
  "Sellsy",
  "ActiveCampaign",
  "ERP",
  "Odoo",
  "Qonto",
  "Revolut",
  "Gemini",
  "Higgsfield",
  "Transcription",
  "Génération d'images",
  "Génération vidéo",
  "Synthèse vocale",
  "Recherche web",
  "Google Trends",
  "Playwright",
  "Dokploy",
  "Hostinger",
];

const ICPS = [
  {
    id: "agence",
    icon: Building2,
    tab: "Agence",
    title: "Agences marketing, com & créa",
    subtitle: "10 à 30 personnes",
    pains: [
      "Le turnover emporte le savoir-faire à chaque départ",
      "Le reporting client est manuel et chronophage",
      "Les propositions commerciales prennent des heures",
      "La facturation : oublis, retards, relances jamais envoyées",
      "La production : qui fait quoi, pour quand, personne ne sait",
      "Tout repose sur 2-3 seniors indispensables",
    ],
    missions: [
      "Reporting client généré et envoyé chaque semaine",
      "Propales rédigées depuis vos anciennes missions",
      "Suivi de production : deadlines, relances, alertes",
      "Facturation émise à l'heure, impayés relancés",
      "Contenu créé, publié, analysé, challengé",
      "Onboarding express des nouvelles recrues",
    ],
    value:
      "L'AIM capture votre méthode, votre façon de gérer un client, de produire un reporting, de rédiger une propale, et l'exécute. Votre savoir-faire ne dépend plus de qui est dans la pièce.",
  },
  {
    id: "pme",
    icon: Store,
    tab: "PME",
    title: "PME & entreprises artisanales",
    subtitle: "5 à 50 personnes",
    pains: [
      "Le dirigeant est le goulet d'étranglement de tout",
      "Les devis traînent, les relances sont oubliées",
      "La connaissance métier vit dans une seule tête",
      "La facturation passe après tout le reste, la trésorerie trinque",
      "Impossible de déléguer, donc impossible de scaler",
    ],
    missions: [
      "Devis générés et relancés automatiquement",
      "Facturation émise à temps, impayés suivis",
      "Demandes clients triées et traitées en continu",
      "Planning et coordination des équipes tenus à jour",
      "Votre méthode documentée, appliquée, transmissible",
      "Alertes quand quelque chose sort des rails",
    ],
    value:
      "L'AIM applique votre logique métier, vos règles de devis, vos priorités, vos clients, et exécute en continu ce que vous seul saviez faire. Vous sortez du quotidien sans perdre le contrôle.",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    tab: "E-commerce",
    title: "E-commerce & marques DTC",
    subtitle: "Catalogue et volume clients élevés",
    pains: [
      "Fiches produits jamais à jour sur tout le catalogue",
      "Les avis clients s'accumulent sans réponse",
      "Campagnes email génériques, jamais personnalisées",
      "Le contenu : créer, publier, analyser, recommencer, sans fin",
      "Le volume rend tout traitement manuel impossible",
    ],
    missions: [
      "Catalogue et fiches produits tenus à jour",
      "Avis clients traités avec votre ton, sans délai",
      "Campagnes email personnalisées par segment",
      "Contenu créé, publié, analysé, challengé",
      "Veille concurrentielle et prix surveillés",
      "Reporting ventes et marges chaque semaine",
    ],
    value:
      "L'AIM absorbe le volume : il tient le catalogue à jour, répond aux avis avec votre ton, personnalise les campagnes selon l'historique de chaque client. Ce qui était humainement impossible devient automatique.",
  },
  {
    id: "b2b",
    icon: Briefcase,
    tab: "Services B2B",
    title: "Cabinets de conseil & services pro",
    subtitle: "Missions longues, équipes expertes",
    pains: [
      "70% du temps des consultants part en reporting et admin",
      "Une proposition commerciale prend 2 à 4 jours",
      "La knowledge base est un chaos de Google Docs",
      "Comptes-rendus et suivi des temps dévorent les soirées",
      "Le temps facturable fond au profit de l'interne",
    ],
    missions: [
      "Comptes-rendus de réunion rédigés et diffusés",
      "Propales générées depuis vos missions passées",
      "Knowledge base vivante, interrogeable par tous",
      "Suivi des temps et reporting mission automatisés",
      "Veille sectorielle synthétisée pour vos consultants",
      "Facturation des missions suivie et relancée",
    ],
    value:
      "L'AIM rend le temps aux consultants : reporting automatisé, propales générées depuis vos missions passées, knowledge base vivante et interrogeable. Vos experts font du conseil, pas de l'admin.",
  },
  {
    id: "coach",
    icon: User,
    tab: "Indépendant",
    title: "Coachs, formateurs & experts solo",
    subtitle: "Vous êtes le produit",
    pains: [
      "Chaque heure d'admin est une heure non facturée",
      "Des prospects chauds jamais rappelés, faute de temps",
      "Le contenu publié « quand on y pense »",
      "La facturation et les relances, toujours repoussées",
      "Plafond de verre : impossible de faire plus d'heures",
    ],
    missions: [
      "Prospects qualifiés, rappelés, relancés sans oubli",
      "Contenu créé, publié, analysé, challengé",
      "Agenda, rendez-vous et préparation des sessions gérés",
      "Facturation émise, relances envoyées",
      "Supports et programmes déclinés depuis vos contenus",
      "Suivi personnalisé de chaque client entre les sessions",
    ],
    value:
      "L'AIM est votre associé silencieux : il gère la prospection, les relances, le contenu, la facturation, pendant que vous faites la seule chose que personne ne peut faire à votre place.",
  },
  {
    id: "startup",
    icon: Rocket,
    tab: "Startup",
    title: "Startups early-stage",
    subtitle: "Seed / Série A, équipe minuscule",
    pains: [
      "Le fondateur fait tout : produit, ventes, support, admin",
      "Churn silencieux : personne ne détecte les signaux",
      "Conversion trial → paid faible par manque de suivi",
      "Pas les moyens de recruter CS, sales ops, office manager",
      "Le reporting investisseurs tombe toujours au pire moment",
    ],
    missions: [
      "Chaque trial suivi personnellement, sans CS",
      "Signaux de churn détectés et traités tôt",
      "Onboarding utilisateurs orchestré de bout en bout",
      "Reporting investisseurs prêt avant qu'on le demande",
      "Support niveau 1 absorbé, escalade intelligente",
      "Veille marché et concurrents synthétisée",
    ],
    value:
      "L'AIM est le système qui pense à votre place : il détecte les signaux faibles, suit chaque trial personnellement, exécute les tâches répétitives, pendant que vous codez ou pitchez.",
  },
];

const COMPARE = [
  {
    left: "Une demande, une réponse. Puis tout est oublié.",
    right: "Ce qui est construit reste, tourne, et se réutilise.",
  },
  {
    left: "Du code recraché, que tu recolles toi-même.",
    right: "Un cadre forgé pendant deux ans : règles, standards, méthode.",
  },
  {
    left: "Des clés API bricolées à la main, dans un coin.",
    right: "Accès et connexions gérés proprement, en coulisses.",
  },
  {
    left: "L'IA travaille dans le vide, sans garde-fous.",
    right: "Un environnement isolé, sécurisé, sous ton contrôle.",
  },
  {
    left: "Une aide ponctuelle. Quand tu la sollicites.",
    right: "Des outils qui se déclenchent seuls et reprennent où ils en étaient.",
  },
];

/* ------------------------------- animations -------------------------------- */

const revealBlur = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ num, label, children }) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto">
      <p className="secnum mb-3">{num}</p>
      <p className="kicker mb-5">{label}</p>
      {children}
    </Reveal>
  );
}

/* ------------------------------- system map --------------------------------
   La carte du système réel : chaque pastille est un vrai package branché
   dans l'AIM qui a produit cette page. Trois orbites en rotation lente,
   impulsions entrantes (données) et sortantes (actions). */

function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

const ORBITS = [
  { nodes: NODES_INNER, radius: 19, start: -90, duration: 80, reverse: false },
  { nodes: NODES_MID, radius: 31.5, start: -70, duration: 115, reverse: true },
  { nodes: NODES_OUTER, radius: 42.5, start: -90, duration: 160, reverse: false },
];

const PULSE_COLORS = ["#7dd3fc", "#a78bfa", "#f0abfc"];

function OrbitLayer({ nodes, radius, start, duration, reverse, layer }) {
  const pts = useMemo(
    () =>
      nodes.map((label, i) => {
        const { x, y } = polar(50, 50, radius, start + (i * 360) / nodes.length);
        return { label, x, y };
      }),
    [nodes, radius, start]
  );

  const spin = reverse ? -360 : 360;

  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: spin }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        {pts.map((n) => (
          <line
            key={`l-${n.label}`}
            x1={n.x}
            y1={n.y}
            x2="50"
            y2="50"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.22"
          />
        ))}
        {/* impulsions entrantes : les données remontent vers le cœur */}
        {pts.map((n, i) => (
          <motion.circle
            key={`in-${n.label}`}
            r="0.75"
            fill={PULSE_COLORS[(i + layer) % 3]}
            initial={{ cx: n.x, cy: n.y, opacity: 0 }}
            animate={{ cx: [n.x, 50], cy: [n.y, 50], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.2,
              delay: i * 1.1 + layer * 0.4,
              repeat: Infinity,
              repeatDelay: nodes.length * 1.1 - 2.2,
              ease: "easeIn",
            }}
          />
        ))}
        {/* impulsions sortantes : les actions repartent vers les outils */}
        {pts.map((n, i) =>
          i % 2 === layer % 2 ? (
            <motion.circle
              key={`out-${n.label}`}
              r="0.65"
              fill="#34d399"
              initial={{ cx: 50, cy: 50, opacity: 0 }}
              animate={{ cx: [50, n.x], cy: [50, n.y], opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 2.4,
                delay: i * 1.3 + 1.1 + layer * 0.6,
                repeat: Infinity,
                repeatDelay: nodes.length * 1.3 - 2.4,
                ease: "easeOut",
              }}
            />
          ) : null
        )}
      </svg>

      {pts.map((n, i) => (
        <motion.div
          key={n.label}
          className="node-pill"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
          animate={{
            opacity: 1,
            scale: 1,
            x: "-50%",
            y: "-50%",
            rotate: -spin,
          }}
          transition={{
            opacity: { delay: 0.35 + layer * 0.25 + i * 0.06, duration: 0.5 },
            scale: {
              delay: 0.35 + layer * 0.25 + i * 0.06,
              duration: 0.5,
              ease: "backOut",
            },
            rotate: { duration, repeat: Infinity, ease: "linear" },
          }}
        >
          {n.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

function SystemMap() {
  return (
    <div className="relative aspect-square w-full max-w-[600px] mx-auto select-none">
      <div className="map-halo" />

      {/* orbites */}
      <div className="orbit-ring" style={{ width: "38%", height: "38%" }} />
      <div className="orbit-ring" style={{ width: "63%", height: "63%" }} />
      <div className="orbit-ring" style={{ width: "85%", height: "85%" }} />

      {ORBITS.map((o, i) => (
        <OrbitLayer key={i} {...o} layer={i} />
      ))}

      {/* cœur */}
      <div className="core-ping" />
      <div className="core-ping d2" />
      <div className="core-ring" />
      <div className="core">
        <span className="text-sm">AIM</span>
      </div>
    </div>
  );
}

/* ------------------------------ validation card -----------------------------
   Reproduction de la vraie carte de validation interactive de l'AIM.
   Elle tourne en boucle sur plusieurs situations réelles, et tu peux
   naviguer manuellement entre les scénarios. */

const V_STEPS = ["Événement", "Analyse", "Proposition", "Validation", "Mémoire"];

const SCENARIOS = [
  {
    tag: "finance",
    title: "Impayé détecté · Facture #2041",
    sub: "Client Delacroix SARL · 1 840 € · J+15",
    event: {
      source: "facturation · stripe",
      text: "Facture #2041 · Delacroix SARL · 1 840 € · échéance dépassée de 15 jours.",
    },
    analysis: [
      "Historique client : 2 retards en 12 mois, toujours réglés",
      "Ta règle : relance courtoise à J+15, échéancier proposé",
      "Ton de la relance ajusté au profil du client",
    ],
    label: "Relance proposée",
    proposal:
      "« Bonjour M. Delacroix, sauf erreur de notre part la facture #2041 reste en attente. Souhaitez-vous un échéancier ? »",
    cta: "Valider la relance",
    doneTitle: "Relance envoyée",
    doneSub: "Décision archivée. Le système saura la prochaine fois.",
    memory:
      "Retenu : Delacroix règle sous 48h après relance. La prochaine partira à J+13.",
  },
  {
    tag: "commercial",
    title: "Lead entrant · Formulaire du site",
    sub: "Marion B. · agence immobilière · demande de rappel",
    event: {
      source: "site · formulaire contact",
      text: "Marion B., agence immobilière : « Pouvez-vous me rappeler pour un projet d'automatisation ? »",
    },
    analysis: [
      "Profil : agence immobilière, 8 personnes, cible prioritaire",
      "Ton agenda : 3 créneaux libres ce jeudi",
      "Ta règle : répondre à un lead entrant en moins d'une heure",
    ],
    label: "Réponse proposée",
    proposal:
      "« Bonjour Marion, merci pour votre message. Trois créneaux ce jeudi : 9h30, 11h ou 14h. Lequel vous arrange ? »",
    cta: "Valider l'envoi",
    doneTitle: "Rendez-vous proposé",
    doneSub: "Le créneau retenu ira directement dans l'agenda.",
    memory:
      "Retenu : les leads immobilier répondent mieux le matin. Priorité aux créneaux 9h-11h.",
  },
  {
    tag: "support",
    title: "Avis client 2★ · Fiche Google",
    sub: "Commande #1187 · livraison en retard",
    event: {
      source: "google · avis clients",
      text: "Avis 2★ sur la commande #1187 : « Livraison reçue avec 6 jours de retard, aucune nouvelle. »",
    },
    analysis: [
      "Commande vérifiée : retard transporteur avéré, 6 jours",
      "Client fidèle : 4 commandes, jamais d'incident",
      "Ta règle : geste commercial dès qu'un retard dépasse 5 jours",
    ],
    label: "Réponse proposée",
    proposal:
      "« Bonjour, vous avez entièrement raison et nous nous excusons pour ce délai. Un geste commercial part aujourd'hui sur votre compte. »",
    cta: "Valider la réponse",
    doneTitle: "Réponse publiée",
    doneSub: "Le geste commercial est tracé dans l'historique client.",
    memory:
      "Retenu : incident transporteur documenté. Le prochain retard de ce transporteur remontera une alerte.",
  },
  {
    tag: "contenu",
    title: "Post LinkedIn · Étude de cas",
    sub: "Rédigé à partir de tes résultats clients · prêt à publier",
    event: {
      source: "planning éditorial",
      text: "Lundi 8h : un post LinkedIn est prévu cette semaine sur ton étude de cas e-commerce.",
    },
    analysis: [
      "Étude de cas relue : chiffres validés avec le client",
      "Tes 10 derniers posts : ceux avec chiffres font 3× plus de portée",
      "Ton calendrier : créneau optimal mardi 8h30",
    ],
    label: "Post proposé",
    proposal:
      "« 3 mois, +42% de CA pour un e-commerçant. Ce qu'on a changé, et ce qu'on n'a surtout pas touché. » Programmé mardi 8h30.",
    cta: "Valider la publication",
    doneTitle: "Post programmé",
    doneSub: "Publication mardi 8h30. Performances suivies automatiquement.",
    memory:
      "Retenu : les posts chiffrés surperforment. Le prochain brief en tiendra compte.",
  },
  {
    tag: "rh",
    title: "Candidature reçue · Chef de projet",
    sub: "Via Indeed · CV analysé contre ta fiche de poste",
    event: {
      source: "indeed · candidatures",
      text: "Nouvelle candidature au poste de chef de projet : CV et lettre de motivation reçus.",
    },
    analysis: [
      "CV croisé avec la fiche de poste : 8 critères sur 10",
      "Expérience clé : 4 ans en gestion de projet en agence",
      "Ta règle : entretien proposé dès 7 critères sur 10",
    ],
    label: "Réponse proposée",
    proposal:
      "« Bonjour, votre profil correspond à ce que nous cherchons. Seriez-vous disponible mardi ou mercredi pour un échange de 30 minutes ? »",
    cta: "Valider l'invitation",
    doneTitle: "Entretien proposé",
    doneSub: "La réponse du candidat créera le rendez-vous dans ton agenda.",
    memory:
      "Retenu : candidature classée. Les critères qui matchent affineront la prochaine fiche de poste.",
  },
  {
    tag: "reporting",
    title: "Vendredi 17h · Reporting hebdo",
    sub: "3 clients · données consolidées automatiquement",
    event: {
      source: "agenda · vendredi 17h",
      text: "Reporting hebdo : les données des 3 clients sont consolidées, prêtes à synthétiser.",
    },
    analysis: [
      "CA consolidé : +12% sur la semaine",
      "Signal détecté : réactivité du client Nova en baisse",
      "Stock réf. B-204 passé sous le seuil que tu as fixé",
    ],
    label: "Synthèse proposée",
    proposal:
      "« CA en hausse de 12% cette semaine. Deux points d'attention : la réactivité du client Nova et le stock de la réf. B-204. »",
    cta: "Valider l'envoi",
    doneTitle: "Reporting envoyé",
    doneSub: "Trois rapports partis, archivés et comparables dans le temps.",
    memory:
      "Retenu : trois rapports archivés, comparables semaine après semaine.",
  },
];

const PHASE_BADGE = [
  { label: "événement", cls: "border-sky-400/30 text-sky-300/90 bg-sky-400/5" },
  { label: "analyse", cls: "border-violet-400/30 text-violet-300/90 bg-violet-400/5" },
  { label: "en attente", cls: "border-amber-400/30 text-amber-300/90 bg-amber-400/5" },
  { label: "en attente", cls: "border-amber-400/30 text-amber-300/90 bg-amber-400/5" },
  { label: "résolu", cls: "border-emerald-400/30 text-emerald-300/90 bg-emerald-400/5" },
];

/* durée de lecture par phase : événement, analyse (3 lignes), proposition,
   validation, mémoire. Le temps suit la densité du contenu affiché. */
const PHASE_MS = [4000, 6500, 5500, 3500, 5500];

function ValidationScene() {
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
                    ? "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                    : "bg-white/15"
                }`}
              />
              <span
                className={`font-mono text-[9px] sm:text-[10px] tracking-wide uppercase transition-colors duration-500 truncate ${
                  i < active ? "text-violet-300" : "text-white/30"
                }`}
              >
                {s}
              </span>
            </div>
            {i < V_STEPS.length - 1 && (
              <div className="h-px flex-shrink-0 w-3 sm:w-6 mx-0.5 mb-4 bg-white/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-violet-400/70 transition-all duration-700"
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
          <span className="font-mono text-[11px] text-white/40 tracking-wider">
            aim · carte interactive
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">
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
            <p className="text-sm text-white/45 mb-4">{sc.sub}</p>
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
                  <p className="font-mono text-[10px] uppercase tracking-wider text-sky-300/70 mb-1.5">
                    Événement entrant · {sc.event.source}
                  </p>
                  <p className="text-[13px] leading-relaxed text-white/75">
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
                <p className="font-mono text-[10px] uppercase tracking-wider text-violet-300/70 mb-2.5">
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
                      <Check size={13} className="text-emerald-300 mt-0.5 shrink-0" />
                      <span className="text-[13px] leading-relaxed text-white/70">
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
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/35 mb-1.5">
                    {sc.label}
                  </p>
                  <p className="text-[13px] leading-relaxed text-white/75">
                    {sc.proposal}
                  </p>
                </div>
                <motion.div
                  className="flex gap-2.5"
                  animate={{ opacity: phase === 3 ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.button
                    className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-white text-black"
                    animate={
                      phase === 3
                        ? { scale: [1, 0.94, 1], boxShadow: "0 0 30px rgba(167,139,250,0.5)" }
                        : { scale: 1, boxShadow: "0 0 0px rgba(167,139,250,0)" }
                    }
                    transition={{ duration: 0.45, delay: phase === 3 ? 0.35 : 0 }}
                  >
                    {sc.cta}
                  </motion.button>
                  <button className="flex-1 rounded-xl py-2.5 text-sm font-medium border border-white/12 text-white/60">
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
                <div className="flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-4 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-400/15 text-emerald-300">
                    <Check size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-200">
                      {sc.doneTitle}
                    </p>
                    <p className="text-xs text-white/45">{sc.doneSub}</p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="vfield flex items-start gap-2.5 p-3"
                >
                  <Database size={13} className="text-violet-300 mt-0.5 shrink-0" />
                  <span className="text-[12px] leading-relaxed text-white/55">
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
                ? "border-violet-400/60 text-violet-200 bg-violet-400/10"
                : "border-white/10 text-white/40 hover:text-white/75 hover:border-white/25"
            }`}
          >
            {s.tag}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- nav ------------------------------------ */

const NAV_LINKS = [
  { href: "#probleme", label: "Le problème" },
  { href: "#systeme", label: "Le système" },
  { href: "#difference", label: "La différence" },
  { href: "#developpement", label: "Développement" },
  { href: "#icp", label: "Pour qui" },
  { href: "#souverainete", label: "Souveraineté" },
];

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#050507] px-6 text-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            AI Manager by Hit The Record
          </motion.span>
          <div className="font-extrabold tracking-tight leading-[1.12] text-[clamp(1.5rem,4.2vw,2.9rem)]">
            <motion.span
              className="block text-white/55"
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

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-extrabold tracking-tight text-[17px]">
            AI&nbsp;Manager
          </span>
          <span className="font-mono text-[10px] text-white/40 tracking-wider hidden sm:inline">
            by Hit The Record
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/55 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a href={BOOKING_URL} className="btn-primary !py-2 !px-4 text-sm">
          Réserver une démo
        </a>
      </nav>
    </header>
  );
}

/* --------------------------------- hero ------------------------------------ */

function HeadlineLine({ text, className = "", delay = 0 }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-12 px-5 sm:px-8 overflow-x-clip">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-7"
          >
            <span className="fr-badge">
              <span className="fr-flag" /> Conçu & hébergé en France
            </span>
            <span className="kicker">L'ère de l'autonomisation</span>
          </motion.div>

          <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl xl:text-[4.4rem] font-extrabold tracking-[-0.03em] mb-7">
            <HeadlineLine text="Une IA qui discute," delay={0.1} />
            <br />
            <HeadlineLine text="tu en as déjà une." delay={0.22} />
            <br />
            <HeadlineLine
              text="Voici celle qui travaille."
              className="grad-text"
              delay={0.34}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-white/55 leading-relaxed max-w-xl mb-9"
          >
            L'AI Manager est branché sur tes outils, applique ta logique métier
            et exécute : relances, reporting, devis, suivi. Pendant ce temps,
            tu fais ce que personne ne peut faire à ta place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <a href={BOOKING_URL} className="btn-primary">
              Réserver ma démo <ArrowRight size={18} />
            </a>
            <a href="#systeme" className="btn-ghost">
              Voir comment ça marche
            </a>
          </motion.div>

          {/* preuve méta : véridique et vérifiable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="hairline rounded-2xl px-4 py-3.5 flex items-start gap-3 max-w-xl bg-white/[0.02]"
          >
            <span className="text-violet-300 mt-0.5">
              <Sparkles size={16} />
            </span>
            <p className="text-[13px] leading-relaxed text-white/55">
              <span className="text-white/85 font-medium">
                Cette page a été conçue, codée et mise en ligne par l'AI
                Manager lui-même.
              </span>{" "}
              Pas une métaphore : on te montre les coulisses en démo.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <SystemMap />
          <p className="text-center font-mono text-[11px] text-white/35 mt-4 tracking-wide max-w-md mx-auto leading-relaxed">
            Un aperçu de notre propre instance, qui grandit chaque semaine.
            La tienne se construira autour de tes outils, sans limite.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------- ticker ----------------------------------- */

function Ticker() {
  const items = [...TOOLS, ...TOOLS];
  return (
    <section className="py-10 border-y border-white/[0.06]">
      <p className="text-center kicker mb-6">
        Quelques outils déjà branchés dans notre propre système
      </p>
      <div className="ticker-mask overflow-hidden">
        <div className="ticker-track">
          {items.map((t, i) => (
            <span
              key={i}
              className="font-mono text-sm text-white/40 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ manifeste -----------------------------------
   Le changement d'ère : autonomisation, pas automatisation. */

function Manifeste() {
  return (
    <section className="py-16 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <Reveal>
          <p className="kicker mb-6">Changement d'ère</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.15] mb-7">
            L'automatisation exécute des scripts.
            <br />
            <span className="grad-text">
              L'autonomisation opère ton entreprise.
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            Un script s'arrête au premier imprévu. Un système autonome comprend
            le contexte, décide, agit, et vient te chercher quand l'enjeu
            mérite ta validation. C'est cette bascule que l'AIM te fait
            franchir : tu ne programmes plus des tâches, tu confies un
            périmètre.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- probleme ----------------------------------- */

const PROBLEMS = [
  {
    icon: Brain,
    title: "Tout redémarre de zéro",
    text: "ChatGPT, Claude, Copilot et tant d'autres. Brillants dix minutes, amnésiques la minute d'après. Chaque conversation repart de rien : ton contexte, tes règles, ton historique, évaporés.",
  },
  {
    icon: Database,
    title: "Le savoir s'évapore",
    text: "Ton entreprise tient dans des têtes. Une, cinq, cinquante, peu importe le nombre : quand quelqu'un part, son savoir-faire part avec lui. Et chaque nouvelle arrivée repart de zéro.",
  },
  {
    icon: Zap,
    title: "L'exécution te bouffe",
    text: "Relances, reporting, devis, suivi, saisie. Des heures d'exécution répétitive chaque semaine, que personne ne t'enlèvera. Sauf un système qui les prend réellement en charge.",
  },
  {
    icon: Layers,
    title: "Des outils qui ne se parlent pas",
    text: "CRM, facturation, mails, tableurs, messageries : chacun dans son coin. C'est toi le connecteur humain qui recopie, exporte, recolle. Ce travail invisible n'apparaît sur aucune fiche de poste.",
  },
  {
    icon: GitBranch,
    title: "Les automatisations cassent",
    text: "Zapier, n8n, macros : des scripts figés qui s'arrêtent au premier cas imprévu. Personne ne sait pourquoi, personne n'ose y toucher. L'automatisation sans compréhension, c'est de la dette.",
  },
  {
    icon: Moon,
    title: "Personne ne veille",
    text: "Le soir, le week-end, pendant les congés : les impayés vieillissent, les leads refroidissent, les signaux faibles passent inaperçus. Ton business vit en continu, pas tes équipes.",
  },
];

function Probleme() {
  return (
    <section id="probleme" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <SectionHead num="01" label="Le problème">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            L'IA que tout le monde utilise
            <br />
            <span className="grad-text">n'opère rien du tout.</span>
          </h2>
        </SectionHead>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
        >
          {PROBLEMS.map((p) => (
            <motion.div key={p.title} variants={revealBlur} className="card p-7">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 text-violet-300 mb-5">
                <p.icon size={20} />
              </span>
              <h3 className="text-lg font-bold mb-3">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-white/50">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* le piège du moment : le vibe coding */}
        <Reveal className="mt-5">
          <div className="card !border-rose-400/20 p-7 sm:p-9 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-start gap-5 relative">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-rose-400/10 border border-rose-400/25 text-rose-300 shrink-0">
                <Bug size={20} />
              </span>
              <div>
                <p className="kicker !text-rose-300/80 mb-3">
                  Et la nouvelle mode n'arrange rien
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Tout le monde vibe code. Presque personne ne construit.
                </h3>
                <p className="text-[15px] leading-relaxed text-white/50 max-w-3xl">
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

/* -------------------------------- systeme ----------------------------------- */

const PILLARS = [
  {
    icon: Plug,
    title: "Branché sur tes outils",
    text: "Mails, agenda, CRM, facturation, réseaux : l'AIM agit dans tes outils, pas à côté. Il lit ce qui arrive, croise avec ton historique, et prépare l'action.",
  },
  {
    icon: ShieldCheck,
    title: "Tu gardes la main",
    text: "Sur les actions qui comptent, il propose et attend ta validation. Un clic et c'est exécuté. Le reste du temps, il avance seul dans le périmètre que tu lui as confié.",
  },
  {
    icon: Database,
    title: "Une mémoire qui capitalise",
    text: "Chaque décision validée enrichit sa mémoire. Tes règles, tes exceptions, ton ton, tes clients : il connaît ton métier mieux chaque semaine, et rien ne se perd.",
  },
  {
    icon: Smartphone,
    title: "Il te parle où tu es",
    text: "Telegram, WhatsApp, mail : les validations arrivent directement sur ton téléphone. Tu pilotes ton entreprise depuis une conversation, où que tu sois.",
  },
  {
    icon: Activity,
    title: "Toujours en éveil",
    text: "24h/24, 7j/7 : il réagit aux événements à la seconde où ils arrivent. La nuit, le week-end, pendant tes congés, ton système ne dort jamais.",
  },
];

const BRAIN_KNOWS = [
  {
    title: "Tes clients",
    text: "Historique, contexte, préférences, engagements en cours.",
  },
  {
    title: "Tes méthodes",
    text: "Process, standards, façons de faire, ton de communication.",
  },
  {
    title: "Tes règles",
    text: "Priorités, limites, seuils de validation, décisions passées.",
  },
  {
    title: "Ton activité",
    text: "Projets, échéances, chiffres, signaux faibles du quotidien.",
  },
];

function Systeme() {
  return (
    <section id="systeme" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <SectionHead num="02" label="Le système">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            Un opérateur.
            <br />
            <span className="grad-text">Pas un chatbot.</span>
          </h2>
          <p className="text-white/50 text-lg mt-5 leading-relaxed">
            Un impayé, un lead, un avis client, un post à publier : la vraie
            mécanique de l'AIM sur six situations réelles. Clique pour
            naviguer, ou laisse tourner.
          </p>
        </SectionHead>

        <Reveal className="mt-12">
          <div className="card p-6 sm:p-10">
            <ValidationScene />
          </div>
        </Reveal>

        {/* cerveau central : ce qui rend l'exécution possible */}
        <Reveal className="mt-10">
          <div className="card p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-10 items-center relative">
              <div>
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 text-violet-300 mb-5">
                  <Brain size={20} />
                </span>
                <p className="kicker mb-3 !text-violet-300/80">
                  Ce qui rend tout ça possible
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug tracking-[-0.01em]">
                  Un cerveau central.
                  <br />
                  <span className="grad-text">
                    Il connaît ton business par cœur.
                  </span>
                </h3>
                <p className="text-[15px] leading-relaxed text-white/55">
                  Avant d'exécuter quoi que ce soit, l'AIM construit une
                  mémoire structurée de ton entreprise. Chaque client, chaque
                  échange, chaque décision l'enrichit. Et c'est précisément ce
                  qui lui permet de travailler : il n'attend pas qu'on lui
                  réexplique ton contexte, il le connaît déjà. Un outil
                  exécute des tâches. Un système qui connaît ton business
                  prend les bonnes.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {BRAIN_KNOWS.map((b) => (
                  <div
                    key={b.title}
                    className="hairline rounded-2xl p-5 bg-white/[0.02]"
                  >
                    <p className="font-semibold text-[14px] mb-1.5 text-white/85">
                      {b.title}
                    </p>
                    <p className="text-[13px] leading-relaxed text-white/45">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* les cinq piliers : le comment, en détail */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.title}
              variants={revealBlur}
              className="card p-5 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)] xl:w-[calc(20%-0.8rem)]"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-sky-300 mb-4">
                <p.icon size={18} />
              </span>
              <h3 className="font-bold text-[15px] mb-1.5">{p.title}</h3>
              <p className="text-[13px] leading-relaxed text-white/50">
                {p.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ difference ---------------------------------- */

function Difference() {
  return (
    <section id="difference" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <SectionHead num="03" label="La différence">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            L'IA, c'est le moteur.
            <br />
            <span className="grad-text">L'AIM, c'est la voiture.</span>
          </h2>
          <p className="text-white/50 text-lg mt-5 leading-relaxed">
            Un moteur seul n'a jamais emmené personne nulle part. Nous, on
            livre le véhicule complet : châssis, commandes, sécurité, carnet
            d'entretien.
          </p>
        </SectionHead>

        <div className="mt-12">
          <div className="hidden md:grid grid-cols-2 gap-5 mb-4">
            <p className="kicker text-center">Le moteur seul</p>
            <p className="kicker text-center !text-violet-300/80">
              La voiture complète
            </p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {COMPARE.map((row, i) => (
              <motion.div
                key={i}
                variants={revealBlur}
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="vs-left rounded-2xl p-5 text-[15px] leading-relaxed">
                  {row.left}
                </div>
                <div className="vs-right rounded-2xl p-5 text-[15px] leading-relaxed font-medium">
                  {row.right}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- developpement --------------------------------
   La vraie différenciation : l'AIM ne fait pas qu'opérer le quotidien,
   il développe des outils sur mesure avec un cadre digne d'une agence. */

const DEV_POINTS = [
  {
    icon: Wrench,
    title: "Deux ans de cadre, pas une improvisation",
    text: "Le cadre de développement de l'AIM a été forgé pendant deux ans par une équipe de développement : règles d'architecture, standards de code, conventions, méthode de test. Chaque outil produit passe par ce cadre, sans exception.",
  },
  {
    icon: PackageCheck,
    title: "Des outils finis, de bout en bout",
    text: "De l'idée à la mise en ligne : conception, code, sécurité, tests, documentation, déploiement, maintenance. Un outil livré par l'AIM est un outil terminé, versionné et documenté. Pas un prototype qui tient avec du scotch.",
  },
  {
    icon: ShieldCheck,
    title: "L'inverse du vibe coding",
    text: "Un outil vibe-codé marche le jour de la démo, puis devient une dette que personne n'ose toucher. Ici, n'importe quel développeur peut ouvrir le code demain, le comprendre et le faire évoluer.",
  },
  {
    icon: Network,
    title: "Sécurité et infra pensées d'abord",
    text: "Réseau, accès, infrastructure : les questions qu'on nous pose le plus. Réponses : environnements isolés, accès cloisonnés service par service, credentials séparées du code, chaque action journalisée. La sécurité n'est pas une couche ajoutée à la fin, c'est le point de départ du cadre.",
  },
];

const DEV_PIPELINE = [
  "Conception",
  "Code",
  "Sécurité",
  "Tests",
  "Documentation",
  "Déploiement",
  "Maintenance",
];

function Developpement() {
  return (
    <section id="developpement" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <SectionHead num="04" label="Le développement">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            Il n'exécute pas seulement.
            <br />
            <span className="grad-text">Il construit.</span>
          </h2>
          <p className="text-white/50 text-lg mt-5 leading-relaxed">
            C'est LA différence avec tout ce que tu verras ailleurs. Les
            plateformes d'exécution s'arrêtent là où ton besoin devient
            spécifique. L'AIM franchit cette limite : il développe avec toi les
            outils sur mesure que ton métier réclame, avec un niveau
            d'exigence digne d'une agence de développement.
          </p>
        </SectionHead>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-5 mt-12"
        >
          {DEV_POINTS.map((d) => (
            <motion.div key={d.title} variants={revealBlur} className="card p-7">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 text-violet-300 mb-5">
                <d.icon size={20} />
              </span>
              <h3 className="text-lg font-bold mb-3">{d.title}</h3>
              <p className="text-[15px] leading-relaxed text-white/50">{d.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* le chemin que suit chaque outil */}
        <Reveal className="mt-8">
          <div className="hairline rounded-2xl px-6 py-6 bg-white/[0.02]">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-3 mb-4">
              {DEV_PIPELINE.map((s, i) => (
                <span key={s} className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="font-mono text-[11px] sm:text-xs tracking-wider text-white/75 border border-white/10 rounded-full px-3.5 py-1.5 bg-white/[0.03] w-full text-center sm:w-auto">
                    <span className="text-violet-300/70 sm:hidden">
                      {String(i + 1).padStart(2, "0")} ·{" "}
                    </span>
                    {s}
                  </span>
                  {i < DEV_PIPELINE.length - 1 && (
                    <ArrowRight
                      size={13}
                      className="text-violet-300/60 hidden sm:block"
                    />
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
            <span className="text-violet-300 mt-0.5">
              <Sparkles size={18} />
            </span>
            <p className="text-[15px] leading-relaxed text-white/60">
              <span className="text-white/85 font-medium">
                La preuve est sous tes yeux.
              </span>{" "}
              Cette page a été développée dans ce cadre : structurée, versionnée,
              déployée et maintenue par l'AIM. Ton futur outil interne suivra
              exactement le même chemin.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- icp ------------------------------------- */

function Icp() {
  const [active, setActive] = useState(ICPS[0].id);
  const icp = ICPS.find((i) => i.id === active);

  return (
    <section id="icp" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <SectionHead num="05" label="Pour qui">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            Ton métier.
            <br />
            <span className="grad-text">Ta réalité.</span>
          </h2>
        </SectionHead>

        <Reveal className="flex flex-wrap justify-center gap-2.5 mt-10 mb-10">
          {ICPS.map((i) => (
            <button
              key={i.id}
              onClick={() => setActive(i.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                active === i.id
                  ? "bg-white text-black border-white"
                  : "border-white/12 text-white/55 hover:text-white hover:border-white/30"
              }`}
            >
              <i.icon size={15} />
              {i.tab}
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={icp.id}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="card p-8 sm:p-10"
          >
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <p className="kicker mb-3">{icp.subtitle}</p>
                <h3 className="text-2xl font-bold mb-6">{icp.title}</h3>
                <ul className="space-y-3">
                  {icp.pains.map((pain) => (
                    <li key={pain} className="flex items-start gap-3 text-[15px] text-white/55">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400/70 shrink-0" />
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="kicker mb-3 !text-violet-300/80">
                  Ce que l'AIM change
                </p>
                <p className="text-[16px] leading-relaxed text-white/75">
                  {icp.value}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-7 border-t border-white/[0.07]">
              <p className="kicker mb-4 !text-emerald-300/80">
                Ce que vous pouvez lui confier
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {icp.missions.map((m) => (
                  <div
                    key={m}
                    className="flex items-start gap-2.5 text-[14px] text-white/60"
                  >
                    <span className="mt-0.5 text-emerald-300/80 shrink-0">
                      <Check size={14} />
                    </span>
                    {m}
                  </div>
                ))}
              </div>
              <a href={BOOKING_URL} className="btn-ghost mt-7">
                Voir l'AIM sur votre cas <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ----------------------------- souverainete --------------------------------- */

const SOUV = [
  {
    icon: Server,
    title: "Hébergé en France, chez toi",
    text: "Sur tes serveurs ou un serveur dédié français. Pas de cloud américain, pas de mutualisé opaque : ton infrastructure, ta juridiction.",
  },
  {
    icon: ShieldCheck,
    title: "RGPD par construction",
    text: "Tes données clients ne transitent jamais vers des services tiers non maîtrisés. La conformité n'est pas une case cochée, c'est l'architecture.",
  },
  {
    icon: Lock,
    title: "Tout t'appartient",
    text: "Le système, la mémoire, les données, les accès. Si on disparaît demain, tout continue de tourner chez toi. Zéro dépendance, zéro otage.",
  },
];

function Souverainete() {
  return (
    <section id="souverainete" className="py-20 px-5 sm:px-8 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <SectionHead num="06" label="Souveraineté">
          <div className="flex justify-center mb-6">
            <span className="fr-badge">
              <span className="fr-flag" /> Made in France
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-[1.12]">
            Tes données ne quittent
            <br />
            <span className="grad-text">jamais tes serveurs.</span>
          </h2>
          <p className="text-white/50 text-lg mt-5 leading-relaxed">
            Pendant que le marché envoie tout dans des clouds étrangers, on a
            fait le choix inverse : un système souverain, français, qui
            t'appartient entièrement.
          </p>
        </SectionHead>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-5 mt-12"
        >
          {SOUV.map((s) => (
            <motion.div key={s.title} variants={revealBlur} className="card p-7">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 text-sky-300 mb-5">
                <s.icon size={20} />
              </span>
              <h3 className="text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-white/50">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="mt-8">
          <div className="hairline rounded-2xl px-6 py-5 flex items-start gap-4 bg-white/[0.02]">
            <span className="text-sky-300 mt-0.5">
              <ShieldCheck size={18} />
            </span>
            <p className="text-[15px] leading-relaxed text-white/60">
              <span className="text-white/85 font-medium">
                Tu veux le détail ? Tant mieux.
              </span>{" "}
              Architecture, réseau, gestion des accès, isolation des
              environnements, localisation exacte de chaque donnée : en démo,
              on te montre tout, schémas à l'appui. Un système qui
              t'appartient n'a rien à cacher.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- demo ------------------------------------- */

function Demo() {
  return (
    <section className="py-24 px-5 sm:px-8 relative">
      <div className="max-w-7xl mx-auto text-center">
        <Reveal>
          <p className="secnum mb-3">07</p>
          <p className="kicker mb-6">La suite</p>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] mb-6 leading-[1.08]">
            30 minutes.
            <br />
            <span className="grad-text">Ton cas, pas des slides.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            On te montre l'AIM en fonctionnement sur un environnement qui
            ressemble au tien, et les coulisses de cette page, construite par
            le système lui-même.
          </p>
          <motion.a
            href={BOOKING_URL}
            className="btn-primary !text-lg !px-10 !py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Réserver ma démo <ArrowRight size={20} />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- footer ------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
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
      <div className="aurora" />
      <div className="grain" />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Manifeste />
        <Probleme />
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
