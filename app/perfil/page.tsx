'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMe, updateProfile, logout, ApiError, type User } from '../lib/api';

const inputCls =
  'w-full rounded-[12px] border border-line bg-bg-2 px-4 py-3 text-ink placeholder:text-ink-4 focus:border-lime focus:outline-none';
const labelCls = 'mb-1 block text-sm text-ink-2';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMe()
      .then(({ user }) => {
        setUser(user);
        setState('ready');
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace('/entrar');
        } else {
          setError('No pudimos conectar con el servidor. ¿Está corriendo el backend?');
          setState('error');
        }
      });
  }, [router]);

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    const f = new FormData(e.currentTarget);
    const toArray = (v: FormDataEntryValue | null) =>
      String(v ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    try {
      const { profile } = await updateProfile({
        full_name: String(f.get('full_name') ?? '').trim() || null,
        username: String(f.get('username') ?? '').trim() || null,
        bio: String(f.get('bio') ?? '').trim() || null,
        location: String(f.get('location') ?? '').trim() || null,
        instruments: toArray(f.get('instruments')),
        genres: toArray(f.get('genres')),
      });
      setUser((u) => (u ? { ...u, profile } : u));
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos guardar los cambios.');
    } finally {
      setSaving(false);
    }
  }

  async function onLogout() {
    try {
      await logout();
    } catch {
      /* ignoramos: igual salimos */
    }
    router.push('/');
    router.refresh();
  }

  if (state === 'loading') {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-ink-3">Cargando tu perfil…</p>
      </main>
    );
  }

  if (state === 'error') {
    return (
      <main className="mx-auto max-w-[560px] px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">No pudimos cargar tu perfil</h1>
        <p className="mt-4 text-ink-2">{error}</p>
        <Link href="/" className="mt-6 inline-block text-lime hover:text-lime-2">
          ← Volver al inicio
        </Link>
      </main>
    );
  }

  const p = user?.profile;
  const plan = p?.plan ?? 'free';

  return (
    <main className="px-[clamp(20px,5vw,72px)] py-[clamp(48px,7vw,88px)]">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-2 text-xs uppercase tracking-[0.22em] text-lime">Mi perfil</div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-[clamp(30px,5vw,52px)] font-bold leading-none tracking-tight">
            {p?.full_name || user?.email}
          </h1>
          <button
            onClick={onLogout}
            className="rounded-pill border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[16px] border border-line bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-ink-4">Plan</div>
            <div className="mt-1 font-display text-2xl font-bold" style={{ color: plan === 'premium' ? '#CFF54B' : '#F4F1EA' }}>
              {plan === 'premium' ? 'Premium' : 'Gratis'}
            </div>
          </div>
          <div className="rounded-[16px] border border-line bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-ink-4">Instrumentos</div>
            <div className="mt-1 truncate text-sm text-ink-2">{(p?.instruments ?? []).join(', ') || '—'}</div>
          </div>
          <div className="rounded-[16px] border border-line bg-panel p-5">
            <div className="text-xs uppercase tracking-wider text-ink-4">Email</div>
            <div className="mt-1 truncate text-sm text-ink-2">{user?.email}</div>
          </div>
        </div>

        {saved && (
          <p className="mt-8 rounded-[12px] border border-lime/40 bg-[rgba(207,245,75,0.08)] px-4 py-3 text-sm text-lime">
            Perfil actualizado.
          </p>
        )}
        {error && (
          <p className="mt-8 rounded-[12px] border border-pink/40 bg-[rgba(255,84,112,0.08)] px-4 py-3 text-sm text-pink">
            {error}
          </p>
        )}

        <div className="mt-10 rounded-[20px] border border-line bg-panel p-[clamp(20px,4vw,32px)]">
          <h2 className="mb-6 font-display text-xl font-bold">Editá tu perfil de músico</h2>
          <form onSubmit={onSave} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="full_name" className={labelCls}>Nombre</label>
                <input id="full_name" name="full_name" defaultValue={p?.full_name ?? ''} className={inputCls} placeholder="Tu nombre" />
              </div>
              <div>
                <label htmlFor="username" className={labelCls}>Usuario</label>
                <input id="username" name="username" defaultValue={p?.username ?? ''} className={inputCls} placeholder="tu-usuario" />
              </div>
            </div>
            <div>
              <label htmlFor="bio" className={labelCls}>Bio</label>
              <textarea id="bio" name="bio" rows={3} defaultValue={p?.bio ?? ''} className={inputCls} placeholder="Contá algo sobre vos como músico" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="instruments" className={labelCls}>
                  Instrumentos <span className="text-ink-4">(separados por coma)</span>
                </label>
                <input id="instruments" name="instruments" defaultValue={(p?.instruments ?? []).join(', ')} className={inputCls} placeholder="Guitarra, Bajo" />
              </div>
              <div>
                <label htmlFor="genres" className={labelCls}>
                  Géneros <span className="text-ink-4">(separados por coma)</span>
                </label>
                <input id="genres" name="genres" defaultValue={(p?.genres ?? []).join(', ')} className={inputCls} placeholder="Folklore, Jazz" />
              </div>
            </div>
            <div>
              <label htmlFor="location" className={labelCls}>Ubicación</label>
              <input id="location" name="location" defaultValue={p?.location ?? ''} className={inputCls} placeholder="Ciudad, país" />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-pill bg-lime px-6 py-3 font-semibold text-bg transition-colors hover:bg-lime-2 disabled:opacity-60 sm:w-auto"
              >
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
