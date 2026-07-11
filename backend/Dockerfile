FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencias de sistema para psycopg2 / gevent
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chmod +x docker-entrypoint.sh

EXPOSE 5000

# El entrypoint prepara la base y luego lanza el CMD.
ENTRYPOINT ["./docker-entrypoint.sh"]
# Producción: gunicorn con workers gevent
CMD ["gunicorn", "-k", "gevent", "-w", "2", "-b", "0.0.0.0:5000", "wsgi:app"]
