'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Preview interactivo del metrónomo: péndulo que oscila al ritmo del BPM.
 * Es una vista de muestra; la herramienta completa vive en /herramientas/metronomo.
 */
export default function MetronomeCard() {
  const [bpm, setBpm] = useState(96);
  const pendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pend = pendRef.current;
    if (!pend) return;
    const beat = 60 / bpm;
    pend.style.animation = 'none';
    // reflow para reiniciar la animación con el nuevo tempo
    void pend.offsetWidth;
    pend.style.animation = `pendSwing ${(beat * 2).toFixed(3)}s ease-in-out infinite`;
  }, [bpm]);

  return (
    <article className="flex flex-col rounded-[22px] border border-line bg-[linear-gradient(165deg,#17131F,#110E1A)] p-[30px]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-[22px] font-bold">Metrónomo</h3>
        <span className="inline-flex items-center gap-2 text-xs text-lime">
          <span className="h-[7px] w-[7px] animate-pulseDot rounded-full bg-lime" />
          en vivo
        </span>
      </div>

      <div className="relative mb-2 flex h-[150px] items-end justify-center">
        <div
          ref={pendRef}
          className="absolute bottom-2 w-1 origin-bottom rounded"
          style={{ height: 120, background: 'linear-gradient(#EFE9DD, #6B6580)' }}
        >
          <div className="absolute left-[-9px] top-[26px] h-[14px] w-[22px] rounded bg-pink" />
        </div>
        <div className="absolute bottom-1 h-3 w-[60px] rounded-md bg-[#2A2540]" />
      </div>

      <div className="my-1 text-center">
        <span className="font-display text-[44px] font-extrabold tabular-nums text-ink">{bpm}</span>
        <span className="text-sm text-ink-3"> BPM</span>
      </div>

      <label className="sr-only" htmlFor="home-bpm">
        Tempo en pulsos por minuto
      </label>
      <input
        id="home-bpm"
        type="range"
        min={40}
        max={220}
        value={bpm}
        onChange={(e) => setBpm(parseInt(e.target.value, 10))}
        className="mt-2 w-full"
        style={{ accentColor: '#CFF54B' }}
      />

      <p className="mt-4 text-center text-[13px] text-ink-4">4/4 · deslizá para cambiar el tempo</p>

      <style>{`@keyframes pendSwing{0%{transform:rotate(-26deg)}50%{transform:rotate(26deg)}100%{transform:rotate(-26deg)}}`}</style>
    </article>
  );
}
