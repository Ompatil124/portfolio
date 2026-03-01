'use client';

import React from 'react';
import { motion } from 'motion/react';

const skills = [
  'React / Next.js',
  'Node.js / Express',
  'TypeScript',
  'PostgreSQL / MySQL',
  'MongoDB',
  'GraphQL / REST APIs',
  'AWS / Vercel',
  'Docker / CI/CD',
  'Tailwind / SCSS',
];

export default function About() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border-b border-[#1e1e1e]" id="about">
      <div className="p-12 border-r border-[#1e1e1e] flex flex-col gap-4">
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">01 — About</span>
        <span className="font-syne text-6xl font-extrabold text-[#1e1e1e] leading-none">01</span>
      </div>
      
      <div className="p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1.1] tracking-tight mb-6">
            Building the web,<br />
            <span className="text-[#c8ff00]">one layer at a time.</span>
          </h2>
          <p className="text-[#666] text-[0.85rem] leading-[1.9] max-w-[580px] mb-8">
            I&apos;m a freelance full-stack developer who loves building complete web products — from the database schema to the deployed UI. I work with startups and businesses to turn ideas into reliable, scalable applications that users actually enjoy using.
          </p>
          <p className="text-[#666] text-[0.85rem] leading-[1.9] max-w-[580px] mb-12">
            My approach is pragmatic: clean architecture, thoughtful UX, and code that the next developer won&apos;t hate. I communicate clearly, deliver on time, and treat every project like it&apos;s my own.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#1e1e1e] mt-8">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-[#0a0a0a] p-4 flex items-center gap-3 text-[0.72rem] text-[#666] hover:bg-[#111] hover:text-[#f0f0f0] transition-all duration-200 group"
              >
                <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full group-hover:scale-125 transition-transform" />
                {skill}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
