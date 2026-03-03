'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const steps = [
  {
    num: '01',
    title: 'Discover',
    icon: '🔍',
    desc: 'I start by understanding your goals, users, and constraints. A clear brief saves weeks of costly rework.',
    detail: '1–2 days',
  },
  {
    num: '02',
    title: 'Plan',
    icon: '📐',
    desc: 'Architecture decisions, tech stack selection, and timeline scoping. No surprises later.',
    detail: '2–3 days',
  },
  {
    num: '03',
    title: 'Build',
    icon: '⚙️',
    desc: 'Iterative development with weekly check-ins. You see real progress early and often.',
    detail: 'Ongoing',
  },
  {
    num: '04',
    title: 'Launch',
    icon: '🚀',
    desc: 'Deploy, test, and hand off with documentation. I stay available for post-launch support.',
    detail: '1–2 days',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-10 border-r border-[#1e1e1e] last:border-r-0 hover:bg-[#111111] transition-colors duration-300 group overflow-hidden"
    >
      {/* Number watermark */}
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-4 font-syne text-[5rem] font-extrabold text-[--clr-border] leading-none select-none transition-colors duration-400 group-hover:text-[rgba(200,255,0,0.08)]"
      >
        {step.num}
      </span>

      {/* Connector line between steps */}
      {index < steps.length - 1 && (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-[4.5rem] right-0 w-px h-8 bg-[--clr-border]"
        />
      )}

      {/* Icon */}
      <div className="text-2xl mb-5" role="img" aria-label={step.title}>
        {step.icon}
      </div>

      {/* Step label */}
      <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#666666] mb-3">
        Step {step.num}
      </span>

      <h3 className="font-syne text-xl font-bold mb-3 group-hover:text-[#c8ff00] transition-colors duration-300">
        {step.title}
      </h3>
      <p className="text-[#666666] text-[0.76rem] leading-[1.85] mb-5 relative z-10">
        {step.desc}
      </p>

      {/* Duration badge */}
      <span className="inline-flex items-center gap-1.5 text-[0.6rem] tracking-widest uppercase py-1 px-3 border border-[#1e1e1e] text-[#666666] group-hover:border-[rgba(200,255,0,0.3)] group-hover:text-[#c8ff00] transition-all duration-300">
        ⏱ {step.detail}
      </span>
    </motion.div>
  );
}

export default function Process() {
  return (
    <section className="border-b border-[#1e1e1e]" id="process" aria-labelledby="process-heading">
      {/* Header */}
      <div className="px-10 md:px-12 py-10 border-b border-[#1e1e1e]">
        <span className="accent-line" aria-hidden="true" />
        <h2 id="process-heading" className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tighter leading-none">
          How I<br /><span className="text-neon">Work</span>
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <StepCard key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
