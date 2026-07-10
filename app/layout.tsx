import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Serif, Space_Grotesk } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EMION · Escuela de Música Interactiva',
  description:
    'Teoría, armonía y práctica instrumental en una plataforma viva: fretboards que se encienden, metrónomos que respiran y ejercicios que suenan mientras aprendés.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
