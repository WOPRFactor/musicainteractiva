import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import EntrarForm from './EntrarForm';

export const metadata: Metadata = {
  title: 'Entrar · EMION',
  description: 'Ingresá a tu cuenta de EMION o creá una nueva.',
};

export default function EntrarPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[80vh] items-center justify-center">
          <p className="text-ink-3">Cargando…</p>
        </main>
      }
    >
      <EntrarForm />
    </Suspense>
  );
}
