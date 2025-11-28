'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const armoniaCategorias = [
  {
    name: 'Fundamentos y Conceptos Básicos',
    temas: [
      'Conceptos Básicos',
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

const menuItems = [
  { name: 'Inicio', path: '/', submenu: ['Bienvenida', 'Novedades'] },
  { name: 'Quienes Somos', path: '/quienes-somos', submenu: ['Historia', 'Equipo'] },
  { name: 'Teoría', path: '/teoria', submenu: ['Notas', 'Escalas', 'Intervalos'] },
  { name: 'Armonía', path: '/armonia' },
  { name: 'Composición', path: '/composicion', submenu: ['Técnicas', 'Ejercicios'] },
  { name: 'Entrenamiento', path: '/entrenamiento', submenu: ['Auditivo', 'Rítmico'] },
  { name: 'Tu Instrumento', path: '/tu-instrumento', submenu: ['Guitarra', 'Piano', 'Voz'] },
  { name: 'Herramientas', path: '/herramientas', submenu: [
    { name: 'Metrónomo', path: '/herramientas/metronomo' },
    { name: 'Afinador', path: '/herramientas/afinador' },
    { name: 'Batería', path: '/herramientas/bateria' },
    { name: 'Mapa de Beats', path: '/herramientas/mapa-de-beats' },
    { name: 'Nota Pedal', path: '/herramientas/nota-pedal' },
  ] },
  { name: 'Cursos Intensivos', path: '/cursos-intensivos' },
];

function slugify(str: string) {
  // Elimina acentos y diacríticos de forma compatible universal
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina diacríticos
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '');
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [categoriaHovered, setCategoriaHovered] = useState<number | null>(null);
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Funciones para manejar el delay
  const handleCategoriaEnter = (catIdx: number) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setCategoriaHovered(catIdx);
  };
  const handleCategoriaLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setCategoriaHovered(null);
    }, 200); // 200ms de delay
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src="/logo-emion.png" alt="EMION" className="h-10 w-auto" style={{ maxHeight: '40px' }} />
            </div>
          </div>
          {/* Desktop Menu centrado */}
          <div className="flex-1 flex justify-center items-baseline space-x-4">
            {menuItems.map((item, idx) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => { setHoveredIndex(null); setCategoriaHovered(null); }}
              >
                {item.name === 'Armonía' || item.name === 'Teoría' ? (
                  <span className="text-white px-3 py-2 rounded-md text-xs font-medium cursor-default opacity-70">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-xs font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
                {/* Mega menú para Teoría */}
                {item.name === 'Teoría' && hoveredIndex === idx && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-2xl z-50 p-2 block">
                    {teoriaCategorias.map((cat, catIdx) => (
                      <div
                        key={cat.name}
                        className="relative group"
                        onMouseEnter={() => handleCategoriaEnter(catIdx)}
                        onMouseLeave={handleCategoriaLeave}
                      >
                        <div className="px-2 py-1 font-semibold text-gray-800 hover:bg-purple-100 rounded cursor-pointer text-sm flex items-center justify-between">
                          {cat.name}
                        </div>
                        {/* Submenú de temas */}
                        {categoriaHovered === catIdx && (
                          <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-xl z-40 p-2 animate-fade-in">
                            {cat.temas.map((tema, temaIdx) => (
                              <Link
                                key={temaIdx}
                                href={`/teoria/${slugify(tema)}`}
                                className="px-2 py-1 text-gray-700 hover:bg-purple-100 rounded cursor-pointer text-sm block"
                              >
                                {tema}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {/* Submenú especial para Armonía */}
                {false && item.name === 'Armonía' && hoveredIndex === idx && Array.isArray(item.submenu) && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-2xl z-30 p-2 animate-fade-in">
                    {/* Eliminado: submenús de Armonía */}
                  </div>
                )}
                {/* Submenús normales */}
                {item.name !== 'Armonía' && item.name !== 'Teoría' && item.submenu && hoveredIndex === idx && Array.isArray(item.submenu) && (
                  <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20 animate-fade-in">
                    {item.name === 'Herramientas'
                      ? item.submenu.map((sub, subIdx) => (
                          <Link
                            key={subIdx}
                            href={sub.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-100 rounded text-sm"
                          >
                            {sub.name}
                          </Link>
                        ))
                      : item.submenu.map((sub, subIdx) => (
                          <a
                            key={subIdx}
                            href="#"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-100 rounded text-sm"
                          >
                            {sub}
                          </a>
                        ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu (sin submenú anidado por ahora) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, idx) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.path}
                  className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 