import React from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';

const subtemas = [
  { name: 'Altura (Pitch)', anchor: '#pitch' },
  { name: 'Notación', anchor: '#notacion' },
  { name: 'Registros de Octava', anchor: '#octava' },
  { name: 'Alteraciones', anchor: '#alteraciones' },
  { name: 'Notas Enarmónicas', anchor: '#enarmonicas' },
  { name: 'Ejercicios Prácticos', anchor: '#ejercicios' },
];

export default function ConceptosBasicosPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <div className="w-full flex justify-start px-4 pt-4">
        <Link href="/teoria/numeros-romanos-cadencias" className="text-purple-700 font-semibold underline hover:text-purple-900 transition-colors text-base md:text-lg">
          Ir a Números Romanos y Cadencias
        </Link>
      </div>
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
        <h1 className="text-4xl font-extrabold mb-8 text-purple-800 tracking-tight">Conceptos Básicos</h1>
        <section id="pitch" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Altura (Pitch)
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="notacion" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Notación
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="octava" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Registros de Octava
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="alteraciones" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Alteraciones
          </h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="enarmonicas" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span className="text-lg">●</span> Notas Enarmónicas
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