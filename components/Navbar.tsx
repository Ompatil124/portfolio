'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ['About', 'Projects', 'Process', 'Contact'];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-[var(--z-nav)] flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-300 ${scrolled
          ? 'border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-xl'
          : 'bg-transparent'
        }`}
    >
      {/* Logo */}
      <a
        href="#main-content"
        className="font-syne font-extrabold text-xl tracking-tighter group"
        aria-label="Om Patil Portfolio — Back to top"
      >
        <span className="text-[#f0f0f0] group-hover:text-[#c8ff00] transition-colors duration-300">
          om
        </span>
        <span className="text-[#c8ff00]">.</span>
        <span className="text-[#666666] group-hover:text-[#f0f0f0] transition-colors duration-300 text-base font-mono font-normal">
          dev
        </span>
      </a>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 list-none" role="list">
        {navItems.map((item, i) => (
          <li key={item}>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              href={`#${item.toLowerCase()}`}
              className="relative text-[#666666] hover:text-[#c8ff00] text-[0.72rem] tracking-[0.12em] uppercase transition-colors duration-200 group"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c8ff00] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          </li>
        ))}
      </ul>

      {/* CTA + Mobile Toggle */}
      <div className="flex items-center gap-4">
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          href="#contact"
          className="hidden md:inline-flex btn-magnetic bg-[#c8ff00] text-black px-6 py-2.5 font-syne font-bold text-[0.78rem] tracking-wider hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
          aria-label="Hire me — go to contact section"
        >
          Hire Me →
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px bg-[--clr-text] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-[--clr-text] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[--clr-text] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-[var(--clr-bg)]/95 backdrop-blur-xl border-b border-[#1e1e1e] md:hidden"
        >
          <ul className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[#666666] hover:text-[#c8ff00] tracking-widest uppercase text-[0.8rem] py-2 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block text-center bg-[#c8ff00] text-black py-3 font-syne font-bold text-[0.8rem] tracking-wider"
              >
                Hire Me →
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
