'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  obtenerEscalaMayor,
  obtenerEscalaMenor,
  obtenerEscalaPentatonica,
  obtenerEscalaBlues,
  obtenerEscalasModales,
  obtenerAcordeMayor,
  obtenerAcordeMenor,
  obtenerAcordeSeptima,
  obtenerAcordeMenorSeptima,
  obtenerAcordeMayorSeptima,
  obtenerAcordeDisminuido,
  obtenerAcordeAumentado
} from './musicalTheory';
import { ejercicios } from './ejercicios';
import { afinaciones } from './afinaciones';
import EscalasNuevo from './EscalasNuevo';
import { useRouter } from 'next/navigation';

// Tipo para los sistemas de escalas
type SistemaEscala = 'caged' | 'tresPorCuerda' | 'pentatonica';

// Definición de secuencias para cada sistema de escala y posición
// Cada secuencia contiene pares [cuerda, traste] para visualizar en orden
type Posicion = [number, number]; // [cuerda, traste]
type SecuenciaEscala = Posicion[];

const secuenciasEscalas: Record<SistemaEscala, Record<string, SecuenciaEscala>> = {
  // Sistema CAGED - para cada forma (C, A, G, E, D)
  caged: {
    'C': [
      // Ascendente - de la 6ª cuerda (más grave) a la 1ª (más aguda)
      [6, 3], [6, 5],                   // 6ª cuerda
      [5, 3], [5, 5],                   // 5ª cuerda
      [4, 2], [4, 3], [4, 5],           // 4ª cuerda
      [3, 2], [3, 4], [3, 5],           // 3ª cuerda
      [2, 3], [2, 5], [2, 6],           // 2ª cuerda
      [1, 3], [1, 5], [1, 8],           // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 8], [1, 5], [1, 3],           // 1ª cuerda
      [2, 6], [2, 5], [2, 3],           // 2ª cuerda
      [3, 5], [3, 4], [3, 2],           // 3ª cuerda
      [4, 5], [4, 3], [4, 2],           // 4ª cuerda
      [5, 5], [5, 3],                   // 5ª cuerda
      [6, 5], [6, 3]                    // 6ª cuerda
    ],
    'A': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 5], [6, 7],                   // 6ª cuerda
      [5, 5], [5, 7],                   // 5ª cuerda
      [4, 5], [4, 7],                   // 4ª cuerda
      [3, 4], [3, 5], [3, 7],           // 3ª cuerda
      [2, 5], [2, 8],                   // 2ª cuerda
      [1, 5], [1, 7], [1, 8],           // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 8], [1, 7], [1, 5],           // 1ª cuerda
      [2, 8], [2, 5],                   // 2ª cuerda
      [3, 7], [3, 5], [3, 4],           // 3ª cuerda
      [4, 7], [4, 5],                   // 4ª cuerda
      [5, 7], [5, 5],                   // 5ª cuerda
      [6, 7], [6, 5]                    // 6ª cuerda
    ],
    'G': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 3], [6, 5],                   // 6ª cuerda
      [5, 2], [5, 3], [5, 5],           // 5ª cuerda
      [4, 2], [4, 5],                   // 4ª cuerda
      [3, 2], [3, 4],                   // 3ª cuerda
      [2, 3], [2, 5],                   // 2ª cuerda
      [1, 3], [1, 5],                   // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 5], [1, 3],                   // 1ª cuerda
      [2, 5], [2, 3],                   // 2ª cuerda
      [3, 4], [3, 2],                   // 3ª cuerda
      [4, 5], [4, 2],                   // 4ª cuerda
      [5, 5], [5, 3], [5, 2],           // 5ª cuerda
      [6, 5], [6, 3]                    // 6ª cuerda
    ],
    'E': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 0], [6, 3],                   // 6ª cuerda
      [5, 0], [5, 2],                   // 5ª cuerda
      [4, 0], [4, 2],                   // 4ª cuerda
      [3, 0], [3, 2],                   // 3ª cuerda
      [2, 0], [2, 3],                   // 2ª cuerda
      [1, 0], [1, 3],                   // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 3], [1, 0],                   // 1ª cuerda
      [2, 3], [2, 0],                   // 2ª cuerda
      [3, 2], [3, 0],                   // 3ª cuerda
      [4, 2], [4, 0],                   // 4ª cuerda
      [5, 2], [5, 0],                   // 5ª cuerda
      [6, 3], [6, 0]                    // 6ª cuerda
    ],
    'D': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 5], [6, 7],                   // 6ª cuerda
      [5, 5], [5, 7],                   // 5ª cuerda
      [4, 5], [4, 7],                   // 4ª cuerda
      [3, 5], [3, 7],                   // 3ª cuerda
      [2, 6], [2, 8],                   // 2ª cuerda
      [1, 5], [1, 7],                   // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 7], [1, 5],                   // 1ª cuerda
      [2, 8], [2, 6],                   // 2ª cuerda
      [3, 7], [3, 5],                   // 3ª cuerda
      [4, 7], [4, 5],                   // 4ª cuerda
      [5, 7], [5, 5],                   // 5ª cuerda
      [6, 7], [6, 5]                    // 6ª cuerda
    ]
  },
  // Sistema de 3 notas por cuerda - diferentes posiciones
  tresPorCuerda: {
    'Posición 1': [
      // Cuerda 6 (Mi grave)
      [6, 8], [6, 10], [6, 12],
      // Cuerda 5 (La)
      [5, 8], [5, 10], [5, 12],
      // Cuerda 4 (Re)
      [4, 7], [4, 9], [4, 10],
      // Cuerda 3 (Sol)
      [3, 7], [3, 9], [3, 10],
      // Cuerda 2 (Si)
      [2, 8], [2, 10], [2, 12],
      // Cuerda 1 (Mi agudo)
      [1, 8], [1, 10], [1, 12]
    ],
    'Posición 2': [
      // Cuerda 6 (Mi grave)
      [6, 3], [6, 5], [6, 7],
      // Cuerda 5 (La)
      [5, 3], [5, 5], [5, 7],
      // Cuerda 4 (Re)
      [4, 2], [4, 4], [4, 5],
      // Cuerda 3 (Sol)
      [3, 2], [3, 3], [3, 5],
      // Cuerda 2 (Si)
      [2, 3], [2, 5], [2, 7],
      // Cuerda 1 (Mi agudo)
      [1, 3], [1, 5], [1, 7]
    ],
    'Posición 3': [
      // Cuerda 6 (Mi grave)
      [6, 0], [6, 1], [6, 3],
      // Cuerda 5 (La)
      [5, 0], [5, 2], [5, 3],
      // Cuerda 4 (Re)
      [4, 0], [4, 2], [4, 3],
      // Cuerda 3 (Sol)
      [3, 0], [3, 2], [3, 4],
      // Cuerda 2 (Si)
      [2, 1], [2, 3], [2, 5],
      // Cuerda 1 (Mi agudo)
      [1, 0], [1, 1], [1, 3]
    ],
    'Posición 4': [
      // Cuerda 6 (Mi grave)
      [6, 3], [6, 5], [6, 7],
      // Cuerda 5 (La)
      [5, 3], [5, 5], [5, 7],
      // Cuerda 4 (Re)
      [4, 2], [4, 3], [4, 5],
      // Cuerda 3 (Sol)
      [3, 2], [3, 4], [3, 5],
      // Cuerda 2 (Si)
      [2, 3], [2, 5], [2, 7],
      // Cuerda 1 (Mi agudo)
      [1, 3], [1, 5], [1, 7]
    ],
    'Posición 5': [
      // Cuerda 6 (Mi grave)
      [6, 10], [6, 12], [6, 13],
      // Cuerda 5 (La)
      [5, 10], [5, 12], [5, 13],
      // Cuerda 4 (Re)
      [4, 9], [4, 10], [4, 12],
      // Cuerda 3 (Sol)
      [3, 9], [3, 11], [3, 12],
      // Cuerda 2 (Si)
      [2, 10], [2, 12], [2, 13],
      // Cuerda 1 (Mi agudo)
      [1, 10], [1, 12], [1, 13]
    ],
    'Posición 6': [
      // Cuerda 6 (Mi grave)
      [6, 12], [6, 13], [6, 15],
      // Cuerda 5 (La)
      [5, 12], [5, 13], [5, 15],
      // Cuerda 4 (Re)
      [4, 12], [4, 14], [4, 15],
      // Cuerda 3 (Sol)
      [3, 11], [3, 12], [3, 14],
      // Cuerda 2 (Si)
      [2, 12], [2, 13], [2, 15],
      // Cuerda 1 (Mi agudo)
      [1, 8], [1, 10], [1, 12]
    ],
    'Posición 7': [
      // Cuerda 6 (Mi grave)
      [6, 8], [6, 10], [6, 12],
      // Cuerda 5 (La)
      [5, 8], [5, 10], [5, 12],
      // Cuerda 4 (Re)
      [4, 7], [4, 9], [4, 10],
      // Cuerda 3 (Sol)
      [3, 7], [3, 9], [3, 10],
      // Cuerda 2 (Si)
      [2, 8], [2, 10], [2, 12],
      // Cuerda 1 (Mi agudo)
      [1, 8], [1, 10], [1, 12]
    ]
  },
  // Sistema de 5 posiciones para pentatónicas
  pentatonica: {
    'Posición 1': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 0], [6, 3],                   // 6ª cuerda
      [5, 0], [5, 3],                   // 5ª cuerda
      [4, 0], [4, 2],                   // 4ª cuerda
      [3, 0], [3, 2],                   // 3ª cuerda
      [2, 0], [2, 3],                   // 2ª cuerda
      [1, 0], [1, 3],                   // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 3], [1, 0],                   // 1ª cuerda
      [2, 3], [2, 0],                   // 2ª cuerda
      [3, 2], [3, 0],                   // 3ª cuerda
      [4, 2], [4, 0],                   // 4ª cuerda
      [5, 3], [5, 0],                   // 5ª cuerda
      [6, 3], [6, 0]                    // 6ª cuerda
    ],
    'Posición 2': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 3], [6, 5],                   // 6ª cuerda
      [5, 3], [5, 5],                   // 5ª cuerda
      [4, 2], [4, 5],                   // 4ª cuerda
      [3, 2], [3, 5],                   // 3ª cuerda
      [2, 3], [2, 5],                   // 2ª cuerda
      [1, 3], [1, 5],                   // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 5], [1, 3],                   // 1ª cuerda
      [2, 5], [2, 3],                   // 2ª cuerda
      [3, 5], [3, 2],                   // 3ª cuerda
      [4, 5], [4, 2],                   // 4ª cuerda
      [5, 5], [5, 3],                   // 5ª cuerda
      [6, 5], [6, 3]                    // 6ª cuerda
    ],
    'Posición 3': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 5], [6, 7],                   // 6ª cuerda
      [5, 5], [5, 8],                   // 5ª cuerda
      [4, 5], [4, 7],                   // 4ª cuerda
      [3, 5], [3, 7],                   // 3ª cuerda
      [2, 5], [2, 8],                   // 2ª cuerda
      [1, 5], [1, 7],                   // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 7], [1, 5],                   // 1ª cuerda
      [2, 8], [2, 5],                   // 2ª cuerda
      [3, 7], [3, 5],                   // 3ª cuerda
      [4, 7], [4, 5],                   // 4ª cuerda
      [5, 8], [5, 5],                   // 5ª cuerda
      [6, 7], [6, 5]                    // 6ª cuerda
    ],
    'Posición 4': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 7], [6, 10],                  // 6ª cuerda
      [5, 8], [5, 10],                  // 5ª cuerda
      [4, 7], [4, 10],                  // 4ª cuerda
      [3, 7], [3, 9],                   // 3ª cuerda
      [2, 8], [2, 10],                  // 2ª cuerda
      [1, 7], [1, 10],                  // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 10], [1, 7],                  // 1ª cuerda
      [2, 10], [2, 8],                  // 2ª cuerda
      [3, 9], [3, 7],                   // 3ª cuerda
      [4, 10], [4, 7],                  // 4ª cuerda
      [5, 10], [5, 8],                  // 5ª cuerda
      [6, 10], [6, 7]                   // 6ª cuerda
    ],
    'Posición 5': [
      // Ascendente - de la 6ª cuerda a la 1ª
      [6, 10], [6, 12],                 // 6ª cuerda
      [5, 10], [5, 12],                 // 5ª cuerda
      [4, 10], [4, 12],                 // 4ª cuerda
      [3, 9], [3, 12],                  // 3ª cuerda
      [2, 10], [2, 12],                 // 2ª cuerda
      [1, 10], [1, 12],                 // 1ª cuerda
      // Descendente - de la 1ª cuerda a la 6ª
      [1, 12], [1, 10],                 // 1ª cuerda
      [2, 12], [2, 10],                 // 2ª cuerda
      [3, 12], [3, 9],                  // 3ª cuerda
      [4, 12], [4, 10],                 // 4ª cuerda
      [5, 12], [5, 10],                 // 5ª cuerda
      [6, 12], [6, 10]                  // 6ª cuerda
    ]
  }
};

