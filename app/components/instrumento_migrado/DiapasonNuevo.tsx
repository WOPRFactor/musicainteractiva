'use client';
import React from 'react';

// Tipos para representar posiciones en el diapasón
type Posicion = [number, number]; // [cuerda, traste]
type SecuenciaEscala = Posicion[];

interface PropsDiapason {
  escala: string[];
  notaRaiz: string;
  nombreEscala?: string;
  secuencia?: SecuenciaEscala; // Añadimos la secuencia como prop opcional
}

const DiapasonNuevo: React.FC<PropsDiapason> = ({ escala, notaRaiz, nombreEscala = 'Escala', secuencia }) => {
  // Configuración del mástil
  const numCuerdas = 6;
  const numTrastes = 15;
  const width = 1100;
  const height = 300;
  const margenX = 50;
  const margenY = 30;
  const anchoMastil = width - 2 * margenX;
  const altoMastil = height - 2 * margenY;
  const distanciaEntreTraste = anchoMastil / numTrastes;
  const distanciaEntreCuerda = altoMastil / (numCuerdas - 1);

  // Posiciones de marcas en el diapasón
  const marcasPosiciones = [3, 5, 7, 9, 12];

  // Notas en cada cuerda con afinación estándar (E A D G B e)
  const notasCuerdas = [
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],  // 1ª cuerda - Mi
    ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],  // 2ª cuerda - Si
    ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'], // 3ª cuerda - Sol
    ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'],  // 4ª cuerda - Re
    ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'],  // 5ª cuerda - La
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G']   // 6ª cuerda - Mi
  ];

  // Utilidades para verificar si una nota está en la escala o es la raíz
  const estaEnEscala = (nota: string) => escala.includes(nota);
  const esRaiz = (nota: string) => nota === notaRaiz;

  return (
    <div className="diapason-container">
      <svg width={width} height={height} style={{ margin: '0 auto', display: 'block' }}>
        {/* Fondo del mástil */}
        <rect 
          x={margenX} 
          y={margenY} 
          width={anchoMastil} 
          height={altoMastil} 
          fill="#8B4513" 
          stroke="#000" 
          strokeWidth="1"
        />
        
        {/* Líneas de trastes */}
        {Array.from({ length: numTrastes + 1 }).map((_, traste) => (
          <line 
            key={`traste-${traste}`}
            x1={margenX + traste * distanciaEntreTraste} 
            y1={margenY} 
            x2={margenX + traste * distanciaEntreTraste} 
            y2={margenY + altoMastil} 
            stroke="#ddd" 
            strokeWidth={traste === 0 ? 4 : 2} 
          />
        ))}
        
        {/* Cuerdas */}
        {Array.from({ length: numCuerdas }).map((_, cuerda) => (
          <line 
            key={`cuerda-${cuerda}`}
            x1={margenX} 
            y1={margenY + cuerda * distanciaEntreCuerda} 
            x2={margenX + anchoMastil} 
            y2={margenY + cuerda * distanciaEntreCuerda} 
            stroke="#999" 
            strokeWidth={5 - cuerda * 0.5} 
          />
        ))}
        
        {/* Marcadores de posición */}
        {marcasPosiciones.map((pos) => (
          <circle 
            key={`marca-${pos}`}
            cx={margenX + (pos - 0.5) * distanciaEntreTraste} 
            cy={margenY + altoMastil / 2} 
            r={distanciaEntreCuerda / 6} 
            fill="#ddd" 
          />
        ))}
        
        {/* Marcador doble en el traste 12 */}
        <circle 
          cx={margenX + (12 - 0.5) * distanciaEntreTraste} 
          cy={margenY + (altoMastil / 2) - distanciaEntreCuerda} 
          r={distanciaEntreCuerda / 6} 
          fill="#ddd" 
        />
        
        <circle 
          cx={margenX + (12 - 0.5) * distanciaEntreTraste} 
          cy={margenY + (altoMastil / 2) + distanciaEntreCuerda} 
          r={distanciaEntreCuerda / 6} 
          fill="#ddd" 
        />
        
        {/* Renderizado de notas en el diapasón */}
        {notasCuerdas.map((cuerda, cuerdaIdx) => (
          cuerda.map((nota, trasteIdx) => {
            // Solo dibujar círculos para notas que están en la escala
            if (estaEnEscala(nota)) {
              return (
                <g key={`nota-${cuerdaIdx}-${trasteIdx}`}>
                  <circle 
                    cx={margenX + (trasteIdx === 0 ? distanciaEntreTraste / 4 : (trasteIdx - 0.5) * distanciaEntreTraste)} 
                    cy={margenY + cuerdaIdx * distanciaEntreCuerda} 
                    r={distanciaEntreCuerda / 3}
                    fill="#fff"  // Todos los círculos son blancos
                    stroke="#000"
                    strokeWidth="1"
                  />
                  <text 
                    x={margenX + (trasteIdx === 0 ? distanciaEntreTraste / 4 : (trasteIdx - 0.5) * distanciaEntreTraste)} 
                    y={margenY + cuerdaIdx * distanciaEntreCuerda + 5} 
                    textAnchor="middle" 
                    fontSize={distanciaEntreCuerda / 3}
                    fill="#000"
                  >
                    {nota}
                  </text>
                </g>
              );
            }
            return null;
          })
        ))}
        
        {/* Titulo del diapasón */}
        <text 
          x={width / 2} 
          y={20} 
          textAnchor="middle" 
          fontSize="18" 
          fontWeight="bold"
        >
          {`${nombreEscala} de ${notaRaiz}`}
        </text>
      </svg>
    </div>
  );
};

export default DiapasonNuevo; 