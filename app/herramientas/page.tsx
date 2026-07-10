import React from 'react';
import Link from 'next/link';
import { Accented } from '../components/ui/SectionHeading';
import { ButtonLink } from '../components/ui/Button';

const herramientas = [
  {
    name: 'Metrónomo',
    path: '/herramientas/metronomo',
    description:
      'Metrónomo avanzado con múltiples compases, subdivisiones y tipos de sonido. Ideal para practicar con precisión rítmica.',
    icon: '⏱️',
    accent: '#CFF54B',
    disponible: true,
  },
  {
    name: 'Mapa de Beats',
    path: '/herramientas/mapa-de-beats',
    description:
      'Visualizá y creá patrones rítmicos personalizados. Configurá acentos y métricas para diferentes compases.',
    icon: '🥁',
    accent: '#FF5470',
    disponible: true,
  },
  {
    name: 'Nota Pedal',
    path: '/herramientas/nota-pedal',
    description:
      'Generá secuencias musicales con nota pedal. Experimentá con distintos grados y acordes sobre una nota base.',
    icon: '🎹',
    accent: '#56E1E9',
    disponible: true,
  },
  {
    name: 'Afinador',
    path: '/herramientas/afinador',
    description: 'Afinador de instrumentos con detección de frecuencia.',
    icon: '🎵',
    accent: '#FF9F45',
    disponible: false,
  },
  {
    name: 'Batería',
    path: '/herramientas/bateria',
    description: 'Batería virtual interactiva y caja de ritmos.',
    icon: '🥁',
    accent: '#9A94AD',
    disponible: false,
  },
];

export default function HerramientasPage() {
  return (
    <main className="px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,110px)]">
      <div className="mx-auto max-w-content">
        <div className="mb-[clamp(40px,6vw,72px)] max-w-[52ch]">
          <div className="mb-4 text-xs uppercase tracking-[0.22em] text-pink">Herramientas</div>
          <h1 className="font-display text-[clamp(34px,5vw,64px)] font-bold leading-none tracking-tight text-balance">
            Instrumentos que <Accented accent="pink">responden</Accented>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Herramientas interactivas para mejorar tu práctica y tu comprensión de la teoría.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {herramientas.map((h) => (
            <div
              key={h.name}
              className={`flex flex-col rounded-[18px] border border-line bg-panel p-6 ${
                h.disponible ? '' : 'opacity-70'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-[14px] text-2xl"
                  style={{ background: `${h.accent}1f` }}
                >
                  {h.icon}
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold" style={{ color: h.accent }}>
                    {h.name}
                  </h2>
                  {!h.disponible && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                      Próximamente
                    </span>
                  )}
                </div>
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-ink-2">{h.description}</p>
              {h.disponible ? (
                <ButtonLink href={h.path} size="md" className="self-start">
                  Usar herramienta →
                </ButtonLink>
              ) : (
                <span className="self-start rounded-pill border border-line px-4 py-2 text-sm text-ink-4">
                  Pronto
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
