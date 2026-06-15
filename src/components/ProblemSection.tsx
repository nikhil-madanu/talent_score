"use client";

import { motion, useScroll, useTransform, animate, useMotionValue, useInView, Variants } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import { AlertTriangle, UserX, Check, X, HelpCircle, ArrowRight } from "lucide-react";

/* ─── Animated Counter ─────────────────────────────────────────────────────── */
function AnimatedNumber({
  value, duration = 2, delay = 0, prefix = "", suffix = "", decimal = false,
}: {
  value: number; duration?: number; delay?: number; prefix?: string; suffix?: string; decimal?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        animate(motionValue, value, { duration, ease: [0.16, 1, 0.3, 1] });
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, duration, delay, motionValue]);

  const displayValue = useTransform(motionValue, (latest) =>
    `${prefix}${decimal ? latest.toFixed(1) : Math.round(latest)}${suffix}`
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

/* ─── Shared easing ────────────────────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Variants ─────────────────────────────────────────────────────────────── */
const containerVariant: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* Removed blur filter from fadeUp — blur() on every frame is very expensive */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: EXPO },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: EXPO },
  },
};

/* ─── CSS keyframes for looping animations (replaces JS-driven Infinity loops) */
const loopingBarStyles = `
@keyframes bar-pulse-1 { 0%, 100% { width: 20%; } 50% { width: 80%; } }
@keyframes bar-pulse-2 { 0%, 100% { width: 60%; } 50% { width: 30%; } }
@keyframes bar-pulse-3 { 0%, 100% { width: 40%; } 50% { width: 90%; } }
@keyframes bar-pulse-4 { 0%, 100% { width: 80%; } 50% { width: 40%; } }
@keyframes float-up   { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes float-down { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px);  } }
`;

