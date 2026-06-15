"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { CinematicBackground } from "./hero/CinematicBackground";
import { DashboardMockup } from "./hero/DashboardMockup";

// ─── Avatar data with mini SVG logos ────────────────────────────────────────
const AVATARS = [
  {
    color: "#F54E02",
    glow: "#F54E0255",
    // Spark / bolt
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <path d="M9 2L4 9h4.5L7 14l5-7H8L9 2z" fill="white" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "#6366f1",
    glow: "#6366f155",
    // Hexagon gem
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <path d="M8 1.5l5.5 3.25v6.5L8 14.5 2.5 11.25V4.75L8 1.5z" fill="white" opacity="0.9" />
        <path d="M8 1.5l5.5 3.25L8 8 2.5 4.75 8 1.5z" fill="white" opacity="0.3" />
      </svg>
    ),
  },
  {
    color: "#10b981",
    glow: "#10b98155",
    // Pulse / wave
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <polyline points="1,8 4,8 5.5,4 7,12 8.5,6 10,10 11.5,8 15,8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "#f59e0b",
    glow: "#f59e0b55",
    // Stacked layers
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <path d="M8 2L14 5.5 8 9 2 5.5 8 2z" fill="white" opacity="0.9" />
        <path d="M2 8.5L8 12l6-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const TRUST_LOGOS: { name: string; icon: React.ReactNode; color: string }[] = [
  {
    name: "Acme Inc.",
    color: "#F54E02",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
        <path d="M7 1L13 12H1L7 1z" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Vertex",
    color: "#6366f1",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
        <path d="M7 1.5l5 3v6l-5 3-5-3v-6l5-3z" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Pulse",
    color: "#10b981",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
        <polyline points="1,7 3.5,7 5,3.5 6.5,10.5 8,5 9.5,8.5 11,7 13,7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Novu",
    color: "#a78bfa",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7" cy="7" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Layers",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
        <path d="M7 1.5L12.5 4.5 7 7.5 1.5 4.5 7 1.5z" fill="currentColor" opacity="0.9" />
        <path d="M1.5 7.5L7 10.5l5.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─── Animated count-up hook ──────────────────────────────────────────────────
function useCountUp(target: number, duration: number, delay: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / (duration * 1000), 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}

// ─── Trust Section Sub-component ─────────────────────────────────────────────
function TrustSection() {
  const count = useCountUp(500, 1.2, 1.1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 w-full"
    >
      {/* Row 1: Avatars + count + live dot */}
      <div className="flex items-center gap-4 mb-5">

        {/* Stacked avatar circles */}
        <div className="flex items-center">
          {AVATARS.map((av, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8, scale: 0.7 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${av.color}ee, ${av.color}99)`,
                marginLeft: i === 0 ? 0 : "-10px",
                boxShadow: `0 0 0 2px rgba(0,0,0,0.9), 0 0 10px ${av.glow}`,
                zIndex: AVATARS.length - i,
                position: "relative",
              }}
            >
              {av.icon}
            </motion.div>
          ))}
        </div>

        {/* Count + label */}
        <div className="flex items-baseline gap-1">
          <span className="text-[15px] font-bold text-white">
            {count}<span className="text-[#F54E02]">+</span>
          </span>
          <span className="text-[13px] font-medium text-white/50">hiring teams trust TalentScore</span>
        </div>

        {/* Live pulse indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
          className="flex items-center gap-1.5 ml-1"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-semibold text-emerald-400/80 tracking-wide">LIVE</span>
        </motion.div>
      </div>

      {/* Row 2: Logo pills */}
      <div className="flex flex-wrap items-center gap-2">
        {TRUST_LOGOS.map((logo, i) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 1.25 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06, y: -1 }}
            className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-default select-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* SVG logo icon badge */}
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
              style={{
                color: logo.color,
                background: `${logo.color}18`,
                border: `1px solid ${logo.color}30`,
              }}
            >
              {logo.icon}
            </span>
            <span className="text-[13px] font-semibold text-white/45 group-hover:text-white/70 transition-colors duration-200">
              {logo.name}
            </span>

            {/* Hover glow */}
            <motion.span
              initial={false}
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
              style={{
                background: "radial-gradient(ellipse at center, rgba(245,78,2,0.07) 0%, transparent 70%)",
                boxShadow: "inset 0 0 0 1px rgba(245,78,2,0.15)",
              }}
            />

            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out overflow-hidden rounded-lg"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Animated Stat Component ──────────────────────────────────────────────────
function AnimatedStatNumber({ target, suffix = "", textTarget }: { target?: number, suffix?: string, textTarget?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === undefined) return;
    
    const controls = animate(0, target, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setCount(Math.floor(value));
      }
    });

    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {target !== undefined ? count : textTarget}{suffix}
    </span>
  );
}

export function HeroSection() {

  return (
    <section className="relative w-full overflow-hidden bg-black flex flex-col min-h-screen">

      {/* ── Layer 0: Background Video ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        >
          {/* Dark abstract AI network / particle video — replace src with your own if desired */}
          <source
            src="https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark base overlay — ensures the video is cinematic, not distracting */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.80) 100%)",
          }}
        />

        {/* Orange ambient tint — ties video into brand palette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 65% 40%, rgba(245,78,2,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Bottom fade into the stats banner */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
          }}
        />

        {/* Top fade — softens video under the navbar */}
        <div
          className="absolute top-0 left-0 right-0 h-40"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Layer 1: Cinematic SVG / Neural Network overlay ── */}
      <CinematicBackground />


      {/* Hero Content */}
      <div className="relative z-20 flex-1 flex flex-col">
        {/* Two-column row */}
        <div className="flex-1 flex flex-col lg:flex-row items-center max-w-[1400px] mx-auto w-full px-6 pt-32 lg:pt-28 pb-16 gap-8 lg:gap-0">

          {/* LEFT: 42% */}
          <div className="w-full lg:w-[42%] flex flex-col items-start text-left flex-shrink-0">


            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold tracking-tight text-white mb-5 leading-[1.04]"
              style={{ fontSize: "clamp(48px, 5.5vw, 80px)" }}
            >
              Stop Gambling
              <br />
              With Your{" "}
              <span className="text-[#F54E02]">Hires.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] text-white/65 mb-9 max-w-[440px] leading-relaxed"
            >
              TalentScore analyzes resumes, evaluates interviews,
              and ranks candidates so you can hire with
              confidence—not guesswork.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                className="group relative inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "rgba(10, 10, 10, 0.9)",
                  border: "1px solid rgba(245, 78, 2, 0.5)",
                  boxShadow: "0 0 20px rgba(245,78,2,0.2), inset 0 0 15px rgba(245,78,2,0.1)",
                  isolation: "isolate"
                }}
              >
                {/* Background static glow */}
                <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,78,2,0.15)_0%,transparent_80%)]" />

                {/* Expanding Circle 1 (Deep Orange) */}
                <span className="absolute left-1/2 top-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 bg-[#d94400] rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out z-0" />
                
                {/* Expanding Circle 2 (Bright Orange Gradient) */}
                <span className="absolute left-1/2 top-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#FF6B35] to-[#F54E02] rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 delay-[50ms] ease-out z-0" />

                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-300 z-10"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)" }} />

                {/* Outer Drop shadow transition */}
                <span className="absolute inset-0 rounded-xl shadow-[0_0_40px_rgba(245,78,2,0)] group-hover:shadow-[0_0_40px_rgba(245,78,2,0.6)] transition-shadow duration-500" />

                {/* Content */}
                <span className="relative z-20 flex items-center gap-2 tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                  Evaluate Your First 3 Candidates Free
                  <ArrowRight className="w-4 h-4 text-[#FF6B35] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </span>
              </button>

              <button 
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 text-[15px] font-semibold text-white/90 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Hover Background Frost */}
                <span className="absolute inset-0 bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)" }} />

                {/* Play Icon Container */}
                <div className="relative flex items-center justify-center w-8 h-8 flex-shrink-0 z-10">
                  {/* Glowing background on hover */}
                  <span className="absolute inset-0 rounded-full bg-[#FF6B35]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Static Border */}
                  <span className="absolute inset-0 rounded-full border border-white/40 group-hover:border-[#FF6B35] transition-colors duration-300" />
                  
                  {/* Hover Sonar Ping */}
                  <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-all duration-300" />

                  {/* Icon */}
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5 group-hover:fill-[#FF6B35] transition-colors duration-300 relative z-10" />
                </div>

                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust */}
            <TrustSection />
          </div>

          {/* RIGHT: 58% — Dashboard */}
          <motion.div
            className="w-full lg:w-[58%] flex items-center justify-center lg:justify-end lg:pl-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardMockup />
          </motion.div>
        </div>

        {/* Stats Banner + Curved White Transition */}
        <div className="relative w-full mt-auto">
          {/* White curved section behind */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white"
            style={{
              width: "160%",
              height: "160px",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            }}
          />

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 max-w-[1100px] mx-auto px-6 pb-10"
          >
            <div
              className="w-full rounded-3xl p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
              style={{
                background: "rgba(15, 15, 15, 0.92)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              }}
            >
              {[
                { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, target: 68, suffix: "%", label: "Faster hiring decisions" },
                { icon: <Clock className="w-5 h-5" />, target: 3, suffix: "x", label: "Less time reviewing resumes" },
                { icon: <ShieldCheck className="w-5 h-5" />, target: 100, suffix: "%", label: "Structured candidate comparisons" },
                { icon: <TrendingUp className="w-5 h-5" />, textTarget: "Better", label: "Quality of hires" },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${i > 0 ? "md:pl-8 md:border-l md:border-white/[0.06]" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[#F54E02]">{stat.icon}</span>
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      <AnimatedStatNumber target={stat.target} suffix={stat.suffix} textTarget={stat.textTarget} />
                    </span>
                  </div>
                  <span className="text-[13px] text-white/45">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
