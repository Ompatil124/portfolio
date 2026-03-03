'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    num: '01',
    name: 'Vilas Agro Trader',
    category: 'AI-Powered Web App',
    desc: 'A smart agriculture trading platform powered by Google Gemini AI. Built with Next.js and Python, it provides real-time agricultural market insights, intelligent product recommendations, and a seamless trading experience for farmers and traders. Deployed live on Vercel.',
    tags: ['Next.js', 'Python', 'TypeScript', 'Vercel'],
    live: 'https://newvilasagro.in',
    github: 'https://github.com/Ompatil124/new-vilas-agro-trader',
    accent: '#c8ff00',
    size: 'lg',
  },
  {
    num: '02',
    name: 'CampusSafe',
    category: 'AI Safety Platform',
    desc: 'An anonymous campus incident reporting platform built with Streamlit and Supabase. Features AI-powered incident classification, NLP sentiment analysis for urgency detection (Low / Medium / High), media proof uploads, and a full admin review dashboard.',
    tags: ['Python', 'Streamlit', 'Supabase', 'NLP', 'AI'],
    live: 'https://campusafe.streamlit.app/',
    github: 'https://github.com/Ompatil124/campus',
    accent: '#7ee787',
    size: 'lg',
  },
];

/* Tilt card hook */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const tilt = useTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => { tilt.onMouseLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      className="relative border border-[#1e1e1e] bg-[#111111] overflow-hidden group transition-colors duration-300 hover:border-[rgba(200,255,0,0.2)] md:col-span-1"
      aria-label={`Project: ${project.name}`}
    >
      {/* Top shimmer bar */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: project.accent }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(400px circle at 50% 0%, ${project.accent}08, transparent 70%)` }}
      />

      <div className="relative p-8 md:p-10 flex flex-col h-full gap-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="block text-[0.62rem] text-[#666666] tracking-[0.18em] uppercase mb-1">
              {project.category} — {project.num}
            </span>
            <h3 className="font-syne text-xl md:text-2xl font-bold tracking-tight">
              {project.name}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.25 }}
            className="mt-1 text-[#666666] group-hover:text-[#c8ff00] transition-colors"
            aria-hidden="true"
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-[#666666] text-[0.8rem] leading-[1.85] flex-1">
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span key={tag} className="badge" role="listitem">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-5 pt-2 border-t border-[#1e1e1e]">
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[0.7rem] text-[#666666] hover:text-[#c8ff00] transition-colors"
              aria-label={`${project.name} — live demo`}
            >
              <ExternalLink size={13} aria-hidden="true" />
              Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[0.7rem] text-[#666666] hover:text-[#c8ff00] transition-colors"
            aria-label={`${project.name} — GitHub repository`}
          >
            <Github size={13} aria-hidden="true" />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="border-b border-[#1e1e1e]" id="projects" aria-labelledby="projects-heading">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-10 md:px-12 py-10 border-b border-[#1e1e1e] gap-4">
        <div>
          <span className="accent-line" aria-hidden="true" />
          <h2 id="projects-heading" className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tighter leading-none">
            Selected<br /><span className="text-neon">Work</span>
          </h2>
        </div>
        <a
          href="https://github.com/Ompatil124"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#666666] text-[0.72rem] tracking-widest uppercase border-b border-[#1e1e1e] pb-1 hover:text-[#c8ff00] hover:border-[#c8ff00] transition-all duration-200 group flex items-center gap-1.5"
          aria-label="View all projects on GitHub"
        >
          All Projects
          <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </a>
      </div>

      {/* Project cards — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]" style={{ perspective: '1000px' }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
