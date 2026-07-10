import React from 'react';
import Link from 'next/link';
import { Accented } from '../components/ui/SectionHeading';

const accents = ['#CFF54B', '#56E1E9', '#FF5470', '#FF9F45', '#CFF54B', '#56E1E9'];

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
    .replace(/[̀-ͯ]/g, '')
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '');
}

export default function TeoriaPage() {
  return (
    <main className="px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,110px)]">
      <div className="mx-auto max-w-content">
        <div className="mb-[clamp(40px,6vw,72px)] max-w-[52ch]">
          <div className="mb-4 text-xs uppercase tracking-[0.22em] text-cyan">Teoría · 36 capítulos</div>
          <h1 className="font-display text-[clamp(34px,5vw,64px)] font-bold leading-none tracking-tight text-balance">
            De la primera nota al <Accented accent="cyan">serialismo</Accented>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Contenidos organizados por categoría, de los conceptos básicos a las técnicas avanzadas de jazz y
            música contemporánea.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teoriaCategorias.map((categoria, i) => (
            <div
              key={categoria.name}
              className="rounded-[18px] border border-line bg-panel p-6 transition-colors hover:border-[rgba(244,241,234,0.2)]"
            >
              <h2
                className="mb-4 border-b border-line pb-3 font-display text-lg font-bold"
                style={{ color: accents[i % accents.length] }}
              >
                {categoria.name}
              </h2>
              <ul className="flex flex-col gap-1">
                {categoria.temas.map((tema) => (
                  <li key={tema}>
                    <Link
                      href={`/teoria/${slugify(tema)}`}
                      className="block rounded py-1 text-sm text-ink-2 transition-colors hover:text-lime"
                    >
                      {tema}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
