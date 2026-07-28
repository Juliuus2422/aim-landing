// Systeme orbital anime + utilitaire Reveal, extraits du squelette V1 (theme propre a cette version).
import { useMemo } from "react";
import { motion } from "framer-motion";
import { NODES_INNER, NODES_MID, NODES_OUTER } from "./content.jsx";

export function Reveal({ children, className = "", delay = 0 }) {
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

function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

const ORBITS = [
  { nodes: NODES_INNER, radius: 19, start: -90, duration: 80, reverse: false },
  { nodes: NODES_MID, radius: 31.5, start: -70, duration: 115, reverse: true },
  { nodes: NODES_OUTER, radius: 42.5, start: -90, duration: 160, reverse: false },
];

const PULSE_COLORS = ["#7dd3fc", "#9cfd00", "#72fd4e"];

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
            stroke="rgba(255,255,255,0.09)"
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

export function SystemMap() {
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
