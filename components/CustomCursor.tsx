'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hoverType, setHoverType] = useState<'default' | 'link' | 'text' | 'button'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Trailing dot — uses spring for lag
  const trailX = useSpring(-100, { damping: 22, stiffness: 280, mass: 0.6 });
  const trailY = useSpring(-100, { damping: 22, stiffness: 280, mass: 0.6 });

  const updateCursor = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    trailX.set(e.clientX - 20);
    trailY.set(e.clientY - 20);
    if (!isVisible) setIsVisible(true);
  }, [trailX, trailY, isVisible]);

  useEffect(() => {
    const detect = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target) { setHoverType('default'); return; }
      const tag = target.tagName.toLowerCase();
      const role = target.getAttribute('role');
      if (tag === 'button' || role === 'button') { setHoverType('button'); return; }
      if (tag === 'a' || target.closest('a')) { setHoverType('link'); return; }
      if (tag === 'input' || tag === 'textarea') { setHoverType('text'); return; }
      setHoverType('default');
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    window.addEventListener('mouseover', detect, { passive: true });
    window.addEventListener('mousedown', () => setIsClicking(true));
    window.addEventListener('mouseup', () => setIsClicking(false));
    window.addEventListener('mouseleave', () => setIsVisible(false));
    window.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', detect);
    };
  }, [updateCursor]);

  // Cursor sizes per hover state
  const dotSize = isClicking ? 6 : 10;
  const ringSize = hoverType === 'button' ? 52 : hoverType === 'link' ? 44 : hoverType === 'text' ? 28 : 40;
  const ringOpacity = hoverType === 'text' ? 0.4 : 1;

  return (
    <>
      {/* Inner dot — instant */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[var(--z-cursor)] mix-blend-difference"
        animate={{
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.6 : 1,
        }}
        transition={{ type: 'tween', duration: 0 }}
        style={{
          borderRadius: '50%',
          background: '#c8ff00',
          position: 'fixed',
        }}
      />

      {/* Outer ring — spring lagged */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          width: ringSize,
          height: ringSize,
          borderRadius: hoverType === 'text' ? '3px' : '50%',
          border: '1.5px solid #c8ff00',
          opacity: isVisible ? ringOpacity : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderRadius: hoverType === 'text' ? '3px' : '50%',
          opacity: isVisible ? ringOpacity : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Label for button hover */}
      {hoverType === 'button' && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed pointer-events-none z-[9997] font-mono text-[0.5rem] tracking-widest uppercase text-[--clr-bg] bg-[#c8ff00] px-1.5 py-0.5"
          style={{
            left: pos.x + 14,
            top: pos.y - 18,
          }}
        >
          click
        </motion.div>
      )}
    </>
  );
}
