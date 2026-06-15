"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Candidate {
  id: number;
  name: string;
  role: string;
  score: number;
  badge: "Strong Hire" | "Consider" | "Risky";
  photo: string;
}

interface Category {
  label: string;
  score: number;
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Product Strategy Lead",
    score: 92,
    badge: "Strong Hire",
    // Professional female headshot — free from Unsplash (Mateus Campos Felipe)
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Senior PM",
    score: 74,
    badge: "Consider",
    // Professional male headshot — free from Unsplash (Austin Wade)
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Growth Manager",
    score: 58,
    badge: "Risky",
    // Professional female headshot — free from Unsplash (Simone van der Berg)
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
  },
];

const CATEGORIES: Category[] = [
  { label: "Communication", score: 95, icon: "💬" },
  { label: "Leadership", score: 90, icon: "🏆" },
  { label: "Accountability", score: 88, icon: "🎯" },
  { label: "Financial Awareness", score: 85, icon: "📊" },
  { label: "Problem Solving", score: 93, icon: "⚡" },
];

// ─── Badge helpers ─────────────────────────────────────────────────────────
function badgeStyle(badge: Candidate["badge"]) {
  if (badge === "Strong Hire")
    return { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", text: "#34d399" };
  if (badge === "Consider")
    return { bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.3)", text: "#fbbf24" };
  return { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", text: "#f87171" };
}

// ─── Photo Avatar ─────────────────────────────────────────────────────────────
function Avatar({ candidate, size = 44 }: { candidate: Candidate; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidate.photo}
      alt={candidate.name}
      width={size}
      height={size}
      className="flex-shrink-0 object-cover"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "block",
        // Subtle grayscale on non-active candidates for premium focus effect
      }}
      onError={(e) => {
        // Fallback to initials if image fails to load
        const target = e.currentTarget;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent && !parent.querySelector(".avatar-fallback")) {
          const fallback = document.createElement("div");
          fallback.className = "avatar-fallback";
          fallback.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:#222;display:flex;align-items:center;justify-content:center;font-size:${size * 0.33}px;font-weight:700;color:rgba(255,255,255,0.7);`;
          fallback.textContent = candidate.name.split(" ").map((n) => n[0]).join("");
          parent.appendChild(fallback);
        }
      }}
    />
  );
}

// ─── Circular Score Ring ──────────────────────────────────────────────────────
function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const r = (size - 16) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#F54E02"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2.2, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ filter: "drop-shadow(0 0 6px rgba(245,78,2,0.7))" }}
        />
      </svg>
      {/* Center text */}
      <div className="flex flex-col items-center z-10">
        <span className="text-white font-bold leading-none" style={{ fontSize: size * 0.27 }}>
          {score}
        </span>
        <span className="text-white/40 font-medium leading-none mt-0.5" style={{ fontSize: size * 0.1 }}>
          /100
        </span>
      </div>
    </div>
  );
}

// ─── Category Bar ─────────────────────────────────────────────────────────────
function CategoryBar({ label, score, index }: { label: string; score: number; index: number }) {
  return (
    <div className="flex items-center gap-3">
      {/* Label */}
      <span className="text-white/55 text-[11px] font-medium w-[130px] flex-shrink-0 leading-none">
        {label}
      </span>
      {/* Track */}
      <div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.4, delay: 1.0 + index * 0.1, ease: [0.34, 1.1, 0.64, 1] }}
          style={{
            background: "linear-gradient(90deg, #FF6B35 0%, #F54E02 100%)",
            boxShadow: "0 0 8px rgba(245,78,2,0.5)",
          }}
        />
      </div>
      {/* Score */}
      <span className="text-white font-semibold text-[11px] w-7 text-right flex-shrink-0">{score}</span>
    </div>
  );
}

