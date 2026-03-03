'use client';

import React from 'react';
import { motion } from 'motion/react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Ompatil124', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-patil-b5866a356', icon: '⌁' },
];

const techStack = [
  'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS',
  'Docker', 'AWS', 'GraphQL', 'React', 'Framer Motion',
];

export default function Footer() {
  return (
    <footer aria-label="Site footer">
      {/* Marquee strip */}
      <div
        className="border-y border-[#1e1e1e] py-3 overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex gap-0 animate-marquee whitespace-nowrap w-max">
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-[0.65rem] tracking-[0.2em] uppercase text-[#666666]">
              {tech}
              <span className="text-[#c8ff00] text-[0.5rem]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main footer row */}
      <div className="flex flex-col md:flex-row justify-between items-center px-10 md:px-12 py-8 gap-6">
        {/* Wordmark */}
        <div className="flex flex-col gap-1">
          <a
            href="#main-content"
            className="font-syne font-extrabold text-lg tracking-tighter group"
            aria-label="Back to top"
          >
            om<span className="text-[#c8ff00]">.</span>
            <span className="text-[#666666] text-base font-mono font-normal group-hover:text-[#f0f0f0] transition-colors">dev</span>
          </a>
          <p className="text-[0.65rem] text-[#666666]">
            © {new Date().getFullYear()} — Built with Next.js & ♥
          </p>
        </div>

        {/* Socials */}
        <nav aria-label="Social media links">
          <ul className="flex gap-3 list-none">
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-[0.68rem] text-[#666666] tracking-widest uppercase hover:text-[#c8ff00] transition-colors duration-200 py-2 px-3 border border-[#1e1e1e] hover:border-[rgba(200,255,0,0.3)]"
                  aria-label={`${label} profile`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to top */}
        <motion.a
          href="#main-content"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="hidden md:flex items-center gap-2 text-[0.65rem] text-[#666666] tracking-widest uppercase hover:text-[#c8ff00] transition-colors"
          aria-label="Scroll back to top of page"
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  );
}
