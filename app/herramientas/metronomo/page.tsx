"use client";
import React, { useState, useRef, useEffect } from "react";

const compases = ["2/4", "3/4", "4/4", "5/4", "7/4", "6/8", "9/8", "12/8"];
const subdivisiones = ["Negra", "Corchea", "Tresillo", "Semicorchea"];
const tiposSonido = ["Seno", "Madera", "Digital Suave"];

const beatsPorCompas = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
  '5/4': 5,
  '7/4': 7,
  '6/8': 6,
  '9/8': 9,
  '12/8': 12,
};

function playWebAudioClick(accent: boolean, tipo: string, ctx: AudioContext, subdiv = false) {
  if (tipo === "Madera") {
    const gain = ctx.createGain();
    gain.gain.value = subdiv ? 0.08 : accent ? 1.2 : 0.15;
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = subdiv ? 400 : accent ? 3000 : 700;
    
    if (accent) {
      const punchGain = ctx.createGain();
      punchGain.gain.value = 1.5;
      osc.connect(punchGain);
      punchGain.connect(gain);
    } else {
      osc.connect(gain);
    }
    
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc.stop(ctx.currentTime + 0.09);
  } else if (tipo === "Digital Suave") {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (subdiv ? 0.12 : accent ? 2.0 : 0.3);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = subdiv ? 400 : accent ? 3500 : 900;
    
    if (accent) {
      const punchGain = ctx.createGain();
      punchGain.gain.value = 1.8;
      noise.connect(filter);
      filter.connect(punchGain);
      punchGain.connect(ctx.destination);
    } else {
      noise.connect(filter);
      filter.connect(ctx.destination);
    }
    
    noise.start();
    noise.stop(ctx.currentTime + 0.06);
  } else {
    // Seno (default)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = accent ? "triangle" : "sine";
    osc.frequency.value = subdiv ? 350 : accent ? 2800 : 600;
    gain.gain.value = subdiv ? 0.07 : accent ? 1.0 : 0.13;
    
    if (accent) {
      const punchGain = ctx.createGain();
      punchGain.gain.value = 1.6;
      osc.connect(punchGain);
      punchGain.connect(gain);
    } else {
      osc.connect(gain);
    }
    
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }
}

