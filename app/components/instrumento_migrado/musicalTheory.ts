// Definición de notas musicales y equivalentes enarmónicos
const notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const enarmonicos: { [key: string]: string } = {
  'C#': 'C#', 'Db': 'C#', 'D♭': 'C#',
  'D#': 'D#', 'Eb': 'D#', 'E♭': 'D#',
  'F#': 'F#', 'Gb': 'F#', 'G♭': 'F#',
  'G#': 'G#', 'Ab': 'G#', 'A♭': 'G#',
  'A#': 'A#', 'Bb': 'A#', 'B♭': 'A#',
  'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'A': 'A', 'B': 'B'
};

// Notación preferida para cada índice (bemol)
const notasBemol = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
const notasSostenido = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Función para obtener el índice de una nota (soporta enarmónicos)
function obtenerIndiceNota(nota: string): number {
  const normalizada = enarmonicos[nota.replace('♭', 'b')] || nota;
  return notas.indexOf(normalizada);
}

// Función para obtener una nota por su índice, priorizando bemol si se indica
function obtenerNotaPorIndice(indice: number, usarBemol = false): string {
  const i = (indice + 12) % 12;
  return usarBemol ? notasBemol[i] : notasSostenido[i];
}

// Función para obtener una escala mayor
export function obtenerEscalaMayor(tonica: string): string[] {
  const indices = [0, 2, 4, 5, 7, 9, 11];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, false));
}

// Función para obtener una escala menor natural
export function obtenerEscalaMenor(tonica: string): string[] {
  const indices = [0, 2, 3, 5, 7, 8, 10];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, true));
}

// Función para obtener una escala pentatónica
export function obtenerEscalaPentatonica(tonica: string): string[] {
  const indices = [0, 2, 4, 7, 9];
  const indiceTonica = obtenerIndiceNota(tonica);
  // Usar bemol si la tónica es bemol
  const usarBemol = /b|♭/.test(tonica) || ['D♭','E♭','G♭','A♭','B♭'].includes(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, usarBemol));
}

// Función para obtener una escala de blues
export function obtenerEscalaBlues(tonica: string): string[] {
  const indices = [0, 3, 5, 6, 7, 10];
  const indiceTonica = obtenerIndiceNota(tonica);
  const usarBemol = /b|♭/.test(tonica) || ['D♭','E♭','G♭','A♭','B♭'].includes(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, usarBemol));
}

// Función para obtener un acorde mayor
export function obtenerAcordeMayor(tonica: string): string[] {
  const indices = [0, 4, 7];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, false));
}

// Función para obtener un acorde menor
export function obtenerAcordeMenor(tonica: string): string[] {
  const indices = [0, 3, 7];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, true));
}

// Función para obtener un acorde aumentado
export function obtenerAcordeAumentado(tonica: string): string[] {
  const indices = [0, 4, 8];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, /b|♭/.test(tonica)));
}

// Función para obtener un acorde disminuido
export function obtenerAcordeDisminuido(tonica: string): string[] {
  const indices = [0, 3, 6];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, true));
}

// Función para obtener un acorde de séptima
export function obtenerAcordeSeptima(tonica: string): string[] {
  const indices = [0, 4, 7, 10];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, /b|♭/.test(tonica)));
}

// Función para obtener un acorde de séptima menor
export function obtenerAcordeMenorSeptima(tonica: string): string[] {
  const indices = [0, 3, 7, 10];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, true));
}

// Función para obtener un acorde de séptima mayor
export function obtenerAcordeMayorSeptima(tonica: string): string[] {
  const indices = [0, 4, 7, 11];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, /b|♭/.test(tonica)));
}

// Función para obtener un acorde de sexta
export function obtenerAcordeSexta(tonica: string): string[] {
  const indices = [0, 4, 7, 9];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, /b|♭/.test(tonica)));
}

// Función para obtener un acorde de sexta menor
export function obtenerAcordeMenorSexta(tonica: string): string[] {
  const indices = [0, 3, 7, 9];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, true));
}

// Función para obtener un acorde de novena
export function obtenerAcordeNoveno(tonica: string): string[] {
  const indices = [0, 4, 7, 10, 14];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, /b|♭/.test(tonica)));
}

// Función para obtener un acorde de novena menor
export function obtenerAcordeMenorNoveno(tonica: string): string[] {
  const indices = [0, 3, 7, 10, 14];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, true));
}

