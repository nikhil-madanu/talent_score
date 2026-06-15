"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import Image from "next/image";


const customStyles = `
@keyframes hiw-glow-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); box-shadow: 0 0 20px rgba(245,78,2,0.4); }
  50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 40px rgba(245,78,2,0.8); }
}
@keyframes hiw-float-1 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}
@keyframes hiw-float-2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(-2deg); }
}
@keyframes hiw-float-3 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}
@keyframes hiw-particle-up {
  0% { transform: translateY(100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
}
@keyframes hiw-question-float {
  0% { top: 110%; transform: scale(0.5) rotate(-20deg); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { top: -10%; transform: scale(1.5) rotate(20deg); opacity: 0; }
}
`;

type StepDef = {
  number: string;
  title: string;
  description?: string;
  visual: React.ReactNode;
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// ─── VISUAL COMPONENTS REMOVED (Replaced with Images) ───────────────

// ─── MAIN COMPONENTS ──────────────────────────────────────────────────

const steps: StepDef[] = [
  { number: "01", title: "UPLOAD JOB DESCRIPTION", description: "Paste your JD or write one from scratch. TalentScore reads and understands the role requirements instantly.", visual: <Image src="/images/how-it-works/step-1.png" alt="Upload Job Description" fill quality={100} className="object-contain drop-shadow-2xl" /> },
  { number: "02", title: "TELL AI WHAT MATTERS", description: "Add custom priorities like 'startup experience' or 'system design skills' to perfectly calibrate the AI.", visual: <Image src="/images/how-it-works/step-2.png" alt="AI Priorities" fill quality={100} className="object-contain drop-shadow-2xl" /> },
  { number: "03", title: "UPLOAD RESUMES", description: "Bulk upload resumes. Our AI parses and matches them against your calibrated job requirements in seconds.", visual: <Image src="/images/how-it-works/step-3.png" alt="Upload Resumes" fill quality={100} className="object-contain drop-shadow-2xl" /> },
  { number: "04", title: "GENERATE QUESTIONS", description: "TalentScore generates highly targeted, technical interview questions tailored exactly to the role and candidate.", visual: <Image src="/images/how-it-works/step-4.png" alt="Generate Questions" fill quality={100} className="object-contain drop-shadow-2xl" /> },
  { number: "05", title: "ANALYZE INTERVIEWS", description: "Upload interview recordings or transcripts. The AI analyzes the conversation and evaluates candidate performance.", visual: <Image src="/images/how-it-works/step-5.png" alt="Analyze Interviews" fill quality={100} className="object-contain drop-shadow-2xl" /> },
  { number: "06", title: "RANK CANDIDATES", description: "Get a ranked shortlist of candidates with clear scores and insights, so you know exactly who to hire.", visual: <Image src="/images/how-it-works/step-6.png" alt="Rank Candidates" fill quality={100} className="object-contain drop-shadow-2xl" /> },
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const lineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="how-it-works" className="relative py-32 overflow-hidden font-sans border-t border-white/[0.04]" style={{ backgroundColor: "#000" }}>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Question Mark Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep dark gradient background */}
        <div className="absolute inset-0 bg-black opacity-80" />
        
        {/* Question Mark Particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => {
            const left = (i * 13.7) % 100;
            const size = 12 + ((i * 11) % 40);
            const duration = 15 + ((i * 7.3) % 25);
            // Use negative delay to instantly populate the screen
            const delay = -((i * 3.1) % 25);
            
            return (
              <div 
                key={i}
                className="absolute text-[#F54E02] font-bold font-mono select-none"
                style={{
                  left: `${left}%`,
                  top: '110%',
                  opacity: 0,
                  fontSize: `${size}px`,
                  animation: `hiw-question-float ${duration}s linear ${delay}s infinite`,
                  textShadow: `0 0 ${size/2}px rgba(245,78,2,0.4)`
                }}
              >
                ?
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Section Header */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 flex flex-col items-center text-center px-6 mb-32 max-w-4xl mx-auto"
      >
        <motion.p variants={fadeUpItem} className="text-[12px] font-bold tracking-[0.25em] text-[#F54E02] uppercase mb-6 drop-shadow-[0_0_10px_rgba(245,78,2,0.4)]">
          HOW TALENTSCORE WORKS
        </motion.p>
        <motion.h2 variants={fadeUpItem} className="text-4xl md:text-6xl lg:text-7xl font-[800] text-white leading-[1.1] tracking-tight mb-8">
          From Job Post to Hired<br />
          <span className="text-[#F54E02]">in One Session.</span>
        </motion.h2>
        <motion.p variants={fadeUpItem} className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed max-w-2xl font-light">
          Our AI copilot handles the heavy lifting<br className="hidden md:block" />
          so you can focus on making the right hiring decisions.
        </motion.p>
      </motion.div>

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Central Glowing Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/[0.05]">
          {/* Animated fill line */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#F54E02]/20 via-[#F54E02] to-transparent rounded-full"
            style={{ height: lineFill, boxShadow: "0 0 20px rgba(245,78,2,0.8)" }}
          />
          {/* Glowing light trail (Comet tip) */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-32 bg-white rounded-full blur-[1px]"
            style={{ top: lineFill, y: "-100%", opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isEven = index % 2 === 0; // true: left side, false: right side
          return (
            <TimelineStep key={index} step={step} isEven={isEven} />
          );
        })}
      </div>
    </section>
  );
}

function TimelineStep({ step, isEven }: { step: StepDef; isEven: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50% 0px -50% 0px" });

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row md:justify-between w-full mb-20 md:mb-40 group">
      
      {/* Center Node (Absolute left on Mobile, Center on Desktop) */}
      <div className="absolute left-8 md:left-1/2 top-[40px] md:top-[20%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
        
        {/* The Outer Node Container */}
        <motion.div 
          initial={false}
          animate={inView ? { scale: 1.1, borderColor: "rgba(245,78,2,0.5)" } : { scale: 1, borderColor: "rgba(255,255,255,0.05)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0A0A0A] border-[2px] flex items-center justify-center p-1 backdrop-blur-md relative shadow-lg"
        >
          {/* Radar Pulse when active */}
          {inView && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-[#F54E02]"
            />
          )}

          {/* Inner Core */}
          <motion.div 
            animate={inView ? { backgroundColor: "#F54E02", scale: 1 } : { backgroundColor: "rgba(255,255,255,0.1)", scale: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full rounded-full flex items-center justify-center relative z-10" 
          >
            <motion.div 
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-[0_0_8px_white]" 
            />
          </motion.div>
        </motion.div>

      </div>

      {/* Left Column (Desktop only) */}
      <div className={`hidden md:flex w-[45%] justify-end ${!isEven ? "opacity-0 invisible" : ""}`}>
        {isEven && <TimelineCard step={step} direction="left" inView={inView} />}
      </div>

      {/* Right Column (Mobile: Always show, Desktop: Show if !isEven) */}
      <div className={`flex w-full pl-20 md:pl-0 md:w-[45%] md:justify-start ${isEven ? "md:opacity-0 md:invisible" : ""}`}>
        {/* Mobile View */}
        <div className="w-full max-w-[500px] md:hidden">
          <TimelineCard step={step} direction="right" inView={inView} />
        </div>
        {/* Desktop View */}
        <div className="hidden md:block w-full">
          {!isEven && <TimelineCard step={step} direction="right" inView={inView} />}
        </div>
      </div>

    </div>
  );
}

function TimelineCard({ step, direction = "up", inView = false }: { step: StepDef, direction?: "left" | "right" | "up", inView?: boolean }) {
  const xOffset = direction === "left" ? -60 : direction === "right" ? 60 : 0;
  
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      // Calculate 3D tilt (reduced for a more subtle, professional feel)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4; // Max 4 degrees
      const rotateY = ((x - centerX) / centerX) * 4;
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: xOffset, y: 60, scale: 0.95, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, x: xOffset, y: 60, scale: 0.95, filter: "blur(10px)" }}
      whileHover={inView ? { scale: 1.02, y: -8 } : undefined}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[500px] group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full rounded-[32px] overflow-hidden relative transition-all duration-700 flex flex-col group-hover:border-white/20 group-hover:shadow-[0_20px_80px_rgba(245,78,2,0.15)]"
        style={{
          background: "linear-gradient(145deg, rgba(24,24,27,0.85) 0%, rgba(9,9,11,0.95) 100%)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 20px rgba(245,78,2,0.03)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Cinematic Ambient Backdrop Glow (Clean & Professional) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F54E02]/10 via-[#F54E02]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none" />

        {/* Dynamic Glow Effect matching mouse */}
        <div 
          className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245,78,2,0.1), rgba(255,255,255,0.02) 40%, transparent 60%)`
          }}
        />

        {/* Existing hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />
        
        {/* Top subtle highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        
        {/* Text Section inside the card */}
        <div className="relative z-10 px-6 md:px-10 pt-8 md:pt-10 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F54E02]/10 border border-[#F54E02]/30 text-[#F54E02] font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(245,78,2,0.2)] group-hover:shadow-[0_0_25px_rgba(245,78,2,0.5)] transition-all duration-500">
              {step.number}
            </span>
            <span className="h-[1px] flex-1 bg-gradient-to-r from-[#F54E02]/30 to-transparent" />
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-[800] text-white tracking-tight uppercase leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-500">
            {step.title}
          </h3>
          {step.description && (
            <p className="text-[#A0A0A0] text-sm md:text-[15px] mt-4 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500">
              {step.description}
            </p>
          )}
        </div>

        {/* Visual Section with 3D pop-out */}
        <div className="relative z-10 w-full px-4 md:px-8 pb-8 flex-1 flex items-center justify-center min-h-[250px] md:min-h-[350px]" style={{ transform: "translateZ(30px)" }}>
          <div className="aspect-square w-full max-w-[280px] md:max-w-[320px] mx-auto relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-700 border border-white/5 group-hover:border-white/10">
            <div className="absolute inset-0 z-20 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(245,78,2,0.05)] transition-colors duration-500" />
            {step.visual}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
