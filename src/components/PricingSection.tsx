"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, XCircle, Star, Rocket, Users, Plus } from "lucide-react";
import { Button } from "./ui/button";

type PlanDef = {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
  isLogoCard: boolean;
  desktopVariants: Variants;
};

export function PricingSection() {
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, duration: number, delay: number, yOffset: number, xOffset: number, maxOpacity: number, size: number, rotate: number}>>([]);

  useEffect(() => {
    // Generate dollar particles for background
    const newParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      yOffset: -Math.random() * 600 - 200,
      xOffset: (Math.random() - 0.5) * 400,
      maxOpacity: Math.random() * 0.25 + 0.05, // Subtle, so it's not overwhelming
      size: Math.random() * 16 + 10, // Between 10px and 26px font size
      rotate: Math.random() * 360
    }));
    setParticles(newParticles);
  }, []);

  const plans: PlanDef[] = [
    {
      name: "Starter",
      description: "For small teams",
      price: "29",
      features: [
        "Up to 50 hires / year",
        "Resume intelligence",
        "AI interview questions",
        "Basic candidate ranking",
        "Email support"
      ],
      popular: false,
      isLogoCard: false,
      desktopVariants: {
        hidden: { x: "-50%", y: 0, rotate: 0, scale: 0.8, opacity: 0, zIndex: 30 },
        visible: { 
          x: "calc(-50% - 500px)", 
          y: 60, 
          rotate: -12, 
          scale: 1, 
          opacity: 1, 
          transition: { type: "spring", stiffness: 60, damping: 20, delay: 0.1 } 
        }
      }
    },
    {
      name: "Team",
      description: "For collaborative teams",
      price: "59",
      features: [
        "Everything in Starter",
        "Up to 150 hires / year",
        "Custom hiring criteria",
        "Advanced interview analysis",
        "Priority team support"
      ],
      popular: false,
      isLogoCard: false,
      desktopVariants: {
        hidden: { x: "-50%", y: 0, rotate: 0, scale: 0.8, opacity: 0, zIndex: 40 },
        visible: { 
          x: "calc(-50% - 250px)", 
          y: 25, 
          rotate: -6, 
          scale: 1, 
          opacity: 1, 
          transition: { type: "spring", stiffness: 60, damping: 20, delay: 0.2 } 
        }
      }
    },
    {
      name: "Professional",
      description: "For growing teams",
      price: "89",
      features: [
        "Everything in Starter",
        "Up to 250 hires / year",
        "Custom hiring criteria",
        "Interview analysis",
        "Candidate ranking dashboard",
        "Exportable reports",
        "Priority email support"
      ],
      popular: true,
      isLogoCard: false,
      desktopVariants: {
        hidden: { x: "-50%", y: 0, rotate: 0, scale: 0.9, opacity: 0, zIndex: 50 },
        visible: { 
          x: "-50%", 
          y: -10, 
          rotate: 0, 
          scale: 1, 
          opacity: 1, 
          transition: { type: "spring", stiffness: 60, damping: 20, delay: 0.3 } 
        }
      }
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      features: [
        "Everything in Professional",
        "Unlimited AI hires",
        "SSO & custom integrations",
        "Advanced analytics dashboard",
        "Dedicated account manager"
      ],
      popular: false,
      isLogoCard: false,
      desktopVariants: {
        hidden: { x: "-50%", y: 0, rotate: 0, scale: 0.8, opacity: 0, zIndex: 40 },
        visible: { 
          x: "calc(-50% + 250px)", 
          y: 25, 
          rotate: 6, 
          scale: 1, 
          opacity: 1, 
          transition: { type: "spring", stiffness: 60, damping: 20, delay: 0.2 } 
        }
      }
    },
    {
      name: "TalentScore",
      description: "AI-Powered Hiring\nBuilt for the future",
      price: "",
      features: [],
      popular: false,
      isLogoCard: true,
      desktopVariants: {
        hidden: { x: "-50%", y: 0, rotate: 0, scale: 0.8, opacity: 0, zIndex: 30 },
        visible: { 
          x: "calc(-50% + 500px)", 
          y: 60, 
          rotate: 12, 
          scale: 1, 
          opacity: 1, 
          transition: { type: "spring", stiffness: 60, damping: 20, delay: 0.1 } 
        }
      }
    }
  ];

  return (
    <section id="pricing" className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Floating Dollar Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-[#FF5500] font-bold font-mono select-none"
            style={{
              left: p.left,
              top: p.top,
              fontSize: `${p.size}px`,
              filter: `blur(${p.size > 18 ? '2px' : p.size > 14 ? '1px' : '0px'})`,
              textShadow: `0 0 ${p.size}px rgba(255,85,0,0.5)`,
            }}
            animate={{
              y: [0, p.yOffset],
              x: [0, p.xOffset, 0],
              opacity: [0, p.maxOpacity, 0],
              rotate: [p.rotate, p.rotate + (p.xOffset > 0 ? 180 : -180)],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          >
            $
          </motion.div>
        ))}
      </div>

      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF5500]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Dynamic Top-Left Dollar Symbol */}
      <motion.div 
        className="absolute top-10 left-10 md:top-20 md:left-20 text-[120px] md:text-[240px] font-extrabold font-mono text-[#FF5500] leading-none pointer-events-none z-0 select-none mix-blend-screen opacity-20"
        style={{
          filter: "drop-shadow(0 0 60px rgba(255,85,0,0.8))",
        }}
        animate={{
          y: [-20, 20, -20],
          rotate: [-10, 10, -10],
          opacity: [0.1, 0.3, 0.1],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        $
      </motion.div>

      <div className="relative container mx-auto px-6 lg:px-12 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative z-50">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[13px] font-medium tracking-[0.1em] text-[#FF5500] uppercase mb-4"
          >
            SIMPLE, TRANSPARENT PRICING
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
          >
            Choose the Plan That<br/>Fits Your <span className="text-[#FF5500]">Hiring Needs</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            All plans include our core AI-powered hiring features.
          </motion.p>
        </div>

        {/* DESKTOP 5-CARD FANNED DECK */}
        <div className="hidden lg:block relative w-full h-[700px] mt-12 perspective-[2000px]">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={plan.desktopVariants}
              className={`absolute left-1/2 top-0 origin-bottom ${plan.popular ? 'w-[360px] h-[660px] -mt-4' : 'w-[340px] h-[600px]'}`}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>

        {/* MOBILE GRID (Fallback) */}
        <div className="lg:hidden flex flex-col gap-8 mt-12 max-w-md mx-auto">
          {plans.filter(p => !p.isLogoCard).map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`w-full h-auto ${plan.popular ? 'min-h-[660px]' : 'min-h-[600px]'}`}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>

        {/* Footer Trust Markers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-20 text-gray-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FF5500]" />
            No setup fees
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-[#FF5500]" />
            Cancel anytime
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FF5500]" />
            Secure & compliant
          </div>
        </div>

      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], plan?.popular ? ["8deg", "-8deg"] : ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], plan?.popular ? ["-8deg", "8deg"] : ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // ----------------------------------------
  // LOGO CARD (The 5th card on the far right)
  // ----------------------------------------
  if (plan.isLogoCard) {
    return (
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full rounded-[28px] bg-[#0A0A0B] border border-white/5 flex flex-col items-center justify-center p-8 will-change-transform shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={ref}
      >
        <div className="relative mb-10">
          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#FF5500]/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
          
          <div className="relative z-10 w-16 h-16 rounded-xl bg-[#0A0A0A] border border-[#FF5500]/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,85,0,0.25)]">
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]"
              fill="none" 
              stroke="#FF5500" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
            >
              <path d="M 5 7 L 19 7 L 21.5 9.5 L 19 12 L 14 12 L 14 19.5 L 12 21.5 L 10 19.5 L 10 12 L 5 12 L 2.5 9.5 Z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
        <p className="text-gray-400 text-sm text-center whitespace-pre-line leading-relaxed">
          {plan.description}
        </p>
      </motion.div>
    );
  }

  // ----------------------------------------
  // STANDARD & POPULAR CARDS
  // ----------------------------------------
  return (
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d"
        }}
        className={`relative w-full h-full rounded-[28px] will-change-transform flex flex-col group overflow-hidden transition-all duration-500 ${
          plan.popular 
            ? 'bg-[#0A0A0B] border-[2px] border-[#FF5500] shadow-[0_0_80px_rgba(255,85,0,0.5),inset_0_0_20px_rgba(255,85,0,0.2)] hover:shadow-[0_0_120px_rgba(255,85,0,0.8),inset_0_0_40px_rgba(255,85,0,0.4)] hover:-translate-y-2 z-50' 
            : 'bg-[#0A0A0B] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-white/10 hover:-translate-y-1'
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={ref}
      >
        {/* Subtle noise texture on all cards for premium glass feel */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      {/* Dynamic Animated Glow lines for Popular Card */}
      {plan.popular && (
        <div className="absolute inset-0 pointer-events-none z-0">
           {/* Moving light beam 1 */}
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-70 animate-[slideRight_3s_ease-in-out_infinite]" />
           {/* Moving light beam 2 */}
           <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-70 animate-[slideDown_3s_ease-in-out_infinite_0.75s]" />
           {/* Moving light beam 3 */}
           <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-70 animate-[slideLeft_3s_ease-in-out_infinite_1.5s]" />
           {/* Moving light beam 4 */}
           <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-70 animate-[slideUp_3s_ease-in-out_infinite_2.25s]" />
        </div>
      )}
      <style>{`
        @keyframes slideRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes slideDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes slideLeft { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes slideUp { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
      `}</style>
      
      {/* Dynamic Mouse Spotlight inside card */}
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-[28px] opacity-0 hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useTransform(
            () => `radial-gradient(400px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, ${plan.popular ? 'rgba(255,85,0,0.08)' : 'rgba(255,255,255,0.03)'}, transparent 50%)`
          )
        }}
      />

      <div className="p-8 flex flex-col h-full relative z-20">
        
        {/* Popular Badge */}
        {plan.popular ? (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] border border-white/5 text-[#FF5500] text-[11px] font-bold tracking-wide uppercase">
              <Star className="w-3.5 h-3.5 fill-[#FF5500]" />
              MOST POPULAR
            </div>
          </div>
        ) : (
          <div className="h-4 mb-4" /> // spacer
        )}

        <div className={`flex ${plan.popular ? 'flex-col items-center' : 'flex-row items-center gap-3'} mb-2`}>
          {!plan.popular && (
            <>
              {plan.name === "Starter" && <Rocket className="w-6 h-6 text-[#FF5500]" />}
              {plan.name === "Team" && <Users className="w-6 h-6 text-[#FF5500]" />}
              {plan.name === "Enterprise" && <ShieldCheck className="w-6 h-6 text-[#FF5500]" />}
            </>
          )}
          
          <h3 className={`font-bold text-white tracking-tight ${plan.popular ? 'text-3xl mb-1' : 'text-2xl'}`}>
            {plan.name}
          </h3>
        </div>
        
        <div className={`flex items-center ${plan.popular ? 'justify-center mb-6' : 'gap-1.5 mb-6'}`}>
          {!plan.popular && <Plus className="w-3.5 h-3.5 text-gray-500" />}
          <p className={`text-sm text-gray-400 ${plan.popular ? 'text-center' : ''}`}>
            {plan.description}
          </p>
        </div>

        <div className={`flex items-baseline gap-1 mb-1 ${plan.popular ? 'justify-center' : ''}`}>
          <span className={`text-5xl font-extrabold tracking-tight ${plan.popular ? 'text-[#FF5500]' : 'text-white'}`}>
            {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
          </span>
          {plan.price !== "Custom" && <span className="text-gray-500 text-sm font-medium">/month</span>}
        </div>
        <div className={`text-xs text-gray-500 ${plan.popular ? 'text-center' : ''}`}>
          {plan.price !== "Custom" ? "Billed annually" : "Tailored to your needs"}
        </div>

        {/* Separator line */}
        <div className="w-full h-px bg-white/5 my-6" />

        <div className="space-y-3.5 flex-1 pb-4">
          {plan.features.map((feature: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FF5500]" />
              <span className={`text-sm ${plan.popular ? "text-gray-200" : "text-gray-400"}`}>{feature}</span>
            </div>
          ))}
        </div>

        <Button 
          className={`w-full transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group/btn h-14 mt-8 text-sm font-bold rounded-xl hover:-translate-y-1 backdrop-blur-md ${
            plan.popular
              ? 'bg-white/10 hover:bg-[#FF5500] text-white border border-white/20 hover:border-[#FF5500] shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,85,0,0.8)]'
              : 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 shadow-[0_8px_16px_rgba(0,0,0,0.4)]'
          }`}
        >
          {plan.popular && (
            <div className="absolute inset-0 -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
          )}
          <span className="relative z-10 tracking-wide uppercase text-xs">Get Started</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 relative z-10 text-white" />
        </Button>

      </div>
    </motion.div>
  );
}
