// Mapeo de notas a frecuencias
const frecuencias: { [key: string]: number } = {
  'C': 261.63,
  'C#': 277.18,
  'Db': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'Eb': 311.13,
  'E': 329.63,
  'Fb': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'Gb': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'Ab': 415.30,
  'A': 440.00,
  'A#': 466.16,
  'Bb': 466.16,
  'B': 493.88,
  'Cb': 493.88
};

// Intervalos para diferentes tipos de acordes
const intervalosAcordes: { [key: string]: number[] } = {
  '': [0, 4, 7], // Mayor
  'm': [0, 3, 7], // Menor
  '7': [0, 4, 7, 10], // Dominante 7
  'm7': [0, 3, 7, 10], // Menor 7
  'maj7': [0, 4, 7, 11], // Mayor 7
  'dim': [0, 3, 6], // Disminuido
  'aug': [0, 4, 8] // Aumentado
};

// Función para obtener las notas de un acorde
export function obtenerNotasAcorde(acorde: string): number[] {
  const notaBase = acorde[0];
  const tipo = acorde.slice(1);
  const frecuenciaBase = frecuencias[notaBase];
  const intervalos = intervalosAcordes[tipo] || intervalosAcordes[''];
  
  return intervalos.map(intervalo => {
    return frecuenciaBase * Math.pow(2, intervalo / 12);
  });
}

// Función para crear un oscilador
export function crearOscilador(frecuencia: number, ctx: AudioContext): OscillatorNode {
  const oscilador = ctx.createOscillator();
  const ganancia = ctx.createGain();
  
  oscilador.type = 'sine';
  oscilador.frequency.value = frecuencia;
  
  ganancia.gain.value = 0.1;
  
  oscilador.connect(ganancia);
  ganancia.connect(ctx.destination);
  
  return oscilador;
}

// Función para reproducir una nota
export function reproducirNota(frecuencia: number, ctx: AudioContext, duracion: number = 0.5) {
  const oscilador = crearOscilador(frecuencia, ctx);
  const ganancia = ctx.createGain();
  
  oscilador.connect(ganancia);
  ganancia.connect(ctx.destination);
  
  oscilador.start();
  ganancia.gain.setValueAtTime(0.1, ctx.currentTime);
  ganancia.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duracion);
  
  oscilador.stop(ctx.currentTime + duracion);
}

// Función para reproducir un acorde
export function reproducirAcorde(acorde: string, ctx: AudioContext, duracion: number = 0.5) {
  const frecuencias = obtenerNotasAcorde(acorde);
  frecuencias.forEach(frecuencia => {
    reproducirNota(frecuencia, ctx, duracion);
  });
}

// Función para reproducir un click de metrónomo
export function reproducirClick(ctx: AudioContext, tiempo: number) {
  const oscilador = ctx.createOscillator();
  const ganancia = ctx.createGain();
  oscilador.type = 'square';
  oscilador.frequency.value = 2000;
  ganancia.gain.value = 0.2;
  oscilador.connect(ganancia);
  ganancia.connect(ctx.destination);
  oscilador.start(tiempo);
  oscilador.stop(tiempo + 0.05);
}

// Función para reproducir una secuencia de acordes con nota pedal
export function reproducirSecuencia(
  notaPedal: string,
  acordes: string[],
  tempo: number,
  ctx: AudioContext,
  duraciones: number[] = [],
  clickActivo: boolean = false
) {
  const duracionBeat = 60 / tempo;
  const duracionBase = duracionBeat * 4; // 4 tiempos por compás
  let tiempoAcumulado = 0;

  acordes.forEach((acorde, index) => {
    const compases = duraciones[index] || 1;
    const duracionCompas = duracionBase * compases;
    const tiempoInicio = ctx.currentTime + tiempoAcumulado;

    // Reproducir nota pedal
    const osciladorPedal = crearOscilador(frecuencias[notaPedal], ctx);
    osciladorPedal.start(tiempoInicio);
    osciladorPedal.stop(tiempoInicio + duracionCompas);

    // Reproducir acorde
    setTimeout(() => {
      reproducirAcorde(acorde, ctx, duracionCompas);
    }, tiempoAcumulado * 1000);

    // Reproducir click si está activo
    if (clickActivo) {
      for (let c = 0; c < compases * 4; c++) {
        const tiempoClick = tiempoInicio + c * duracionBeat;
        reproducirClick(ctx, tiempoClick);
      }
    }

    tiempoAcumulado += duracionCompas;
  });
} 