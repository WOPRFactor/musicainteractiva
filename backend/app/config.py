"""Configuración por variables de entorno (12-factor).

El mismo código corre en Docker o en tu máquina/VM: solo cambian los valores
del entorno (DATABASE_URL, REDIS_URL, etc.). Ver .env.example.
"""
import os
from datetime import timedelta


def _bool(name: str, default: str = "false") -> bool:
    return os.environ.get(name, default).strip().lower() in ("1", "true", "yes", "on")


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-cambiar")

    # --- Base de datos ---
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "postgresql+psycopg2://emion:emion@localhost:5432/emion"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True}

    # --- Redis (rate limiting, Celery, Socket.IO en fases posteriores) ---
    REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

    # --- JWT en cookies httpOnly (seguro para el frontend web) ---
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret-cambiar")
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = _bool("JWT_COOKIE_SECURE", "false")  # true en producción (HTTPS)
    JWT_COOKIE_SAMESITE = os.environ.get("JWT_COOKIE_SAMESITE", "Lax")
    JWT_COOKIE_CSRF_PROTECT = _bool("JWT_COOKIE_CSRF_PROTECT", "true")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    # --- CORS ---
    CORS_ORIGINS = [
        o.strip()
        for o in os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")
        if o.strip()
    ]

    # --- Rate limiting (memoria en dev; Redis si está disponible) ---
    RATELIMIT_STORAGE_URI = os.environ.get("RATELIMIT_STORAGE_URI", "memory://")


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    JWT_COOKIE_SECURE = _bool("JWT_COOKIE_SECURE", "true")


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///:memory:")
    JWT_COOKIE_CSRF_PROTECT = False


_CONFIGS = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig,
}


def get_config(name: str | None = None):
    name = name or os.environ.get("FLASK_CONFIG", "default")
    return _CONFIGS.get(name, DevelopmentConfig)
