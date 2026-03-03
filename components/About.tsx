'use client';

import React from 'react';
import { motion } from 'motion/react';

const skills = [
  { label: 'React / Next.js', level: 95 },
  { label: 'Node.js / Express', level: 90 },
  { label: 'TypeScript', level: 92 },
  { label: 'PostgreSQL / MySQL', level: 85 },
  { label: 'MongoDB', level: 50 },
  { label: 'GraphQL / REST APIs', level: 60 },
  { label: 'AWS / Vercel', level: 80 },
  { label: 'Docker / CI/CD', level: 65 },
  { label: 'Tailwind / SCSS', level: 94 },
];

export default function About() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-[260px_1fr] border-b border-[#1e1e1e]"
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Sidebar label */}
      <div className="p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#1e1e1e] flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-[0.62rem] tracking-[0.22em] uppercase text-[#666666]">01 — About</span>
          <span className="font-syne text-[5rem] font-extrabold text-[--clr-border] leading-none select-none" aria-hidden="true">01</span>
        </div>

        {/* Stacked info pills */}
        <div className="flex flex-col gap-3">
          {[
            { icon: '🌍', text: 'Remote Friendly' },
            { icon: '⚡', text: 'Fast Turnaround' },
            { icon: '🔒', text: 'NDA Available' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-[0.72rem] text-[#666666] py-2.5 px-3 border border-[#1e1e1e] bg-[#111111]">
              <span role="img" aria-label={text}>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="p-10 lg:p-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="accent-line" aria-hidden="true" />
          <h2
            id="about-heading"
            className="font-syne text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight mb-6"
          >
            Building the web,
            <br />
            <span className="text-neon">one layer at a time.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 mb-10">
            <p className="text-[#666666] text-[0.84rem] leading-[1.9] mb-4">
              I&apos;m a freelance full-stack developer who loves building complete web products — from
              the database schema to the deployed UI. I work with startups and businesses to turn
              ideas into reliable, scalable applications that users actually enjoy using.
            </p>
            <p className="text-[#666666] text-[0.84rem] leading-[1.9] mb-4">
              My approach is pragmatic: clean architecture, thoughtful UX, and code that the next
              developer won&apos;t hate. I communicate clearly, deliver on time, and treat every project
              like it&apos;s my own product.
            </p>
          </div>

          {/* Skill bars — Bento-style grid */}
          <h3 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#666666] mb-5">
            Core Skill Proficiency
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" role="list">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col gap-2 p-4 border border-[#1e1e1e] bg-[#111111] hover:border-[rgba(200,255,0,0.3)] transition-colors duration-300"
                role="listitem"
                aria-label={`${skill.label}: ${skill.level}% proficiency`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span className="text-[0.72rem] text-[#f0f0f0] font-mono">{skill.label}</span>
                  </div>
                  <span className="text-[0.6rem] text-[#666666]">{skill.level}%</span>
                </div>
                {/* Progress bar */}
                <div className="h-[2px] bg-[--clr-border] rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#c8ff00] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
