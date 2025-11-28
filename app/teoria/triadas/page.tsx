import React from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';

const subtemas = [
  { name: 'Introducción a las Triadas', anchor: '#introduccion' },
  { name: 'Símbolos de Cifrado', anchor: '#cifrado' },
  { name: 'Triadas Invertidas', anchor: '#invertidas' },
  { name: 'Análisis de Acordes', anchor: '#analisis' },
  { name: 'Acordes "Sus" Simples', anchor: '#sus' },
  { name: 'Resumen', anchor: '#resumen' },
  { name: 'Ejercicios Prácticos', anchor: '#ejercicios' },
];

export default function TriadasPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <div className="relative w-full">
        <nav className="w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg px-2 py-2 flex items-center gap-2 sticky top-0 z-20 rounded-b-md overflow-x-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
          <Link
            href="/"
            className="flex items-center justify-center text-white font-bold px-3 py-1 rounded hover:bg-purple-700 transition-colors whitespace-nowrap text-lg mr-4 min-w-[44px]"
            title="Inicio"
          >
            <AiFillHome className="text-2xl" />
          </Link>
          <div className="flex-1 flex flex-nowrap gap-3 justify-start min-w-0">
            {subtemas.map((sub) => (
              <a
                key={sub.anchor}
                href={sub.anchor}
                className="text-white hover:bg-purple-700 px-4 py-1 rounded text-xs md:text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap max-w-[160px] md:max-w-[200px] overflow-hidden text-ellipsis text-center"
                title={sub.name}
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                {sub.name}
              </a>
            ))}
          </div>
          {/* Gradiente para indicar scroll horizontal */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-blue-600/80 to-transparent" />
        </nav>
      </div>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-purple-800 tracking-tight">Triadas</h1>
        <section id="introduccion" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Introducción a las Triadas
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="cifrado" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Símbolos de Cifrado
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="invertidas" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Triadas Invertidas
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="analisis" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Análisis de Acordes
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="sus" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Acordes "Sus" Simples
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="resumen" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Resumen
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="ejercicios" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Ejercicios Prácticos
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
      </div>
    </main>
  );
} 