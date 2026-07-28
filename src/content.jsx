// Contenu partage L'AIM : donnees validees, identiques dans toutes les versions.
import {
  Activity, Brain, Briefcase, Building2, Database, GitBranch, Layers, Lock, Moon, Network, PackageCheck, Plug, Rocket, Server, ShieldCheck, ShoppingCart, Smartphone, Store, User, Wrench, Zap,
} from "lucide-react";

export const BOOKING_URL = "mailto:contact@hittherecord.com?subject=D%C3%A9mo%20AI%20Manager";

export const NODES_INNER = ["Gmail", "Telegram", "Notion", "Agenda", "iClosed"];

export const NODES_MID = [
  "ERP",
  "WhatsApp",
  "Slack",
  "Discord",
  "Fathom",
  "Meta Ads",
  "Instagram",
];

export const NODES_OUTER = [
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

export const TOOLS = [
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

export const ICPS = [
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

export const COMPARE = [
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

export const V_STEPS = ["Événement", "Analyse", "Proposition", "Validation", "Mémoire"];

export const SCENARIOS = [
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

export const PHASE_MS = [4000, 6500, 5500, 3500, 5500];

export const NAV_LINKS = [
  { href: "#probleme", label: "Le problème" },
  { href: "#systeme", label: "Le système" },
  { href: "#difference", label: "La différence" },
  { href: "#developpement", label: "Développement" },
  { href: "#icp", label: "Pour qui" },
  { href: "#souverainete", label: "Souveraineté" },
];

export const PROBLEMS = [
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

export const PILLARS = [
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

export const BRAIN_KNOWS = [
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

export const DEV_POINTS = [
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

export const DEV_PIPELINE = [
  "Conception",
  "Code",
  "Sécurité",
  "Tests",
  "Documentation",
  "Déploiement",
  "Maintenance",
];

export const SOUV = [
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