/* ─── Problem card wrapper ─────────────────────────────────────────────────── */
function ProblemCard({ title, description, visual }: {
  title: string; description: string; visual: React.ReactNode; index: number;
}) {
  return (
    <motion.div
      variants={cardVariant}
      className="group flex flex-col rounded-[20px] bg-[#0A0A0A] border border-white/5 shadow-lg overflow-hidden hover:border-[#FF6B35]/40 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(245,78,2,0.15)] hover:-translate-y-1"
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {/* Visual Header */}
      <div className="h-36 w-full bg-[#111] relative flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {visual}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[16px] font-bold text-white mb-2 leading-snug group-hover:text-[#FF6B35] transition-colors">{title}</h3>
        <p className="text-[#888] text-[14px] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────────────── */
export function ProblemSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Lighter parallax — only translating Y, no glow opacity per-frame */
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  /* ── Problem data (memoised to avoid re-creating JSX every render) ── */
  const problems = useMemo(() => [
    {
      title: "Interviewing Blind",
      description: "Every interviewer asks different questions. There's no consistent evaluation framework.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Doc 1 */}
          <motion.div
            className="absolute w-20 h-24 bg-[#1A1A1A] border border-white/10 rounded-lg p-2.5 shadow-xl z-10 flex flex-col gap-2"
            style={{ rotate: -12, willChange: "transform" }}
            whileHover={{ rotate: -22, x: -22, transition: { type: "spring", stiffness: 200, damping: 18 } }}
          >
            <div className="w-8 h-1 bg-white/20 rounded-full mb-1" />
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm border border-white/30" /><div className="w-10 h-1 bg-white/10 rounded-full" /></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm border border-white/30 bg-[#FF6B35]/50" /><div className="w-6 h-1 bg-white/10 rounded-full" /></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm border border-white/30" /><div className="w-8 h-1 bg-white/10 rounded-full" /></div>
          </motion.div>

          {/* Doc 2 */}
          <motion.div
            className="absolute w-20 h-24 bg-[#1E1E1E] border border-white/10 rounded-lg p-2.5 shadow-xl z-20 flex flex-col gap-2"
            style={{ rotate: 6, willChange: "transform" }}
            whileHover={{ rotate: 14, x: 22, transition: { type: "spring", stiffness: 200, damping: 18 } }}
          >
            <div className="w-10 h-1 bg-blue-400/40 rounded-full mb-1 mx-auto" />
            <div className="flex justify-center gap-1 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50" />
              <div className="w-2.5 h-2.5 rounded-full border border-blue-500/50" />
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full" />
            <div className="w-4/5 h-1 bg-white/10 rounded-full mx-auto" />
          </motion.div>

          {/* Doc 3 — replaced JS-driven infinite width animations with CSS keyframes */}
          <motion.div
            className="absolute w-20 h-24 bg-[#151515] border border-white/10 rounded-lg p-2 shadow-2xl z-30 flex flex-col gap-1.5"
            style={{ rotate: -2, willChange: "transform" }}
            whileHover={{ rotate: 0, y: 6, transition: { type: "spring", stiffness: 200, damping: 18 } }}
          >
            <div className="w-6 h-1 bg-white/30 rounded-full mb-1" />
            <div className="w-full h-12 border border-red-500/30 bg-red-500/5 rounded-md p-1.5 flex flex-col gap-1.5">
              <div className="h-0.5 bg-red-500/40 rounded-full" style={{ animation: "bar-pulse-1 4s ease-in-out infinite" }} />
              <div className="h-0.5 bg-red-500/40 rounded-full" style={{ animation: "bar-pulse-2 3s ease-in-out infinite" }} />
              <div className="h-0.5 bg-red-500/40 rounded-full" style={{ animation: "bar-pulse-3 5s ease-in-out infinite" }} />
              <div className="h-0.5 bg-red-500/40 rounded-full" style={{ animation: "bar-pulse-4 3.5s ease-in-out infinite" }} />
            </div>
          </motion.div>

          {/* Blindfold overlay — removed backdrop-blur (very expensive) */}
          <motion.div
            className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full h-8 bg-black/90 border-y border-[#FF6B35]/50 shadow-[0_0_20px_rgba(245,78,2,0.4)] flex items-center justify-center -rotate-6 scale-110">
              <span className="text-[#FF6B35] text-[10px] font-black tracking-[0.3em] uppercase">No Framework</span>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: "Candidates Perform Well",
      description: "Rehearsed answers make it difficult to separate confidence from competence.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="absolute w-20 h-24 rounded-[12px] bg-gradient-to-b from-[#FF6B35]/20 to-transparent border border-[#FF6B35]/30 z-20 flex flex-col items-center pt-4 shadow-2xl"
            style={{ willChange: "transform" }}
            whileHover={{ y: -14, transition: { type: "spring", stiffness: 220, damping: 18 } }}
          >
            <div className="w-8 h-8 rounded-full bg-[#FF6B35] mb-3 shadow-[0_0_15px_rgba(245,78,2,0.5)]" />
            <div className="h-1.5 w-10 bg-white/40 rounded-full mb-1.5" />
            <div className="h-1.5 w-6 bg-white/20 rounded-full" />
          </motion.div>
          <motion.div
            className="absolute w-24 h-28 border border-white/10 border-dashed rounded-[14px] flex items-end justify-center pb-2 z-10 bg-black/40"
            style={{ rotate: 6, willChange: "transform" }}
            whileHover={{ rotate: 14, scale: 1.06, transition: { type: "spring", stiffness: 180, damping: 18 } }}
          >
            <UserX className="w-8 h-8 text-white/20" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "Teams Can't Agree",
      description: "HR says yes. Managers say maybe. Leadership says no.",
      visual: (
        /* Replaced framer-motion infinite y-float with CSS keyframes */
        <div className="flex items-center justify-center gap-2 relative">
          <div
            className="w-10 h-10 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.1)] relative z-10"
            style={{ animation: "float-up 2.5s ease-in-out infinite" }}
          >
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <div
            className="w-10 h-10 rounded-full border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.1)] -ml-3 relative z-20"
            style={{ animation: "float-down 2.5s ease-in-out infinite 0.5s" }}
          >
            <HelpCircle className="w-5 h-5 text-yellow-500" />
          </div>
          <div
            className="w-10 h-10 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.1)] -ml-3 relative z-30"
            style={{ animation: "float-up 2.5s ease-in-out infinite 1s" }}
          >
            <X className="w-5 h-5 text-red-500" />
          </div>
        </div>
      ),
    },
    {
      title: "Gut-Feel Decisions",
      description: "Most hiring decisions rely on opinions rather than evidence.",
      visual: (
        <div className="w-full px-10 flex items-end justify-center h-20 gap-1.5 relative">
          {[
            { h: "30%", hh: "40%", bg: "bg-white/10", delay: 0 },
            { h: "50%", hh: "70%", bg: "bg-white/20", delay: 0.07 },
            { h: "80%", hh: "100%", bg: "bg-white/40", delay: 0.14 },
            { h: "40%", hh: "20%", bg: "bg-red-500/50", delay: 0.18, fail: true },
          ].map((bar, i) => (
            <motion.div
              key={i}
              className={`w-1/5 ${bar.bg} rounded-t-[4px] relative`}
              initial={{ height: bar.h }}
              whileHover={{ height: bar.hh }}
              transition={{ duration: 0.55, ease: EXPO, delay: bar.delay }}
              style={{ height: bar.h, willChange: "height" }}
            >
              {bar.fail && (
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500 text-xs font-bold"
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  FAIL
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ),
    },
  ], []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-24 overflow-hidden border-t border-white/[0.04]"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Inject CSS keyframes for looping animations */}
      <style dangerouslySetInnerHTML={{ __html: loopingBarStyles }} />

      {/* ── Video Particle Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-30 mix-blend-screen"
          style={{ filter: "sepia(1) hue-rotate(340deg) saturate(2) brightness(0.6)" }}
        >
          <source src="https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {/* Fade edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#000]/40 to-[#000000]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-[1400px]">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-5xl mx-auto mb-16 relative z-10"
        >
          <motion.p variants={fadeUp} className="text-[13px] font-semibold text-[#FF6B35] tracking-[0.2em] uppercase mb-4">
            The $10,000 Mistake Companies Keep Making
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[48px] md:text-[64px] lg:text-[76px] font-[800] mb-6 tracking-tight text-white leading-[1.05]">
            Every bad hire costs <br className="hidden md:block" />
            <span className="text-[#FF6B35]">you more than you think.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[17px] md:text-[19px] text-[#A1A1AA] leading-relaxed max-w-[700px] mx-auto font-medium">
            It&apos;s not just salary. It&apos;s lost productivity, damaged client relationships, <br className="hidden md:block" /> wasted onboarding time, and another hiring cycle.
          </motion.p>
        </motion.div>

        {/* ── Split Screen ── */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: EXPO }}
          className="relative w-full max-w-[1200px] mx-auto h-[350px] md:h-[450px] rounded-[24px] overflow-hidden mb-6 border border-white/10 bg-[#0a0a0a] z-10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] group"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <div className="absolute inset-0 flex flex-col md:flex-row">

            {/* LEFT – Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: EXPO, delay: 0.15 }}
              className="relative flex-1 h-full overflow-hidden"
              style={{ filter: "grayscale(70%) brightness(1)" }}
            >
              <div className="absolute inset-0 bg-black/60 z-10" />
              <motion.img
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
                alt="Traditional Hiring Chaos"
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: EXPO, delay: 0.55 }}
                className="absolute top-8 left-8 z-20"
              >
                <h3 className="text-white text-[22px] font-semibold mb-1">Traditional Hiring</h3>
                <p className="text-[#AAA] text-[14px]">Resumes. Interviews. Opinions.</p>
              </motion.div>
            </motion.div>

            {/* RIGHT – TalentScore */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: EXPO, delay: 0.3 }}
              className="relative flex-1 h-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#F54E02]/10 z-10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-black/40 z-10" />
              <motion.img
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                src="/dashboard_manager.png"
                alt="TalentScore Clarity"
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: EXPO, delay: 0.7 }}
                className="absolute top-8 left-8 z-20"
              >
                <h3 className="text-white text-[22px] font-semibold mb-1">TalentScore AI</h3>
                <p className="text-[#AAA] text-[14px]">Structured. Ranked. Confident.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Center Divider */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center justify-center pointer-events-none w-[2px]">
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.1, ease: EXPO, delay: 0.6 }}
              className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF6B35] to-transparent shadow-[0_0_18px_#FF6B35]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EXPO, delay: 1.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-[#111] border border-[#FF6B35] shadow-[0_0_24px_rgba(245,78,2,0.45)] whitespace-nowrap"
            >
              <span className="text-white font-medium text-[15px]">
                Chaos <span className="text-[#FF6B35] mx-1">→</span> Clarity
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bento Problem Cards ── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-[1200px] mx-auto z-10 relative"
        >
          {problems.map((problem, index) => (
            <ProblemCard key={index} index={index} {...problem} />
          ))}
        </motion.div>

        {/* ── Statistics Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.95, ease: EXPO, delay: 0.1 }}
          className="relative max-w-[1200px] mx-auto rounded-[20px] p-8 md:p-10 border border-[#FF6B35]/30 bg-[#050505] shadow-[0_0_40px_rgba(245,78,2,0.06)] mb-16 z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 overflow-hidden group"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          {/* Sweep glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6B35]/10 to-transparent pointer-events-none"
            initial={{ x: "-150%" }}
            whileHover={{ x: "150%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-6 flex-1 w-full relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.12, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full border-2 border-[#FF6B35] flex items-center justify-center text-[#FF6B35] shadow-[0_0_20px_rgba(245,78,2,0.3)] flex-shrink-0"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-[40px] md:text-[56px] font-bold text-[#FF6B35] leading-none mb-1 tracking-tight tabular-nums inline-block min-w-[4.5ch]">
                <AnimatedNumber value={2.4} decimal prefix="₹" suffix="L" delay={0.6} duration={2.5} />
              </span>
              <span className="text-white text-[15px] font-medium tracking-wide">Lost on an ₹8L Hire</span>
            </div>
          </motion.div>

          <div className="hidden lg:block w-[1px] h-[60px] bg-white/10" />

          {/* Middle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.7 }}
            className="flex-1 w-full text-center lg:text-left relative z-10"
          >
            <p className="text-[#AAA] text-[15px] leading-relaxed max-w-[320px] mx-auto lg:mx-0">
              Companies that hire wrong lose an average of{" "}
              <span className="text-[#FF6B35] font-semibold">30%</span> of that employee&apos;s annual salary.
            </p>
          </motion.div>

          <div className="hidden lg:block w-[1px] h-[60px] bg-white/10" />

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.9 }}
            className="flex items-center justify-center lg:justify-start gap-6 flex-1 w-full relative z-10"
          >
            <span className="text-[56px] md:text-[64px] font-bold text-[#FF6B35] leading-none tracking-tight tabular-nums inline-block min-w-[3ch] text-center">
              <AnimatedNumber value={30} suffix="%" delay={1.0} duration={2.5} />
            </span>
            <p className="text-[#AAA] text-[15px] leading-relaxed max-w-[180px]">
              of annual salary disappears through bad hiring decisions.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Transition to solution ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EXPO, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pb-12 z-10 relative"
        >
          <motion.div
            whileHover={{ scale: 1.15, x: 6 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="w-12 h-12 rounded-full border border-[#FF6B35]/50 flex items-center justify-center text-[#FF6B35] bg-[#FF6B35]/10 shadow-[0_0_18px_rgba(245,78,2,0.25)] cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-[24px] md:text-[28px] font-semibold text-white leading-tight">
              There is a <span className="text-[#FF6B35]">better</span> way.
            </h3>
            <p className="text-[15px] md:text-[16px] text-[#A1A1AA]">
              And it takes less time than your current process.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
