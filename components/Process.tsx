'use client';

import React from 'react';
import { motion } from 'motion/react';

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'I start by understanding your goals, users, and constraints. A clear brief saves weeks of rework.',
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Architecture decisions, tech stack selection, and timeline scoping. No surprises later.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Iterative development with weekly check-ins. You see progress early and often.',
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'Deploy, test, and hand off with documentation. I stay available for post-launch support.',
  },
];

export default function Process() {
  return (
    <section className="border-b border-[#1e1e1e]" id="process">
      <div className="p-12 border-b border-[#1e1e1e]">
        <h2 className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tighter leading-none">
          How I<br /><span className="text-[#c8ff00]">Work</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-10 border-r border-[#1e1e1e] last:border-r-0 hover:bg-[#111] transition-colors duration-200 group"
          >
            <span className="block font-syne text-5xl font-extrabold text-[#1e1e1e] leading-none mb-6 group-hover:text-[#c8ff00] transition-colors duration-300">
              {step.num}
            </span>
            <h3 className="font-syne text-lg font-bold mb-3">{step.title}</h3>
            <p className="text-[#666] text-[0.75rem] leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
