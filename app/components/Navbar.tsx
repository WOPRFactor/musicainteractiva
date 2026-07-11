'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './ui/Logo';
import AccountNav from './AccountNav';

/**
 * Enlaces principales. `soon: true` marca secciones aún no construidas
 * (se muestran deshabilitadas en vez de romper con un 404).
 */
const links: { name: string; href: string; soon?: boolean }[] = [
  { name: 'Teoría', href: '/teoria' },
  { name: 'Tu instrumento', href: '/instrumento' },
  { name: 'Herramientas', href: '/herramientas' },
  { name: 'Cursos', href: '/cursos', soon: true },
];

function SoonTag() {
  return (
    <span className="ml-1 rounded-pill bg-[rgba(244,241,234,0.08)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-ink-4">
      Pronto
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] border-b border-line bg-[rgba(11,10,20,0.72)] backdrop-blur-[14px]">
      <div className="container-emion flex items-center justify-between py-[18px]">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) =>
            l.soon ? (
              <span
                key={l.name}
                className="flex cursor-default items-center text-sm font-medium text-ink-4"
                title="Próximamente"
              >
                {l.name}
                <SoonTag />
              </span>
            ) : (
              <Link
                key={l.name}
                href={l.href}
                className="text-sm font-medium text-ink-2 transition-colors hover:text-ink"
              >
                {l.name}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:block">
          <AccountNav />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink hover:bg-[rgba(244,241,234,0.06)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) =>
              l.soon ? (
                <span
                  key={l.name}
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-ink-4"
                >
                  {l.name}
                  <SoonTag />
                </span>
              ) : (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-ink-2 hover:bg-[rgba(244,241,234,0.06)] hover:text-ink"
                >
                  {l.name}
                </Link>
              )
            )}
            <div className="mt-3">
              <AccountNav stacked onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
