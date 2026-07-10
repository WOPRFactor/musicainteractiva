import React from 'react';
import Link from 'next/link';
import { ButtonLink } from './components/ui/Button';
import Card from './components/ui/Card';
import SectionHeading, { Accented } from './components/ui/SectionHeading';
import EqualizerBars from './components/ui/EqualizerBars';
import HeroWave from './components/home/HeroWave';
import MetronomeCard from './components/home/MetronomeCard';

const features = [
  {
    n: '01',
    accent: 'orange' as const,
    color: '#FF9F45',
    title: 'Folklore Argentino',
    desc: 'Raíces, ritmos y melodías de la música argentina, explorados de forma interactiva.',
  },
  {
    n: '02',
    accent: 'cyan' as const,
    color: '#56E1E9',
    title: 'Armonía',
    desc: 'Acordes, cadencias y progresiones: dominá la lógica que sostiene toda canción.',
  },
  {
    n: '03',
    accent: 'pink' as const,
    color: '#FF5470',
    title: 'Ritmo',
    desc: 'Desarrollá tu pulso interno con ejercicios prácticos, subdivisiones y metrónomos vivos.',
  },
  {
    n: '04',
    accent: 'lime' as const,
    color: '#CFF54B',
    title: 'Exclusivo Bajistas',
    desc: 'El mundo en clave de Fa. Líneas, técnica y groove para las cuatro (y cinco) cuerdas.',
  },
];

const teoria = [
  { n: '01', color: '#CFF54B', title: 'Fundamentos y Conceptos Básicos', desc: 'Altura · notación · intervalos · triadas' },
  { n: '02', color: '#56E1E9', title: 'Escalas y Tonalidad', desc: 'Armaduras · modal · modulación' },
  { n: '03', color: '#FF5470', title: 'Acordes y Progresiones', desc: 'Séptimas · función · napolitano · +6' },
  { n: '04', color: '#FF9F45', title: 'Ritmo, Notas de Paso y Texturas', desc: 'Compás · bordaduras · acompañamiento' },
  { n: '05', color: '#CFF54B', title: 'Análisis y Formas Musicales', desc: 'Frase · binaria · sonata · rondó' },
  { n: '06', color: '#56E1E9', title: 'Técnicas Avanzadas y Jazz', desc: 'Contrapunto · jazz · conjuntos · serialismo' },
];

