'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { FaPlay, FaStop, FaRandom } from 'react-icons/fa';
import { reproducirSecuencia } from './audioUtils';

// Definición de notas y acordes
const notas = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'
];
const tiposAcordes = ['', 'm', '7', 'm7', 'maj7', 'dim', 'aug'];

// Mapeo de grados a índices de la escala mayor
const gradoAIndice: { [key: string]: number } = {
  'I': 0, 'II': 1, 'III': 2, 'IV': 3, 'V': 4, 'VI': 5, 'VII': 6
};

// Definición de grados posibles
const gradosDisponibles = [
  'I', 'bII', 'II', 'bIII', 'III', 'IV', '#IV', 'V', 'bVI', 'VI', 'bVII', 'VII'
];

// Mapeo de grados a intervalos en semitonos
const gradoASemitono: { [key: string]: number } = {
  'I': 0, 'bII': 1, 'II': 2, 'bIII': 3, 'III': 4, 'IV': 5, '#IV': 6, 'V': 7, 'bVI': 8, 'VI': 9, 'bVII': 10, 'VII': 11
};

// Componente para el selector de notas
const SelectorNota = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
  >
    {notas.map((nota) => (
      <option key={nota} value={nota}>
        {nota}
      </option>
    ))}
  </select>
);

// Componente para el selector de acordes
const SelectorAcorde = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  // Separar nota y tipo de acorde
  const match = value.match(/^([A-G][b#]?)(.*)$/);
  const nota = match ? match[1] : '';
  const tipo = match ? match[2] : '';
  return (
    <div className="flex gap-2">
      <select
        value={nota}
        onChange={(e) => onChange(e.target.value + tipo)}
        className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      >
        {notas.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <select
        value={tipo}
        onChange={(e) => onChange(nota + e.target.value)}
        className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      >
        {tiposAcordes.map((t) => (
          <option key={t} value={t}>
            {t || 'mayor'}
          </option>
        ))}
      </select>
    </div>
  );
};

const progresionesMayores: { [key: string]: string[] } = {
  'C':   ['C', 'F', 'G', 'C'],
  'C#':  ['C#', 'F#', 'G#', 'C#'],
  'Db':  ['Db', 'Gb', 'Ab', 'Db'],
  'D':   ['D', 'G', 'A', 'D'],
  'D#':  ['D#', 'G#', 'A#', 'D#'],
  'Eb':  ['Eb', 'Ab', 'Bb', 'Eb'],
  'E':   ['E', 'A', 'B', 'E'],
  'F':   ['F', 'Bb', 'C', 'F'],
  'F#':  ['F#', 'B', 'C#', 'F#'],
  'Gb':  ['Gb', 'Cb', 'Db', 'Gb'],
  'G':   ['G', 'C', 'D', 'G'],
  'G#':  ['G#', 'C#', 'D#', 'G#'],
  'Ab':  ['Ab', 'Db', 'Eb', 'Ab'],
  'A':   ['A', 'D', 'E', 'A'],
  'A#':  ['A#', 'D#', 'F', 'A#'],
  'Bb':  ['Bb', 'Eb', 'F', 'Bb'],
  'B':   ['B', 'E', 'F#', 'B'],
  'Cb':  ['Cb', 'Fb', 'Gb', 'Cb'],
};

function obtenerProgresionMayor(nota: string) {
  return progresionesMayores[nota] || ['C', 'F', 'G', 'C'];
}

// Función para obtener la escala mayor de una nota
function obtenerEscalaMayor(tonica: string) {
  const escala = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const idx = escala.indexOf(tonica.replace('b', '#'));
  if (idx === -1) return escala;
  return Array.from({ length: 7 }, (_, i) => escala[(idx + [0,2,4,5,7,9,11][i]) % 12]);
}

// Función para obtener la nota de un grado en una tonalidad
function obtenerNotaDeGrado(tonica: string, grado: string) {
  const escala = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const enarmonicos: { [key: string]: string } = {
    'C#': 'C#', 'Db': 'C#', 'D♭': 'C#',
    'D#': 'D#', 'Eb': 'D#', 'E♭': 'D#',
    'F#': 'F#', 'Gb': 'F#', 'G♭': 'F#',
    'G#': 'G#', 'Ab': 'G#', 'A♭': 'G#',
    'A#': 'A#', 'Bb': 'A#', 'B♭': 'A#',
    'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'A': 'A', 'B': 'B'
  };

  // Normalizar la tónica
  const tonicaNormalizada = enarmonicos[tonica.replace('♭', 'b')] || tonica;
  const idx = escala.indexOf(tonicaNormalizada);
  if (idx === -1) return tonica;

  // Obtener el índice de la nota resultante
  const idxResultante = (idx + gradoASemitono[grado]) % 12;

  // Determinar si usar bemol o sostenido basado en la tónica original
  const usarBemol = /b|♭/.test(tonica) || ['Db','Eb','Gb','Ab','Bb'].includes(tonica);
  
  // Retornar la nota con la notación apropiada
  return usarBemol ? escala[idxResultante].replace('#', 'b') : escala[idxResultante];
}

// Función para calcular el grado de una nota respecto a la tonalidad
function calcularGrado(tonica: string, nota: string) {
  const escala = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const grados = ['I', 'bII', 'II', 'bIII', 'III', 'IV', '#IV', 'V', 'bVI', 'VI', 'bVII', 'VII'];
  const idxTonica = escala.indexOf(tonica.replace('b', '#'));
  const idxNota = escala.indexOf(nota.replace('b', '#'));
  if (idxTonica === -1 || idxNota === -1) return '';
  let distancia = (idxNota - idxTonica + 12) % 12;
  return grados[distancia] || '';
}

export default function NotaPedalPage() {
  const [notaPedal, setNotaPedal] = useState('C');
  const [acordes, setAcordes] = useState([
    { grado: 'I', tipo: '', compases: 1 },
    { grado: 'IV', tipo: '', compases: 1 },
    { grado: 'V', tipo: '', compases: 1 },
    { grado: 'I', tipo: '', compases: 1 },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(80);
  const [clickActivo, setClickActivo] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Nueva sección: Secuencia de Notas
  const [notasSecuencia, setNotasSecuencia] = useState([
    { grado: 'I' },
    { grado: 'II' },
    { grado: 'III' },
    { grado: 'IV' },
  ]);

  // Estado para el tab activo
  const [tabActivo, setTabActivo] = useState<'acordes' | 'notas'>('acordes');

  // Inicializar AudioContext
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new AudioContext();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Función para manejar la reproducción
  const handlePlay = async () => {
    if (!audioContextRef.current) return;

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      // Detener la reproducción
      setIsPlaying(false);
      if (audioContextRef.current) {
        await audioContextRef.current.close();
        audioContextRef.current = new AudioContext();
      }
    } else {
      // Iniciar la reproducción
      setIsPlaying(true);
      const notasAcordes = acordes.map(a => obtenerNotaDeGrado(notaPedal, a.grado) + a.tipo);
      const duraciones = acordes.map(a => a.compases);
      reproducirSecuencia(notaPedal, notasAcordes, tempo, audioContextRef.current, duraciones, clickActivo);
      
      // Detener después de que termine la secuencia
      const duracionTotal = duraciones.reduce((acc, d) => acc + d, 0) * (60 / tempo * 4) * 1000;
      setTimeout(() => {
        setIsPlaying(false);
      }, duracionTotal);
    }
  };

  // Función para agregar un nuevo acorde
  const agregarAcorde = () => {
    setAcordes([...acordes, { grado: 'I', tipo: '', compases: 1 }]);
  };

  // Función para eliminar un acorde
  const eliminarAcorde = (index: number) => {
    setAcordes(acordes.filter((_, i) => i !== index));
  };

  // Función para actualizar un acorde
  const actualizarAcorde = (index: number, nuevoAcorde: string) => {
    const nuevosAcordes = [...acordes];
    nuevosAcordes[index] = { ...nuevosAcordes[index], tipo: nuevoAcorde.split('').pop() || '' };
    setAcordes(nuevosAcordes);
  };

  // Función para actualizar la duración de un acorde
  const actualizarDuracion = (index: number, nuevaDuracion: number) => {
    const nuevasDuraciones = [...acordes.map(a => ({ ...a, compases: nuevaDuracion }))];
    setAcordes(nuevasDuraciones);
  };

  // Función para generar una secuencia aleatoria
  const generarSecuenciaAleatoria = () => {
    const secuenciaAleatoria = Array(4).fill(0).map(() => {
      const notaAleatoria = notas[Math.floor(Math.random() * notas.length)];
      const tipoAleatorio = tiposAcordes[Math.floor(Math.random() * tiposAcordes.length)];
      return { grado: 'I', tipo: tipoAleatorio, compases: 1 };
    });
    setAcordes(secuenciaAleatoria);
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="relative w-full">
        <nav className="w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg px-2 py-2 flex items-center gap-2 sticky top-0 z-20 rounded-b-md">
          <Link
            href="/"
            className="flex items-center justify-center text-white font-bold px-3 py-1 rounded hover:bg-purple-700 transition-colors whitespace-nowrap text-lg mr-4 min-w-[44px]"
            title="Inicio"
          >
            <AiFillHome className="text-2xl" />
          </Link>
        </nav>
      </div>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-purple-800 tracking-tight">Nota Pedal</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-700 mb-6">
            La nota pedal es una técnica de composición donde una nota se mantiene constante mientras los acordes cambian por encima de ella.
            Esta herramienta te ayudará a practicar y entender mejor este concepto.
          </p>

          {/* Controles principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nota Pedal
              </label>
              <SelectorNota value={notaPedal} onChange={setNotaPedal} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo (BPM)
              </label>
              <input
                type="range"
                min="40"
                max="200"
                value={tempo}
                onChange={(e) => setTempo(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-600">{tempo} BPM</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="clickActivo"
                checked={clickActivo}
                onChange={() => setClickActivo(!clickActivo)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <label htmlFor="clickActivo" className="text-sm text-gray-700 select-none">Click activo</label>
            </div>
          </div>

          {/* Tabs para seleccionar sector */}
          <div className="flex gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-md font-bold transition-colors ${tabActivo === 'acordes' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setTabActivo('acordes')}
            >
              Secuencia de Acordes
            </button>
            <button
              className={`px-6 py-2 rounded-md font-bold transition-colors ${tabActivo === 'notas' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setTabActivo('notas')}
            >
              Secuencia de Notas
            </button>
          </div>

          {/* Secuencia de Acordes */}
          {tabActivo === 'acordes' && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Secuencia de Acordes</h2>
                <button
                  onClick={generarSecuenciaAleatoria}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                >
                  <FaRandom />
                  Aleatorio
                </button>
              </div>
              <div className="space-y-4">
                {acordes.map((acorde, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-gray-600 w-8">{index + 1}.</span>
                    <select
                      value={acorde.grado}
                      onChange={e => {
                        const nuevoGrado = e.target.value;
                        setAcordes(acordes => acordes.map((a, i) => i === index ? { ...a, grado: nuevoGrado } : a));
                      }}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                    >
                      {gradosDisponibles.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <select
                      value={acorde.tipo}
                      onChange={e => {
                        const nuevoTipo = e.target.value;
                        setAcordes(acordes => acordes.map((a, i) => i === index ? { ...a, tipo: nuevoTipo } : a));
                      }}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                    >
                      {tiposAcordes.map(tipo => (
                        <option key={tipo} value={tipo}>{tipo || 'mayor'}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      value={acorde.compases}
                      onChange={e => {
                        const nuevaDur = Math.max(1, parseInt(e.target.value) || 1);
                        setAcordes(acordes => acordes.map((a, i) => i === index ? { ...a, compases: nuevaDur } : a));
                      }}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                      title="Cantidad de compases"
                    />
                    <span className="text-xs text-gray-500">compases</span>
                    <button
                      onClick={() => eliminarAcorde(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                    <span className="text-gray-700 font-semibold">
                      {obtenerNotaDeGrado(notaPedal, acorde.grado)} {acorde.tipo ? acorde.tipo : 'mayor'}
                    </span>
                  </div>
                ))}
                <button
                  onClick={agregarAcorde}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Agregar Acorde
                </button>
              </div>
            </div>
          )}
          {/* Secuencia de Notas */}
          {tabActivo === 'notas' && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Secuencia de Notas</h2>
              <div className="space-y-4">
                {notasSecuencia.map((nota, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-gray-600 w-8">{index + 1}.</span>
                    <select
                      value={nota.grado}
                      onChange={e => {
                        const nuevoGrado = e.target.value;
                        setNotasSecuencia(notasSecuencia => notasSecuencia.map((n, i) => i === index ? { ...n, grado: nuevoGrado } : n));
                      }}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                    >
                      {gradosDisponibles.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <span className="text-gray-700 font-semibold">
                      {obtenerNotaDeGrado(notaPedal, nota.grado)}
                    </span>
                    <button
                      onClick={() => setNotasSecuencia(notasSecuencia.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setNotasSecuencia([...notasSecuencia, { grado: 'I' }])}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Agregar Nota
                </button>
              </div>
            </div>
          )}

          {/* Controles de reproducción */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                if (tabActivo === 'acordes') {
                  handlePlay();
                } else {
                  // Reproducir secuencia de notas
                  if (!audioContextRef.current) return;
                  if (audioContextRef.current.state === 'suspended') {
                    audioContextRef.current.resume();
                  }
                  const notas = notasSecuencia.map(n => obtenerNotaDeGrado(notaPedal, n.grado));
                  let tiempo = 0;
                  notas.forEach((nota, i) => {
                    setTimeout(() => {
                      reproducirSecuencia(nota, [nota], tempo, audioContextRef.current!, [1], clickActivo);
                    }, tiempo);
                    tiempo += (60 / tempo * 4) * 1000;
                  });
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? (
                <>
                  <FaStop />
                  Detener
                </>
              ) : (
                <>
                  <FaPlay />
                  Reproducir
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visualización de la notación musical */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notación Musical</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            {/* Aquí irá la visualización de la notación musical */}
            <p className="text-gray-600 text-center">
              Visualización de la notación musical en desarrollo...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 