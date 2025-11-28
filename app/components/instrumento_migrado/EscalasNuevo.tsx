'use client';
import React, { useState } from 'react';
import DiapasonNuevo from './DiapasonNuevo';
import {
  obtenerEscalaMayor,
  obtenerEscalaMenor,
  obtenerEscalaPentatonica,
  obtenerEscalaBlues,
  obtenerEscalasModales
} from './musicalTheory';

// Solo el sistema de 3 notas por cuerda
const secuenciasEscalas: Record<string, [number, number][]> = {
  'Posición 1': [
    [6, 8], [6, 10], [6, 12], // 6ª cuerda
    [5, 8], [5, 10], [5, 12], // 5ª cuerda
    [4, 7], [4, 9], [4, 10],  // 4ª cuerda
    [3, 7], [3, 9], [3, 10],  // 3ª cuerda
    [2, 8], [2, 10], [2, 12], // 2ª cuerda
    [1, 8], [1, 10], [1, 12]  // 1ª cuerda
  ],
  'Posición 2': [
    [6, 3], [6, 5], [6, 7],   // 6ª cuerda
    [5, 3], [5, 5], [5, 7],   // 5ª cuerda
    [4, 2], [4, 4], [4, 5],   // 4ª cuerda
    [3, 2], [3, 3], [3, 5],   // 3ª cuerda
    [2, 3], [2, 5], [2, 7],   // 2ª cuerda
    [1, 3], [1, 5], [1, 7]    // 1ª cuerda
  ],
  'Posición 3': [
    [6, 0], [6, 1], [6, 3],   // 6ª cuerda
    [5, 0], [5, 2], [5, 3],   // 5ª cuerda
    [4, 0], [4, 2], [4, 3],   // 4ª cuerda
    [3, 0], [3, 2], [3, 4],   // 3ª cuerda
    [2, 1], [2, 3], [2, 5],   // 2ª cuerda
    [1, 0], [1, 1], [1, 3]    // 1ª cuerda
  ]
};

const EscalasNuevo: React.FC = () => {
  const [notaRaiz, setNotaRaiz] = useState('C');
  const [tipoEscala, setTipoEscala] = useState('mayor');
  const [posicionElegida, setPosicionElegida] = useState('Posición 1');

  const obtenerEscalaSeleccionada = () => {
    switch (tipoEscala) {
      case 'mayor': return obtenerEscalaMayor(notaRaiz);
      case 'menor': return obtenerEscalaMenor(notaRaiz);
      case 'pentatonica': return obtenerEscalaPentatonica(notaRaiz);
      case 'blues': return obtenerEscalaBlues(notaRaiz);
      case 'dorica': return obtenerEscalasModales(notaRaiz)[1].notas;
      case 'frigia': return obtenerEscalasModales(notaRaiz)[2].notas;
      case 'lidia': return obtenerEscalasModales(notaRaiz)[3].notas;
      case 'mixolidia': return obtenerEscalasModales(notaRaiz)[4].notas;
      case 'eolica': return obtenerEscalasModales(notaRaiz)[5].notas;
      case 'locria': return obtenerEscalasModales(notaRaiz)[6].notas;
      default: return obtenerEscalaMayor(notaRaiz);
    }
  };

  // Obtener la secuencia actual
  const secuenciaActual = secuenciasEscalas[posicionElegida] || [];

  // Opciones para los selectores
  const opcionesNotas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  const opcionesEscalas = [
    { valor: 'mayor', nombre: 'Mayor' },
    { valor: 'menor', nombre: 'Menor Natural' },
    { valor: 'pentatonica', nombre: 'Pentatónica Mayor' },
    { valor: 'blues', nombre: 'Blues' },
    { valor: 'dorica', nombre: 'Dórica' },
    { valor: 'frigia', nombre: 'Frigia' },
    { valor: 'lidia', nombre: 'Lidia' },
    { valor: 'mixolidia', nombre: 'Mixolidia' },
    { valor: 'eolica', nombre: 'Eólica' },
    { valor: 'locria', nombre: 'Locria' }
  ];
  
  // Obtener opciones de posiciones
  const opcionesPosiciones = Object.keys(secuenciasEscalas).map(pos => ({
    valor: pos,
    nombre: pos
  }));

  // Obtener el nombre de la escala para mostrar
  const getNombreEscala = () => {
    const escala = opcionesEscalas.find(e => e.valor === tipoEscala);
    return escala ? escala.nombre : 'Mayor';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ color: '#2D5B88', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Sistema de 3 Notas por Cuerda</h2>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', justifyContent: 'center' }}>
        <div style={{ minWidth: '180px', flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Nota raíz</label>
          <select
            value={notaRaiz}
            onChange={e => setNotaRaiz(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
          >
            {opcionesNotas.map(nota => (
              <option key={nota} value={nota}>{nota}</option>
            ))}
          </select>
        </div>
        
        <div style={{ minWidth: '220px', flex: 2 }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>Tipo de escala</label>
          <select
            value={tipoEscala}
            onChange={e => setTipoEscala(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
          >
            {opcionesEscalas.map(escala => (
              <option key={escala.valor} value={escala.valor}>{escala.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div style={{ padding: '1rem', background: '#f0f6ff', borderRadius: 8, marginBottom: '1rem' }}>
        <h4 style={{ color: '#2D5B88', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 600 }}>Notas en la escala:</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {obtenerEscalaSeleccionada().map((nota, idx) => (
            <div key={idx} style={{ 
              padding: '6px 14px', 
              borderRadius: 20, 
              background: '#fff',
              color: '#2D5B88', 
              fontWeight: 600,
              boxShadow: '0 1px 4px rgba(30,58,92,0.1)'
            }}>
              {nota}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.95rem', color: '#2D5B88', fontWeight: 600 }}>
          Posición
        </label>
        <select
          value={posicionElegida}
          onChange={e => setPosicionElegida(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1dff0', borderRadius: 6, fontSize: '1rem' }}
        >
          {opcionesPosiciones.map(pos => (
            <option key={pos.valor} value={pos.valor}>{pos.nombre}</option>
          ))}
        </select>
      </div>
      
      {/* Usar el componente DiapasonNuevo para visualizar la escala */}
      <DiapasonNuevo
        notaRaiz={notaRaiz}
        escala={obtenerEscalaSeleccionada()}
        nombreEscala={`${getNombreEscala()} - ${posicionElegida}`}
        secuencia={secuenciaActual}
      />
      
      {/* Mensaje explicativo */}
      <div style={{ background: '#f0f6ff', padding: '1rem', borderRadius: 8, marginTop: '1rem' }}>
        <p style={{ color: '#2D5B88', margin: 0 }}>
          Este visualizador muestra las posiciones de escala usando el sistema de 3 notas por cuerda, 
          ideal para patrones de digitación y solos. Todas las notas se muestran con el mismo estilo.
        </p>
      </div>
    </div>
  );
};

export default EscalasNuevo; 