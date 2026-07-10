import React from 'react';

/**
 * Card base EMION: fondo con gradiente sutil y borde de acento opcional.
 * `accent` tiñe el borde con uno de los colores de la paleta.
 */
type Accent = 'lime' | 'pink' | 'cyan' | 'orange' | 'neutral';

const accentBorder: Record<Accent, string> = {
  lime: 'border-[rgba(207,245,75,0.22)]',
  pink: 'border-[rgba(255,84,112,0.18)]',
  cyan: 'border-[rgba(86,225,233,0.18)]',
  orange: 'border-[rgba(255,159,69,0.18)]',
  neutral: 'border-line',
};

export default function Card({
  accent = 'neutral',
  className = '',
  children,
}: {
  accent?: Accent;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border bg-[linear-gradient(160deg,#17131F,#120F1A)] p-[30px] ${accentBorder[accent]} ${className}`}
    >
      {children}
    </div>
  );
}