export default function MetronomoAvanzado() {
  const [bpm, setBpm] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [compas, setCompas] = useState("4/4");
  const [subdiv, setSubdiv] = useState("Negra");
  const [acento, setAcento] = useState([true, false, false, false]);
  const [tipoSonido, setTipoSonido] = useState("Seno");
  const [beat, setBeat] = useState(0);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const schedulerRef = useRef<any>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const [tresillos, setTresillos] = useState(false);
  const [cuatrillos, setCuatrillos] = useState(false);

  // Ajustar acentos al cambiar compás
  useEffect(() => {
    const beats = beatsPorCompas[compas] || 4;
    setAcento(Array.from({ length: beats }, (_, i) => i === 0));
    setBeat(0);
    if (isRunning) {
      stop();
      setTimeout(start, 100);
    }
    // eslint-disable-next-line
  }, [compas]);

  // Scheduler de audio preciso
  const schedule = () => {
    if (!audioCtx) return;
    const secondsPerBeat = 60.0 / bpm;
    while (nextNoteTimeRef.current < audioCtx.currentTime + 0.1) {
      playWebAudioClick(acento[currentBeatRef.current], tipoSonido, audioCtx);
      setBeat(currentBeatRef.current);
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current = (currentBeatRef.current + 1) % acento.length;
    }
    schedulerRef.current = setTimeout(schedule, 25);
  };

  const start = async () => {
    let ctx = audioCtx;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Reanudar el contexto si está suspendido
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    setAudioCtx(ctx); // solo para referencia visual, el scheduler usará ctx local
    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    currentBeatRef.current = 0;
    setBeat(0);
    setIsRunning(true);
    schedulerRef.current = setTimeout(() => scheduleWithCtx(ctx), 25);
  };

  // Nuevo scheduler que usa el contexto local
  const scheduleWithCtx = (ctx: AudioContext) => {
    const secondsPerBeat = 60.0 / bpm;
    const subdivs = tresillos ? 3 : cuatrillos ? 4 : 1;
    const subdivTime = secondsPerBeat / subdivs;
    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      // Beat principal
      if ((currentBeatRef.current % subdivs) === 0) {
        playWebAudioClick(acento[Math.floor(currentBeatRef.current / subdivs)], tipoSonido, ctx);
        setBeat(Math.floor(currentBeatRef.current / subdivs));
      } else {
        // Subdivisión
        playWebAudioClick(false, tipoSonido, ctx, true); // true: es subdivisión
      }
      nextNoteTimeRef.current += subdivTime;
      currentBeatRef.current = (currentBeatRef.current + 1) % (acento.length * subdivs);
    }
    schedulerRef.current = setTimeout(() => scheduleWithCtx(ctx), 25);
  };

  const stop = () => {
    setIsRunning(false);
    if (schedulerRef.current) clearTimeout(schedulerRef.current);
    setBeat(0);
    if (audioCtx) {
      audioCtx.close();
      setAudioCtx(null);
    }
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
    if (isRunning) {
      stop();
      setTimeout(start, 100);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Metrónomo Avanzado</h1>
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
        {/* BPM */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">BPM</label>
          <input type="range" min={20} max={300} value={bpm} onChange={handleBpmChange} className="w-full" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>20</span><span>{bpm}</span><span>300</span>
          </div>
        </div>
        {/* Compás */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Compás</label>
          <select value={compas} onChange={e => setCompas(e.target.value)} className="w-full rounded border-gray-300">
            {compases.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {/* Subdivisión */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subdivisión</label>
          <select value={subdiv} onChange={e => setSubdiv(e.target.value)} className="w-full rounded border-gray-300">
            {subdivisiones.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {/* Tipo de Sonido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Sonido</label>
          <select value={tipoSonido} onChange={e => setTipoSonido(e.target.value)} className="w-full rounded border-gray-300">
            {tiposSonido.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {/* Acentos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Acentos</label>
          <div className="flex gap-2">
            {acento.map((a, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-full border-2 ${a ? 'bg-indigo-600 border-indigo-800' : 'bg-white border-gray-300'} ${beat === i ? 'ring-2 ring-indigo-400' : ''}`}
                onClick={() => setAcento(acento.map((v, idx) => idx === i ? !v : v))}
                type="button"
              />
            ))}
          </div>
        </div>
        {/* Subdivisión por botones con SVGs */}
        <div className="flex gap-4 mb-2">
          <button
            className={`px-3 py-1 rounded font-bold border flex items-center justify-center ${tresillos ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border-indigo-400'} transition`}
            onClick={() => { setTresillos(!tresillos); if (!tresillos) setCuatrillos(false); }}
            type="button"
            title="Tresillo"
          >
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="10" fontSize="10" fontWeight="bold" fill="currentColor">3</text>
              <path d="M 6 15 Q 16 22 26 15" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
          <button
            className={`px-3 py-1 rounded font-bold border flex items-center justify-center ${cuatrillos ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border-indigo-400'} transition`}
            onClick={() => { setCuatrillos(!cuatrillos); if (!cuatrillos) setTresillos(false); }}
            type="button"
            title="Cuatrillo"
          >
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="12" y="10" fontSize="10" fontWeight="bold" fill="currentColor">4</text>
              <path d="M 6 15 Q 16 22 26 15" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>
        {/* Botón Play/Pausa */}
        <div className="flex gap-4 justify-center">
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
        {/* Visualización de beats */}
        <div className="flex gap-2 justify-center mt-4">
          {acento.map((a, i) => (
            <div key={i} className={`w-6 h-6 rounded-full ${beat === i ? 'bg-indigo-600' : a ? 'bg-indigo-300' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>
    </main>
  );
} 