"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

export function CtaSection() {
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, duration: number, delay: number, size: number, color: string, maxOpacity: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 1.5,
      color: Math.random() > 0.8 ? '#FF5500' : '#FFFFFF',
      maxOpacity: Math.random() * 0.7 + 0.3
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-[#000] border-t border-white/5">
      {/* Top Edge Highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-0" />
      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: `blur(${p.size > 2 ? '1px' : '0px'})`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
            animate={{
              y: [0, -250],
              opacity: [0, p.maxOpacity, 0],
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

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              }
            }
          }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold tracking-wide mb-8 backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Zap className="w-4 h-4 text-gray-400" />
            <span>Transform your hiring process</span>
          </motion.div>

          <motion.h2 
            variants={{
              hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
              visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-8 leading-[1.1] font-semibold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Your next hire
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/30 font-light">
              shouldn&apos;t be a 
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 font-black italic">
              {" "}guess.
            </span>
          </motion.h2>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Join the world&apos;s best teams in replacing human intuition with <span className="text-white font-medium">AI-driven hiring intelligence</span>. 
            Start building your dream team today.
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary Button */}
            <button className="w-full sm:w-auto transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group h-16 px-10 text-lg font-bold rounded-xl hover:-translate-y-1 bg-gradient-to-r from-[#FF6B00] to-[#FF4500] text-white shadow-[0_10px_30px_rgba(255,85,0,0.5)] hover:shadow-[0_15px_40px_rgba(255,85,0,0.7)] border border-white/10">
              <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              <span className="relative z-10 tracking-wide">Start Free Trial</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
            </button>
            
            {/* Secondary Button */}
            <button className="w-full sm:w-auto transition-all duration-300 flex items-center justify-center gap-2 h-16 px-10 text-lg font-bold rounded-xl hover:-translate-y-1 bg-[#0A0A0C] hover:bg-[#161618] text-white border border-white/10 hover:border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.4)] backdrop-blur-md">
              Talk to Sales
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
