'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 md:px-12 py-6 border-b border-[#1e1e1e] bg-[#0a0a0a]/85 backdrop-blur-xl">
      <div className="font-syne font-extrabold text-xl tracking-tighter">
        dev<span className="text-[#c8ff00]">.</span>portfolio
      </div>
      
      <ul className="hidden md:flex gap-8 list-none">
        {['About', 'Projects', 'Process', 'Contact'].map((item) => (
          <li key={item}>
            <a 
              href={`#${item.toLowerCase()}`}
              className="text-[#666] hover:text-[#c8ff00] text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-200"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a 
        href="#contact" 
        className="bg-[#c8ff00] text-black px-6 py-2.5 font-syne font-bold text-[0.8rem] tracking-wider hover:bg-white transition-all duration-200"
      >
        Hire Me →
      </a>
    </nav>
  );
}
