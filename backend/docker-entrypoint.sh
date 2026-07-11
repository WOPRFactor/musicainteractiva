#!/usr/bin/env sh
set -e

# Prepara la base al arrancar el contenedor:
# usa migraciones si existen; si no, crea las tablas desde los modelos.
export FLASK_APP=wsgi.py

if [ -d "migrations" ]; then
  echo "→ Aplicando migraciones (flask db upgrade)…"
  flask db upgrade || flask init-db
else
  echo "→ Sin migraciones: creando tablas (flask init-db)…"
  flask init-db
fi

echo "→ Iniciando servidor…"
exec "$@"
