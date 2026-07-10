import React from 'react';
import Link from 'next/link';
import Logo from './ui/Logo';

const columns: { title: string; accent: string; links: { name: string; href: string }[] }[] = [
  {
    title: 'Aprender',
    accent: 'text-cyan',
    links: [
      { name: 'Teoría', href: '/teoria' },
      { name: 'Tu instrumento', href: '/instrumento' },
    ],
  },
  {
    title: 'Herramientas',
    accent: 'text-pink',
    links: [
      { name: 'Metrónomo', href: '/herramientas/metronomo' },
      { name: 'Nota Pedal', href: '/herramientas/nota-pedal' },
      { name: 'Mapa de Beats', href: '/herramientas/mapa-de-beats' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-emion grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-6 gap-y-10 pb-10 pt-[clamp(48px,6vw,72px)]">
        <div className="col-span-full max-w-[320px]">
          <div className="mb-4">
            <Logo />
          </div>
          <p className="text-sm leading-relaxed text-ink-4">
            Escuela de Música Interactiva. Teoría, armonía y práctica, hechas para escucharse.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className={`mb-4 text-xs uppercase tracking-[0.16em] ${col.accent}`}>{col.title}</div>
            <div className="flex flex-col gap-[10px] text-sm">
              {col.links.map((l) => (
                <Link key={l.name} href={l.href} className="text-ink-2 transition-colors hover:text-ink">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container-emion flex flex-wrap justify-between gap-3 border-t border-[rgba(244,241,234,0.06)] py-6 text-[13px] text-ink-4">
        <span>© {new Date().getFullYear()} EMION · Escuela de Música Interactiva</span>
        <span>Hecho con oído en Argentina</span>
      </div>
    </footer>
  );
}
