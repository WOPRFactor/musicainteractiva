import React from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';

const subtemas = [
  { name: 'Introducción a los Intervalos', anchor: '#introduccion' },
  { name: 'Cómo Identificar Intervalos Justos, Mayores y Menores', anchor: '#identificar' },
  { name: 'Cómo Escribir Intervalos Justos, Mayores y Menores', anchor: '#escribir' },
  { name: 'Explicación de la Inversión de Intervalos', anchor: '#inversion' },
  { name: 'Intervalos Aumentados y Disminuidos', anchor: '#aumentados' },
  { name: 'Ejercicios Prácticos', anchor: '#ejercicios' },
];

export default function IntervalosPage() {
  return (
    <main className="w-full min-h-screen bg-transparent">
      <div className="relative w-full">
        <nav className="w-full bg-panel-2 border border-line shadow-lg px-2 py-2 flex items-center gap-2 sticky top-0 z-20 rounded-b-md overflow-x-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
          <Link
            href="/"
            className="flex items-center justify-center text-white font-bold px-3 py-1 rounded hover:bg-[rgba(244,241,234,0.08)] transition-colors whitespace-nowrap text-lg mr-4 min-w-[44px]"
            title="Inicio"
          >
            <AiFillHome className="text-2xl" />
          </Link>
          <div className="flex-1 flex flex-nowrap gap-3 justify-start min-w-0">
            {subtemas.map((sub) => (
              <a
                key={sub.anchor}
                href={sub.anchor}
                className="text-white hover:bg-[rgba(244,241,234,0.08)] px-4 py-1 rounded text-xs md:text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap max-w-[160px] md:max-w-[200px] overflow-hidden text-ellipsis text-center"
                title={sub.name}
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                {sub.name}
              </a>
            ))}
          </div>
          {/* Gradiente para indicar scroll horizontal */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-bg to-transparent" />
        </nav>
      </div>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-ink tracking-tight">Intervalos</h1>
        <section id="introduccion" className="mb-12">
          <h2 className="text-2xl font-bold text-lime mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Introducción a los Intervalos
          </h2>
          <hr className="border-t-2 border-line mb-4" />
        </section>
        <section id="identificar" className="mb-12">
          <h2 className="text-2xl font-bold text-lime mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Cómo Identificar Intervalos Justos, Mayores y Menores
          </h2>
          <hr className="border-t-2 border-line mb-4" />
        </section>
        <section id="escribir" className="mb-12">
          <h2 className="text-2xl font-bold text-lime mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Cómo Escribir Intervalos Justos, Mayores y Menores
          </h2>
          <hr className="border-t-2 border-line mb-4" />
        </section>
        <section id="inversion" className="mb-12">
          <h2 className="text-2xl font-bold text-lime mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Explicación de la Inversión de Intervalos
          </h2>
          <hr className="border-t-2 border-line mb-4" />
        </section>
        <section id="aumentados" className="mb-12">
          <h2 className="text-2xl font-bold text-lime mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Intervalos Aumentados y Disminuidos
          </h2>
          <hr className="border-t-2 border-line mb-4" />
        </section>
        <section id="ejercicios" className="mb-12">
          <h2 className="text-2xl font-bold text-lime mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Ejercicios Prácticos
          </h2>
          <hr className="border-t-2 border-line mb-4" />
        </section>
      </div>
    </main>
  );
} 