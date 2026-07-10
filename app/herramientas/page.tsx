import React from 'react';
import Link from 'next/link';

const herramientas = [
  {
    name: 'Metrónomo',
    path: '/herramientas/metronomo',
    description: 'Metrónomo avanzado con múltiples compases, subdivisiones y tipos de sonido. Ideal para practicar con precisión rítmica.',
    icon: '⏱️',
    disponible: true,
  },
  {
    name: 'Mapa de Beats',
    path: '/herramientas/mapa-de-beats',
    description: 'Visualiza y crea patrones rítmicos personalizados. Configura acentos y métricas para diferentes compases.',
    icon: '🥁',
    disponible: true,
  },
  {
    name: 'Nota Pedal',
    path: '/herramientas/nota-pedal',
    description: 'Genera secuencias musicales con nota pedal. Experimenta con diferentes grados y acordes sobre una nota base.',
    icon: '🎹',
    disponible: true,
  },
  {
    name: 'Afinador',
    path: '/herramientas/afinador',
    description: 'Afinador de instrumentos con detección de frecuencia. Próximamente disponible.',
    icon: '🎵',
    disponible: false,
  },
  {
    name: 'Batería',
    path: '/herramientas/bateria',
    description: 'Batería virtual interactiva. Próximamente disponible.',
    icon: '🥁',
    disponible: false,
  },
];

export default function HerramientasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Herramientas Musicales
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600 sm:text-lg md:text-xl">
            Utiliza nuestras herramientas interactivas para mejorar tu práctica musical y comprensión de la teoría.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {herramientas.map((herramienta, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
                !herramienta.disponible ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{herramienta.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-purple-800">
                    {herramienta.name}
                  </h2>
                  {!herramienta.disponible && (
                    <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded">
                      Próximamente
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                {herramienta.description}
              </p>
              {herramienta.disponible ? (
                <Link
                  href={herramienta.path}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
                >
                  Usar herramienta →
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed text-sm font-medium"
                >
                  No disponible
                </button>
              )}
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

