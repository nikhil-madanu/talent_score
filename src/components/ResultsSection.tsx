"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { Star, Quote, MousePointer2 } from "lucide-react";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      animate(0, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Cinematic ease-out
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toString();
          }
        }
      });
    }
  }, [value, inView]);

  return (
    <span>
      <span ref={ref}>0</span>
      <span>{suffix}</span>
    </span>
  );
}

function TiltMetricCard({ metric, index }: { metric: { num: number, suffix: string, label: string, description: string, gradientFrom: string, gradientTo: string, glowColor: string, topHighlight: string }, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="relative group cursor-pointer"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-3xl overflow-hidden p-[1px] h-full w-full"
      >
        {/* Animated border gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b from-white/10 to-transparent ${metric.glowColor} transition-colors duration-700`} />
        
        <div className="relative h-full bg-[#0A0A0C]/90 backdrop-blur-xl p-10 rounded-[31px] flex flex-col items-center text-center" style={{ transform: "translateZ(30px)" }}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent ${metric.topHighlight} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
          
          <motion.div 
            className={`text-6xl md:text-7xl font-extrabold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 ${metric.gradientFrom} ${metric.gradientTo} transition-all duration-700`}
            style={{ transform: "translateZ(40px)" }}
          >
            <AnimatedNumber value={metric.num} suffix={metric.suffix} />
          </motion.div>
          <h3 className="text-xl font-bold mb-3 text-white" style={{ transform: "translateZ(20px)" }}>{metric.label}</h3>
          <p className="text-[#A0A0A0] leading-relaxed font-light" style={{ transform: "translateZ(10px)" }}>{metric.description}</p>
          
          {/* Glare effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none rounded-[31px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50 mix-blend-overlay"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
              x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
              scale: 2
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ResultsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [isDesktop, setIsDesktop] = React.useState(true);
  const [particles, setParticles] = React.useState<Array<{id: number, left: string, top: string, duration: number, delay: number, yOffset: number, xOffset: number, maxOpacity: number, size: number}>>([]);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    
    // Generate particles for background
    const newParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 5,
      delay: Math.random() * 10,
      yOffset: -Math.random() * 500 - 200,
      xOffset: (Math.random() - 0.5) * 300,
      maxOpacity: Math.random() * 0.6 + 0.4,
      size: Math.random() * 4 + 1
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const getCardAnimation = (index: number): Variants => {
    const offset = index - 2; // -2, -1, 0, 1, 2
    const baseZIndex = getZIndex(index);
    
    if (isDesktop) {
      return {
        closed: { x: 0, y: 0, rotate: 0, scale: 0.2, zIndex: baseZIndex, opacity: 0 },
        open: {
          x: offset * 240, // Wider spread for floating arc
          y: Math.abs(offset) * 60 - 300, // Floating above envelope
          rotate: offset * 12,
          scale: 1,
          opacity: 1,
          zIndex: baseZIndex,
          transition: {
            duration: 0.6, // Smooth and simple
            ease: "easeInOut",
            delay: 0.3 + (index * 0.08) 
          }
        },
        hover: {
          scale: 1.02,
          y: Math.abs(offset) * 60 - 310,
          x: offset * 240,
          rotate: offset * 12,
          zIndex: baseZIndex,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        }
      };
    } else {
      // Mobile: Vertical stack
      return {
        closed: { x: 0, y: 0, rotate: 0, scale: 0.2, zIndex: baseZIndex, opacity: 0 },
        open: {
          x: offset * 10,
          y: -100 - (index * 60),
          rotate: offset * 3,
          scale: 1,
          opacity: 1,
          zIndex: baseZIndex,
          transition: {
            duration: 0.6, 
            ease: "easeInOut",
            delay: 0.3 + (index * 0.08)
          }
        },
        hover: {
          y: -110 - (index * 60),
          x: offset * 10,
          scale: 1.02,
          rotate: offset * 3,
          zIndex: baseZIndex,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        }
      };
    }
  };

  const getZIndex = (index: number) => {
    if (index === 2) return 15;
    if (index === 1 || index === 3) return 14;
    return 13;
  };

  const metrics = [
    { 
      num: 68, 
      suffix: "%", 
      label: "Faster Hiring", 
      description: "Average reduction in time-to-hire across all engineering roles.",
      gradientFrom: "group-hover:from-[#F54E02]",
      gradientTo: "group-hover:to-[#FF8C00]",
      glowColor: "group-hover:from-[#F54E02]/50",
      topHighlight: "via-[#F54E02]/50"
    },
    { 
      num: 3, 
      suffix: "x", 
      label: "Decision Speed", 
      description: "Reach consensus faster with objective AI-backed data.",
      gradientFrom: "group-hover:from-[#00E1FF]",
      gradientTo: "group-hover:to-[#0077FF]",
      glowColor: "group-hover:from-[#00E1FF]/50",
      topHighlight: "via-[#00E1FF]/50"
    },
    { 
      num: 85, 
      suffix: "%", 
      label: "Better Retention", 
      description: "Decrease in early turnover and mismatched skills.",
      gradientFrom: "group-hover:from-[#9D00FF]",
      gradientTo: "group-hover:to-[#FF007F]",
      glowColor: "group-hover:from-[#9D00FF]/50",
      topHighlight: "via-[#9D00FF]/50"
    },
  ];

  const testimonials = [
    {
      quote: "TalentScore has transformed our hiring process. We're making faster, smarter decisions with complete confidence.",
      author: "Priya Sharma",
      role: "Head of Talent",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      company: "Shopify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg"
    },
    {
      quote: "The AI insights are incredibly accurate. It feels like having a superpower for hiring.",
      author: "David Lee",
      role: "VP Engineering",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      company: "Miro",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Miro_logo.svg"
    },
    {
      quote: "We reduced our time-to-hire by 40% while improving the quality of every hire.",
      author: "Sarah Johnson",
      role: "Talent Director",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      company: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg"
    },
    {
      quote: "Finally, a platform that brings objectivity and fairness to our hiring process.",
      author: "James Wilson",
      role: "HR Manager",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      company: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
    },
    {
      quote: "The candidate insights are unmatched. We've never had this level of clarity before.",
      author: "Emily Chen",
      role: "People Ops Lead",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      company: "Notion",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
    },
  ];

  const svgPaths = [
    "M 0 50 Q -240 0 -480 -130", // Card 0
    "M 0 50 Q -120 -50 -240 -190", // Card 1
    "M 0 -160 Q 2 -200 0 -250",    // Card 2 (Starts at the tip of the open flap)
    "M 0 50 Q 120 -50 240 -190",   // Card 3
    "M 0 50 Q 240 0 480 -130"    // Card 4
  ];

  return (
    <section id="results" className="relative py-32 overflow-hidden border-t border-white/[0.04]" style={{ backgroundColor: "#000" }}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#F54E02]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              filter: `blur(${p.size > 2 ? '1px' : '0px'})`,
              boxShadow: `0 0 ${p.size * 2}px #F54E02`,
            }}
            animate={{
              y: [0, p.yOffset],
              x: [0, p.xOffset, 0],
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

      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F54E02]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="relative container mx-auto px-6 lg:px-12 z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[13px] font-bold tracking-[0.25em] text-[#F54E02] uppercase mb-4"
          >
            REAL IMPACT, REAL RESULTS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-[800] text-white leading-[1.1] tracking-tight mb-6"
          >
            Loved by Hiring Teams <span className="text-[#F54E02]">Everywhere</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            See how TalentScore is making a difference.
          </motion.p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-64">
          {metrics.map((metric, index) => (
            <TiltMetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        {/* Testimonials (Master Arc Envelope) */}
        <div ref={containerRef} className="max-w-6xl mx-auto pt-96 pb-56 mt-40 flex justify-center perspective-[1500px]">
          <div className="relative w-full max-w-[200px] h-[140px]">
            {/* Glowing SVG Connectors */}
            {isDesktop && (
              <svg className="absolute top-1/2 left-1/2 overflow-visible z-10 pointer-events-none">
                <defs>
                  <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {svgPaths.map((path, index) => {
                  const offset = index - 2;
                  const endX = offset * 240;
                  const endY = 50 + (Math.abs(offset) * 60 - 300);
                  
                  return (
                    <g key={index}>
                      <mask id={`line-mask-${index}`}>
                        <motion.path
                          d={path}
                          fill="transparent"
                          stroke="white"
                          strokeWidth="10"
                          initial={{ pathLength: 0 }}
                          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{ duration: 1.2, delay: 1.8 + (index * 0.1), ease: "easeOut" }}
                        />
                      </mask>
                      <motion.path
                        d={path}
                        fill="transparent"
                        stroke="#F54E02"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        filter="url(#orange-glow)"
                        mask={`url(#line-mask-${index})`}
                        initial={{ strokeDashoffset: 0, opacity: 0 }}
                        animate={isInView ? { strokeDashoffset: -120, opacity: 0.8 } : { strokeDashoffset: 0, opacity: 0 }}
                        transition={{ 
                          strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                          opacity: { duration: 0.5, delay: 1.8 + (index * 0.1) }
                        }}
                      />
                      <motion.circle
                        cx={endX}
                        cy={endY}
                        r="4"
                        fill="#FFFFFF"
                        filter="url(#orange-glow)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: [0, 1.5, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 3.0 + (index * 0.1) }}
                      />
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Massive Burning Orange Backlight */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[180px] h-[100px] bg-[#F54E02] blur-[60px] opacity-80 z-0 pointer-events-none" />

            {/* Envelope Back */}
            <div className="absolute inset-0 bg-[#000]/40 backdrop-blur-sm rounded-2xl border border-[#F54E02]/20 z-0" />

            {/* The 5 Cards */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                animate={isInView ? "open" : "closed"}
                whileHover={isInView && isDesktop ? "hover" : undefined}
                variants={getCardAnimation(index)}
                className="absolute bottom-5 left-1/2 -ml-[140px] w-[280px] h-[360px] bg-[#0A0A0C]/90 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05)] p-7 flex flex-col border border-white/5 origin-bottom cursor-pointer group hover:border-[#F54E02]/30 transition-all duration-700 overflow-hidden z-10"
              >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F54E02]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#F54E02]/30 to-transparent transition-all duration-1000 ease-out" />

                {/* Decorative Background Quote */}
                <div className="absolute -top-6 -left-2 text-[140px] text-white/[0.02] font-serif leading-none select-none z-0 pointer-events-none transition-transform duration-1000 group-hover:scale-105">
                  &quot;
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: Stars */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-3.5 h-3.5 fill-[#F54E02] text-[#F54E02]" 
                      />
                    ))}
                  </div>
                  
                  {/* Quote Body */}
                  <p className="text-[14px] leading-relaxed text-[#D1D1D1] font-normal flex-1 mb-6 transition-colors duration-700 group-hover:text-white">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  
                  {/* Footer: User Info & Logo */}
                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-white/10 shadow-inner overflow-hidden shrink-0">
                         <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-semibold text-white text-[13px] tracking-tight truncate">{testimonial.author}</span>
                        <span className="text-[10px] text-[#F54E02] font-bold uppercase tracking-widest mt-0.5 truncate">{testimonial.role}</span>
                      </div>
                      {/* Logo positioned next to the name */}
                      <div className="ml-auto flex items-center justify-end w-16">
                         <img src={testimonial.logo} alt={testimonial.company} className="max-h-5 max-w-full object-contain opacity-40 filter brightness-0 invert group-hover:opacity-80 transition-opacity duration-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Envelope Top Flap */}
            <motion.div 
              animate={isInView ? "open" : "closed"}
              variants={{
                closed: { rotateX: 0, zIndex: 30 },
                open: { rotateX: 180, zIndex: 0, transition: { duration: 0.5, ease: "easeInOut" } }
              }}
              className="absolute top-0 w-full h-[90px] bg-black/50 backdrop-blur-md border-t border-[#F54E02]/30 origin-top shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            </motion.div>

            {/* Envelope Front (Left/Right/Bottom Cover) */}
            <div 
              className="absolute bottom-0 w-full h-full bg-black/40 backdrop-blur-md border-t border-[#F54E02]/20 z-20 shadow-[0_-15px_40px_rgba(0,0,0,0.9)]"
              style={{ clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-1/2 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F54E02]/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator Removed */}

      </div>
    </section>
  );
}
