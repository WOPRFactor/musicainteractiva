import React from 'react';
import Link from 'next/link';

/**
 * Isotipo EMION: cuatro barras tipo ecualizador + wordmark.
 * Tomado del rediseño (mockup).
 */
export default function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 text-ink">
      <span className="inline-flex h-[22px] items-end gap-[3px]" aria-hidden="true">
        <span className="w-[3px] rounded-sm bg-lime" style={{ height: 9 }} />
        <span className="w-[3px] rounded-sm bg-pink" style={{ height: 22 }} />
        <span className="w-[3px] rounded-sm bg-cyan" style={{ height: 14 }} />
        <span className="w-[3px] rounded-sm bg-lime" style={{ height: 20 }} />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight">EMION</span>
    </Link>
  );
}