export default function Home() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <header
        id="top"
        className="relative flex min-h-[94vh] flex-col justify-center overflow-hidden px-[clamp(20px,5vw,72px)] pb-[60px] pt-[clamp(40px,7vw,96px)]"
      >
        <div className="hero-grid absolute inset-0 animate-gridDrift" aria-hidden="true" />
        <HeroWave />
        <div
          className="absolute right-[8%] top-[14%] animate-floatY font-serif text-[120px] italic"
          style={{ color: 'rgba(207,245,75,0.16)', ['--r' as string]: '8deg' }}
          aria-hidden="true"
        >
          ♪
        </div>
        <div
          className="absolute bottom-[18%] left-[6%] animate-floatY font-serif text-[90px] italic"
          style={{ color: 'rgba(255,84,112,0.16)', ['--r' as string]: '-10deg', animationDelay: '1s' }}
          aria-hidden="true"
        >
          ♫
        </div>

        <div className="relative max-w-[1200px]">
          <div className="mb-8 inline-flex items-center gap-[10px] rounded-pill border border-[rgba(244,241,234,0.14)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-ink-3">
            <span className="h-[7px] w-[7px] animate-pulseDot rounded-full bg-lime" />
            Escuela de Música Interactiva
          </div>
          <h1 className="max-w-[15ch] font-display text-[clamp(48px,9vw,132px)] font-extrabold leading-[0.92] tracking-[-0.03em]">
            Aprendé <Accented>música</Accented> como nunca la escuchaste.
          </h1>
          <p className="mt-8 max-w-[46ch] text-[clamp(16px,1.5vw,20px)] leading-relaxed text-ink-2">
            Teoría, armonía y práctica instrumental en una plataforma viva: fretboards que se encienden,
            metrónomos que respiran y ejercicios que suenan mientras aprendés.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/teoria" size="lg">
              Comenzar a aprender →
            </ButtonLink>
            <ButtonLink href="/herramientas" variant="ghost" size="lg">
              Explorar herramientas
            </ButtonLink>
            <EqualizerBars className="ml-2" />
          </div>

          <div className="relative mt-[clamp(48px,7vw,88px)] flex flex-wrap items-baseline gap-[clamp(28px,5vw,72px)]">
            <Stat value="36" label="capítulos de teoría" />
            <Stat value="5" label="herramientas en vivo" />
            <Stat value="4 – 6" label="instrumentos y afinaciones" />
          </div>
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <section className="overflow-hidden border-y border-line bg-bg-2 py-[26px]" aria-hidden="true">
        <div className="flex w-max animate-marqL">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="px-[clamp(20px,5vw,72px)] py-[clamp(72px,10vw,140px)]">
        <div className="mx-auto max-w-content">
          <div className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[16ch] font-display text-[clamp(34px,5vw,64px)] font-bold leading-none tracking-tight text-balance">
              Cuatro formas de <Accented>sonar</Accented> mejor
            </h2>
            <p className="max-w-[34ch] text-base leading-relaxed text-ink-3">
              Cada camino combina teoría, oído y las manos en el instrumento. Elegí por dónde empezar.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {features.map((f) => (
              <Card key={f.n} accent={f.accent}>
                <div
                  className="mb-6 flex h-[54px] w-[54px] items-center justify-center rounded-[14px]"
                  style={{ background: `${f.color}22`, color: f.color }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <h3 className="mb-[10px] font-display text-[22px] font-bold">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{f.desc}</p>
                <span
                  className="absolute -bottom-[30px] -right-[30px] font-display text-[120px] font-extrabold"
                  style={{ color: `${f.color}12` }}
                  aria-hidden="true"
                >
                  {f.n}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FRETBOARD SHOWCASE ============ */}
      <section id="instrumento" className="border-t border-line bg-bg-2 px-[clamp(20px,5vw,72px)] py-[clamp(60px,8vw,120px)]">
        <div className="mx-auto grid max-w-content gap-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.22em] text-lime">Tu instrumento · en vivo</div>
              <h2 className="max-w-[18ch] font-display text-[clamp(32px,4.5vw,58px)] font-bold leading-none tracking-tight text-balance">
                El diapasón se enciende <Accented accent="cyan">mientras</Accented> tocás
              </h2>
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <span className="rounded-pill bg-lime px-4 py-[9px] text-[13px] font-semibold text-bg">Guitarra</span>
              {['Bajo 4', 'Bajo 5', 'Bajo 6'].map((b) => (
                <span key={b} className="rounded-pill border border-[rgba(244,241,234,0.18)] px-4 py-[9px] text-[13px] font-medium text-ink-2">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-x-auto rounded-[24px] border border-line bg-[linear-gradient(180deg,#191524,#13101C)] px-[clamp(16px,3vw,36px)] py-7">
            <Fretboard />
            <div className="mt-[22px] flex flex-wrap items-center gap-[22px] border-t border-line pt-5">
              <Legend color="#CFF54B" label="Tónica" />
              <Legend color="#56E1E9" label="Tercera" />
              <Legend color="#FF5470" label="Quinta" />
              <span className="ml-auto flex flex-wrap gap-2">
                <span className="rounded-pill bg-[rgba(207,245,75,0.14)] px-[13px] py-[7px] text-xs font-semibold text-lime">Pentatónica</span>
                {['Mayor', 'Blues', 'CAGED'].map((s) => (
                  <span key={s} className="rounded-pill border border-[rgba(244,241,234,0.16)] px-[13px] py-[7px] text-xs text-ink-3">
                    {s}
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div>
            <ButtonLink href="/instrumento" size="lg">
              Abrir tu instrumento →
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ============ HERRAMIENTAS ============ */}
      <section id="herramientas" className="px-[clamp(20px,5vw,72px)] py-[clamp(72px,10vw,140px)]">
        <div className="mx-auto max-w-content">
          <div className="mb-[clamp(40px,6vw,72px)]">
            <div className="mb-4 text-xs uppercase tracking-[0.22em] text-pink">Herramientas</div>
            <h2 className="max-w-[18ch] font-display text-[clamp(34px,5vw,64px)] font-bold leading-none tracking-tight text-balance">
              Practicá con instrumentos que <Accented accent="pink">responden</Accented>
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            <MetronomeCard />

            <article className="flex flex-col rounded-[22px] border border-line bg-[linear-gradient(165deg,#17131F,#110E1A)] p-[30px]">
              <h3 className="mb-2 font-display text-[22px] font-bold">Nota Pedal</h3>
              <p className="mb-6 text-[15px] leading-relaxed text-ink-2">
                Secuencias con nota pedal y grados. Entrená tu oído contra un centro tonal fijo.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {[
                  { g: 'I', on: 'cyan' },
                  { g: 'IV' },
                  { g: 'V' },
                  { g: 'vi', on: 'pink' },
                  { g: 'ii' },
                ].map((d, i) => (
                  <span
                    key={i}
                    className="rounded-[10px] px-[14px] py-[9px] text-[15px] font-semibold"
                    style={
                      d.on === 'cyan'
                        ? { background: 'rgba(86,225,233,0.12)', color: '#56E1E9' }
                        : d.on === 'pink'
                        ? { background: 'rgba(255,84,112,0.12)', color: '#FF5470' }
                        : { background: 'rgba(244,241,234,0.06)', color: '#C9C4D6' }
                    }
                  >
                    {d.g}
                  </span>
                ))}
              </div>
              <ButtonLink href="/herramientas/nota-pedal" variant="ghost" size="md" className="mt-6 self-start">
                Abrir →
              </ButtonLink>
            </article>

            <article className="flex flex-col rounded-[22px] border border-[rgba(207,245,75,0.16)] bg-[linear-gradient(165deg,#1B1A14,#131209)] p-[30px]">
              <h3 className="mb-2 font-display text-[22px] font-bold">Mapa de Beats</h3>
              <p className="mb-6 text-[15px] leading-relaxed text-ink-2">
                Programá patrones rítmicos por celda y visualizá el groove antes de tocarlo.
              </p>
              <BeatGrid />
              <ButtonLink href="/herramientas/mapa-de-beats" variant="ghost" size="md" className="mt-6 self-start">
                Abrir →
              </ButtonLink>
            </article>
          </div>

          <div className="mt-[26px] flex flex-wrap gap-[14px]">
            {['Afinador cromático', 'Batería / caja de ritmos', 'Editor de afinaciones'].map((t) => (
              <span key={t} className="rounded-pill border border-[rgba(244,241,234,0.14)] px-5 py-[11px] text-sm text-ink-3">
                {t} · pronto
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEORIA INDEX ============ */}
      <section id="teoria" className="border-t border-line bg-bg-2 px-[clamp(20px,5vw,72px)] py-[clamp(72px,10vw,140px)]">
        <div className="mx-auto max-w-content">
          <div className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Teoría · 36 capítulos" accent="cyan">
              De la primera nota al <Accented accent="cyan">serialismo</Accented>
            </SectionHeading>
            <Link href="/teoria" className="whitespace-nowrap text-[15px] text-lime">
              Ver el índice completo →
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[14px]">
            {teoria.map((c) => (
              <Link
                key={c.n}
                href="/teoria"
                className="group flex gap-[18px] rounded-[18px] border border-line bg-panel p-6 transition-transform hover:translate-x-1"
              >
                <span className="font-display text-[26px] font-extrabold leading-none" style={{ color: c.color }}>
                  {c.n}
                </span>
                <div>
                  <div className="mb-1 text-[17px] font-semibold text-ink">{c.title}</div>
                  <div className="text-[13px] text-ink-3">{c.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden px-[clamp(20px,5vw,72px)] py-[clamp(80px,12vw,160px)]">
        <div
          className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 animate-spinSlow"
          style={{ background: 'radial-gradient(circle, rgba(207,245,75,0.16), transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[900px] text-center">
          <h2 className="font-display text-[clamp(40px,7vw,96px)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            ¿Listo para tu <Accented>viaje</Accented> musical?
          </h2>
          <p className="mx-auto mt-7 max-w-[40ch] text-lg leading-relaxed text-ink-2">
            Empezá hoy mismo. Sin instalar nada, directo desde el navegador.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/teoria" size="lg">
              Explorar cursos
            </ButtonLink>
            <ButtonLink href="/herramientas" variant="ghost" size="lg">
              Probar herramientas
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[40px] font-bold text-ink">{value}</div>
      <div className="text-[13px] text-ink-3">{label}</div>
    </div>
  );
}

function MarqueeRow() {
  const items = ['Intervalos', 'Armaduras de clave', 'Círculo de quintas', 'Modulación', 'Contrapunto', 'Jazz'];
  const stars = ['#CFF54B', '#FF5470', '#56E1E9'];
  return (
    <div className="flex items-center gap-11 pr-11 font-serif text-[30px] italic text-[#EFE9DD]">
      {items.map((it, i) => (
        <React.Fragment key={it}>
          <span>{it}</span>
          <span style={{ color: stars[i % stars.length] }}>✳</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-ink-2">
      <span className="h-3 w-3 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function BeatGrid() {
  // 16 celdas: verde = kick, rosa = snare, tenue = vacío
  const cells = [
    '#CFF54B', '', '', '#CFF54B88', '#CFF54B', '', '#CFF54B88', '',
    '#FF5470D9', '', '#FF547080', '', '#FF5470D9', '', '', '#FF547080',
  ];
  return (
    <div className="mt-auto">
      <div className="grid grid-cols-8 gap-[6px]">
        {cells.map((c, i) => (
          <span
            key={i}
            className="aspect-square rounded-md"
            style={{ background: c || 'rgba(244,241,234,0.07)' }}
          />
        ))}
      </div>
      <div className="mt-5 flex gap-[18px] text-xs text-ink-4">
        <span className="inline-flex items-center gap-[6px]">
          <span className="h-[10px] w-[10px] rounded-[3px] bg-lime" />
          Kick
        </span>
        <span className="inline-flex items-center gap-[6px]">
          <span className="h-[10px] w-[10px] rounded-[3px] bg-pink" />
          Snare
        </span>
      </div>
    </div>
  );
}

function Fretboard() {
  const dots = [
    { x: 348, y: 150, c: '#CFF54B', d: 0 },
    { x: 476, y: 150, c: '#56E1E9', d: 0.34 },
    { x: 348, y: 122, c: '#56E1E9', d: 0.68 },
    { x: 476, y: 122, c: '#FF5470', d: 1.02 },
    { x: 348, y: 94, c: '#CFF54B', d: 1.36 },
    { x: 444, y: 94, c: '#56E1E9', d: 1.7 },
    { x: 348, y: 66, c: '#FF5470', d: 2.04 },
    { x: 444, y: 66, c: '#CFF54B', d: 2.38 },
    { x: 380, y: 38, c: '#56E1E9', d: 2.72 },
    { x: 476, y: 38, c: '#CFF54B', d: 3.06 },
  ];
  const frets = [124, 188, 252, 316, 380, 444, 508, 572, 636, 700, 764, 828];
  const strings = [38, 66, 94, 122, 150];
  return (
    <>
      <svg viewBox="0 0 900 210" className="block h-auto w-full min-w-[620px]" role="img" aria-label="Diapasón con una escala encendiéndose nota por nota">
        <rect x="54" y="14" width="774" height="164" rx="6" fill="#1E1830" />
        <rect x="54" y="14" width="8" height="164" fill="#EFE9DD" opacity="0.85" />
        <g stroke="#4A4560" strokeWidth="2">
          {frets.map((x) => (
            <line key={x} x1={x} y1="14" x2={x} y2="178" />
          ))}
        </g>
        <g fill="#3A3550">
          {[220, 348, 476, 604].map((x) => (
            <circle key={x} cx={x} cy="96" r="5" />
          ))}
          <circle cx="796" cy="66" r="5" />
          <circle cx="796" cy="126" r="5" />
        </g>
        <g stroke="#6B6580" strokeWidth="1.4">
          {strings.map((y) => (
            <line key={y} x1="62" y1={y} x2="828" y2={y} />
          ))}
        </g>
        <g>
          {dots.map((p, i) => (
            <g key={i} style={{ transformOrigin: `${p.x}px ${p.y}px`, animation: `fretRun 4s infinite ${p.d}s` }}>
              <circle cx={p.x} cy={p.y} r="12" fill={p.c} style={{ animation: `fretGlow 4s infinite ${p.d}s` }} />
            </g>
          ))}
        </g>
      </svg>
      <style>{`
        @keyframes fretRun{0%{transform:scale(1)}4%{transform:scale(1.55)}16%{transform:scale(1)}100%{transform:scale(1)}}
        @keyframes fretGlow{0%{opacity:0.28}4%{opacity:1}20%{opacity:0.5}100%{opacity:0.28}}
      `}</style>
    </>
  );
}