// Función para obtener un acorde suspendido
export function obtenerAcordeSuspension(tonica: string): string[] {
  const indices = [0, 5, 7];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, /b|♭/.test(tonica)));
}

// Función para obtener un acorde añadido
export function obtenerAcordeAñadido(tonica: string): string[] {
  const indices = [0, 4, 7, 11];
  const indiceTonica = obtenerIndiceNota(tonica);
  return indices.map(i => obtenerNotaPorIndice(indiceTonica + i, /b|♭/.test(tonica)));
}

// Función para obtener los acordes de una tonalidad
export function obtenerAcordesTonalidad(tonalidad: string, esMayor: boolean): { grado: string; acorde: string[]; funcion: string; }[] {
  const escala = esMayor ? obtenerEscalaMayor(tonalidad) : obtenerEscalaMenor(tonalidad);
  const grados = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const funciones = esMayor
    ? ['Tónica', 'Supertónica', 'Mediante', 'Subdominante', 'Dominante', 'Submediante', 'Sensible']
    : ['Tónica', 'Supertónica', 'Mediante', 'Subdominante', 'Dominante', 'Submediante', 'Sensible'];

  return escala.map((nota, index) => ({
    grado: grados[index],
    acorde: index === 0 || index === 3 || index === 4 
      ? (esMayor ? obtenerAcordeMayor(nota) : obtenerAcordeMenor(nota))
      : (esMayor ? obtenerAcordeMenor(nota) : obtenerAcordeMayor(nota)),
    funcion: funciones[index]
  }));
}

// Función para obtener el círculo de quintas
export function obtenerCirculoQuintas(): string[] {
  return notasBemol;
}

// Función para obtener una escala modal
export function obtenerEscalaModal(tonica: string, modo: number): string[] {
  const escalaMayor = obtenerEscalaMayor(tonica);
  // Rotar la escala mayor según el modo (0-6)
  return escalaMayor.slice(modo).concat(escalaMayor.slice(0, modo));
}

// Función para obtener todas las escalas modales
export function obtenerEscalasModales(tonica: string): { nombre: string; notas: string[] }[] {
  const modos = [
    { nombre: 'Jónico (Mayor)', grado: 0 },
    { nombre: 'Dórico', grado: 1 },
    { nombre: 'Frigio', grado: 2 },
    { nombre: 'Lidio', grado: 3 },
    { nombre: 'Mixolidio', grado: 4 },
    { nombre: 'Eólico (Menor)', grado: 5 },
    { nombre: 'Locrio', grado: 6 }
  ];

  return modos.map(modo => ({
    nombre: modo.nombre,
    notas: obtenerEscalaModal(tonica, modo.grado)
  }));
}

// Función para obtener las funciones tonales
export function obtenerFuncionesTonales(tonalidad: string, esMayor: boolean): { grado: string; funcion: string; variante?: string; modo?: string }[] {
  if (esMayor) {
    return [
      { grado: 'I', funcion: 'Tónica', modo: 'Jónico (Mayor)' },
      { grado: 'II', funcion: 'Supertónica', variante: 'Subdominante', modo: 'Dórico' },
      { grado: 'III', funcion: 'Mediante', variante: 'Tónica', modo: 'Frigio' },
      { grado: 'IV', funcion: 'Subdominante', modo: 'Lidio' },
      { grado: 'V', funcion: 'Dominante', modo: 'Mixolidio' },
      { grado: 'VI', funcion: 'Submediante', variante: 'Tónica', modo: 'Eólico (Menor)' },
      { grado: 'VII', funcion: 'Sensible', variante: 'Dominante', modo: 'Locrio' }
    ];
  } else {
    return [
      { grado: 'I', funcion: 'Tónica', modo: 'Eólico (Menor)' },
      { grado: 'II', funcion: 'Supertónica', variante: 'Subdominante', modo: 'Locrio' },
      { grado: 'III', funcion: 'Mediante', variante: 'Tónica', modo: 'Jónico (Mayor)' },
      { grado: 'IV', funcion: 'Subdominante', modo: 'Dórico' },
      { grado: 'V', funcion: 'Dominante', modo: 'Frigio' },
      { grado: 'VI', funcion: 'Submediante', variante: 'Tónica', modo: 'Lidio' },
      { grado: 'VII', funcion: 'Subsensible', variante: 'Dominante', modo: 'Mixolidio' }
    ];
  }
} 