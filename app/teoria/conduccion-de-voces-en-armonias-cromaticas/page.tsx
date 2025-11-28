import React from 'react';
import Navbar from '../../components/Navbar';

export default function ConduccionDeVocesEnArmoniasCromaticasPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-purple-800 tracking-tight">Conducción de Voces en Armonías Cromáticas</h1>
        <section id="introduccion" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">¿Qué es la conducción de voces en armonías cromáticas?</h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="tipos" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">Tipos y reglas</h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="ejemplos" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">Ejemplos y análisis</h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
        <section id="ejercicios" className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">Ejercicios prácticos</h2>
          <hr className="border-t-2 border-purple-200 mb-4" />
        </section>
      </div>
    </main>
  );
} 