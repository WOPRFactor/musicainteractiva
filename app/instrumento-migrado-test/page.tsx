import dynamic from 'next/dynamic';
import React from 'react';

// Importación dinámica para evitar problemas de SSR
const Instrumento = dynamic(() => import('../components/instrumento_migrado/Instrumento'), { ssr: false });

export default function InstrumentoMigradoTestPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: 'center', color: '#2D5B88', marginBottom: 32 }}>Prueba de Instrumento Migrado</h1>
      <Instrumento />
    </div>
  );
} 