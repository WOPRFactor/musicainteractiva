'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accented } from '../components/ui/SectionHeading';
import { login, register, ApiError } from '../lib/api';

const inputCls =
  'w-full rounded-[12px] border border-line bg-bg-2 px-4 py-3 text-ink placeholder:text-ink-4 focus:border-lime focus:outline-none';

export default function EntrarForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [modo, setModo] = useState<'entrar' | 'registrarse'>(
    params.get('modo') === 'registrarse' ? 'registrarse' : 'entrar'
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const registrarse = modo === 'registrarse';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    const fullName = String(form.get('full_name') ?? '').trim();
    try {
      if (registrarse) {
        await register(email, password, fullName);
      } else {
        await login(email, password);
      }
      router.push('/perfil');
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.status === 0 || err.message === 'Failed to fetch'
            ? 'No pudimos conectar con el servidor. ¿Está corriendo el backend?'
            : err.message
          : 'No pudimos conectar con el servidor.';
      setError(msg);
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-[clamp(20px,5vw,72px)] py-16">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.22em] text-lime">
            {registrarse ? 'Crear cuenta' : 'Bienvenido de vuelta'}
          </div>
          <h1 className="font-display text-[clamp(30px,5vw,44px)] font-bold leading-none tracking-tight">
            {registrarse ? (
              <>
                Empezá <Accented>gratis</Accented>
              </>
            ) : (
              <>
                Entrá a <Accented>EMION</Accented>
              </>
            )}
          </h1>
        </div>

        {error && (
          <p className="mb-6 rounded-[12px] border border-pink/40 bg-[rgba(255,84,112,0.08)] px-4 py-3 text-sm text-pink">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {registrarse && (
            <div>
              <label htmlFor="full_name" className="mb-1 block text-sm text-ink-2">
                Nombre
              </label>
              <input id="full_name" name="full_name" type="text" autoComplete="name" className={inputCls} placeholder="Cómo te llamás" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-ink-2">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} placeholder="vos@email.com" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-ink-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete={registrarse ? 'new-password' : 'current-password'}
              className={inputCls}
              placeholder={registrarse ? 'Mínimo 6 caracteres' : '••••••••'}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-pill bg-lime px-6 py-3 font-semibold text-bg transition-colors hover:bg-lime-2 disabled:opacity-60"
          >
            {pending ? 'Un momento…' : registrarse ? 'Crear mi cuenta' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-3">
          {registrarse ? (
            <>
              ¿Ya tenés cuenta?{' '}
              <button onClick={() => { setModo('entrar'); setError(null); }} className="text-lime hover:text-lime-2">
                Entrá
              </button>
            </>
          ) : (
            <>
              ¿Todavía no tenés cuenta?{' '}
              <button onClick={() => { setModo('registrarse'); setError(null); }} className="text-lime hover:text-lime-2">
                Registrate gratis
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
