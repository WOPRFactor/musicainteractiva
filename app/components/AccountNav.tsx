'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ButtonLink } from './ui/Button';
import { getMe } from '../lib/api';

/**
 * Cluster de cuenta en el navbar. Consulta la sesión al backend (/api/auth/me)
 * y muestra "Entrar / Empezá gratis" o "Mi perfil" según corresponda.
 */
export default function AccountNav({ stacked = false, onNavigate }: { stacked?: boolean; onNavigate?: () => void }) {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let alive = true;
    getMe()
      .then(() => alive && setAuthed(true))
      .catch(() => alive && setAuthed(false));
    return () => {
      alive = false;
    };
  }, []);

  if (authed) {
    return (
      <ButtonLink href="/perfil" size="md" className={stacked ? 'w-full' : ''}>
        Mi perfil
      </ButtonLink>
    );
  }

  return (
    <div className={stacked ? 'flex flex-col gap-2' : 'flex items-center gap-4'}>
      <Link
        href="/entrar"
        onClick={onNavigate}
        className={`text-sm font-medium text-ink-2 transition-colors hover:text-ink ${stacked ? 'px-3 py-2' : ''}`}
      >
        Entrar
      </Link>
      <ButtonLink href="/entrar?modo=registrarse" size="md" className={stacked ? 'w-full' : ''}>
        Empezá gratis
      </ButtonLink>
    </div>
  );
}
