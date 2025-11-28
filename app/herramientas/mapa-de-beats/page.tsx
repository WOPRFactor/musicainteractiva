"use client";
import React, { useState, useRef, useEffect } from "react";

const metricas = ["2/4", "3/4", "4/4", "5/4", "6/8", "7/4", "9/8", "12/8"];
const beatsPorMetrica: Record<string, number> = {
  "2/4": 2,
  "3/4": 3,
  "4/4": 4,
  "5/4": 5,
  "6/8": 6,
  "7/4": 7,
  "9/8": 9,
  "12/8": 12,
};

function crearCompas(metrica: string) {
  return {
    metrica,
    acentos: Array(beatsPorMetrica[metrica]).fill(1), // 1: fuerte, 0: débil, -1: silencio
  };
}

function playWebAudioClick(accent: number, isFirstBeat: boolean, ctx: AudioContext) {
  // -1: silencio
  if (accent === -1) return;

  if (isFirstBeat) {
    // Primer beat: sonido especial (igual que metrónomo)
    const gain = ctx.createGain();
    gain.gain.value = 1.2;
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = 3000;
    const punchGain = ctx.createGain();
    punchGain.gain.value = 1.5;
    osc.connect(punchGain);
    punchGain.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc.stop(ctx.currentTime + 0.09);
  } else if (accent === 1) {
    // Beat fuerte (no primer beat): fuerte pero menos notorio
    const gain = ctx.createGain();
    gain.gain.value = 0.5;
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = 1200;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.stop(ctx.currentTime + 0.08);
  } else if (accent === 0) {
    // Beat débil
    const gain = ctx.createGain();
    gain.gain.value = 0.15;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 600;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.stop(ctx.currentTime + 0.07);
  }
}

