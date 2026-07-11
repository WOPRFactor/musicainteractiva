# EMION · Backend (Flask)

API REST del proyecto. Stack: **Flask · PostgreSQL · SQLAlchemy 2.0 · Alembic ·
Flask-JWT-Extended (JWT en cookies httpOnly) · bcrypt · Flask-Limiter**.

La configuración se toma **por variables de entorno** (12-factor), así que el
mismo código corre en Docker o directo en tu máquina/VM.

---

## Opción A — Todo en Docker (un comando)

Desde la raíz del repo:

```bash
docker compose up
```

Levanta Postgres, Redis, el backend (`:5000`) y el frontend (`:3000`).
El contenedor del backend prepara la base solo (crea las tablas al arrancar).

---

## Opción B — Local / VM (sin Docker para la app)

Necesitás un Postgres y un Redis accesibles. Podés usar los de Docker
(`make infra`) o instancias propias.

```bash
# 1. Dependencias
cd backend
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt

# 2. Configuración
cp .env.example .env        # ajustá DATABASE_URL / REDIS_URL si hace falta

# 3. Base de datos
export FLASK_APP=wsgi.py
flask init-db               # primer arranque: crea las tablas
#   — o, si vas a versionar el esquema con Alembic:
#   flask db init && flask db migrate -m "init" && flask db upgrade

# 4. Correr
python wsgi.py              # http://localhost:5000
```

El frontend, en otra terminal: `npm install && npm run dev` (usa
`BACKEND_URL` para saber dónde está el backend; por defecto `localhost:5000`).

> Atajos equivalentes en el `Makefile` de la raíz: `make backend-install`,
> `make backend-initdb`, `make backend-dev`, `make infra`.

---

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Crear cuenta (email, password, full_name) |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |
| POST | `/api/auth/refresh` | Renovar el token de acceso |
| GET  | `/api/auth/me` | Usuario actual + perfil |
| PUT  | `/api/profile` | Actualizar el perfil de músico |
| GET  | `/api/progress` | Lecciones vistas |
| POST | `/api/progress/<slug>` | Marcar una lección como vista |
| GET  | `/api/health` | Estado del servicio |

Los tokens viajan en **cookies httpOnly**. El frontend Next reenvía `/api/*`
al backend (ver `next.config.js`), por lo que el navegador ve un solo origen.
