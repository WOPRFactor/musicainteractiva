/**
 * Cliente del backend EMION (Flask).
 *
 * El JWT viaja en cookies httpOnly que el navegador manda solo. Para las
 * mutaciones (POST/PUT/DELETE a rutas protegidas), Flask-JWT-Extended exige
 * el token CSRF: lo leemos de la cookie `csrf_access_token` (no httpOnly) y
 * lo mandamos en el header X-CSRF-TOKEN.
 *
 * Todas las llamadas son al mismo origen (/api/*); Next las reenvía al backend
 * (ver next.config.js), así que no hay CORS.
 */

export type Profile = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  instruments: string[];
  genres: string[];
  location: string | null;
  plan: 'free' | 'premium';
};

export type User = {
  id: string;
  email: string;
  created_at: string | null;
  profile: Profile | null;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase();
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  // CSRF solo para métodos que modifican estado.
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const csrf = readCookie('csrf_access_token');
    if (csrf) headers.set('X-CSRF-TOKEN', csrf);
  }

  const res = await fetch(`/api${path}`, {
    ...options,
    method,
    headers,
    credentials: 'include',
  });

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data && (data.error || data.msg)) || 'Ocurrió un error.';
    throw new ApiError(message, res.status);
  }
  return data as T;
}

// --- Auth ---
export function register(email: string, password: string, fullName: string) {
  return apiFetch<{ user: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, full_name: fullName }),
  });
}

export function login(email: string, password: string) {
  return apiFetch<{ user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return apiFetch<{ ok: boolean }>('/auth/logout', { method: 'POST' });
}

export function getMe() {
  return apiFetch<{ user: User }>('/auth/me');
}

// --- Perfil ---
export function updateProfile(patch: Partial<Profile>) {
  return apiFetch<{ profile: Profile }>('/profile', {
    method: 'PUT',
    body: JSON.stringify(patch),
  });
}
