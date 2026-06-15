"use client";

import { motion, Variants } from "framer-motion";
import { 
  CheckCircle2, 
  UserCheck, 
  Sliders, 
  Activity, 
  Mic, 
  BarChart3, 
  TrendingUp,
  Video,
  Trophy
} from "lucide-react";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-[#050505] text-white overflow-hidden selection:bg-[#F54E02]/30 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[#F54E02] text-sm font-bold tracking-[0.3em] uppercase">
              Core Capabilities
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8 max-w-4xl"
          >
            Everything You Need <br className="hidden md:block" />
            <span className="text-white/60">To Hire With Confidence.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl font-light"
          >
            TalentScore transforms hiring from guesswork into a structured, evidence-based process.
          </motion.p>
        </div>
        
        {/* LAYOUT: 4 Showcase Blocks */}
        <div className="flex flex-col gap-32 md:gap-48 relative z-10">
           
          {/* FEATURE 01: Resume Intelligence (TEXT | VISUAL) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">
              <motion.h3 variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-3xl md:text-5xl font-medium mb-6">Resume Intelligence</motion.h3>
              <motion.p variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                Stop manually scanning PDFs. Our AI instantly reads, parses, and normalizes candidate data from thousands of resumes, highlighting exactly what matters for the role without the bias.
              </motion.p>
              <motion.ul variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="space-y-5">
                 {["Instant data extraction", "Bias-free parsing", "Automated skill matching"].map((benefit, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/80">
                     <CheckCircle2 className="w-5 h-5 text-[#3B82F6] shrink-0" />
                     <span className="font-medium">{benefit}</span>
                   </li>
                 ))}
              </motion.ul>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 w-full order-1 lg:order-2 relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#3B82F6]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
              <div className="aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-b from-[#111] to-[#050505] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden relative flex items-center justify-center group hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {/* Cinematic Top Glare */}
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[32px] pointer-events-none z-20" />
                
                {/* Dynamic Ambient Light */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[#3B82F6]/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#3B82F6]/30 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-black/80 pointer-events-none z-0" />
                
                {/* Real UI Widget for Resume Intelligence */}
                <div className="relative z-10 flex flex-col h-full w-full justify-center items-center">
                  <div className="bg-[#121212]/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col w-full max-w-sm backdrop-blur-xl">
                    
                    {/* File Upload Header */}
                    <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
                      <div className="flex gap-3 items-center">
                         <div className="w-8 h-8 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shadow-inner">
                            <svg className="w-4 h-4 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                         </div>
                         <div>
                            <div className="text-xs font-semibold text-white/90">alex_resume.pdf</div>
                            <div className="text-[10px] text-[#3B82F6] flex items-center gap-1.5 mt-0.5">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_5px_#3B82F6] animate-pulse" /> Parsing Document
                            </div>
                         </div>
                      </div>
                      <div className="text-[10px] text-white/40 font-medium bg-white/5 px-2 py-1 rounded border border-white/5">1.2 MB</div>
                    </div>

                    {/* Parsing Content */}
                    <div className="p-4 flex flex-col gap-4">
                      {/* Scanning Document View */}
                      <div className="bg-white/[0.02] rounded-lg border border-white/5 p-4 relative overflow-hidden h-32 shadow-inner">
                         {/* Scanning laser */}
                         <motion.div 
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,1)] z-10"
                         />
                         
                         {/* Skeleton Text */}
                         <div className="space-y-2.5 opacity-40">
                            <div className="w-1/3 h-2 bg-white/30 rounded-full" />
                            <div className="w-full h-1.5 bg-white/20 rounded-full" />
                            <div className="w-5/6 h-1.5 bg-white/20 rounded-full" />
                            <div className="w-4/6 h-1.5 bg-white/20 rounded-full" />
                            <div className="w-full h-1.5 bg-white/20 rounded-full mt-4" />
                            <div className="w-3/4 h-1.5 bg-white/20 rounded-full" />
                         </div>
                      </div>

                      {/* Extracted Data Tags */}
                      <div className="flex flex-col gap-2">
                         <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold px-1 mb-1">Extracted Entities</div>
                         <div className="flex flex-wrap gap-1.5">
                           {[
                             { text: "React.js", delay: 0 },
                             { text: "Node.js", delay: 0.5 },
                             { text: "5 YOE", delay: 1 },
                             { text: "System Architecture", delay: 1.5 },
                             { text: "AWS", delay: 2 },
                           ].map((tag, i) => (
                             <motion.span
                               key={i}
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: tag.delay, duration: 0.3 }}
                               className="px-2 py-1 rounded border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-[10px] font-semibold tracking-wide flex items-center gap-1 shadow-inner"
                             >
                               {tag.text}
                               <CheckCircle2 className="w-2.5 h-2.5 opacity-70" />
                             </motion.span>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FEATURE 02: Custom Hiring Criteria (VISUAL | TEXT) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 w-full order-1 relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#8B5CF6]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
              <div className="aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-b from-[#111] to-[#050505] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden relative flex flex-col p-8 md:p-12 group hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {/* Cinematic Top Glare */}
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[32px] pointer-events-none z-20" />
                
                {/* Dynamic Ambient Light */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[#8B5CF6]/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#8B5CF6]/30 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-black/80 pointer-events-none z-0" />
                
                <div className="relative z-10 flex flex-col h-full w-full">
                {/* Real UI Widget */}
                <div className="relative z-10 flex flex-col h-full w-full justify-center items-center">
                   <div className="bg-[#121212]/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col w-full max-w-sm backdrop-blur-xl">
                      {/* Top Bar */}
                      <div className="h-10 bg-black/60 border-b border-white/10 flex items-center px-4 justify-between">
                        <div className="flex items-center gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/20" />
                           <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                           <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/20" />
                        </div>
                        <div className="text-[9px] font-medium text-white/40 bg-white/5 px-2 py-0.5 rounded uppercase tracking-widest">
                          weights.config
                        </div>
                        <div className="w-10" /> {/* Spacer */}
                      </div>
                      
                      {/* Content */}
                      <div className="p-5 md:p-6 flex flex-col gap-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-semibold text-white/90 leading-tight">Role Configuration</h4>
                            <p className="text-[10px] text-white/50 mt-0.5">Senior Frontend Engineer</p>
                          </div>
                          <div className="px-2 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-[9px] font-bold uppercase tracking-widest rounded border border-[#8B5CF6]/20">
                            100% Allocated
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                          {[
                            { id: "tech", label: "Technical Expertise", val: "45", color: "bg-[#8B5CF6]", border: "border-[#8B5CF6]" },
                            { id: "comm", label: "Communication", val: "30", color: "bg-white/50", border: "border-white/50" },
                            { id: "lead", label: "Leadership", val: "25", color: "bg-white/30", border: "border-white/30" },
                          ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                              <div className="flex justify-between items-center mb-2">
                                 <label className="text-[11px] font-medium text-white/80 flex items-center gap-2">
                                   <span className="w-3 h-3 rounded-[3px] bg-white/5 border border-white/10 flex items-center justify-center">
                                     <div className={`w-1 h-1 rounded-full ${item.color}`} />
                                   </span>
                                   {item.label}
                                 </label>
                                 <input 
                                   type="text" 
                                   readOnly 
                                   value={item.val + "%"} 
                                   className="w-12 bg-black/50 border border-white/10 rounded py-0.5 text-center text-[10px] font-medium text-white focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                                 />
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full relative border border-white/5">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   whileInView={{ width: item.val + "%" }}
                                   transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                   className={`absolute top-0 left-0 h-full ${item.color} rounded-full`}
                                 />
                                 <motion.div 
                                   initial={{ left: 0 }}
                                   whileInView={{ left: `calc(${item.val}% - 6px)` }}
                                   transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                   className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.8)] border-[1.5px] ${item.border} opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-grab`}
                                 />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 pt-4 border-t border-white/5 flex justify-end gap-2">
                           <button className="px-3 py-1.5 text-[10px] font-medium text-white/40 hover:text-white transition-colors">Reset</button>
                           <button className="px-3 py-1.5 text-[10px] font-medium bg-[#8B5CF6] text-white rounded shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:bg-[#7C3AED] transition-colors">Save Weights</button>
                        </div>
                      </div>
                   </div>
                </div>
               </div>
              </div>
            </motion.div>

            <div className="flex-1 flex flex-col justify-center order-2">
              <motion.h3 variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-3xl md:text-5xl font-medium mb-6">Custom Hiring Criteria</motion.h3>
              <motion.p variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                Define exactly what success looks like for your specific role. Set custom weights for technical skills, soft skills, and experience levels, creating a unique scoring algorithm for every job.
              </motion.p>
              <motion.ul variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="space-y-5">
                 {["Adjustable skill weighting", "Role-specific algorithms", "Standardized evaluation baselines"].map((benefit, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/80">
                     <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                     <span className="font-medium">{benefit}</span>
                   </li>
                 ))}
              </motion.ul>
            </div>
          </div>

          {/* FEATURE 03: Interview Analysis (TEXT | VISUAL) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">
              <motion.h3 variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-3xl md:text-5xl font-medium mb-6">Interview Analysis</motion.h3>
              <motion.p variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                Turn subjective interview conversations into objective data points. Upload transcripts or notes, and the AI will analyze responses against your predefined rubric to score candidate competence.
              </motion.p>
              <motion.ul variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="space-y-5">
                 {["Automated rubric scoring", "Consistency across interviewers", "Clear documentation"].map((benefit, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/80">
                     <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                     <span className="font-medium">{benefit}</span>
                   </li>
                 ))}
              </motion.ul>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 w-full order-1 lg:order-2 relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#10B981]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
              <div className="aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-b from-[#111] to-[#050505] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden relative flex flex-col group hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] p-8 md:p-12">
                {/* Cinematic Top Glare */}
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[32px] pointer-events-none z-20" />
                
                {/* Dynamic Ambient Light */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[#10B981]/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#10B981]/30 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 via-transparent to-black/80 pointer-events-none z-0" />
                
                {/* Real UI Widget for Interview Analysis */}
                <div className="relative z-10 flex flex-col h-full w-full justify-center items-center">
                  <div className="bg-[#121212]/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col w-full max-w-sm backdrop-blur-xl">
                    
                    {/* Audio Player Header */}
                    <div className="p-3 border-b border-white/10 bg-black/40 flex flex-col gap-2">
                       <div className="flex justify-between items-start">
                         <div className="flex gap-2.5 items-center">
                           <div className="w-7 h-7 rounded-full bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 shadow-inner">
                             <Mic className="w-3.5 h-3.5 text-[#10B981]" />
                           </div>
                           <div>
                             <div className="text-[11px] font-semibold text-white/90 leading-tight">System Design.mp3</div>
                             <div className="text-[9px] text-white/50 mt-0.5">Sarah Jenkins • 45m 12s</div>
                           </div>
                         </div>
                         <div className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-medium text-white/40 border border-white/10 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-pulse" />
                            REC
                         </div>
                       </div>
                       
                       {/* Audio Scrubber */}
                       <div className="flex items-center gap-2">
                         <span className="text-[8px] text-white/50 w-5">12:04</span>
                         <div className="flex-1 h-1.5 bg-white/5 rounded-full relative overflow-hidden flex items-end gap-[1px]">
                            {Array.from({ length: 40 }).map((_, i) => (
                              <motion.div 
                                key={i}
                                animate={{ height: ["20%", "100%", "40%", "80%", "30%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: i * 0.05 }}
                                className={`flex-1 rounded-t-[1px] ${i < 15 ? 'bg-[#10B981]' : 'bg-white/20'}`}
                                style={{ height: "40%" }}
                              />
                            ))}
                         </div>
                         <span className="text-[8px] text-white/50 w-5 text-right">45:12</span>
                       </div>
                    </div>

                    {/* Analysis Content */}
                    <div className="flex flex-col p-3 gap-3 bg-gradient-to-b from-transparent to-black/40">
                      
                      {/* Competency Score */}
                      <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl border border-white/5 shadow-inner">
                         <div>
                           <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Overall Competence</div>
                           <div className="text-[11px] font-semibold text-white/90">Highly Recommended</div>
                         </div>
                         <div className="flex flex-col items-end">
                           <span className="text-base font-light text-[#10B981]">9.2<span className="text-[9px] text-white/40">/10</span></span>
                         </div>
                      </div>

                      {/* Transcript Snippets / Insights */}
                      <div className="flex flex-col gap-2">
                         <div className="text-[8px] uppercase tracking-widest text-white/40 font-bold px-1 mb-0.5">Key Insights</div>
                         
                         {[
                           { time: "12:05", title: "Scalability", score: "Strong", text: "Successfully explained database sharding and consistent hashing.", icon: <Activity className="w-2.5 h-2.5 text-[#10B981]" /> },
                           { time: "24:18", title: "Trade-offs", score: "Excellent", text: "Articulated the CAP theorem nuances clearly for eventual consistency.", icon: <CheckCircle2 className="w-2.5 h-2.5 text-[#10B981]" /> },
                         ].map((insight, idx) => (
                             <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="flex gap-2 group relative"
                             >
                                {/* Left column: Timeline axis */}
                                <div className="w-6 shrink-0 flex flex-col items-center relative z-10">
                                  <div className="w-5 h-5 rounded-full bg-[#121212] border border-[#10B981]/30 flex items-center justify-center z-10 shadow-inner mt-0.5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#10B981]/10 group-hover:bg-[#10B981]/20 transition-colors" />
                                    {insight.icon}
                                  </div>
                                  <span className="text-[7px] font-medium text-white/40 mt-1">{insight.time}</span>
                                  
                                  {/* Timeline connecting line */}
                                  <div className="absolute top-6 bottom-[-10px] left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/10 to-transparent group-last:hidden" />
                                </div>
                                
                                {/* Right column: Insight Card */}
                                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-2 hover:bg-white/[0.05] transition-colors cursor-pointer group-hover:border-white/10 shadow-inner mb-1.5 overflow-hidden">
                                   <div className="flex justify-between items-start mb-1">
                                     <span className="text-[10px] font-medium text-white/90">{insight.title}</span>
                                     <span className="text-[7px] text-[#10B981] bg-[#10B981]/10 px-1 py-0.5 rounded font-bold tracking-wider uppercase shrink-0">{insight.score}</span>
                                   </div>
                                   <p className="text-[9px] text-white/50 leading-snug whitespace-normal break-words">&quot;{insight.text}&quot;</p>
                                </div>
                             </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FEATURE 04: Candidate Ranking Dashboard (VISUAL | TEXT) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 w-full order-1 relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#EAB308]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
              <div className="aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-b from-[#111] to-[#050505] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden relative flex flex-col p-8 md:p-12 group hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {/* Cinematic Top Glare */}
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[32px] pointer-events-none z-20" />
                
                {/* Dynamic Ambient Light */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[#EAB308]/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#EAB308]/30 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/10 via-transparent to-black/80 pointer-events-none z-0" />
                
                {/* Real UI Widget for Candidate Ranking */}
                <div className="relative z-10 flex flex-col h-full w-full justify-center items-center">
                  <div className="bg-[#121212]/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col w-full max-w-sm backdrop-blur-xl h-[400px]">
                    
                    {/* Header Area */}
                    <div className="p-4 border-b border-white/10 bg-black/60 flex flex-col gap-3 relative overflow-hidden">
                      {/* Live scanning line */}
                      <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg]"
                      />
                      
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-[#EAB308]/10 border border-[#EAB308]/20 flex items-center justify-center shadow-inner">
                             <Trophy className="w-3 h-3 text-[#EAB308]" />
                          </div>
                          <div>
                            <h4 className="text-[11px] font-semibold text-white/90 leading-tight">Eng Manager Role</h4>
                            <div className="text-[9px] text-white/50 flex items-center gap-1 mt-0.5">
                              <span className="w-1 h-1 rounded-full bg-[#EAB308] animate-pulse" /> Live Ranking
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[8px] font-bold text-[#EAB308] uppercase tracking-widest shadow-inner">
                           Updated just now
                        </div>
                      </div>
                    </div>

                    {/* Rankings List */}
                    <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden relative">
                      
                      {/* Candidate 1 - Highlighted */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                        className="relative bg-gradient-to-r from-[#EAB308]/10 to-transparent border border-[#EAB308]/30 rounded-xl p-3 shadow-[0_0_20px_rgba(234,179,8,0.1)] overflow-hidden group"
                      >
                         <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-[#EAB308]/5 to-transparent pointer-events-none" />
                         
                         <div className="flex justify-between items-start relative z-10">
                           <div className="flex items-center gap-3">
                             <div className="relative">
                               <div className="w-9 h-9 rounded-full bg-[#1A1A1A] border-2 border-[#EAB308] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                                 SJ
                               </div>
                               <div className="absolute -top-1.5 -right-1.5 bg-[#EAB308] text-black w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black shadow-lg">1</div>
                             </div>
                             <div>
                               <div className="text-[11px] font-bold text-white group-hover:text-[#EAB308] transition-colors">Sarah Jenkins</div>
                               <div className="text-[9px] text-white/50">Sr. Engineer at Stripe</div>
                             </div>
                           </div>
                           <div className="flex flex-col items-end">
                             <span className="text-[8px] text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider mb-1 border border-[#10B981]/20">Strong Hire</span>
                             <span className="text-sm font-black text-white/90">92<span className="text-[9px] font-medium text-white/40">/100</span></span>
                           </div>
                         </div>
                         
                         <div className="mt-2.5 h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5 relative z-10">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "92%" }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-[#EAB308]/50 to-[#EAB308] rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)] relative overflow-hidden"
                            >
                               <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]" />
                            </motion.div>
                         </div>
                      </motion.div>

                      {/* Candidate 2 */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex justify-between items-center hover:bg-white/[0.05] transition-colors group relative z-10"
                      >
                         <div className="flex items-center gap-2.5">
                           <div className="relative">
                               <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-white/70">
                                 JM
                               </div>
                               <div className="absolute -top-1 -right-1 bg-white/10 text-white/70 border border-white/10 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold">2</div>
                           </div>
                           <div>
                             <div className="text-[10px] font-medium text-white/80 group-hover:text-white transition-colors">James Miller</div>
                             <div className="text-[8px] text-white/40">Lead Dev at Vercel</div>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="flex flex-col items-end">
                             <div className="text-xs font-bold text-white/80">84</div>
                             <div className="w-12 h-1 bg-white/10 rounded-full mt-0.5 overflow-hidden">
                               <motion.div initial={{ width: 0 }} whileInView={{ width: "84%" }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-white/40 rounded-full" />
                             </div>
                           </div>
                         </div>
                      </motion.div>

                      {/* Candidate 3 */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 flex justify-between items-center hover:bg-white/[0.05] transition-colors group opacity-70 hover:opacity-100 relative z-10"
                      >
                         <div className="flex items-center gap-2.5">
                           <div className="relative">
                               <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-white/70">
                                 MD
                               </div>
                               <div className="absolute -top-1 -right-1 bg-white/10 text-white/70 border border-white/10 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold">3</div>
                           </div>
                           <div>
                             <div className="text-[10px] font-medium text-white/80 group-hover:text-white transition-colors">Mike Davis</div>
                             <div className="text-[8px] text-white/40">Engineer at Meta</div>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="flex flex-col items-end">
                             <div className="text-xs font-bold text-white/50">58</div>
                             <div className="w-12 h-1 bg-white/10 rounded-full mt-0.5 overflow-hidden">
                               <motion.div initial={{ width: 0 }} whileInView={{ width: "58%" }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-red-500/50 rounded-full" />
                             </div>
                           </div>
                         </div>
                      </motion.div>
                      
                      {/* Blurred Candidates Below */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none" />
                      
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 flex flex-col justify-center order-2">
              <motion.h3 variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-3xl md:text-5xl font-medium mb-6">Candidate Ranking Dashboard</motion.h3>
              <motion.p variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                Get a clear, ranked view of your talent pool. See who to advance and who to pass on at a glance, with deep-dive analytics explaining exactly why a candidate received their specific score.
              </motion.p>
              <motion.ul variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{once:true}} className="space-y-5">
                 {["At-a-glance rankings", "Transparent scoring", "Exportable reports"].map((benefit, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/80">
                     <CheckCircle2 className="w-5 h-5 text-[#EAB308] shrink-0" />
                     <span className="font-medium">{benefit}</span>
                   </li>
                 ))}
              </motion.ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
