'use client';

import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';

const stats = [
  { num: '1+', label: 'Years Experience', desc: 'Building production apps' },
  { num: '7+', label: 'Projects Delivered', desc: 'Across diverse industries' },
  { num: '5+', label: 'Happy Clients', desc: 'Worldwide & remote-ready' },
  { num: '100%', label: 'On-time Delivery', desc: 'Every single project' },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  /* Count-up animation */
  const numStr = stat.num.replace(/[^0-9]/g, '');
  const suffix = stat.num.replace(/[0-9]/g, '');
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 80, damping: 18 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  React.useEffect(() => {
    if (inView && numStr) count.set(parseInt(numStr, 10));
  }, [inView, numStr, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-8 md:p-10 border-r border-[#1e1e1e] last:border-r-0 text-center group hover:bg-[#111111] transition-colors duration-300 overflow-hidden"
    >
      {/* Hover glow blob */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,255,0,0.06), transparent 70%)' }}
      />
      {/* Top accent line reveals on hover */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-0 bg-[#c8ff00] transition-all duration-500 group-hover:w-full"
      />

      <motion.span className="block font-syne text-[clamp(2.2rem,4vw,3rem)] font-extrabold text-[#c8ff00] leading-none mb-1">
        {numStr ? display : stat.num}
      </motion.span>
      <span className="block text-[0.7rem] text-[#f0f0f0] uppercase tracking-widest mb-1">
        {stat.label}
      </span>
      <span className="block text-[0.62rem] text-[#666666] tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {stat.desc}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      aria-label="Key statistics"
      className="grid grid-cols-2 md:grid-cols-4 border-b border-[#1e1e1e]"
    >
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </section>
  );
}
