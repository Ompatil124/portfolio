'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const typedLines = [
  '→ Full Stack Developer',
  '→ AI & Web App Builder',
  '→ Python & Next.js Enthusiast',
];

function TypedText() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = typedLines[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 45);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % typedLines.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, lineIndex]);

  return (
    <span className="text-[#c8ff00]">
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-[#c8ff00] ml-0.5 align-middle animate-blink" aria-hidden="true" />
    </span>
  );
}

/* Magnetic button hook */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return { ref, sx, sy, onMove, onLeave };
}

export default function Hero() {
  const primary = useMagnetic(0.3);
  const secondary = useMagnetic(0.3);

  /* Radial glow tracks mouse */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseX, [0, 1], ['0%', '100%']), { stiffness: 80, damping: 25 });
  const glowY = useSpring(useTransform(mouseY, [0, 1], ['0%', '100%']), { stiffness: 80, damping: 25 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-12 pt-24 gap-16 border-b border-[#1e1e1e] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Dynamic background glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(200,255,0,0.05), transparent 60%)`,
        }}
      />
      {/* Static accent blob */}
      <div
        aria-hidden="true"
        className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 70%)' }}
      />
      {/* Horizontal rule ambiance */}
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[--clr-border] to-transparent opacity-40" />

      {/* LEFT — Copy */}
      <div className="flex flex-col relative z-10">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 border border-[#1e1e1e] px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-[#666666] mb-8 w-fit bg-[#111111]"
          role="status"
          aria-label="Availability status: Available for freelance work"
        >
          <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full animate-pulse-glow" aria-hidden="true" />
          Available for freelance work
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne font-extrabold text-[clamp(3.2rem,8.5vw,5.8rem)] leading-[0.93] tracking-tighter mb-5"
        >
          <span className="block text-[#f0f0f0]">Full</span>
          <span className="block text-neon">Stack</span>
          <span className="block text-outline" aria-label="Dev.">Dev.</span>
        </motion.h1>

        {/* Typed sub-role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[0.8rem] text-[#666666] mb-4"
          aria-live="polite"
        >
          <TypedText />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#666666] text-[0.85rem] leading-[1.85] max-w-[400px] mb-10"
        >
          I build fast, scalable web applications — from pixel-perfect frontends to robust APIs.
          Turning complex problems into clean, maintainable code.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 items-center"
        >
          <motion.a
            ref={primary.ref}
            style={{ x: primary.sx, y: primary.sy }}
            onMouseMove={primary.onMove}
            onMouseLeave={primary.onLeave}
            href="#projects"
            className="btn-magnetic bg-[#c8ff00] text-black px-8 py-3.5 font-syne font-bold text-[0.85rem] tracking-wide hover:bg-white hover:-translate-y-0.5 transition-colors duration-200"
            aria-label="View my work — jump to projects section"
          >
            View My Work
          </motion.a>
          <motion.a
            ref={secondary.ref}
            style={{ x: secondary.sx, y: secondary.sy }}
            onMouseMove={secondary.onMove}
            onMouseLeave={secondary.onLeave}
            href="#contact"
            className="btn-magnetic text-[#f0f0f0] border border-[#1e1e1e] px-6 py-3.5 text-[0.8rem] flex items-center gap-2 hover:border-[#c8ff00] hover:text-[#c8ff00] transition-all duration-200 group"
            aria-label="Let's talk — jump to contact section"
          >
            Let&apos;s Talk
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
          </motion.a>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-6 mt-12 pt-8 border-t border-[#1e1e1e]"
        >
          {[['7+', 'Projects'], ['1+', 'Year'], ['100%', 'On-time']].map(([num, label]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="font-syne text-xl font-extrabold text-[#c8ff00] leading-none">{num}</span>
              <span className="text-[0.6rem] text-[#666666] tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — Terminal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 card-lift"
        aria-label="Skills terminal"
      >
        {/* Glow halo behind card */}
        <div aria-hidden="true" className="absolute -inset-px rounded-sm" style={{ background: 'linear-gradient(135deg, rgba(200,255,0,0.12), transparent 60%)', filter: 'blur(20px)' }} />

        <div className="relative bg-[#111111] border border-[#1e1e1e] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1e1e1e] bg-[#131313]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#7ee787]" aria-hidden="true" />
            <span className="ml-auto mr-auto text-[0.67rem] text-[#666666] tracking-widest uppercase">~/portfolio</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-[0.78rem] leading-[2] overflow-hidden">
            {[
              { cmd: 'whoami', output: '→ Full Stack Developer' },
              { cmd: 'skills --list', output: null },
            ].map(({ cmd, output }, i) => (
              <motion.div
                key={cmd}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
              >
                <div>
                  <span className="text-[#c8ff00]" aria-hidden="true">❯</span>{' '}
                  <span className="text-[#f0f0f0]">{cmd}</span>
                </div>
                {output && <div className="text-[#666666]">{output}</div>}
              </motion.div>
            ))}

            {/* Skill list */}
            {[
              ['Frontend', 'React, Next.js, TypeScript'],
              ['Backend', 'Python, Node.js, Streamlit'],
              ['AI / APIs', 'Gemini API, REST, Supabase'],
              ['Deploy', 'Vercel, GitHub, CI/CD'],
            ].map(([key, val], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.95 + i * 0.1 }}
                className="text-[#666666]"
              >
                → {key}:{' '}
                <span className="text-[#c8ff00]">{val}</span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.45 }}
            >
              <br />
              <div>
                <span className="text-[#c8ff00]" aria-hidden="true">❯</span>{' '}
                <span className="text-[#f0f0f0]">status --current</span>
              </div>
              <div className="text-[#666666]">
                → <span className="text-[#7ee787]">Open for projects</span> ✓
              </div>
              <div className="text-[#666666]">
                → Response time: <span className="text-[#7ee787]">within 24 hours</span>
              </div>
              <br />
              <div>
                <span className="text-[#c8ff00]" aria-hidden="true">❯</span>{' '}
                <span className="inline-block w-[2px] h-[1em] bg-[#c8ff00] animate-blink align-middle" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
