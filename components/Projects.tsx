'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    num: '01',
    name: 'SaaS Dashboard',
    desc: 'A multi-tenant analytics dashboard with real-time data visualization, role-based access control, and custom reporting tools for a B2B SaaS product.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Chart.js', 'AWS'],
    live: '#',
    github: '#',
  },
  {
    num: '02',
    name: 'E-Commerce Platform',
    desc: 'Full-featured online store with product management, Stripe payments, inventory tracking, and an admin panel. Handles 500+ orders per day.',
    tags: ['React', 'Express', 'MongoDB', 'Stripe', 'Redis'],
    live: '#',
    github: '#',
  },
  {
    num: '03',
    name: 'Real-Time Chat App',
    desc: 'A Slack-style messaging platform with channels, DMs, file sharing, and WebSocket-powered real-time delivery. Supports 1000+ concurrent users.',
    tags: ['React', 'Socket.io', 'Node.js', 'PostgreSQL', 'Docker'],
    live: '#',
    github: '#',
  },
  {
    num: '04',
    name: 'REST API & CMS',
    desc: 'A headless CMS backend with a custom REST API, JWT authentication, media management, and an intuitive admin UI for content teams.',
    tags: ['Node.js', 'GraphQL', 'MySQL', 'JWT', 'S3'],
    live: '#',
    github: '#',
  },
];

export default function Projects() {
  return (
    <section className="border-b border-[#1e1e1e]" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end p-12 border-b border-[#1e1e1e] gap-6">
        <h2 className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tighter leading-none">
          Selected<br /><span className="text-[#c8ff00]">Work</span>
        </h2>
        <a href="#" className="text-[#666] text-[0.75rem] tracking-widest uppercase border-b border-[#1e1e1e] pb-1 hover:text-[#c8ff00] hover:border-[#c8ff00] transition-all duration-200">
          All Projects →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-10 border-r border-b border-[#1e1e1e] md:even:border-r-0 relative group overflow-hidden hover:bg-[#111] transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#c8ff00] transition-all duration-400 group-hover:w-full" />
            
            <span className="block text-[0.65rem] text-[#666] tracking-[0.15em] mb-6">Project — {project.num}</span>
            <h3 className="font-syne text-2xl font-bold tracking-tight mb-3">{project.name}</h3>
            <p className="text-[#666] text-[0.78rem] leading-relaxed mb-6">{project.desc}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="bg-[#131313] border border-[#1e1e1e] px-3 py-1 text-[0.65rem] text-[#666] tracking-wider uppercase group-hover:border-[#c8ff00]/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a href={project.live} className="text-[#666] text-[0.72rem] flex items-center gap-1.5 hover:text-[#c8ff00] transition-colors">
                <ExternalLink size={14} /> ↗ Live Demo
              </a>
              <a href={project.github} className="text-[#666] text-[0.72rem] flex items-center gap-1.5 hover:text-[#c8ff00] transition-colors">
                <Github size={14} /> ⌥ GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
