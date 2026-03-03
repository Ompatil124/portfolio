import type { Metadata, Viewport } from 'next';
import { Syne, DM_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  title: 'Om Patil — Full Stack Developer',
  description:
    'Full stack developer specializing in fast, scalable web applications. From pixel-perfect frontends to robust APIs — turning complex problems into clean, maintainable code.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Freelance'],
  authors: [{ name: 'Om Patil' }],
  openGraph: {
    title: 'Om Patil — Full Stack Developer',
    description:
      'Full stack developer specializing in fast, scalable web applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} scroll-smooth`}>
      <body
        suppressHydrationWarning
        className="font-mono"
        style={{ backgroundColor: 'var(--clr-bg)', color: 'var(--clr-text)' }}
      >
        {/* Skip to main for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Grain overlay */}
        <div className="grain" aria-hidden="true" />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
