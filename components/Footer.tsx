'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-12 py-6 border-t border-[#1e1e1e] gap-4">
      <span className="text-[0.7rem] text-[#666]">
        © 2025 — Your Name. All rights reserved.
      </span>
      
      <div className="flex gap-6">
        {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
          <a 
            key={social}
            href="#" 
            className="text-[0.7rem] text-[#666] tracking-widest uppercase hover:text-[#c8ff00] transition-colors"
          >
            {social}
          </a>
        ))}
      </div>
    </footer>
  );
}
