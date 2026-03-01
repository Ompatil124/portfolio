'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2" id="contact">
      <div className="p-12 md:p-16 border-r border-[#1e1e1e]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-none tracking-tighter mb-8">
            Let&apos;s<br />
            <span className="text-[#c8ff00]">Build</span><br />
            <span className="[text-shadow:1px_1px_0_#f0f0f0,-1px_-1px_0_#f0f0f0,1px_-1px_0_#f0f0f0,-1px_1px_0_#f0f0f0] text-transparent">Together.</span>
          </h2>
          <p className="text-[#666] text-[0.82rem] leading-relaxed max-w-[380px] mb-12">
            Have a project in mind? I&apos;m currently available for freelance work. Let&apos;s discuss what you need and how I can help.
          </p>

          <div className="flex flex-col gap-0">
            <div className="flex flex-col gap-1 py-5 border-t border-[#1e1e1e]">
              <span className="text-[0.65rem] text-[#666] tracking-widest uppercase">Email</span>
              <span className="text-[0.9rem] text-[#f0f0f0]">
                <a href="mailto:hello@yourname.dev" className="hover:text-[#c8ff00] transition-colors">hello@yourname.dev</a>
              </span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-t border-[#1e1e1e]">
              <span className="text-[0.65rem] text-[#666] tracking-widest uppercase">Location</span>
              <span className="text-[0.9rem] text-[#f0f0f0]">Your City, Country — Remote Friendly</span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-t border-[#1e1e1e]">
              <span className="text-[0.65rem] text-[#666] tracking-widest uppercase">Availability</span>
              <span className="text-[0.9rem] text-[#c8ff00]">● Open to new projects</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-12 md:p-16 bg-[#111]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] tracking-widest uppercase text-[#666]">Your Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="bg-[#0a0a0a] border border-[#1e1e1e] p-4 text-[0.82rem] outline-none focus:border-[#c8ff00] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] tracking-widest uppercase text-[#666]">Email</label>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                className="bg-[#0a0a0a] border border-[#1e1e1e] p-4 text-[0.82rem] outline-none focus:border-[#c8ff00] transition-colors"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[0.65rem] tracking-widest uppercase text-[#666]">Project Type</label>
            <input 
              type="text" 
              placeholder="e.g. E-commerce, SaaS, API..."
              className="bg-[#0a0a0a] border border-[#1e1e1e] p-4 text-[0.82rem] outline-none focus:border-[#c8ff00] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.65rem] tracking-widest uppercase text-[#666]">Tell Me About Your Project</label>
            <textarea 
              required
              placeholder="Describe what you need, timeline, and budget range..."
              className="bg-[#0a0a0a] border border-[#1e1e1e] p-4 text-[0.82rem] outline-none focus:border-[#c8ff00] transition-colors min-h-[130px] resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={status !== 'idle'}
            className={`w-full p-4 font-syne font-bold text-[0.9rem] tracking-wider transition-all duration-200 ${
              status === 'sent' ? 'bg-[#7ee787] text-black' : 'bg-[#c8ff00] text-black hover:bg-white'
            }`}
          >
            {status === 'idle' && 'Send Message →'}
            {status === 'sending' && 'Sending...'}
            {status === 'sent' && 'Message Sent ✓'}
          </button>
        </form>
      </div>
    </section>
  );
}
