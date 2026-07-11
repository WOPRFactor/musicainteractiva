# ============================================================================
# EMION — atajos para las dos formas de correr el proyecto
# ============================================================================
.PHONY: help \
        docker-up docker-down docker-build docker-logs infra \
        backend-venv backend-install backend-dev backend-migrate backend-initdb \
        frontend-install frontend-dev

help:
	@echo "EMION — comandos disponibles"
	@echo ""
	@echo "  === Opción A: TODO EN DOCKER ==="
	@echo "  make docker-up        Levanta db + redis + backend + frontend"
	@echo "  make docker-down      Baja todo"
	@echo "  make docker-build     Reconstruye las imágenes"
	@echo "  make docker-logs      Ver logs"
	@echo ""
	@echo "  === Opción B: LOCAL / VM (sin Docker para la app) ==="
	@echo "  make infra            Solo Postgres + Redis en Docker (opcional)"
	@echo "  make backend-install  Crea venv e instala dependencias del backend"
	@echo "  make backend-initdb   Crea las tablas (primer arranque)"
	@echo "  make backend-migrate  Migraciones Alembic (init + migrate + upgrade)"
	@echo "  make backend-dev      Corre Flask en :5000"
	@echo "  make frontend-install Instala dependencias del frontend"
	@echo "  make frontend-dev     Corre Next en :3000"

# ---------------------------------------------------------------------------
# Opción A — Docker (stack completo)
# ---------------------------------------------------------------------------
docker-up:
	docker compose up

docker-down:
	docker compose down

docker-build:
	docker compose build

docker-logs:
	docker compose logs -f

# Solo la infraestructura (para usar con la opción local)
infra:
	docker compose up db redis

# ---------------------------------------------------------------------------
# Opción B — Local / VM
# ---------------------------------------------------------------------------
backend-venv:
	cd backend && python3 -m venv .venv

backend-install: backend-venv
	cd backend && . .venv/bin/activate && pip install -r requirements.txt
	@echo "Listo. Copiá backend/.env.example a backend/.env y ajustá."

backend-initdb:
	cd backend && . .venv/bin/activate && FLASK_APP=wsgi.py flask init-db

backend-migrate:
	cd backend && . .venv/bin/activate && FLASK_APP=wsgi.py sh -c '\
		[ -d migrations ] || flask db init; \
		flask db migrate -m "cambios"; \
		flask db upgrade'

backend-dev:
	cd backend && . .venv/bin/activate && python wsgi.py

frontend-install:
	npm install

frontend-dev:
	npm run dev
