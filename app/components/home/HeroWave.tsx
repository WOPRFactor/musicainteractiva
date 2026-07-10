'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Onda sonora animada en canvas, fondo del hero. Portada del rediseño.
 * Respeta prefers-reduced-motion (dibuja un frame estático).
 */
export default function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const layers = [
      { color: 'rgba(207,245,75,0.55)', amp: 46, len: 0.006, sp: 0.9, w: 2.2, off: 0 },
      { color: 'rgba(255,84,112,0.42)', amp: 34, len: 0.009, sp: 1.4, w: 1.8, off: 2 },
      { color: 'rgba(86,225,233,0.40)', amp: 60, len: 0.004, sp: 0.6, w: 1.6, off: 4 },
    ];

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t = 0;
    let raf = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cy = h * 0.52;
      for (const L of layers) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const env = Math.sin((x / w) * Math.PI);
          const y =
            cy +
            Math.sin(x * L.len + t * L.sp + L.off) * L.amp * env +
            Math.sin(x * L.len * 2.3 + t * L.sp * 0.7) * L.amp * 0.35 * env;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = L.color;
        ctx.lineWidth = L.w;
        ctx.stroke();
      }
      t += 0.03;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    />
  );
}