export default function MapaDeBeats() {
  const [cantidad, setCantidad] = useState(4);
  const [compases, setCompases] = useState(() => Array.from({ length: 4 }, () => crearCompas("4/4")));
  const [isRunning, setIsRunning] = useState(false);
  const [current, setCurrent] = useState({ compas: 0, beat: 0 });
  const audioCtxRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<any>(null);
  const [bpm, setBpm] = useState(90);
  const isRunningRef = useRef(false);
  const [loop, setLoop] = useState(false);

  // Cambiar cantidad de compases
  const handleCantidad = (n: number) => {
    setCantidad(n);
    setCompases((prev) => {
      if (n > prev.length) {
        return [...prev, ...Array.from({ length: n - prev.length }, () => crearCompas("4/4"))];
      } else {
        return prev.slice(0, n);
      }
    });
  };

  // Cambiar métrica de un compás
  const handleMetrica = (idx: number, metrica: string) => {
    setCompases((prev) => prev.map((c, i) => i === idx ? crearCompas(metrica) : c));
  };

  // Cambiar acento de un beat
  const toggleAcento = (compasIdx: number, beatIdx: number) => {
    setCompases((prev) => prev.map((c, i) =>
      i === compasIdx
        ? { ...c, acentos: c.acentos.map((a, j) => j === beatIdx ? (a === 1 ? 0 : a === 0 ? -1 : 1) : a) }
        : c
    ));
  };

  // Play/Pausa
  const start = async () => {
    let ctx = audioCtxRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
    }
    if (ctx.state === 'suspended') await ctx.resume();
    isRunningRef.current = true;
    setIsRunning(true);
    setCurrent({ compas: 0, beat: 0 });
    schedule(ctx, 0, 0);
  };
  const stop = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    if (schedulerRef.current) clearTimeout(schedulerRef.current);
    setCurrent({ compas: 0, beat: 0 });
    if (audioCtxRef.current) audioCtxRef.current.close();
    audioCtxRef.current = null;
  };

  // Scheduler con control por ref
  const schedule = (ctx: AudioContext, compasIdx: number, beatIdx: number) => {
    if (!isRunningRef.current) return;
    if (compasIdx >= compases.length) {
      if (loop) {
        schedule(ctx, 0, 0);
        return;
      } else {
        stop();
        return;
      }
    }
    const compas = compases[compasIdx];
    const isFirstBeat = beatIdx === 0;
    const accent = isFirstBeat ? 1 : compas.acentos[beatIdx];
    playWebAudioClick(accent, isFirstBeat, ctx);
    setCurrent({ compas: compasIdx, beat: beatIdx });
    let nextCompas = compasIdx;
    let nextBeat = beatIdx + 1;
    if (nextBeat >= compas.acentos.length) {
      nextCompas++;
      nextBeat = 0;
    }
    schedulerRef.current = setTimeout(() => schedule(ctx, nextCompas, nextBeat), 60000 / bpm);
  };

  // Si cambia el BPM y está corriendo, reiniciar el scheduler
  useEffect(() => {
    if (isRunning) {
      stop();
      setTimeout(start, 100);
    }
    // eslint-disable-next-line
  }, [bpm]);

  // Visualización de 4 compases por línea
  const compasesPorLinea = 4;
  const lineas = [];
  for (let i = 0; i < compases.length; i += compasesPorLinea) {
    lineas.push(compases.slice(i, i + compasesPorLinea));
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Mapa de Beats</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-4">
          <label className="font-medium text-gray-700">Cantidad de compases:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={cantidad}
            onChange={e => handleCantidad(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-center"
          />
        </div>
        <div className="flex flex-col gap-4">
          {lineas.map((linea, lineaIdx) => (
            <div key={lineaIdx} className="flex gap-6 mb-2">
              {linea.map((compas, idx) => {
                const globalIdx = lineaIdx * compasesPorLinea + idx;
                return (
                  <div key={globalIdx} className="flex flex-col items-center bg-gray-100 rounded p-2 min-w-[180px]">
                    <span className="font-bold text-indigo-700 mb-1">Compás {globalIdx + 1}</span>
                    <select
                      value={compas.metrica}
                      onChange={e => handleMetrica(globalIdx, e.target.value)}
                      className="border rounded px-2 py-1 mb-2"
                    >
                      {metricas.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <div className="flex gap-2">
                      {compas.acentos.map((a, j) => (
                        <button
                          key={j}
                          onClick={() => toggleAcento(globalIdx, j)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg
                            ${a === 1 ? 'bg-indigo-600 text-white border-indigo-800' : a === 0 ? 'bg-yellow-300 text-yellow-900 border-yellow-500' : 'bg-gray-300 text-gray-500 border-gray-400'}
                            ${isRunning && current.compas === globalIdx && current.beat === j ? 'ring-4 ring-indigo-300' : ''}`}
                          title={a === 1 ? 'Fuerte' : a === 0 ? 'Débil' : 'Silencio'}
                        >
                          {a === 1 ? '●' : a === 0 ? '◉' : '–'}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {/* Control de BPM */}
        <div className="flex items-center gap-4 mb-4">
          <label className="font-medium text-gray-700">Velocidad (BPM):</label>
          <input
            type="number"
            min={30}
            max={300}
            value={bpm}
            onChange={e => setBpm(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-center"
          />
        </div>
        {/* Switch de loop */}
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="switch-loop" className="text-sm font-medium text-gray-700">Loop</label>
          <input
            id="switch-loop"
            type="checkbox"
            checked={loop}
            onChange={e => setLoop(e.target.checked)}
            className="accent-indigo-600 w-5 h-5"
          />
        </div>
        {/* Botón Play/Pausa */}
        <div className="flex justify-center mt-4">
          <button
            onClick={isRunning ? stop : start}
            className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-white text-3xl transition ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            aria-label={isRunning ? 'Pausar' : 'Reproducir'}
            type="button"
          >
            {isRunning ? (
              // Pausa
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="6" width="6" height="20" rx="2" fill="white" />
                <rect x="19" y="6" width="6" height="20" rx="2" fill="white" />
              </svg>
            ) : (
              // Play
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="8,6 26,16 8,26" fill="white" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </main>
  );
} 