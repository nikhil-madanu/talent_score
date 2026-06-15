"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, BookOpen, FileText, Video, Users, ArrowRight } from "lucide-react";

// ─── Resources Dropdown Items ─────────────────────────────────────────────────
const RESOURCES = [
  {
    icon: <BookOpen className="w-4 h-4" />,
    label: "Documentation",
    desc: "Guides, API reference & more",
    href: "#",
  },
  {
    icon: <FileText className="w-4 h-4" />,
    label: "Case Studies",
    desc: "See how teams hire better",
    href: "#",
  },
  {
    icon: <Video className="w-4 h-4" />,
    label: "Demo Videos",
    desc: "Watch TalentScore in action",
    href: "#",
  },
  {
    icon: <Users className="w-4 h-4" />,
    label: "Community",
    desc: "Join 2,000+ talent leaders",
    href: "#",
  },
];

// ─── Nav Links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { name: "Features",     href: "#features",     id: "features"     },
  { name: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { name: "Results",      href: "#results",       id: "results"      },
  { name: "Pricing",      href: "#pricing",       id: "pricing"      },
];

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
      <motion.div
        className="h-full origin-left"
        style={{
          background: "linear-gradient(90deg, #FF6B35, #F54E02)",
          boxShadow: "0 0 8px rgba(245,78,2,0.6)",
          scaleX: progress / 100,
        }}
        transition={{ duration: 0 }}
      />
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export function Navbar() {
  // ── State ──
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isVisible, setIsVisible]             = useState(true);
  const [activeSection, setActiveSection]     = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink]         = useState<string | null>(null);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [mounted, setMounted]                 = useState(false);

  // ── Mount flag for entrance animation ──
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  // ── Refs ──
  const lastScrollY  = useRef(0);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // ── Framer scroll tracker ──
  const { scrollY } = useScroll();

  // ── Hide on scroll down, show on scroll up ──
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    setIsScrolled(latest > 20);

    if (latest < 80) {
      // Always visible near the top
      setIsVisible(true);
    } else if (latest > previous) {
      // Scrolling DOWN → hide immediately
      setIsVisible(false);
    } else {
      // Scrolling UP → show immediately
      setIsVisible(true);
    }

    lastScrollY.current = latest;
  });

  // ── Scroll spy ──
  useEffect(() => {
    const update = () => {
      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) { current = link.href; break; }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // ── Close Resources on outside click ──
  const closeResources = useCallback((e: MouseEvent) => {
    if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
      setIsResourcesOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isResourcesOpen) document.addEventListener("mousedown", closeResources);
    else document.removeEventListener("mousedown", closeResources);
    return () => document.removeEventListener("mousedown", closeResources);
  }, [isResourcesOpen, closeResources]);

  // ── Close Resources on Escape ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsResourcesOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: mounted ? (isVisible ? 0 : -100) : -80,
          opacity: mounted ? 1 : 0,
        }}
        transition={{
          y: mounted
            ? { duration: 0.25, ease: [0.4, 0, 0.6, 1] }
            : { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.6, delay: 0.1, ease: "easeOut" },
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#000000]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent backdrop-blur-none border-b border-transparent"
        }`}
      >
        <div className="mx-auto px-6 max-w-[1400px]">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center gap-2.5 flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FF4500] flex items-center justify-center"
                style={{ boxShadow: "0 0 14px rgba(255,85,0,0.5)" }}
              >
                <span className="text-white font-extrabold text-[15px] leading-none">T</span>
              </motion.div>
              <span className="font-bold text-[17px] text-white tracking-tight">TalentScore</span>
            </Link>

            {/* ── Center Nav ── */}
            <nav
              className="hidden lg:flex items-center gap-0"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {NAV_LINKS.map((link) => {
                const isActive  = activeSection === link.href;
                const isHovered = hoveredLink === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    className={`relative px-5 py-2.5 text-[14.5px] font-medium rounded-md transition-colors duration-150 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {/* Shared hover background pill */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          layoutId="nav-bg"
                          className="absolute inset-0 rounded-md bg-white/[0.07]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active underline indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-[#F54E02]"
                        style={{ boxShadow: "0 0 6px rgba(245,78,2,0.7)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}

              {/* ── Resources Dropdown ── */}
              <div ref={resourcesRef} className="relative">
                <button
                  onClick={() => setIsResourcesOpen((v) => !v)}
                  onMouseEnter={() => setHoveredLink("resources")}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative flex items-center gap-1 px-5 py-2.5 text-[14.5px] font-medium rounded-md transition-colors duration-150 ${
                    isResourcesOpen ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {/* Hover bg */}
                  <AnimatePresence>
                    {(hoveredLink === "resources" || isResourcesOpen) && (
                      <motion.span
                        layoutId="nav-bg"
                        className="absolute inset-0 rounded-md bg-white/[0.07]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">Resources</span>
                  <motion.span
                    animate={{ rotate: isResourcesOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10"
                  >
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </motion.span>
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-64 rounded-2xl overflow-hidden z-50"
                      style={{
                        background: "rgba(14,14,14,0.98)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
                      }}
                    >
                      {/* Dropdown top reflection */}
                      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      <div className="p-2">
                        {RESOURCES.map((item, i) => (
                          <motion.a
                            key={item.label}
                            href={item.href}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.25 }}
                            onClick={() => setIsResourcesOpen(false)}
                            className="group flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[#F54E02] transition-all duration-200 group-hover:bg-[#F54E02]/10"
                              style={{ background: "rgba(245,78,2,0.07)", border: "1px solid rgba(245,78,2,0.15)" }}>
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-white/90 text-[13px] font-semibold leading-tight group-hover:text-white transition-colors">
                                {item.label}
                              </div>
                              <div className="text-white/40 text-[11px] mt-0.5 leading-tight">{item.desc}</div>
                            </div>
                          </motion.a>
                        ))}
                      </div>

                      {/* Footer link */}
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <a href="#" className="flex items-center justify-between px-5 py-3 text-[12px] font-semibold text-white/40 hover:text-white/80 transition-colors group">
                          <span>View all resources</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* ── Right: CTA ── */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="#pricing"
                  className="group relative inline-flex items-center justify-center px-6 py-2.5 text-[14.5px] font-semibold text-white rounded-xl overflow-hidden select-none transition-all duration-500 hover:-translate-y-0.5 bg-gradient-to-r from-[#FF6B00] to-[#FF4500] shadow-[0_4px_15px_rgba(255,85,0,0.3)] hover:shadow-[0_8px_25px_rgba(255,85,0,0.5)] border border-white/10"
                >
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                  <span className="relative z-10 flex items-center gap-2 tracking-wide text-white">
                    Start Free
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            </div>


            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06]"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full h-[1.5px] bg-white block origin-left"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-3/4 h-[1.5px] bg-white block"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full h-[1.5px] bg-white block origin-left"
                />
              </div>
            </button>
          </div>
        </div>

        {/* ── Scroll Progress Bar (only when scrolled) ── */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollProgressBar />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            style={{
              background: "rgba(0,0,0,0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Logo row */}
            <div className="flex items-center gap-2.5 px-6 h-[72px] border-b border-white/5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FF4500] flex items-center justify-center" style={{ boxShadow: "0 0 14px rgba(255,85,0,0.5)" }}>
                <span className="text-white font-extrabold text-[15px] leading-none">T</span>
              </div>
              <span className="font-bold text-[17px] text-white tracking-tight">TalentScore</span>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 py-8 gap-1">
              {[...NAV_LINKS, { name: "Resources", href: "#", id: "resources" }].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 28 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between w-full py-4 px-4 rounded-xl text-xl font-semibold transition-all duration-200 ${
                      activeSection === link.href
                        ? "text-white bg-white/[0.06]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {activeSection === link.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F54E02]" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="mt-auto px-6 pb-12 border-t border-white/[0.06] pt-8 flex flex-col gap-3"
            >
              <Link
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-xl text-white py-4 text-base font-semibold"
                style={{ background: "linear-gradient(135deg, #FF6B35, #F54E02)", boxShadow: "0 0 24px rgba(245,78,2,0.4)" }}
              >
                Start Free Trial
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-xl text-white/50 py-3.5 text-sm font-medium hover:text-white/80 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