const opciones = [
  { label: 'Selecciona tu instrumento...', value: '' },
  { label: 'Guitarra', value: 'guitarra' },
  { label: 'Bajo 4', value: 'bajo4' },
  { label: 'Bajo 5', value: 'bajo5' },
  { label: 'Bajo 6', value: 'bajo6' },
];

// Tipo para las afinaciones
const afinacionesDisponibles: Record<string, string[]> = {
  guitarra: ['E', 'B', 'G', 'D', 'A', 'E'], // de la 1ª a la 6ª cuerda
  bajo4: ['G', 'D', 'A', 'E'],
  bajo5: ['G', 'D', 'A', 'E', 'B'],
  bajo6: ['C', 'G', 'D', 'A', 'E', 'B'],
  personalizada: ['E', 'B', 'G', 'D', 'A', 'E'] // Inicialmente igual a guitarra estándar
};

const notasNaturales = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const todasLasNotas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Función auxiliar para obtener la siguiente nota
const siguienteNota = (nota: string, semitonos: number = 1): string => {
  const notasOrdenadas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  // Normalizar la nota
  let normalizada = nota;
  if (nota.includes('♭')) {
    // Convertir bemoles a sostenidos equivalentes
    const idx = notasOrdenadas.findIndex(n => n === nota.replace('♭', ''));
    if (idx > 0) {
      normalizada = notasOrdenadas[idx - 1];
    }
  }
  
  const idx = notasOrdenadas.findIndex(n => n === normalizada);
  if (idx === -1) return nota;
  
  return notasOrdenadas[(idx + semitonos) % 12];
};

function generarDiapasonAfinacion(afinacion: string[]) {
  // Mostrar de la cuerda más aguda (arriba) a la más grave (abajo)
  return afinacion.map((notaAbierta, cuerdaIdx) => {
    const trastes = [];
    let notaActual = notaAbierta;
    for (let traste = 0; traste <= 12; traste++) {
      // Solo mostrar notas naturales
      const mostrar = notasNaturales.includes(notaActual.replace('♯', '#').replace('♭', 'b'));
      trastes.push({
        traste,
        nota: notaActual,
        mostrar,
      });
      notaActual = siguienteNota(notaActual, 1);
    }
    return trastes;
  });
}

