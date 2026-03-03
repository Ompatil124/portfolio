'use client';

import React, { useState, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Types ──────────────────────────────────────────────────── */
type Status = 'idle' | 'sending' | 'sent' | 'error';
interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

/* ─── Validation ─────────────────────────────────────────────── */
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim() || name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  else if (name.trim().length > 80)
    errors.name = 'Name is too long (max 80 chars).';
  else if (/[<>{}/\\]/.test(name))
    errors.name = 'Name contains invalid characters.';

  if (!email.trim())
    errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!message.trim() || message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  else if (message.trim().length > 2000)
    errors.message = 'Message is too long (max 2000 chars).';

  return errors;
}

/* ─── Component ──────────────────────────────────────────────── */
export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverErr, setServerErr] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [charCount, setCharCount] = useState(0);
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);

  /* Live-validate a single field on blur */
  const handleBlur = (field: string, value: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const name = field === 'name' ? value : (formRef.current?.elements.namedItem('name') as HTMLInputElement)?.value ?? '';
    const email = field === 'email' ? value : (formRef.current?.elements.namedItem('email') as HTMLInputElement)?.value ?? '';
    const message = field === 'message' ? value : (formRef.current?.elements.namedItem('message') as HTMLTextAreaElement)?.value ?? '';
    setErrors(validate(name, email, message));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const type = (form.elements.namedItem('type') as HTMLInputElement | null)?.value ?? '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const honey = (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';

    /* Mark all touched so errors show */
    setTouched({ name: true, email: true, message: true });
    const errs = validate(name, email, message);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    setServerErr('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, projectType: type, message,
          honeypot: honey, // bot trap
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus('sent');
        form.reset();
        setCharCount(0);
        setTouched({});
        setErrors({});
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setServerErr(json.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setServerErr('Network error. Check your connection and try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  /* ── shared class helpers ── */
  const fieldClass = (field: keyof FieldErrors) =>
    `form-input ${touched[field] && errors[field] ? 'border-[#ff5f57] focus:border-[#ff5f57] focus:shadow-[0_0_0_3px_rgba(255,95,87,0.15)]' : ''}`;

  const contactInfo = [
    { label: 'Email', value: 'ompatilbuilds@gmail.com', href: 'mailto:ompatilbuilds@gmail.com', isLink: true },
    { label: 'Location', value: 'India — Remote Friendly', isLink: false },
    { label: 'Availability', value: '● Open for projects', isLink: false, accent: true },
  ];

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2"
      id="contact"
      aria-labelledby="contact-heading"
    >
      {/* ── Left — Info ── */}
      <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-[#1e1e1e]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="accent-line" aria-hidden="true" />
          <h2
            id="contact-heading"
            className="font-syne text-[clamp(2.5rem,5vw,4.2rem)] font-extrabold leading-none tracking-tighter mb-8"
          >
            Let&apos;s
            <br />
            <span className="text-neon">Build</span>
            <br />
            <span className="text-outline" aria-label="Together.">Together.</span>
          </h2>

          <p className="text-[#666666] text-[0.83rem] leading-[1.9] max-w-[380px] mb-12">
            Have a project in mind? I&apos;m currently available for freelance work. Let&apos;s
            discuss what you need and how I can help bring it to life.
          </p>

          {/* Contact details */}
          <div className="flex flex-col" role="list">
            {contactInfo.map(({ label, value, href, isLink, accent }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 py-5 border-t border-[#1e1e1e] group"
                role="listitem"
              >
                <span className="text-[0.6rem] text-[#666666] tracking-[0.2em] uppercase">{label}</span>
                {isLink ? (
                  <a
                    href={href}
                    className="text-[0.9rem] text-[#f0f0f0] hover:text-[#c8ff00] transition-colors duration-200"
                    aria-label={`Send email to ${value}`}
                  >
                    {value}
                  </a>
                ) : (
                  <span className={`text-[0.9rem] ${accent ? 'text-[#c8ff00]' : 'text-[#f0f0f0]'}`}>
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-[#1e1e1e]">
            {[
              { label: 'GitHub', href: 'https://github.com/Ompatil124' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/om-patil-b5866a356' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.68rem] tracking-widest uppercase text-[#666666] hover:text-[#c8ff00] transition-colors duration-200 py-1.5 px-3 border border-[#1e1e1e] hover:border-[rgba(200,255,0,0.3)]"
                aria-label={`Visit my ${label} profile`}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right — Form ── */}
      <div className="p-10 md:p-14 bg-[#111111]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-syne font-bold text-lg mb-2 text-[#f0f0f0]">Send a Message</h3>
          <p className="text-[0.7rem] text-[#666666] mb-8 tracking-wide">
            All fields marked <span className="text-[#ff5f57]">*</span> are required.
            Genuine messages only — spam is automatically filtered.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
            aria-label="Contact form"
          >
            {/* ── Honeypot — hidden from humans, visible to bots ── */}
            <div aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
              <label htmlFor={`${id}-website`}>Website (leave blank)</label>
              <input
                id={`${id}-website`}
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${id}-name`} className="text-[0.62rem] tracking-[0.18em] uppercase text-[#666666]">
                  Your Name <span className="text-[#ff5f57]" aria-label="required">*</span>
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  required
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  maxLength={80}
                  className={fieldClass('name')}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  aria-describedby={errors.name && touched.name ? `${id}-name-err` : undefined}
                  aria-invalid={!!(errors.name && touched.name)}
                />
                <AnimatePresence>
                  {errors.name && touched.name && (
                    <motion.p
                      id={`${id}-name-err`}
                      role="alert"
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-[#ff5f57] text-[0.62rem] tracking-wide"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${id}-email`} className="text-[0.62rem] tracking-[0.18em] uppercase text-[#666666]">
                  Email <span className="text-[#ff5f57]" aria-label="required">*</span>
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  required
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  className={fieldClass('email')}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  aria-describedby={errors.email && touched.email ? `${id}-email-err` : undefined}
                  aria-invalid={!!(errors.email && touched.email)}
                />
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.p
                      id={`${id}-email-err`}
                      role="alert"
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-[#ff5f57] text-[0.62rem] tracking-wide"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Project Type (optional) */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${id}-type`} className="text-[0.62rem] tracking-[0.18em] uppercase text-[#666666]">
                Project Type <span className="text-[#666666] text-[0.55rem]">(optional)</span>
              </label>
              <input
                id={`${id}-type`}
                name="type"
                type="text"
                placeholder="e.g. E-commerce, SaaS, Landing Page..."
                maxLength={100}
                className="form-input"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor={`${id}-message`} className="text-[0.62rem] tracking-[0.18em] uppercase text-[#666666]">
                  Message <span className="text-[#ff5f57]" aria-label="required">*</span>
                </label>
                <span className={`text-[0.6rem] tabular-nums ${charCount > 1800 ? 'text-[#ff5f57]' : 'text-[#666666]'}`}>
                  {charCount}/2000
                </span>
              </div>
              <textarea
                id={`${id}-message`}
                name="message"
                required
                placeholder="Describe what you need, timeline, and any other details..."
                maxLength={2000}
                style={{ resize: 'none', minHeight: '130px' }}
                className={fieldClass('message')}
                onChange={(e) => setCharCount(e.target.value.length)}
                onBlur={(e) => handleBlur('message', e.target.value)}
                aria-describedby={errors.message && touched.message ? `${id}-msg-err` : undefined}
                aria-invalid={!!(errors.message && touched.message)}
              />
              <AnimatePresence>
                {errors.message && touched.message && (
                  <motion.p
                    id={`${id}-msg-err`}
                    role="alert"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-[#ff5f57] text-[0.62rem] tracking-wide"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Server error banner */}
            <AnimatePresence>
              {serverErr && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-3 p-3 border border-[#ff5f57] bg-[rgba(255,95,87,0.06)] text-[#ff5f57] text-[0.72rem] leading-relaxed"
                >
                  <span aria-hidden="true" className="mt-0.5 shrink-0">⚠</span>
                  {serverErr}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full p-4 font-syne font-bold text-[0.88rem] tracking-wider transition-all duration-300 overflow-hidden btn-magnetic ${status === 'sent'
                ? 'bg-[#7ee787] text-black cursor-default'
                : status === 'error'
                  ? 'bg-[#ff5f57] text-white cursor-not-allowed'
                  : status === 'sending'
                    ? 'bg-[#c8ff00]/60 text-black cursor-not-allowed'
                    : 'bg-[#c8ff00] text-black hover:bg-white hover:-translate-y-0.5'
                }`}
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Send Message →
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span key="sending" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      Sending...
                    </span>
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Message Sent ✓
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span key="error" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Failed — check the form above ✕
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className="text-[0.6rem] text-[#3a3a3a] text-center tracking-wide">
              🔒 Submissions are rate-limited and spam-filtered. Your data is never shared.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
