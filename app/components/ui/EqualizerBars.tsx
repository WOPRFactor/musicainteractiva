'use client';

import React from 'react';

const palette = ['#FF5470', '#CFF54B', '#56E1E9', '#CFF54B', '#FF5470'];

/**
 * Barras de ecualizador animadas — el motivo "vivo" del rediseño.
 * Puramente decorativo; se detiene con prefers-reduced-motion.
 */
export default function EqualizerBars({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-[34px] items-end gap-1 ${className}`} aria-hidden="true">
      {palette.map((color, i) => (
        <span
          key={i}
          className="w-1 origin-bottom rounded-[3px]"
          style={{
            height: 34,
            background: color,
            animation: `eqBar ${0.6 + i * 0.12}s ease-in-out infinite ${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}
