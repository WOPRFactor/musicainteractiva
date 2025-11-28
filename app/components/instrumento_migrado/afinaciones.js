// Afinaciones comunes para distintos instrumentos
export const afinaciones = {
  // Afinaciones de guitarra
  guitarra: {
    estandar: ['E', 'B', 'G', 'D', 'A', 'E'], // de la 1ª a la 6ª cuerda
    dropD: ['E', 'B', 'G', 'D', 'A', 'D'],
    openG: ['D', 'B', 'G', 'D', 'G', 'D'],
    openD: ['D', 'A', 'F#', 'D', 'A', 'D'],
    dadgad: ['D', 'A', 'G', 'D', 'A', 'D'],
    halfStepDown: ['D#', 'A#', 'F#', 'C#', 'G#', 'D#'],
    wholeStepDown: ['D', 'A', 'F', 'C', 'G', 'D'],
  },
  // Afinaciones de bajo
  bajo: {
    bajo4: ['G', 'D', 'A', 'E'],
    bajo5: ['G', 'D', 'A', 'E', 'B'],
    bajo6: ['C', 'G', 'D', 'A', 'E', 'B']
  }
}; 