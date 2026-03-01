import type {Metadata} from 'next';
import { Syne, DM_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Dev Portfolio | Full Stack Developer',
  description: 'Building fast, scalable web applications with a focus on clean code and great UX.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-[#f0f0f0] font-mono selection:bg-[#c8ff00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
