"use client";

import { motion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

// Pre-calculate all random values ONCE outside the component
// so they never recalculate on re-renders
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 1 + (i % 3) * 0.7,           // deterministic, no Math.random
    x: (i * 137.5) % 100,              // golden-angle spread across viewport %
    y: (i * 97.3) % 100,
    driftX: ((i % 7) - 3) * 30,
    driftY: -120 - (i % 5) * 40,
    opacity: 0.1 + (i % 4) * 0.08,
    duration: 14 + (i % 6) * 3,
    delay: (i % 10) * 1.4,
  }));
}

function generatePaths(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    d: `M ${-100 + i * 280} ${850 - i * 120} Q ${250 + i * 160} ${350 + i * 80} ${1300 + i * 90} ${-150 + i * 180}`,
    strokeWidth: i % 3 === 0 ? "1.5" : "0.8",
    duration: 14 + i * 4,
    delay: i * 2.5,
  }));
}

function generateNodes(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: `${8 + i * 8}%`,
    cy: `${10 + (i * 73) % 80}%`,
    r: 1.5 + (i % 3) * 1,
    duration: 4 + (i % 3) * 2,
    delay: i * 0.6,
  }));
}

// Static data — computed once at module load, never on re-render
const PARTICLES = generateParticles(25);   // reduced from 50
const PATHS     = generatePaths(6);        // reduced from 8
const NODES     = generateNodes(10);       // reduced from 12

export function CinematicBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-black -z-10 pointer-events-none"
      style={{ willChange: "auto" }}
    >
      {/* Layer 1: Base gradient — pure CSS, zero JS cost */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, #111111 0%, #050505 55%, #000000 100%)" }}
      />

      {/* Layer 2: Neural network SVG — NO blur filter (huge perf win) */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
        aria-hidden="true"
      >
        <defs>
          {/* Lightweight gradient — no feGaussianBlur */}
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#F54E02" stopOpacity="0.0" />
            <stop offset="50%"  stopColor="#F54E02" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F54E02" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Animated paths — only opacity + pathLength (GPU composited) */}
        {PATHS.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            fill="transparent"
            stroke="url(#lg1)"
            strokeWidth={p.strokeWidth}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            // NO filter prop — removed feGaussianBlur entirely
          />
        ))}

        {/* Nodes — only opacity animation, no scale (avoids layout) */}
        {NODES.map((n) => (
          <motion.circle
            key={n.id}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="#F54E02"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{
              duration: n.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: n.delay,
            }}
          />
        ))}
      </svg>

      {/* Layer 3: Particles — GPU-only transforms (translateX/Y + opacity) */}
      <div className="absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: "#F54E02",
              willChange: "transform, opacity",
            }}
            animate={{
              x: [0, p.driftX],
              y: [0, p.driftY],
              opacity: [p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Ambient glows — CSS only, no JS animation */}
      {/* Right glow: pure CSS keyframe animation via Tailwind */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(245,78,2,0.13) 0%, transparent 70%)",
          filter: "blur(50px)",
          animationDuration: "8s",
          willChange: "opacity",
        }}
      />
      {/* Left glow */}
      <div
        className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,78,2,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "pulse 12s ease-in-out infinite 3s",
          willChange: "opacity",
        }}
      />

      {/* Layer 5: Vignette — single element, pure CSS */}
      <div
        className="absolute inset-0 z-10"
        style={{
          boxShadow: "inset 0 0 180px rgba(0,0,0,0.85), inset 0 0 80px rgba(0,0,0,0.95)",
        }}
      />
    </div>
  );
}
