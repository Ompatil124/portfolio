'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-12 pt-24 gap-16 relative border-b border-[#1e1e1e] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-radial from-[#c8ff00]/10 to-transparent pointer-events-none" />

      <div className="flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 border border-[#1e1e1e] px-4 py-1.5 text-[0.7rem] tracking-[0.15em] uppercase text-[#666] mb-8 w-fit"
        >
          <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full animate-pulse" />
          Available for freelance work
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-syne font-extrabold text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-tighter mb-6"
        >
          <span className="block">Full</span>
          <span className="block text-[#c8ff00]">Stack</span>
          <span className="block [text-shadow:1px_1px_0_#f0f0f0,-1px_-1px_0_#f0f0f0,1px_-1px_0_#f0f0f0,-1px_1px_0_#f0f0f0] text-transparent">Dev.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#666] text-[0.85rem] leading-relaxed max-w-[420px] mb-10"
        >
          I build fast, scalable web applications — from pixel-perfect frontends to robust APIs. 
          Turning complex problems into clean, maintainable code.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <a href="#projects" className="bg-[#c8ff00] text-black px-8 py-3.5 font-syne font-bold text-[0.85rem] tracking-wide hover:bg-white hover:-translate-y-0.5 transition-all duration-200">
            View My Work
          </a>
          <a href="#contact" className="text-[#f0f0f0] border border-[#1e1e1e] px-6 py-3.5 text-[0.8rem] flex items-center gap-2 hover:border-[#c8ff00] hover:text-[#c8ff00] transition-all duration-200">
            Let&apos;s Talk ↗
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#111] border border-[#1e1e1e] relative"
      >
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1e1e1e] bg-[#131313]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto mr-auto text-[0.7rem] text-[#666] tracking-widest uppercase">~/portfolio</span>
        </div>
        <div className="p-6 font-mono text-[0.78rem] leading-loose">
          <div><span className="text-[#c8ff00]">❯</span> <span className="text-[#f0f0f0]">whoami</span></div>
          <div className="text-[#666]">→ Full Stack Developer</div>
          <br />
          <div><span className="text-[#c8ff00]">❯</span> <span className="text-[#f0f0f0]">skills --list</span></div>
          <div className="text-[#666]">→ Frontend: <span className="text-[#c8ff00]">React</span>, <span className="text-[#c8ff00]">Next.js</span>, <span className="text-[#c8ff00]">TypeScript</span></div>
          <div className="text-[#666]">→ Backend: <span className="text-[#c8ff00]">Node.js</span>, <span className="text-[#c8ff00]">Python</span>, <span className="text-[#c8ff00]">REST/GraphQL</span></div>
          <div className="text-[#666]">→ Database: <span className="text-[#c8ff00]">PostgreSQL</span>, <span className="text-[#c8ff00]">MongoDB</span></div>
          <div className="text-[#666]">→ DevOps: <span className="text-[#c8ff00]">AWS</span>, <span className="text-[#c8ff00]">Docker</span>, <span className="text-[#c8ff00]">CI/CD</span></div>
          <br />
          <div><span className="text-[#c8ff00]">❯</span> <span className="text-[#f0f0f0]">status --current</span></div>
          <div className="text-[#666]">→ <span className="text-[#7ee787]">Open for projects</span> ✓</div>
          <div className="text-[#666]">→ Response time: <span className="text-[#7ee787]">within 24 hours</span></div>
          <br />
          <div><span className="text-[#c8ff00]">❯</span> <span className="inline-block w-2 h-3.5 bg-[#c8ff00] animate-[blink_1s_infinite] align-middle" /></div>
        </div>
      </motion.div>
    </section>
  );
}
