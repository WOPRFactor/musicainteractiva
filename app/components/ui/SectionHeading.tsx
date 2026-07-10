import React from 'react';

type Accent = 'lime' | 'pink' | 'cyan' | 'orange';

const accentText: Record<Accent, string> = {
  lime: 'text-lime',
  pink: 'text-pink',
  cyan: 'text-cyan',
  orange: 'text-orange',
};

/**
 * Encabezado de sección con eyebrow en mayúsculas + título display.
 * El children del título permite resaltar una palabra en serif itálica
 * (la firma tipográfica del rediseño).
 */
export default function SectionHeading({
  eyebrow,
  accent = 'lime',
  children,
  className = '',
}: {
  eyebrow?: string;
  accent?: Accent;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <div className={`mb-4 text-xs font-semibold uppercase tracking-[0.22em] ${accentText[accent]}`}>
          {eyebrow}
        </div>
      )}
      <h2 className="max-w-[18ch] font-display text-[clamp(34px,5vw,64px)] font-bold leading-none tracking-tight text-balance">
        {children}
      </h2>
    </div>
  );
}

/** Palabra resaltada en serif itálica dentro de un título. */
export function Accented({
  children,
  accent = 'lime',
}: {
  children: React.ReactNode;
  accent?: Accent;
}) {
  return <span className={`font-serif font-normal italic ${accentText[accent]}`}>{children}</span>;
}
