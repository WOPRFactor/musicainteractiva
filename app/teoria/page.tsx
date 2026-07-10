import React from 'react';
import Link from 'next/link';

const teoriaCategorias = [
  {
    name: 'Fundamentos y Conceptos Básicos',
    temas: [
      'Conceptos Básicos',
      'Escalas Mayores y Armaduras de Clave',
      'Escalas Menores y Armaduras de Clave',
      'Fundamentos del Ritmo',
      'Intervalos',
      'Triadas',
      'Números Romanos y Cadencias',
    ],
  },
  {
    name: 'Escalas y Tonalidad',
    temas: [
      'Escalas Mayores y Armaduras de Clave',
      'Escalas Menores y Armaduras de Clave',
      'Mezcla Modal',
      'Modulación',
      'Modulación Enarmónica',
    ],
  },
  {
    name: 'Acordes y Progresiones',
    temas: [
      'Acordes de Séptima',
      'Progresión y Función Armónica',
      'Acordes de Dominante Secundaria',
      'Acordes Disminuidos Secundarios',
      'El Acorde Napolitano',
      'Acordes de Sexta Aumentada',
    ],
  },
  {
    name: 'Ritmo, Notas de Paso y Texturas',
    temas: [
      'Fundamentos del Ritmo',
      'Notas de Paso (No Acordes)',
      'Texturas de Acompañamiento',
      'Creando Contraste Entre Secciones',
    ],
  },
  {
    name: 'Análisis y Formas Musicales',
    temas: [
      'Análisis Melódico',
      'Forma en la Música Popular',
      'Frases en Combinación',
      'Formas Binaria y Ternaria',
      'Formas Sonata y Rondo',
    ],
  },
  {
    name: 'Técnicas Avanzadas y Jazz',
    temas: [
      'Bajo Cifrado',
      'Conducción de Voces en Triadas',
      'Conducción de Voces en Acordes de Séptima',
      'Conducción de Voces con Notas de Paso',
      'Conducción de Voces en Armonías Cromáticas',
      'Introducción al Contrapunto',
      'Introducción a la Teoría del Jazz',
      'Impresionismo y Tonalidad Extendida',
      'Teoría de Conjuntos',
      'Serialismo',
      'Minimalismo',
    ],
  },
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '');
}

export default function TeoriaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Teoría Musical
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600 sm:text-lg md:text-xl">
            Explora nuestros contenidos organizados por categorías. Desde conceptos básicos hasta técnicas avanzadas de jazz y música contemporánea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teoriaCategorias.map((categoria, catIdx) => (
            <div
              key={catIdx}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <h2 className="text-xl font-bold text-purple-800 mb-4 pb-2 border-b-2 border-purple-200">
                {categoria.name}
              </h2>
              <ul className="space-y-2">
                {categoria.temas.map((tema, temaIdx) => {
                  const slug = slugify(tema);
                  return (
                    <li key={temaIdx}>
                      <Link
                        href={`/teoria/${slug}`}
                        className="text-gray-700 hover:text-purple-600 hover:underline transition-colors duration-200 block py-1"
                      >
                        {tema}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}


