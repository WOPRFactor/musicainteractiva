import React from 'react';
import Link from 'next/link';

const subtemas = [
  { name: 'Introducción a los Acordes de Séptima', anchor: '#introduccion' },
  { name: 'Tipos de Acordes de Séptima', anchor: '#tipos' },
  { name: 'Uso en Progresiones', anchor: '#uso' },
  { name: 'Ejercicios Prácticos', anchor: '#ejercicios' },
];

export default function AcordesSeptimaPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <nav className="w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg px-4 py-2 flex items-center gap-4 sticky top-0 z-20 rounded-b-md">
        <Link href="/" className="text-white font-bold px-3 py-1 rounded hover:bg-purple-700 transition-colors">Inicio</Link>
        <div className="flex-1 flex flex-wrap gap-2 justify-center">
          {subtemas.map((sub) => (
            <a
              key={sub.anchor}
              href={sub.anchor}
              className="text-white hover:bg-purple-700 px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
            >
              {sub.name}
            </a>
          ))}
        </div>
      </nav>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4 text-purple-800">Acordes de Séptima</h1>
        <section id="introduccion" className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Introducción a los Acordes de Séptima</h2>
        </section>
        <section id="tipos" className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Tipos de Acordes de Séptima</h2>
        </section>
        <section id="uso" className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Uso en Progresiones</h2>
        </section>
        <section id="ejercicios" className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Ejercicios Prácticos</h2>
        </section>
      </div>
    </main>
  );
} 