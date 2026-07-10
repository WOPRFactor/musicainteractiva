import dynamic from 'next/dynamic';
import React from 'react';
import type { Metadata } from 'next';
import { Accented } from '../components/ui/SectionHeading';

// El componente usa Web Audio API y refs al DOM: se carga solo en cliente.
const Instrumento = dynamic(() => import('../components/instrumento_migrado/Instrumento'), {
  ssr: false,
  loading: () => <p className="text-ink-3">Cargando tu instrumento…</p>,
});

export const metadata: Metadata = {
  title: 'Tu instrumento · EMION',
  description:
    'Diapasón interactivo para guitarra y bajo: escalas (CAGED, 3 notas por cuerda, pentatónicas), acordes, afinaciones y metrónomo integrado.',
};

export default function InstrumentoPage() {
  return (
    <main className="px-[clamp(20px,5vw,72px)] py-[clamp(48px,7vw,88px)]">
      <div className="mx-auto max-w-content">
        <div className="mb-2 text-xs uppercase tracking-[0.22em] text-lime">Tu instrumento · en vivo</div>
        <h1 className="max-w-[20ch] font-display text-[clamp(34px,5vw,64px)] font-bold leading-none tracking-tight text-balance">
          El diapasón se enciende <Accented accent="cyan">mientras</Accented> tocás
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-2">
          Elegí instrumento, escala o acorde y mirá cómo se dibuja en el mástil. Incluye sistemas CAGED,
          tres notas por cuerda, pentatónicas, afinaciones alternativas y un metrónomo integrado.
        </p>

        <div className="mt-10 rounded-[24px] border border-line bg-panel p-[clamp(16px,3vw,32px)]">
          <Instrumento />
        </div>
      </div>
    </main>
  );
}