const Diapason = ({ afinacion, nombre }: { afinacion: string[]; nombre: string }) => {
  const diapason = generarDiapasonAfinacion(afinacion);
  return (
    <div style={{ overflowX: 'auto', marginTop: '2.5rem' }}>
      <div style={{ fontWeight: 600, color: '#2D5B88', marginBottom: 12, textAlign: 'center', fontSize: '1.1rem' }}>{nombre} (trastes 0-12, solo notas naturales)</div>
      <table style={{ borderCollapse: 'collapse', background: '#f8f9fa', borderRadius: 10, boxShadow: '0 1px 8px rgba(30,58,92,0.08)', margin: '0 auto' }}>
        <thead>
          <tr>
            <th style={{ padding: 8, fontSize: 14, color: '#1e3a5c', background: '#eaf3fa' }}>Cuerda</th>
            {Array.from({ length: 13 }, (_, i) => i).map(traste => (
              <th key={traste} style={{ padding: 8, fontSize: 14, color: '#1e3a5c', background: '#eaf3fa' }}>{traste}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {diapason.map((cuerda, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, fontWeight: 600, color: '#2563eb', background: '#f0f6ff' }}>{afinacion[idx]}</td>
              {cuerda.map(({ traste, nota, mostrar }) => (
                <td key={traste} style={{ padding: 8, minWidth: 32, textAlign: 'center', background: mostrar ? '#fff' : '#f8f9fa', color: mostrar ? '#2D5B88' : '#b0b8c9', border: '1px solid #e5e7eb', borderRadius: 4, fontWeight: mostrar ? 600 : 400 }}>
                  {mostrar ? nota : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const nombresInstrumento: Record<string, string> = {
  guitarra: 'Guitarra (E A D G B E)',
  bajo4: 'Bajo 4 cuerdas (E A D G)',
  bajo5: 'Bajo 5 cuerdas (B E A D G)',
  bajo6: 'Bajo 6 cuerdas (B E A D G C)',
};

const DiapasonSVG: React.FC = () => {
  // Afinación estándar de guitarra de la 6ª a la 1ª cuerda
  const afinacion = ['E', 'A', 'D', 'G', 'B', 'E'];
  const numTrastes = 13;
  const cuerdaY = [30, 70, 110, 150, 190, 230]; // posiciones Y para las 6 cuerdas, más separadas
  const trasteX = Array.from({ length: numTrastes + 1 }, (_, i) => 70 + i * 68); // posiciones X para los trastes, más espaciados

  // Generar notas para cada cuerda y traste
  const notasPorCuerda = afinacion.map(notaAbierta => {
    let nota = notaAbierta;
    const notas = [];
    for (let t = 0; t <= numTrastes; t++) {
      notas.push(nota);
      nota = siguienteNota(nota, 1);
    }
    return notas;
  });

  const radioNota = 14; // Ligeramente más pequeño
  const margenFinal = 50;
  const svgWidth = trasteX[numTrastes] + radioNota + margenFinal;
  const svgHeight = 280; // Mayor altura

  return (
    <svg width={svgWidth} height={svgHeight} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 1px 6px rgba(30,58,92,0.06)', margin: '2.5rem auto', display: 'block', maxWidth: '100%' }}>
      {/* Trastes */}
      {trasteX.map((x, i) => (
        <line key={i} x1={x} y1={20} x2={x} y2={250} stroke={i === 0 ? '#B22234' : '#bbb'} strokeWidth={i === 0 ? 4 : 2} />
      ))}
      {/* Cuerdas */}
      {cuerdaY.map((y, i) => (
        <line key={i} x1={trasteX[0]} y1={y} x2={trasteX[numTrastes]} y2={y} stroke="#2D5B88" strokeWidth={2} />
      ))}
      {/* Números de traste */}
      {trasteX.slice(1).map((x, i) => (
        <text key={i} x={x - 34} y={15} fontSize={14} fill="#2D5B88" textAnchor="middle">{i + 1}</text>
      ))}
      {/* Notas naturales */}
      {notasPorCuerda.map((notas, cuerdaIdx) =>
        notas.map((nota, trasteIdx) => {
          if (!notasNaturales.includes(nota)) return null;
          // Centrar el círculo entre trastes (excepto traste 0, que va después de la cejuela)
          const x = trasteIdx === 0
            ? trasteX[0] - radioNota + 4
            : (trasteX[trasteIdx] + trasteX[trasteIdx - 1]) / 2;
          return (
            <g key={cuerdaIdx + '-' + trasteIdx}>
              <circle
                cx={x}
                cy={cuerdaY[cuerdaIdx]}
                r={radioNota}
                fill="#fff"
                stroke="#2563eb"
                strokeWidth={2}
                style={{ filter: 'drop-shadow(0 1px 3px #b3cfff)' }}
              />
              <text
                x={x}
                y={cuerdaY[cuerdaIdx] + 5}
                fontSize={15}
                fill="#2D5B88"
                fontWeight={600}
                textAnchor="middle"
              >
                {nota}
              </text>
            </g>
          );
        })
      )}
      {/* Etiquetas de cuerdas */}
      {cuerdaY.map((y, i) => (
        <text key={i} x={trasteX[0] - 32} y={y + 5} fontSize={16} fill="#2563eb" fontWeight={600} textAnchor="end">{afinacion[i]}</text>
      ))}
    </svg>
  );
};

const DiapasonSVGBajo4: React.FC = () => {
  // Afinación estándar de bajo 4 cuerdas (de la 1ª a la 4ª cuerda)
  const afinacion = ['G', 'D', 'A', 'E'];
  const numTrastes = 13;
  const cuerdaY = [50, 100, 150, 200]; // posiciones Y para las 4 cuerdas
  const trasteX = Array.from({ length: numTrastes + 1 }, (_, i) => 60 + i * 55); // posiciones X para los trastes

  // Generar notas para cada cuerda y traste
  const notasPorCuerda = afinacion.map(notaAbierta => {
    let nota = notaAbierta;
    const notas = [];
    for (let t = 0; t <= numTrastes; t++) {
      notas.push(nota);
      nota = siguienteNota(nota, 1);
    }
    return notas;
  });

  const radioNota = 16;
  const margenFinal = 40;
  const svgWidth = trasteX[numTrastes] + radioNota + margenFinal;

  return (
    <svg width={svgWidth} height={250} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 1px 6px rgba(30,58,92,0.06)', margin: '2.5rem auto', display: 'block', maxWidth: '100%' }}>
      {/* Trastes */}
      {trasteX.map((x, i) => (
        <line key={i} x1={x} y1={20} x2={x} y2={230} stroke={i === 0 ? '#B22234' : '#bbb'} strokeWidth={i === 0 ? 4 : 2} />
      ))}
      {/* Cuerdas */}
      {cuerdaY.map((y, i) => (
        <line key={i} x1={trasteX[0]} y1={y} x2={trasteX[numTrastes]} y2={y} stroke="#2D5B88" strokeWidth={2} />
      ))}
      {/* Números de traste */}
      {trasteX.slice(1).map((x, i) => (
        <text key={i} x={x - 27} y={15} fontSize={14} fill="#2D5B88" textAnchor="middle">{i + 1}</text>
      ))}
      {/* Notas naturales */}
      {notasPorCuerda.map((notas, cuerdaIdx) =>
        notas.map((nota, trasteIdx) => {
          if (!notasNaturales.includes(nota)) return null;
          // Centrar el círculo entre trastes (excepto traste 0, que va después de la cejuela)
          const x = trasteIdx === 0
            ? trasteX[0] - radioNota + 4
            : (trasteX[trasteIdx] + trasteX[trasteIdx - 1]) / 2;
          return (
            <g key={cuerdaIdx + '-' + trasteIdx}>
              <circle
                cx={x}
                cy={cuerdaY[cuerdaIdx]}
                r={radioNota}
                fill="#fff"
                stroke="#2563eb"
                strokeWidth={2}
                style={{ filter: 'drop-shadow(0 1px 3px #b3cfff)' }}
              />
              <text
                x={x}
                y={cuerdaY[cuerdaIdx] + 5}
                fontSize={16}
                fill="#2D5B88"
                fontWeight={600}
                textAnchor="middle"
              >
                {nota}
              </text>
            </g>
          );
        })
      )}
      {/* Etiquetas de cuerdas */}
      {cuerdaY.map((y, i) => (
        <text key={i} x={trasteX[0] - 32} y={y + 5} fontSize={16} fill="#2563eb" fontWeight={600} textAnchor="end">{afinacion[i]}</text>
      ))}
    </svg>
  );
};

const DiapasonSVGBajo5: React.FC = () => {
  // Afinación estándar de bajo 5 cuerdas (de la 1ª a la 5ª cuerda)
  const afinacion = ['G', 'D', 'A', 'E', 'B'];
  const numTrastes = 13;
  const cuerdaY = [40, 80, 120, 160, 200]; // posiciones Y para las 5 cuerdas
  const trasteX = Array.from({ length: numTrastes + 1 }, (_, i) => 60 + i * 55); // posiciones X para los trastes

  // Generar notas para cada cuerda y traste
  const notasPorCuerda = afinacion.map(notaAbierta => {
    let nota = notaAbierta;
    const notas = [];
    for (let t = 0; t <= numTrastes; t++) {
      notas.push(nota);
      nota = siguienteNota(nota, 1);
    }
    return notas;
  });

  const radioNota = 16;
  const margenFinal = 40;
  const svgWidth = trasteX[numTrastes] + radioNota + margenFinal;

  return (
    <svg width={svgWidth} height={250} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 1px 6px rgba(30,58,92,0.06)', margin: '2.5rem auto', display: 'block', maxWidth: '100%' }}>
      {/* Trastes */}
      {trasteX.map((x, i) => (
        <line key={i} x1={x} y1={20} x2={x} y2={230} stroke={i === 0 ? '#B22234' : '#bbb'} strokeWidth={i === 0 ? 4 : 2} />
      ))}
      {/* Cuerdas */}
      {cuerdaY.map((y, i) => (
        <line key={i} x1={trasteX[0]} y1={y} x2={trasteX[numTrastes]} y2={y} stroke="#2D5B88" strokeWidth={2} />
      ))}
      {/* Números de traste */}
      {trasteX.slice(1).map((x, i) => (
        <text key={i} x={x - 27} y={15} fontSize={14} fill="#2D5B88" textAnchor="middle">{i + 1}</text>
      ))}
      {/* Notas naturales */}
      {notasPorCuerda.map((notas, cuerdaIdx) =>
        notas.map((nota, trasteIdx) => {
          if (!notasNaturales.includes(nota)) return null;
          // Centrar el círculo entre trastes (excepto traste 0, que va después de la cejuela)
          const x = trasteIdx === 0
            ? trasteX[0] - radioNota + 4
            : (trasteX[trasteIdx] + trasteX[trasteIdx - 1]) / 2;
          return (
            <g key={cuerdaIdx + '-' + trasteIdx}>
              <circle
                cx={x}
                cy={cuerdaY[cuerdaIdx]}
                r={radioNota}
                fill="#fff"
                stroke="#2563eb"
                strokeWidth={2}
                style={{ filter: 'drop-shadow(0 1px 3px #b3cfff)' }}
              />
              <text
                x={x}
                y={cuerdaY[cuerdaIdx] + 5}
                fontSize={16}
                fill="#2D5B88"
                fontWeight={600}
                textAnchor="middle"
              >
                {nota}
              </text>
            </g>
          );
        })
      )}
      {/* Etiquetas de cuerdas */}
      {cuerdaY.map((y, i) => (
        <text key={i} x={trasteX[0] - 32} y={y + 5} fontSize={16} fill="#2563eb" fontWeight={600} textAnchor="end">{afinacion[i]}</text>
      ))}
    </svg>
  );
};

const DiapasonSVGBajo6: React.FC = () => {
  // Afinación estándar de bajo 6 cuerdas (de la 1ª a la 6ª cuerda)
  const afinacion = ['C', 'G', 'D', 'A', 'E', 'B'];
  const numTrastes = 13;
  const cuerdaY = [30, 60, 90, 120, 150, 180]; // posiciones Y para las 6 cuerdas
  const trasteX = Array.from({ length: numTrastes + 1 }, (_, i) => 60 + i * 55); // posiciones X para los trastes

  // Generar notas para cada cuerda y traste
  const notasPorCuerda = afinacion.map(notaAbierta => {
    let nota = notaAbierta;
    const notas = [];
    for (let t = 0; t <= numTrastes; t++) {
      notas.push(nota);
      nota = siguienteNota(nota, 1);
    }
    return notas;
  });

  const radioNota = 16;
  const margenFinal = 40;
  const svgWidth = trasteX[numTrastes] + radioNota + margenFinal;

  return (
    <svg width={svgWidth} height={240} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 1px 6px rgba(30,58,92,0.06)', margin: '2.5rem auto', display: 'block', maxWidth: '100%' }}>
      {/* Trastes */}
      {trasteX.map((x, i) => (
        <line key={i} x1={x} y1={20} x2={x} y2={200} stroke={i === 0 ? '#B22234' : '#bbb'} strokeWidth={i === 0 ? 4 : 2} />
      ))}
      {/* Cuerdas */}
      {cuerdaY.map((y, i) => (
        <line key={i} x1={trasteX[0]} y1={y} x2={trasteX[numTrastes]} y2={y} stroke="#2D5B88" strokeWidth={2} />
      ))}
      {/* Números de traste */}
      {trasteX.slice(1).map((x, i) => (
        <text key={i} x={x - 27} y={15} fontSize={14} fill="#2D5B88" textAnchor="middle">{i + 1}</text>
      ))}
      {/* Notas naturales */}
      {notasPorCuerda.map((notas, cuerdaIdx) =>
        notas.map((nota, trasteIdx) => {
          if (!notasNaturales.includes(nota)) return null;
          // Centrar el círculo entre trastes (excepto traste 0, que va después de la cejuela)
          const x = trasteIdx === 0
            ? trasteX[0] - radioNota + 4
            : (trasteX[trasteIdx] + trasteX[trasteIdx - 1]) / 2;
          return (
            <g key={cuerdaIdx + '-' + trasteIdx}>
              <circle
                cx={x}
                cy={cuerdaY[cuerdaIdx]}
                r={radioNota}
                fill="#fff"
                stroke="#2563eb"
                strokeWidth={2}
                style={{ filter: 'drop-shadow(0 1px 3px #b3cfff)' }}
              />
              <text
                x={x}
                y={cuerdaY[cuerdaIdx] + 5}
                fontSize={16}
                fill="#2D5B88"
                fontWeight={600}
                textAnchor="middle"
              >
                {nota}
              </text>
            </g>
          );
        })
      )}
      {/* Etiquetas de cuerdas */}
      {cuerdaY.map((y, i) => (
        <text key={i} x={trasteX[0] - 32} y={y + 5} fontSize={16} fill="#2563eb" fontWeight={600} textAnchor="end">{afinacion[i]}</text>
      ))}
    </svg>
  );
};

const DiapasonSVGEscala: React.FC<{ escala: string[]; nombreEscala: string; notaRaiz: string }> = ({ escala, nombreEscala, notaRaiz }) => {
  // Afinación estándar de guitarra de la 6ª a la 1ª cuerda
  const afinacion = ['E', 'A', 'D', 'G', 'B', 'E'];
  const numTrastes = 13;
  const cuerdaY = [30, 70, 110, 150, 190, 230]; // posiciones Y para las 6 cuerdas, más separadas
  const trasteX = Array.from({ length: numTrastes + 1 }, (_, i) => 70 + i * 68); // posiciones X para los trastes, más espaciados

  // Generar notas para cada cuerda y traste
  const notasPorCuerda = afinacion.map(notaAbierta => {
    let nota = notaAbierta;
    const notas = [];
    for (let t = 0; t <= numTrastes; t++) {
      notas.push(nota);
      nota = siguienteNota(nota, 1);
    }
    return notas;
  });

  const radioNota = 14; // Ligeramente más pequeño
  const margenFinal = 50;
  const svgWidth = trasteX[numTrastes] + radioNota + margenFinal;
  const svgHeight = 280; // Mayor altura

  // Función para determinar si una nota está en la escala
  const estaEnEscala = (nota: string) => {
    return escala.some(notaEscala => {
      // Normalizar las notas para comparar (C# = Db)
      const normalizada1 = nota.replace('♭', 'b').replace('b', '♭');
      const normalizada2 = notaEscala.replace('♭', 'b').replace('b', '♭');
      return normalizada1 === normalizada2 || normalizada1.replace('#', '♭') === normalizada2.replace('#', '♭');
    });
  };

  // Verificar si la nota es la raíz de la escala
  const esRaiz = (nota: string) => {
    const normalizada1 = nota.replace('♭', 'b').replace('b', '♭').replace('#', '♯');
    const normalizada2 = notaRaiz.replace('♭', 'b').replace('b', '♭').replace('#', '♯');
    // Comparar ambas formas (con # y con ♯)
    return normalizada1 === normalizada2 || 
           normalizada1 === normalizada2.replace('#', '♯') ||
           normalizada1 === normalizada2.replace('♯', '#') ||
           normalizada1.charAt(0) === normalizada2.charAt(0); // Comparar solo la letra para mayor tolerancia
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3 style={{ textAlign: 'center', color: '#2D5B88', marginBottom: '1rem', fontWeight: 600 }}>
        Escala {nombreEscala} de {notaRaiz}
      </h3>
      <svg width={svgWidth} height={svgHeight} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 1px 6px rgba(30,58,92,0.06)', margin: '0 auto 2rem auto', display: 'block', maxWidth: '100%' }}>
        {/* Trastes */}
        {trasteX.map((x, i) => (
          <line key={i} x1={x} y1={20} x2={x} y2={250} stroke={i === 0 ? '#B22234' : '#bbb'} strokeWidth={i === 0 ? 4 : 2} />
        ))}
        {/* Cuerdas */}
        {cuerdaY.map((y, i) => (
          <line key={i} x1={trasteX[0]} y1={y} x2={trasteX[numTrastes]} y2={y} stroke="#2D5B88" strokeWidth={2} />
        ))}
        {/* Números de traste */}
        {trasteX.slice(1).map((x, i) => (
          <text key={i} x={x - 34} y={15} fontSize={14} fill="#2D5B88" textAnchor="middle">{i + 1}</text>
        ))}
        {/* Notas de la escala */}
        {notasPorCuerda.map((notas, cuerdaIdx) =>
          notas.map((nota, trasteIdx) => {
            if (!estaEnEscala(nota)) return null;
            // Centrar el círculo entre trastes (excepto traste 0, que va después de la cejuela)
            const x = trasteIdx === 0
              ? trasteX[0] - radioNota + 4
              : (trasteX[trasteIdx] + trasteX[trasteIdx - 1]) / 2;
            
            // Color especial para la raíz
            const esNotaRaiz = esRaiz(nota);
            
            return (
              <g key={cuerdaIdx + '-' + trasteIdx}>
                <circle
                  cx={x}
                  cy={cuerdaY[cuerdaIdx]}
                  r={radioNota}
                  fill={esNotaRaiz ? '#3ED6C1' : '#fff'}
                  stroke={esNotaRaiz ? '#22a090' : '#2563eb'}
                  strokeWidth={2}
                  style={{ filter: 'drop-shadow(0 1px 3px #b3cfff)' }}
                />
                <text
                  x={x}
                  y={cuerdaY[cuerdaIdx] + 5}
                  fontSize={15}
                  fill={esNotaRaiz ? '#1e3a5c' : '#2D5B88'}
                  fontWeight={esNotaRaiz ? 700 : 600}
                  textAnchor="middle"
                >
                  {nota}
                </text>
              </g>
            );
          })
        )}
        {/* Etiquetas de cuerdas */}
        {cuerdaY.map((y, i) => (
          <text key={i} x={trasteX[0] - 32} y={y + 5} fontSize={16} fill="#2563eb" fontWeight={600} textAnchor="end">{afinacion[i]}</text>
        ))}
      </svg>
    </div>
  );
};

// Componente para visualizar acordes en el diapasón
const DiapasonSVGAcorde: React.FC<{ acorde: string[]; nombreAcorde: string; notaRaiz: string }> = ({ acorde, nombreAcorde, notaRaiz }) => {
  // Afinación estándar de guitarra de la 6ª a la 1ª cuerda
  const afinacion = ['E', 'A', 'D', 'G', 'B', 'E'];
  const numTrastes = 13;
  const cuerdaY = [30, 70, 110, 150, 190, 230]; // posiciones Y para las 6 cuerdas, más separadas
  const trasteX = Array.from({ length: numTrastes + 1 }, (_, i) => 70 + i * 68); // posiciones X para los trastes, más espaciados

  // Generar notas para cada cuerda y traste
  const notasPorCuerda = afinacion.map(notaAbierta => {
    let nota = notaAbierta;
    const notas = [];
    for (let t = 0; t <= numTrastes; t++) {
      notas.push(nota);
      nota = siguienteNota(nota, 1);
    }
    return notas;
  });

  const radioNota = 14; // Ligeramente más pequeño
  const margenFinal = 50;
  const svgWidth = trasteX[numTrastes] + radioNota + margenFinal;
  const svgHeight = 280; // Mayor altura

  // Función para determinar si una nota está en el acorde
  const estaEnAcorde = (nota: string) => {
    return acorde.some(notaAcorde => {
      // Normalizar las notas para comparar (C# = Db)
      const normalizada1 = nota.replace('♭', 'b').replace('b', '♭');
      const normalizada2 = notaAcorde.replace('♭', 'b').replace('b', '♭');
      return normalizada1 === normalizada2 || normalizada1.replace('#', '♭') === normalizada2.replace('#', '♭');
    });
  };

  // Verificar si la nota es la raíz del acorde
  const esRaiz = (nota: string) => {
    const normalizada1 = nota.replace('♭', 'b').replace('b', '♭');
    const normalizada2 = notaRaiz.replace('♭', 'b').replace('b', '♭');
    return normalizada1 === normalizada2 || normalizada1.replace('#', '♭') === normalizada2.replace('#', '♭');
  };

  // Determinar si una nota es la tercera del acorde (para colorearla diferente)
  const esTercera = (nota: string) => {
    if (acorde.length >= 2) {
      const normalizada1 = nota.replace('♭', 'b').replace('b', '♭');
      const normalizada2 = acorde[1].replace('♭', 'b').replace('b', '♭');
      return normalizada1 === normalizada2 || normalizada1.replace('#', '♭') === normalizada2.replace('#', '♭');
    }
    return false;
  };

  // Determinar si una nota es la quinta del acorde (para colorearla diferente)
  const esQuinta = (nota: string) => {
    if (acorde.length >= 3) {
      const normalizada1 = nota.replace('♭', 'b').replace('b', '♭');
      const normalizada2 = acorde[2].replace('♭', 'b').replace('b', '♭');
      return normalizada1 === normalizada2 || normalizada1.replace('#', '♭') === normalizada2.replace('#', '♭');
    }
    return false;
  };

  // Determinar si una nota es la séptima u otra extensión del acorde
  const esExtension = (nota: string) => {
    if (acorde.length >= 4) {
      return acorde.slice(3).some(notaAcorde => {
        const normalizada1 = nota.replace('♭', 'b').replace('b', '♭');
        const normalizada2 = notaAcorde.replace('♭', 'b').replace('b', '♭');
        return normalizada1 === normalizada2 || normalizada1.replace('#', '♭') === normalizada2.replace('#', '♭');
      });
    }
    return false;
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3 style={{ textAlign: 'center', color: '#2D5B88', marginBottom: '1rem', fontWeight: 600 }}>
        Acorde {nombreAcorde} ({acorde.join(', ')})
      </h3>
      <svg width={svgWidth} height={svgHeight} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 1px 6px rgba(30,58,92,0.06)', margin: '0 auto 2rem auto', display: 'block', maxWidth: '100%' }}>
        {/* Trastes */}
        {trasteX.map((x, i) => (
          <line key={i} x1={x} y1={20} x2={x} y2={250} stroke={i === 0 ? '#B22234' : '#bbb'} strokeWidth={i === 0 ? 4 : 2} />
        ))}
        {/* Cuerdas */}
        {cuerdaY.map((y, i) => (
          <line key={i} x1={trasteX[0]} y1={y} x2={trasteX[numTrastes]} y2={y} stroke="#2D5B88" strokeWidth={2} />
        ))}
        {/* Números de traste */}
        {trasteX.slice(1).map((x, i) => (
          <text key={i} x={x - 34} y={15} fontSize={14} fill="#2D5B88" textAnchor="middle">{i + 1}</text>
        ))}
        {/* Notas del acorde */}
        {notasPorCuerda.map((notas, cuerdaIdx) =>
          notas.map((nota, trasteIdx) => {
            if (!estaEnAcorde(nota)) return null;
            // Centrar el círculo entre trastes (excepto traste 0, que va después de la cejuela)
            const x = trasteIdx === 0
              ? trasteX[0] - radioNota + 4
              : (trasteX[trasteIdx] + trasteX[trasteIdx - 1]) / 2;
            
            // Determinar color según la función de la nota en el acorde
            let fillColor = '#fff';
            let strokeColor = '#2563eb';
            let fontWeight = 600;
            let textColor = '#2D5B88';
            
            if (esRaiz(nota)) {
              fillColor = '#3ED6C1';
              strokeColor = '#22a090';
              textColor = '#1e3a5c';
              fontWeight = 700;
            } else if (esTercera(nota)) {
              fillColor = '#F96D00'; // Naranja para la tercera
              strokeColor = '#C55600';
              textColor = '#fff';
            } else if (esQuinta(nota)) {
              fillColor = '#b22234'; // Rojo para la quinta
              strokeColor = '#8E1B29';
              textColor = '#fff';
            } else if (esExtension(nota)) {
              fillColor = '#7047eb'; // Púrpura para extensiones
              strokeColor = '#5A38BC';
              textColor = '#fff';
            }
            
            return (
              <g key={cuerdaIdx + '-' + trasteIdx}>
                <circle
                  cx={x}
                  cy={cuerdaY[cuerdaIdx]}
                  r={radioNota}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={2}
                  style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))' }}
                />
                <text
                  x={x}
                  y={cuerdaY[cuerdaIdx] + 5}
                  fontSize={15}
                  fill={textColor}
                  fontWeight={fontWeight}
                  textAnchor="middle"
                >
                  {nota}
                </text>
              </g>
            );
          })
        )}
        {/* Etiquetas de cuerdas */}
        {cuerdaY.map((y, i) => (
          <text key={i} x={trasteX[0] - 32} y={y + 5} fontSize={16} fill="#2563eb" fontWeight={600} textAnchor="end">{afinacion[i]}</text>
        ))}
      </svg>
    </div>
  );
};

// Componente para visualizar secuencias de escala en el diapasón
const DiapasonSVGSecuencia: React.FC<{
  secuencia: Posicion[];
  pasoActual: number;
  escala: string[];
  notaRaiz?: string;
  nombreSistema?: string;
  posicion?: string;
  resaltarTonicas?: boolean;
}> = ({ secuencia, pasoActual, escala, notaRaiz = 'C', nombreSistema = '', posicion = '', resaltarTonicas = false }) => {
  // Afinación estándar de guitarra de la 6ª a la 1ª cuerda
  const afinacion = ['E', 'A', 'D', 'G', 'B', 'E'];
  const numTrastes = 15; // Aumentar número de trastes para mostrar más del diapasón
  // Invertir el orden de las cuerdas: ahora la 6ª (grave) estará abajo
  const cuerdaY = [230, 190, 150, 110, 70, 30]; // Valores invertidos: la 6ª cuerda abajo (230), 1ª cuerda arriba (30)
  const trasteX = Array.from({ length: numTrastes + 1 }, (_, i) => 70 + i * 50); // Reducir el espaciado para que quepan más trastes

  // Generar notas para cada cuerda y traste
  const notasPorCuerda = afinacion.map(notaAbierta => {
    let nota = notaAbierta;
    const notas = [];
    for (let t = 0; t <= numTrastes; t++) {
      notas.push(nota);
      nota = siguienteNota(nota, 1);
    }
    return notas;
  });

  const radioNota = 14; // Ligeramente más pequeño
  const margenFinal = 60; // Aumentar margen para no cortar las notas
  const svgWidth = trasteX[numTrastes] + radioNota + margenFinal;
  const svgHeight = 280; // Mayor altura

  // Función para determinar si una nota está en la escala
  const estaEnEscala = (nota: string) => {
    return escala.some(notaEscala => {
      // Normalizar las notas para comparar (C# = Db)
      const normalizada1 = nota.replace('♭', 'b').replace('b', '♭');
      const normalizada2 = notaEscala.replace('♭', 'b').replace('b', '♭');
      return normalizada1 === normalizada2 || normalizada1.replace('#', '♭') === normalizada2.replace('#', '♭');
    });
  };

  // Verificar si la nota es la raíz de la escala o un Do/C
  const esRaiz = (nota: string) => {
    const normalizada1 = nota.replace('♭', 'b').replace('b', '♭').replace('#', '♯');
    const normalizada2 = notaRaiz.replace('♭', 'b').replace('b', '♭').replace('#', '♯');
    // Comparar ambas formas (con # y con ♯)
    return normalizada1 === normalizada2 || 
           normalizada1 === normalizada2.replace('#', '♯') ||
           normalizada1 === normalizada2.replace('♯', '#') ||
           normalizada1.charAt(0) === normalizada2.charAt(0) || // Comparar solo la letra para mayor tolerancia
           normalizada1 === 'C'; // Destacar todas las notas Do
  };

  // Detectar si estamos en la mitad descendente de la secuencia
  const puntoMedio = Math.floor(secuencia.length / 2);
  const esDescendente = (idx: number) => idx >= puntoMedio;
  
  // Agrupar notas por cuerda para mejor visualización
  const notasPorCuerdaOrdenadas: Record<number, Posicion[]> = {};
  secuencia.forEach((posicion, idx) => {
    const [cuerda, traste] = posicion;
    if (!notasPorCuerdaOrdenadas[cuerda]) {
      notasPorCuerdaOrdenadas[cuerda] = [];
    }
    notasPorCuerdaOrdenadas[cuerda].push([cuerda, traste]);
  });
 
  // Verificar si la nota es la tónica para destacarla especialmente
  // Esta función está siendo detectada como no utilizada, pero es necesaria como referencia
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const esTonica = (nota: string) => {
    // Normalizar las notas para comparar (C = DO)
    const normalizada = nota.replace('♭', 'b').replace('b', '♭').replace('#', '♯');
    return normalizada === 'C' || normalizada === 'DO';
  };
  
  // Ajustar índice para la visualización invertida de las cuerdas
  const getCuerdaYIndex = (cuerdaIdx: number) => {
    // Invertir la asignación: la cuerda 6 va al índice 0, la cuerda 1 va al índice 5
    return cuerdaIdx - 1;
  };

  // Visualizar las notas en la secuencia
  const renderizarNotas = () => {
    return secuencia.map(([cuerdaIdx, trasteIdx], idx) => {
      // Nota en esa posición
      const nota = notasPorCuerda[cuerdaIdx-1][trasteIdx];
      
      // Solo mostrar si la nota está en la escala
      if (!estaEnEscala(nota)) return null;
      
      // Verificar si es la nota raíz/tónica
      const esNotaRaiz = esRaiz(nota);
      const esNotaDo = nota === 'C' || nota === 'DO';
      
      // Lógica para mostrar notas según el modo:
      // - En modo normal: mostrar solo hasta el paso actual (y solo si paso actual no es -1)
      // - En modo resaltar tónicas: mostrar solo las notas raíz
      // - Siempre mostrar las notas Do (C) independientemente del modo
      if (resaltarTonicas && !esNotaRaiz && !esNotaDo) return null;
      if (!resaltarTonicas && !esNotaDo && (idx > pasoActual || pasoActual < 0)) return null;
      
      // Centrar el círculo entre trastes (excepto traste 0, que va después de la cejuela)
      const x = trasteIdx === 0
        ? trasteX[0] - radioNota + 4
        : (trasteX[trasteIdx] + trasteX[trasteIdx - 1]) / 2;
      
      // Determinar si es el paso actual en la animación (solo en modo normal)
      const esActual = !resaltarTonicas && idx === pasoActual && pasoActual >= 0;
      
      // Color y estilo según la función y el modo
      const esFundamental = esRaiz(nota);
      const estaDescendiendo = esDescendente(idx);
      
      // Obtener posición Y de la cuerda con la visualización invertida
      const y = cuerdaY[getCuerdaYIndex(cuerdaIdx)];
      
      // COLOR DORADO para todos los casos donde antes era naranja
      const colorDorado = '#ffb923';
      const colorBordeDorado = '#b38f00';
      
      return (
        <g key={`${cuerdaIdx}-${trasteIdx}-${idx}`}>
          <circle
            cx={x}
            cy={y}
            r={radioNota}
            fill="#fff"
            stroke="#2563eb"
            strokeWidth={2}
            style={{ 
              filter: 'drop-shadow(0 1px 3px #b3cfff)',
              transition: 'all 0.3s ease-in-out',
              opacity: 0.85
            }}
          />
          <text
            x={x}
            y={y + 5}
            fontSize={15}
            fill="#2D5B88"
            fontWeight={600}
            textAnchor="middle"
            style={{
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {nota}
          </text>
        </g>
      );
    });
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {nombreSistema && posicion && (
        <h3 style={{ textAlign: 'center', color: '#2D5B88', marginBottom: '1rem', fontWeight: 600 }}>
          {nombreSistema} - {posicion}
        </h3>
      )}
      <svg width={svgWidth} height={svgHeight} style={{ background: '#f8f9fa', borderRadius: 12, boxShadow: '0 1px 6px rgba(30,58,92,0.06)', margin: '0 auto 2rem auto', display: 'block', maxWidth: '100%', overflowX: 'visible' }}>
        {/* Trastes */}
        {trasteX.map((x, i) => (
          <line key={i} x1={x} y1={20} x2={x} y2={250} stroke={i === 0 ? '#B22234' : '#bbb'} strokeWidth={i === 0 ? 4 : 2} />
        ))}
        {/* Cuerdas */}
        {cuerdaY.map((y, i) => (
          <line key={i} x1={trasteX[0]} y1={y} x2={trasteX[numTrastes]} y2={y} stroke="#2D5B88" strokeWidth={2} />
        ))}
        {/* Números de traste */}
        {trasteX.slice(1).map((x, i) => (
          <text key={i} x={x - 25} y={265} fontSize={14} fill="#2D5B88" textAnchor="middle">{i + 1}</text>
        ))}
        
        {/* Renderizar notas usando la función dedicada */}
        {renderizarNotas()}
        
        {/* Etiquetas de cuerdas */}
        {cuerdaY.map((y, i) => {
          // Ahora mostramos el número de cuerda correcto (1-6) para la afinación invertida
          const cuerdaNumero = 6 - i;
          const notaCuerda = afinacion[cuerdaNumero - 1];
          return (
            <text key={i} x={trasteX[0] - 32} y={y + 5} fontSize={16} fill="#2563eb" fontWeight={600} textAnchor="end">
              {cuerdaNumero}ª {notaCuerda}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Tipo de pestañas disponibles
type TabType = 'escalas' | 'acordes' | 'afinaciones' | 'metronomo' | 'ejercicios';

const Instrumento: React.FC = () => {
  const [seleccion, setSeleccion] = useState('');
  const [notaRaiz, setNotaRaiz] = useState('C');
  const [tipoEscala, setTipoEscala] = useState('mayor');
  const [tabActiva, setTabActiva] = useState<TabType>('escalas');
  const afinacion = afinacionesDisponibles[seleccion] || [];

  // Opciones de notas para la raíz de la escala
  const opcionesNotas = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];

  // Opciones de tipos de escalas
  const opcionesEscalas = [
    { valor: 'mayor', nombre: 'Mayor' },
    { valor: 'menor', nombre: 'Menor Natural' },
    { valor: 'pentatonica', nombre: 'Pentatónica Mayor' },
    { valor: 'blues', nombre: 'Blues' },
    { valor: 'dorica', nombre: 'Dórica' },
    { valor: 'frigia', nombre: 'Frigia' },
    { valor: 'lidia', nombre: 'Lidia' },
    { valor: 'mixolidia', nombre: 'Mixolidia' },
    { valor: 'eolica', nombre: 'Eólica' },
    { valor: 'locria', nombre: 'Locria' }
  ];

  // Obtener la escala según el tipo seleccionado
  const obtenerEscalaSeleccionada = () => {
    switch (tipoEscala) {
      case 'mayor':
        return obtenerEscalaMayor(notaRaiz);
      case 'menor':
        return obtenerEscalaMenor(notaRaiz);
      case 'pentatonica':
        return obtenerEscalaPentatonica(notaRaiz);
      case 'blues':
        return obtenerEscalaBlues(notaRaiz);
      case 'dorica':
        return obtenerEscalasModales(notaRaiz)[1].notas;
      case 'frigia':
        return obtenerEscalasModales(notaRaiz)[2].notas;
      case 'lidia':
        return obtenerEscalasModales(notaRaiz)[3].notas;
      case 'mixolidia':
        return obtenerEscalasModales(notaRaiz)[4].notas;
      case 'eolica':
        return obtenerEscalasModales(notaRaiz)[5].notas;
      case 'locria':
        return obtenerEscalasModales(notaRaiz)[6].notas;
      default:
        return obtenerEscalaMayor(notaRaiz);
    }
  };

  // Encontrar el nombre de la escala seleccionada
  const nombreEscala = opcionesEscalas.find(opcion => opcion.valor === tipoEscala)?.nombre || 'Mayor';

  // Estilos para las pestañas
  const tabStyle = {
    base: {
      padding: '10px 16px',
      borderRadius: '8px 8px 0 0',
      fontSize: '0.95rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    active: {
      background: '#fff',
      color: '#2D5B88',
      boxShadow: '0 -2px 8px rgba(45,91,136,0.06)',
      position: 'relative' as const,
      zIndex: 2,
    },
    inactive: {
      background: '#f0f6ff',
      color: '#5f7799',
    }
  };

  const CuadroInstrumentos = () => (
    <div style={{ maxWidth: 800, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(30,58,92,0.08)', padding: '2.2rem 2.5rem', marginBottom: '1.5rem', width: '100%' }}>
      <h1 style={{ color: '#2D5B88', fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem', textAlign: 'center' }}>Tu instrumento</h1>
      <p style={{ color: '#1e3a5c', fontSize: '1.13rem', marginBottom: '1.7rem', textAlign: 'center' }}>
        Selecciona el instrumento con el que quieres trabajar. Pronto podrás ver recursos y herramientas específicas para cada uno.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <select
          value={seleccion}
          onChange={e => setSeleccion(e.target.value)}
          style={{ fontSize: '1.08rem', padding: '12px 18px', border: '2px solid #2D5B88', borderRadius: 7, background: '#fff', color: '#1e3a5c', fontWeight: 500, outline: 'none', boxShadow: '0 2px 8px rgba(45,91,136,0.04)', marginTop: '0.5rem', width: '100%' }}
        >
          {opciones.map(op => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      </div>
      
      {seleccion === 'guitarra' && (
        <>
          <DiapasonSVG />
          
          {/* Pestañas de herramientas */}
          <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '2.5rem', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '-1px' }}>
              <div 
                onClick={() => setTabActiva('escalas')}
                style={{...tabStyle.base, ...(tabActiva === 'escalas' ? tabStyle.active : tabStyle.inactive)}}
              >
                Escalas
              </div>
              <div 
                onClick={() => setTabActiva('acordes')}
                style={{...tabStyle.base, ...(tabActiva === 'acordes' ? tabStyle.active : tabStyle.inactive)}}
              >
                Acordes
              </div>
              <div 
                onClick={() => setTabActiva('afinaciones')}
                style={{...tabStyle.base, ...(tabActiva === 'afinaciones' ? tabStyle.active : tabStyle.inactive)}}
              >
                Afinaciones
              </div>
              <div 
                onClick={() => setTabActiva('metronomo')}
                style={{...tabStyle.base, ...(tabActiva === 'metronomo' ? tabStyle.active : tabStyle.inactive)}}
              >
                Metrónomo
              </div>
              <div 
                onClick={() => setTabActiva('ejercicios')}
                style={{...tabStyle.base, ...(tabActiva === 'ejercicios' ? tabStyle.active : tabStyle.inactive)}}
              >
                Ejercicios
              </div>
            </div>
            
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0 8px 8px 8px', padding: '2rem 1.5rem', background: '#fff', boxShadow: '0 2px 8px rgba(45,91,136,0.04)' }}>
              {tabActiva === 'escalas' && <TabEscalas />}
              {tabActiva === 'acordes' && <TabAcordes />}
              {tabActiva === 'afinaciones' && <TabAfinaciones />}
              {tabActiva === 'metronomo' && <TabMetronomo />}
              {tabActiva === 'ejercicios' && <TabEjercicios />}
            </div>
          </div>
        </>
      )}
      
      {seleccion === 'bajo4' && <DiapasonSVGBajo4 />}
      {seleccion === 'bajo5' && <DiapasonSVGBajo5 />}
      {seleccion === 'bajo6' && <DiapasonSVGBajo6 />}
    </div>
  );

  // Componente para la pestaña de Escalas
  const TabEscalas: React.FC = () => {
    const [notaRaiz, setNotaRaiz] = useState('C');
    const [tipoEscala, setTipoEscala] = useState('mayor');
    const [sistemaElegido, setSistemaElegido] = useState<SistemaEscala>('caged');
    const [posicionElegida, setPosicionElegida] = useState<string>('C');
    const [animacionActiva, setAnimacionActiva] = useState(false);
    // Inicializar a -1 para no mostrar animación al cargar
    const [pasoActual, setPasoActual] = useState(-1);
    const [velocidad, setVelocidad] = useState(1000); // ms entre notas
    const [resaltarTonicas, setResaltarTonicas] = useState(false); // Modo para resaltar tónicas
    const [direccion, setDireccion] = useState(1); // 1: avanzar, -1: retroceder
    
    // Referencias para mantener el estado entre renders
    const animationRef = useRef<number | null>(null);
    const ultimoTiempo = useRef<number>(0);
    
    // Cancelar cualquier animación existente en la primera renderización
    useEffect(() => {
      // Asegurarse de que no haya animación al inicio
      setPasoActual(-1);
      setAnimacionActiva(false);
      
      // Limpiar cualquier animación en curso
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      };
    }, []);
    
    // Opciones de notas para la raíz de la escala
    const opcionesNotas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    const opcionesEscalas = [
      { valor: 'mayor', nombre: 'Mayor' },
      { valor: 'menor', nombre: 'Menor Natural' },
      { valor: 'pentatonica', nombre: 'Pentatónica Mayor' },
      { valor: 'blues', nombre: 'Blues' },
      { valor: 'dorica', nombre: 'Dórica' },
      { valor: 'frigia', nombre: 'Frigia' },
      { valor: 'lidia', nombre: 'Lidia' },
      { valor: 'mixolidia', nombre: 'Mixolidia' },
      { valor: 'eolica', nombre: 'Eólica' },
      { valor: 'locria', nombre: 'Locria' }
    ];
    
    const opcionesSistemas = [
      { valor: 'caged', nombre: 'Sistema CAGED' },
      { valor: 'tresPorCuerda', nombre: '3 Notas por Cuerda' },
      { valor: 'pentatonica', nombre: '5 Posiciones Pentatónicas' }
    ];
    
    // Función para obtener la escala seleccionada
    const obtenerEscalaSeleccionada = () => {
      switch (tipoEscala) {
        case 'mayor': return obtenerEscalaMayor(notaRaiz);
        case 'menor': return obtenerEscalaMenor(notaRaiz);
        case 'pentatonica': return obtenerEscalaPentatonica(notaRaiz);
        case 'blues': return obtenerEscalaBlues(notaRaiz);
        case 'dorica': return obtenerEscalasModales(notaRaiz)[1].notas;
        case 'frigia': return obtenerEscalasModales(notaRaiz)[2].notas;
        case 'lidia': return obtenerEscalasModales(notaRaiz)[3].notas;
        case 'mixolidia': return obtenerEscalasModales(notaRaiz)[4].notas;
        case 'eolica': return obtenerEscalasModales(notaRaiz)[5].notas;
        case 'locria': return obtenerEscalasModales(notaRaiz)[6].notas;
        default: return obtenerEscalaMayor(notaRaiz);
      }
    };
    
    // Obtener el nombre de la escala
    const nombreEscala = opcionesEscalas.find(o => o.valor === tipoEscala)?.nombre || 'Mayor';
    
    // Usar useMemo para evitar recálculos innecesarios de la secuencia
    const secuenciaActual = React.useMemo(() => {
      return secuenciasEscalas[sistemaElegido][posicionElegida] || [];
    }, [sistemaElegido, posicionElegida]);
    
    // Función para manejar la animación
    const animar = useCallback(() => {
      if (!animacionActiva) return;
      
      // Asegurarse de que haya una secuencia para animar
      if (!secuenciaActual || secuenciaActual.length === 0) {
        setAnimacionActiva(false);
        return;
      }

      const ahora = performance.now();
      const tiempoTranscurrido = ahora - ultimoTiempo.current;
      
      if (tiempoTranscurrido >= velocidad) {
        // Actualizar al siguiente paso según la dirección
        setPasoActual(prev => {
          // Gestionar la dirección de la animación (ida y vuelta)
          let siguiente = prev + direccion;
          
          // Si llegamos al final, cambiar dirección a retroceso
          if (siguiente >= secuenciaActual.length - 1) {
            setDireccion(-1);
            return secuenciaActual.length - 1;
          }
          
          // Si llegamos al inicio, cambiar dirección a avance
          if (siguiente <= 0) {
            setDireccion(1);
            return 0;
          }
          
          return siguiente;
        });
        ultimoTiempo.current = ahora;
      }
      
      // Continuar la animación
      animationRef.current = requestAnimationFrame(animar);
    }, [animacionActiva, secuenciaActual, velocidad, direccion]);

    // Detener la animación y reiniciar cuando cambia la escala, sistema o posición
    useEffect(() => {
      setAnimacionActiva(false);
      setPasoActual(-1); // Usar -1 para no mostrar ninguna nota
      setDireccion(1); // Reiniciar dirección a avance
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }, [sistemaElegido, posicionElegida, notaRaiz, tipoEscala]);
    
    // Función para manejar el cambio de posición
    const handlePosicionChange = (nuevaPosicion: string) => {
      // Detener completamente la animación
      setAnimacionActiva(false);
      setPasoActual(0);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Pequeño retraso para garantizar una transición limpia
      setTimeout(() => {
        setPosicionElegida(nuevaPosicion);
      }, 50);
    };
    
    // Función similar para cuando cambia el sistema de escala
    const handleSistemaChange = (nuevoSistema: SistemaEscala) => {
      // Detener completamente la animación
      setAnimacionActiva(false);
      setPasoActual(0);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Pequeño retraso para garantizar una transición limpia
      setTimeout(() => {
        setSistemaElegido(nuevoSistema);
        // Establecer la primera posición del nuevo sistema
        const posicionesDisponibles = Object.keys(secuenciasEscalas[nuevoSistema]);
        if (posicionesDisponibles.length > 0) {
          setPosicionElegida(posicionesDisponibles[0]);
        }
      }, 50);
    };
    
    // Funciones para controlar la animación
    const iniciarAnimacion = () => {
      setPasoActual(0); // Reiniciar desde el principio cuando se inicia manualmente
      setDireccion(1); // Reiniciar dirección a avance
      setAnimacionActiva(true);
    };

    const pausarAnimacion = () => setAnimacionActiva(false);

    const reiniciarAnimacion = () => {
      setAnimacionActiva(false);
      setPasoActual(-1); // Usar -1 para ocultar todas las notas
      setDireccion(1); // Reiniciar dirección a avance
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
    
    // Opciones de posiciones según el sistema elegido
    const obtenerOpcionesPosiciones = () => {
      const posiciones = Object.keys(secuenciasEscalas[sistemaElegido]);
      return posiciones.map(pos => ({
        valor: pos,
        nombre: pos
      }));
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <style>
          {`
          @keyframes pulse {
            0% {
              transform: scale(1.15);
              filter: drop-shadow(0 0 12px rgba(255, 107, 0, 0.6));
            }
            100% {
              transform: scale(1.25);
              filter: drop-shadow(0 0 18px rgba(255, 107, 0, 0.8));
            }
          }
          `}
        </style>
        <h2 style={{ color: '#2D5B88', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Escalas y patrones</h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', justifyContent: 'center' }}>
          <div style={{ minWidth: '180px', flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Nota raíz</label>
            <select
              value={notaRaiz}
              onChange={e => setNotaRaiz(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
            >
              {opcionesNotas.map(nota => (
                <option key={nota} value={nota}>{nota}</option>
              ))}
            </select>
          </div>
          
          <div style={{ minWidth: '220px', flex: 2 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Tipo de escala</label>
            <select
              value={tipoEscala}
              onChange={e => setTipoEscala(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
            >
              {opcionesEscalas.map(escala => (
                <option key={escala.valor} value={escala.valor}>{escala.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ padding: '1rem', background: '#f0f6ff', borderRadius: 8, marginBottom: '1rem' }}>
          <h4 style={{ color: '#2D5B88', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 600 }}>Notas en la escala:</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {obtenerEscalaSeleccionada().map((nota, idx) => (
              <div key={idx} style={{ 
                padding: '6px 14px', 
                borderRadius: 20, 
                background: idx === 0 ? '#3ED6C1' : '#fff',
                color: idx === 0 ? '#1e3a5c' : '#2D5B88', 
                fontWeight: idx === 0 ? 700 : 600,
                boxShadow: '0 1px 4px rgba(30,58,92,0.1)'
              }}>
                {nota}
              </div>
            ))}
          </div>
        </div>
        
        <DiapasonSVGEscala 
          escala={obtenerEscalaSeleccionada()} 
          nombreEscala={nombreEscala} 
          notaRaiz={notaRaiz} 
        />
        
        {/* Sección de sistemas de posiciones */}
        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '2rem', paddingTop: '2rem' }}>
          <h3 style={{ color: '#2D5B88', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
            Posiciones y Patrones de Escala
          </h3>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>
                Sistema de Posiciones
              </label>
              <select
                value={sistemaElegido}
                onChange={e => handleSistemaChange(e.target.value as SistemaEscala)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
              >
                {opcionesSistemas.map(sistema => (
                  <option key={sistema.valor} value={sistema.valor}>{sistema.nombre}</option>
                ))}
              </select>
            </div>
            
            <div style={{ flex: 1, minWidth: '180px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>
                Posición
              </label>
              <select
                value={posicionElegida}
                onChange={e => handlePosicionChange(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
              >
                {obtenerOpcionesPosiciones().map(pos => (
                  <option key={pos.valor} value={pos.valor}>{pos.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Controles de animación */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {!animacionActiva ? (
              <button 
                onClick={iniciarAnimacion}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                disabled={resaltarTonicas} // Deshabilitar si está en modo resaltar tónicas
              >
                <span style={{ fontSize: '1rem' }}>▶</span> Iniciar
              </button>
            ) : (
              <button 
                onClick={pausarAnimacion}
                style={{
                  backgroundColor: '#f97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '1rem' }}>⏸</span> Pausar
              </button>
            )}
            
            {/* Botón para mostrar todas las tónicas */}
            <button 
              onClick={() => {
                // Si estamos animando, detener la animación
                if (animacionActiva) {
                  pausarAnimacion();
                }
                // Alternar estado
                setResaltarTonicas(!resaltarTonicas);
              }}
              style={{
                backgroundColor: resaltarTonicas ? '#22a090' : '#e0eaff',
                color: resaltarTonicas ? 'white' : '#2D5B88',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: resaltarTonicas ? 600 : 'normal'
              }}
            >
              <span style={{ fontSize: '1rem' }}>🎯</span> 
              {resaltarTonicas ? 'Ocultar Tónicas' : 'Mostrar Tónicas'}
            </button>
          </div>

          {/* Velocidad de animación */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Velocidad</span>
              <span style={{ fontSize: '0.85rem', color: '#5f7799' }}>Rápido - Lento</span>
            </label>
            <input 
              type="range" 
              min="300" 
              max="2000" 
              step="100"
              value={velocidad}
              onChange={e => setVelocidad(parseInt(e.target.value))}
              style={{ width: '100%' }}
              disabled={resaltarTonicas} // Deshabilitar si está en modo resaltar tónicas
            />
          </div>
          
          {/* Visualización de la secuencia animada */}
          <div 
            key={`${sistemaElegido}-${posicionElegida}-${notaRaiz}-${tipoEscala}`} 
            style={{ 
              transition: 'opacity 0.3s ease-in-out',
              opacity: 1
            }}
          >
            <DiapasonSVGSecuencia 
              secuencia={secuenciaActual}
              pasoActual={pasoActual}
              escala={obtenerEscalaSeleccionada()}
              notaRaiz={notaRaiz}
              nombreSistema={opcionesSistemas.find(s => s.valor === sistemaElegido)?.nombre || ''}
              posicion={posicionElegida}
              resaltarTonicas={resaltarTonicas}
            />
          </div>

          {/* Indicador de progreso - Ocultar cuando no hay animación o paso actual es negativo */}
          {pasoActual >= 0 && (
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#2D5B88', 
                backgroundColor: '#e0eaff', 
                padding: '4px 10px', 
                borderRadius: '4px', 
                fontWeight: 600 
              }}>
                Paso {pasoActual + 1} de {secuenciaActual.length}
              </div>
              <div style={{ 
                width: '200px', 
                height: '6px', 
                backgroundColor: '#e0eaff', 
                borderRadius: '3px' 
              }}>
                <div style={{ 
                  width: `${((pasoActual + 1) / secuenciaActual.length) * 100}%`, 
                  height: '100%', 
                  backgroundColor: '#2563eb', 
                  borderRadius: '3px',
                  transition: 'width 0.2s ease-in-out'
                }} />
              </div>
            </div>
          )}
        </div>
        
        {/* Explicación sobre los sistemas de posiciones */}
        <div style={{ background: '#f0f6ff', padding: '1rem', borderRadius: 8, marginTop: '1rem' }}>
          <h4 style={{ color: '#2D5B88', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 600 }}>Sobre los sistemas de posiciones:</h4>
          <ul style={{ paddingLeft: '1.5rem', color: '#2D5B88', margin: 0 }}>
            <li><b>Sistema CAGED</b>: Basado en las formas de acordes básicos (C, A, G, E, D), permite tocar escalas en cinco posiciones que cubren todo el diapasón.</li>
            <li><b>3 Notas por Cuerda</b>: Sistema que distribuye exactamente tres notas en cada cuerda, ideal para solos y ejercicios de digitación.</li>
            <li><b>5 Posiciones Pentatónicas</b>: Las cinco formas clásicas de la escala pentatónica, fundamentales en blues, rock y muchos otros estilos.</li>
          </ul>
        </div>
        
        {/* Separador */}
        <div style={{ borderTop: '1px solid #e5e7eb', margin: '2rem 0', paddingTop: '2rem' }}>
          <h3 style={{ color: '#2D5B88', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
            Versión Simplificada (sin resaltados especiales)
          </h3>
          
          <EscalasNuevo />
        </div>
      </div>
    );
  };

  // Componentes para las otras pestañas (inicialmente con placeholders)
  const TabAcordes: React.FC = () => {
    const [notaAcorde, setNotaAcorde] = useState('C');
    const [tipoAcorde, setTipoAcorde] = useState('mayor');
    
    // Opciones de tipos de acordes
    const opcionesAcordes = [
      { valor: 'mayor', nombre: 'Mayor' },
      { valor: 'menor', nombre: 'Menor' },
      { valor: 'septima', nombre: '7 (Dominante)' },
      { valor: 'mayor7', nombre: 'Maj7' },
      { valor: 'menor7', nombre: 'm7' },
      { valor: 'disminuido', nombre: 'Disminuido' },
      { valor: 'aumentado', nombre: 'Aumentado' }
    ];
    
    // Función para obtener el acorde según el tipo
    const obtenerAcordeSeleccionado = () => {
      switch (tipoAcorde) {
        case 'mayor':
          return obtenerAcordeMayor(notaAcorde);
        case 'menor':
          return obtenerAcordeMenor(notaAcorde);
        case 'septima':
          return obtenerAcordeSeptima(notaAcorde);
        case 'mayor7':
          return obtenerAcordeMayorSeptima(notaAcorde);
        case 'menor7':
          return obtenerAcordeMenorSeptima(notaAcorde);
        case 'disminuido':
          return obtenerAcordeDisminuido(notaAcorde);
        case 'aumentado':
          return obtenerAcordeAumentado(notaAcorde);
        default:
          return obtenerAcordeMayor(notaAcorde);
      }
    };
    
    // Función para obtener la notación adecuada del acorde
    const obtenerNombreAcorde = () => {
      const tipoTexto = {
        'mayor': '',
        'menor': 'm',
        'septima': '7',
        'mayor7': 'Maj7',
        'menor7': 'm7',
        'disminuido': 'dim',
        'aumentado': 'aug'
      };
      
      return `${notaAcorde}${tipoTexto[tipoAcorde as keyof typeof tipoTexto]}`;
    };
    
    // Mostrar las posiciones comunes del acorde seleccionado
    const acorde = obtenerAcordeSeleccionado();
    
    // Lista de posiciones de acordes más comunes para guitarra
    // Esto se puede expandir con más posiciones y variantes
    const posicionesComunes = [
      { id: 'posicion1', nombre: 'Forma E', descripcion: 'Posición básica en trastes bajos' },
      { id: 'posicion2', nombre: 'Forma A', descripcion: 'Posición en el centro del diapasón' },
      { id: 'posicion3', nombre: 'Forma con cejilla', descripcion: 'Usando cejilla en trastes superiores' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ color: '#2D5B88', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Acordes y posiciones</h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', justifyContent: 'center' }}>
          <div style={{ minWidth: '180px', flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Nota raíz</label>
            <select
              value={notaAcorde}
              onChange={e => setNotaAcorde(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
            >
              {opcionesNotas.map(nota => (
                <option key={nota} value={nota}>{nota}</option>
              ))}
            </select>
          </div>
          
          <div style={{ minWidth: '220px', flex: 2 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Tipo de acorde</label>
            <select
              value={tipoAcorde}
              onChange={e => setTipoAcorde(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
            >
              {opcionesAcordes.map(opAcorde => (
                <option key={opAcorde.valor} value={opAcorde.valor}>{opAcorde.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ padding: '1rem', background: '#f0f6ff', borderRadius: 8, marginBottom: '1rem' }}>
          <h4 style={{ color: '#2D5B88', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 600 }}>Acorde {obtenerNombreAcorde()}</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {acorde.map((nota, idx) => (
              <div key={idx} style={{ 
                padding: '6px 14px', 
                borderRadius: 20, 
                background: idx === 0 ? '#3ED6C1' : idx === 1 ? '#F96D00' : idx === 2 ? '#b22234' : '#7047eb',
                color: idx === 0 ? '#1e3a5c' : '#fff', 
                fontWeight: idx === 0 ? 700 : 600,
                boxShadow: '0 1px 4px rgba(30,58,92,0.1)'
              }}>
                {nota}
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <h5 style={{ color: '#2D5B88', marginBottom: '6px', fontSize: '0.95rem', fontWeight: 600 }}>Posiciones comunes:</h5>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {posicionesComunes.map(pos => (
                <div key={pos.id} style={{ 
                  padding: '6px 14px', 
                  borderRadius: 6, 
                  background: '#fff',
                  color: '#2D5B88', 
                  fontSize: '0.9rem',
                  border: '1px solid #d1dff0'
                }}>
                  {pos.nombre}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DiapasonSVGAcorde 
          acorde={acorde} 
          nombreAcorde={obtenerNombreAcorde()} 
          notaRaiz={notaAcorde} 
        />
      </div>
    );
  };
  
  // Afinaciones alternativas para guitarra
  const afinacionesAlternativas: Record<string, string[]> = {
    'estandar': ['E', 'B', 'G', 'D', 'A', 'E'], // Estándar (de aguda a grave)
    'dropD': ['E', 'B', 'G', 'D', 'A', 'D'], // Drop D
    'openG': ['D', 'B', 'G', 'D', 'G', 'D'], // Open G
    'openD': ['D', 'A', 'F#', 'D', 'A', 'D'], // Open D
    'dadgad': ['D', 'A', 'G', 'D', 'A', 'D'], // DADGAD
    'halfStepDown': ['D#', 'A#', 'F#', 'C#', 'G#', 'D#'], // Medio tono abajo
    'wholeStepDown': ['D', 'A', 'F', 'C', 'G', 'D'], // Un tono abajo
  };
  
  const TabAfinaciones: React.FC = () => {
    const [afinacionSeleccionada, setAfinacionSeleccionada] = useState('estandar');
    const [afinacionPersonalizada, setAfinacionPersonalizada] = useState(afinacionesAlternativas.estandar.slice());
    const [modoPersonalizado, setModoPersonalizado] = useState(false);
    
    // Opciones de notas para seleccionar
    const opcionesNotasAfinacion = [
      'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];
    
    // Nombres de cuerdas para mostrar
    const nombresCuerdas = ['1ª (aguda)', '2ª', '3ª', '4ª', '5ª', '6ª (grave)'];
    
    // Función para cambiar una nota en la afinación personalizada
    const cambiarNotaPersonalizada = (indice: number, nuevaNota: string) => {
      const nuevaAfinacion = [...afinacionPersonalizada];
      nuevaAfinacion[indice] = nuevaNota;
      setAfinacionPersonalizada(nuevaAfinacion);
    };
    
    // Obtener la afinación actual (estándar, alternativa o personalizada)
    const obtenerAfinacionActual = () => {
      if (modoPersonalizado) {
        return afinacionPersonalizada;
      } else {
        return afinacionesAlternativas[afinacionSeleccionada] || afinacionesAlternativas.estandar;
      }
    };
    
    // Opciones de afinaciones predefinidas
    const opcionesAfinaciones = [
      { valor: 'estandar', nombre: 'Estándar (E A D G B E)' },
      { valor: 'dropD', nombre: 'Drop D (D A D G B E)' },
      { valor: 'openG', nombre: 'Open G (D G D G B D)' },
      { valor: 'openD', nombre: 'Open D (D A D F# A D)' },
      { valor: 'dadgad', nombre: 'DADGAD (D A D G A D)' },
      { valor: 'halfStepDown', nombre: 'Medio tono abajo (Eb Ab Db Gb Bb Eb)' },
      { valor: 'wholeStepDown', nombre: 'Un tono abajo (D G C F A D)' },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ color: '#2D5B88', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Afinaciones Alternativas</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
            <button 
              onClick={() => setModoPersonalizado(false)}
              style={{ 
                flex: 1,
                padding: '10px 16px',
                background: !modoPersonalizado ? '#2563eb' : '#e0eaff',
                color: !modoPersonalizado ? '#fff' : '#2D5B88',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Afinaciones Predefinidas
            </button>
            <button 
              onClick={() => setModoPersonalizado(true)}
              style={{ 
                flex: 1,
                padding: '10px 16px',
                background: modoPersonalizado ? '#2563eb' : '#e0eaff',
                color: modoPersonalizado ? '#fff' : '#2D5B88',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Afinación Personalizada
            </button>
          </div>
          
          {!modoPersonalizado ? (
            // Selector de afinaciones predefinidas
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Selecciona una afinación</label>
              <select
                value={afinacionSeleccionada}
                onChange={e => setAfinacionSeleccionada(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
              >
                {opcionesAfinaciones.map(op => (
                  <option key={op.valor} value={op.valor}>{op.nombre}</option>
                ))}
              </select>
            </div>
          ) : (
            // Editor de afinación personalizada
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Personaliza tu afinación</label>
              <div style={{ background: '#f0f6ff', padding: '16px', borderRadius: 8 }}>
                {afinacionPersonalizada.map((nota, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ minWidth: '100px', fontWeight: 600, color: '#2D5B88' }}>{nombresCuerdas[idx]}</span>
                    <select
                      value={nota}
                      onChange={e => cambiarNotaPersonalizada(idx, e.target.value)}
                      style={{ padding: '8px 12px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '0.95rem' }}
                    >
                      {opcionesNotasAfinacion.map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Visualización de la afinación */}
        <div style={{ padding: '1rem', background: '#f0f6ff', borderRadius: 8, marginBottom: '1rem' }}>
          <h4 style={{ color: '#2D5B88', marginBottom: '12px', fontSize: '1.05rem', fontWeight: 600 }}>Afinación Actual:</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {obtenerAfinacionActual().map((nota, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  background: '#fff', 
                  padding: '10px', 
                  borderRadius: 8,
                  minWidth: '70px',
                  boxShadow: '0 1px 4px rgba(30,58,92,0.1)'
                }}
              >
                <span style={{ color: '#5f7799', fontSize: '0.8rem', marginBottom: '4px' }}>{nombresCuerdas[idx]}</span>
                <span style={{ color: '#2D5B88', fontWeight: 700, fontSize: '1.2rem' }}>{nota}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Consejos sobre afinaciones */}
        <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: 8 }}>
          <h4 style={{ color: '#2D5B88', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 600 }}>¿Para qué sirven las afinaciones alternativas?</h4>
          <ul style={{ color: '#1e3a5c', fontSize: '0.95rem', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Drop D:</strong> Facilita acordes de poder en la 6ª cuerda y da más graves. Ideal para rock y metal.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Open G/D:</strong> Crea un acorde al tocar cuerdas al aire. Popular en blues y folk.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>DADGAD:</strong> Produce sonoridades modales, ideal para música celta y folk.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Medio/Un tono abajo:</strong> Reduce la tensión de las cuerdas y da un sonido más grave. Usado en rock y metal.</li>
          </ul>
        </div>
      </div>
    );
  };
  
  const TabMetronomo: React.FC = () => {
    const [bpm, setBpm] = useState(80);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeSignature, setTimeSignature] = useState<[number, number]>([4, 4]);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [volume, setVolume] = useState(0.8);
    
    // Referencia para el intervalo del metrónomo
    const metronomeInterval = useRef<number | null>(null);
    
    // Referencia para el contexto de audio
    const audioContext = useRef<AudioContext | null>(null);
    
    useEffect(() => {
      // Inicializar el contexto de audio
      if (!audioContext.current) {
        audioContext.current = new AudioContext();
      }
      
      // Limpiar el intervalo cuando el componente se desmonte
      return () => {
        if (metronomeInterval.current) {
          clearInterval(metronomeInterval.current);
        }
      };
    }, []);
    
    // Función para crear un tono
    const createOscillator = (frequency: number, duration: number, accent: boolean = false) => {
      if (!audioContext.current) return;
      
      const ctx = audioContext.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = accent ? 'triangle' : 'sine';
      oscillator.frequency.value = accent ? frequency * 1.2 : frequency;
      
      gainNode.gain.value = accent ? volume * 1.5 : volume;
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    };
    
    // Función para tocar un tick del metrónomo
    const tick = (beatNumber: number) => {
      const isAccent = beatNumber % timeSignature[0] === 0;
      createOscillator(isAccent ? 1000 : 800, 0.05, isAccent);
    };
    
    // Iniciar o detener el metrónomo
    const toggleMetronome = () => {
      if (isPlaying) {
        // Detener el metrónomo
        if (metronomeInterval.current) {
          clearInterval(metronomeInterval.current);
          metronomeInterval.current = null;
        }
      } else {
        // Iniciar el metrónomo
        // Calcular intervalo basado en BPM
        const interval = 60000 / bpm;
        
        // Tick inicial
        tick(0);
        setCurrentBeat(0);
        
        // Configurar el intervalo
        metronomeInterval.current = window.setInterval(() => {
          setCurrentBeat(beat => {
            const nextBeat = (beat + 1) % timeSignature[0];
            tick(nextBeat);
            return nextBeat;
          });
        }, interval);
      }
      
      setIsPlaying(!isPlaying);
    };
    
    // Manejar cambios en el BPM
    const handleBpmChange = (newBpm: number) => {
      setBpm(newBpm);
      if (isPlaying) {
        // Reiniciar el metrónomo con el nuevo BPM
        if (metronomeInterval.current) {
          clearInterval(metronomeInterval.current);
        }
        
        const interval = 60000 / newBpm;
        metronomeInterval.current = window.setInterval(() => {
          setCurrentBeat(beat => {
            const nextBeat = (beat + 1) % timeSignature[0];
            tick(nextBeat);
            return nextBeat;
          });
        }, interval);
      }
    };
    
    // Opciones de compás
    const timeSignatureOptions = [
      [2, 4], [3, 4], [4, 4], [5, 4], [6, 8], [9, 8], [12, 8]
    ] as [number, number][];
    
    // Renderizar círculos para representar los pulsos
    const renderBeats = () => {
      const beatsDisplay = [];
      for (let i = 0; i < timeSignature[0]; i++) {
        beatsDisplay.push(
          <div 
            key={i} 
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: i === currentBeat && isPlaying ? '#3ED6C1' : '#e0eaff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              color: i === currentBeat && isPlaying ? '#fff' : '#2D5B88',
              transition: 'all 0.1s ease',
              boxShadow: i === currentBeat && isPlaying ? '0 0 10px rgba(62, 214, 193, 0.5)' : 'none'
            }}
          >
            {i + 1}
          </div>
        );
      }
      return beatsDisplay;
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <h2 style={{ color: '#2D5B88', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Metrónomo</h2>
        
        <div style={{ 
          padding: '2rem', 
          background: '#f8f9fa', 
          borderRadius: 16, 
          boxShadow: '0 2px 10px rgba(30,58,92,0.1)',
          width: '100%',
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {/* Visor de BPM */}
          <div style={{ fontWeight: 700, fontSize: '3rem', color: '#2D5B88' }}>
            {bpm} <span style={{ fontSize: '1.5rem' }}>BPM</span>
          </div>
          
          {/* Indicador de pulsos */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', justifyContent: 'center' }}>
            {renderBeats()}
          </div>
          
          {/* Controles */}
          <div style={{ display: 'flex', gap: '1rem', width: '100%', flexDirection: 'column' }}>
            {/* Control de BPM */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Tempo</span>
                <span style={{ fontSize: '0.85rem', color: '#5f7799' }}>40-220</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={() => handleBpmChange(Math.max(40, bpm - 5))}
                  style={{ 
                    padding: '8px 12px', 
                    background: '#e0eaff', 
                    border: 'none', 
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#2D5B88',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <input 
                  type="range" 
                  min="40" 
                  max="220" 
                  value={bpm} 
                  onChange={(e) => handleBpmChange(parseInt(e.target.value))}
                  style={{ flex: 1 }}
                />
                <button 
                  onClick={() => handleBpmChange(Math.min(220, bpm + 5))}
                  style={{ 
                    padding: '8px 12px', 
                    background: '#e0eaff', 
                    border: 'none', 
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#2D5B88',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Control de compás */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Compás</label>
              <select 
                value={`${timeSignature[0]}/${timeSignature[1]}`}
                onChange={(e) => {
                  const [num, den] = e.target.value.split('/').map(Number);
                  setTimeSignature([num, den]);
                  setCurrentBeat(0);
                }}
                style={{ 
                  width: '100%', 
                  padding: '10px 14px', 
                  border: '1px solid #d1dff0', 
                  borderRadius: 6, 
                  fontSize: '1rem',
                  background: '#fff'
                }}
              >
                {timeSignatureOptions.map(([num, den]) => (
                  <option key={`${num}/${den}`} value={`${num}/${den}`}>{num}/{den}</option>
                ))}
              </select>
            </div>
            
            {/* Control de volumen */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Volumen</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            
            {/* Botón de inicio/pausa */}
            <button 
              onClick={toggleMetronome}
              style={{ 
                marginTop: '1rem',
                padding: '14px 28px', 
                background: isPlaying ? '#B22234' : '#2563eb', 
                border: 'none', 
                borderRadius: 8,
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
              }}
            >
              {isPlaying ? 'Detener' : 'Iniciar'}
            </button>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f6ff', borderRadius: 8, maxWidth: 500, width: '100%' }}>
          <h4 style={{ color: '#2D5B88', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 600 }}>Consejos para practicar:</h4>
          <ul style={{ color: '#1e3a5c', fontSize: '0.95rem', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Practica escalas y patrones con diferentes tempos, empezando lento y aumentando gradualmente.</li>
            <li style={{ marginBottom: '0.5rem' }}>Usa el metrónomo para mejorar tu precisión rítmica y timing.</li>
            <li>Experimenta con diferentes compases para desarrollar tu sentido del ritmo.</li>
          </ul>
        </div>
      </div>
    );
  };
  
  const TabEjercicios: React.FC = () => {
    const [modoEjercicio, setModoEjercicio] = useState<'identificarNotas' | 'intervalos'>('identificarNotas');
    
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#2D5B88', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Ejercicios</h2>
        <p style={{ color: '#1e3a5c', marginBottom: '1.5rem' }}>Practica tu conocimiento de notas e intervalos en el diapasón.</p>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={() => setModoEjercicio('identificarNotas')}
            style={{ 
              padding: '10px 16px',
              background: modoEjercicio === 'identificarNotas' ? '#2563eb' : '#e0eaff',
              color: modoEjercicio === 'identificarNotas' ? '#fff' : '#2D5B88',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Identificar Notas
          </button>
          <button 
            onClick={() => setModoEjercicio('intervalos')}
            style={{ 
              padding: '10px 16px',
              background: modoEjercicio === 'intervalos' ? '#2563eb' : '#e0eaff',
              color: modoEjercicio === 'intervalos' ? '#fff' : '#2D5B88',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Intervalos
          </button>
        </div>
        
        <div style={{ padding: '1.5rem', background: '#f0f6ff', borderRadius: 8, marginBottom: '1.5rem' }}>
          <p style={{ color: '#2D5B88', fontStyle: 'italic' }}>
            ¡Próximamente! Estamos desarrollando ejercicios interactivos para ayudarte a dominar el diapasón de tu instrumento.
          </p>
        </div>
      </div>
    );
  };

  // Asegurarse de que no haya animación activa al iniciar la aplicación
  useEffect(() => {
    // Limpiar cualquier posible animación o estado que pudiera causar círculos naranjas al cargar
    const limpiarAnimaciones = () => {
      // Intentar encontrar y detener cualquier animación automática
      const animacionesExistentes = document.querySelectorAll('[style*="animation"]');
      animacionesExistentes.forEach((el: any) => {
        if (el.style && el.style.animation) {
          el.style.animation = 'none';
        }
      });
    };
    
    // Ejecutar limpieza al cargar
    limpiarAnimaciones();
    
    // Ejecutar limpieza después de 1 segundo para asegurar que se aplique
    const timeoutId = setTimeout(limpiarAnimaciones, 1000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <CuadroInstrumentos />
      
      {/* Botón para volver a la página principal */}
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <button 
          onClick={() => router.push('/')} // Navega a la home de Next.js
          style={{
            background: '#2D5B88',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default Instrumento; 