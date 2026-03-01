'use client';

import React from 'react';
import { motion } from 'motion/react';

const stats = [
  { num: '3+', label: 'Years Experience' },
  { num: '25+', label: 'Projects Delivered' },
  { num: '15+', label: 'Happy Clients' },
  { num: '100%', label: 'On-time Delivery' },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#1e1e1e]">
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="p-10 border-r border-[#1e1e1e] last:border-r-0 text-center hover:bg-[#111] transition-colors duration-200"
        >
          <span className="block font-syne text-4xl font-extrabold text-[#c8ff00] mb-1">
            {stat.num}
          </span>
          <span className="block text-[0.7rem] text-[#666] uppercase tracking-widest">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