// ─── Candidate Card ───────────────────────────────────────────────────────────
function CandidateCard({
  candidate,
  isActive,
  onClick,
}: {
  candidate: Candidate;
  isActive: boolean;
  onClick: () => void;
}) {
  const badge = badgeStyle(candidate.badge);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.015, y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer select-none overflow-hidden"
      style={{
        background: isActive
          ? "linear-gradient(135deg, rgba(245,78,2,0.14) 0%, rgba(245,78,2,0.04) 100%)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${isActive ? "rgba(245,78,2,0.45)" : "rgba(255,255,255,0.05)"}`,
        boxShadow: isActive
          ? "0 0 24px rgba(245,78,2,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "none",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Active indicator strip */}
      {isActive && (
        <motion.div
          layoutId="activeStrip"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
          style={{ background: "linear-gradient(180deg, #FF6B35, #F54E02)" }}
        />
      )}

      {/* Avatar */}
      <div
        className="rounded-full overflow-hidden flex-shrink-0"
        style={{
          border: isActive ? "2px solid rgba(245,78,2,0.6)" : "1.5px solid rgba(255,255,255,0.08)",
          boxShadow: isActive ? "0 0 12px rgba(245,78,2,0.3)" : "none",
        }}
      >
        <Avatar candidate={candidate} size={42} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-sm font-semibold truncate"
            style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)" }}
          >
            {candidate.name}
          </span>
          {/* Badge */}
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: badge.bg,
              border: `1px solid ${badge.border}`,
              color: badge.text,
            }}
          >
            {candidate.badge}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="font-bold text-[15px] leading-none"
            style={{ color: isActive ? "#F54E02" : "rgba(255,255,255,0.55)" }}
          >
            {candidate.score}
          </span>
          <span className="text-[10px] text-white/30 font-medium leading-none">/100</span>
        </div>
      </div>

      {/* Hover shine */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)" }}
      />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function DashboardMockup() {
  const [activeId, setActiveId] = useState(1);
  const activeCandidate = CANDIDATES.find((c) => c.id === activeId) ?? CANDIDATES[0];

  // ── Mouse parallax ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Higher damping = smoother, less CPU thrash
  const springCfg = { damping: 80, stiffness: 200, mass: 1.5 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  // Base tilt ±3° parallax range — transform-only (GPU)
  const rotateY = useTransform(smoothX, [0, typeof window !== "undefined" ? window.innerWidth : 1440], [-12, -6]);
  const rotateX = useTransform(smoothY, [0, typeof window !== "undefined" ? window.innerHeight : 900], [7, 2]);

  useEffect(() => {
    let rafId: number;
    let lastX = 0, lastY = 0;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };

    // Throttle via rAF — only update motion values at frame rate
    const tick = () => {
      mouseX.set(lastX);
      mouseY.set(lastY);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  // ── Subtle CSS float (no useAnimationFrame — uses CSS instead) ──
  return (
    // Perspective on the WRAPPER — prevents perspective from triggering stacking context issues
    <div style={{ perspective: "1400px" }} className="w-full max-w-[860px]">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
      {/* ── Ambient orange glow behind card ── */}
      <div
        className="absolute -inset-6 rounded-[40px] -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 55% 45%, rgba(245,78,2,0.22) 0%, transparent 68%)",
          filter: "blur(24px)",
        }}
      />

      {/* ── Main Card ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "rgba(17,17,17,0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "28px",
          boxShadow: `
            0 40px 80px rgba(0,0,0,0.7),
            0 0 0 0.5px rgba(255,255,255,0.04),
            inset 0 1px 0 rgba(255,255,255,0.09)
          `,
        }}
      >
        {/* ── Glass reflection on top edge ── */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-16 pointer-events-none rounded-t-[28px]"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, transparent 100%)" }}
        />

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <h2 className="text-white font-semibold text-[15px] leading-snug">Top Candidates</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-white/45 text-[12px]">Senior Product Manager</span>
              <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {/* View Full Report button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 16px rgba(255,255,255,0.07)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white/90 transition-colors px-3.5 py-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              transition: "color 0.2s, background 0.2s",
            }}
          >
            View Full Report
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>

        {/* ── Body: Two columns ── */}
        <div className="flex flex-col md:flex-row">

          {/* ── LEFT: Candidate List (45%) ── */}
          <div className="w-full md:w-[45%] p-5 flex flex-col gap-2.5" style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}>
            {CANDIDATES.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isActive={activeId === candidate.id}
                onClick={() => setActiveId(candidate.id)}
              />
            ))}

            {/* View all */}
            <motion.button
              whileHover={{ color: "rgba(245,78,2,0.9)" }}
              className="mt-1 text-center text-white/25 text-[10px] font-semibold uppercase tracking-widest hover:text-white/50 transition-colors py-1.5"
            >
              + View all candidates
            </motion.button>
          </div>

          {/* ── RIGHT: Analytics (55%) ── */}
          <div className="w-full md:w-[55%] p-5 flex flex-col gap-5" style={{ background: "rgba(0,0,0,0.15)" }}>

            {/* Overall Score */}
            <div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Overall Score</p>
              <div className="flex items-center gap-5">
                {/* Ring */}
                <ScoreRing score={activeCandidate.score} size={110} />

                {/* Status + description */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
                      style={{ boxShadow: "0 0 6px rgba(52,211,153,0.7)" }}
                    />
                    <span className="text-emerald-400 text-[13px] font-semibold">{activeCandidate.badge}</span>
                  </div>
                  <p className="text-white/45 text-[11px] leading-relaxed max-w-[170px]">
                    Excellent match for the role. High potential and strong alignment with key criteria.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

            {/* Category Scores */}
            <div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Category Scores</p>
              <div className="flex flex-col gap-3.5">
                {CATEGORIES.map((cat, i) => (
                  <CategoryBar key={cat.label} label={cat.label} score={cat.score} index={i} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom gradient fade ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none rounded-b-[28px]"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)" }}
        />
      </div>
      </motion.div>
    </div>
  );
}
