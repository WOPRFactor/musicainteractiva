"""Application factory de EMION."""
from flask import Flask, jsonify

from .config import get_config
from .extensions import db, migrate, jwt, bcrypt, cors, limiter
from . import models  # noqa: F401  (import para que Alembic detecte los modelos)


def create_app(config_name: str | None = None) -> Flask:
    app = Flask(__name__)
    app.config.from_object(get_config(config_name))

    # --- Extensiones ---
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}},
        supports_credentials=True,
    )
    limiter.storage_uri = app.config["RATELIMIT_STORAGE_URI"]
    limiter.init_app(app)

    # --- Blueprints ---
    from .auth.routes import auth_bp
    from .api.routes import api_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(api_bp)

    # --- Manejo de errores JSON coherente ---
    @app.errorhandler(404)
    def not_found(_e):
        return jsonify(error="No encontrado."), 404

    @app.errorhandler(429)
    def rate_limited(_e):
        return jsonify(error="Demasiados intentos. Probá más tarde."), 429

    @app.errorhandler(500)
    def server_error(_e):
        return jsonify(error="Error interno del servidor."), 500

    # --- CLI: crear tablas sin migraciones (útil para un primer arranque) ---
    @app.cli.command("init-db")
    def init_db():
        """Crea las tablas a partir de los modelos (dev / bootstrap)."""
        db.create_all()
        print("✓ Tablas creadas.")

    return app

