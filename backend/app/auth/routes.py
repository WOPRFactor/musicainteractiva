"""Endpoints de autenticación: registro, login, logout, refresh y /me.

Los tokens JWT viajan en cookies httpOnly (con protección CSRF), no en el
cuerpo de la respuesta: más seguro para un frontend web.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    jwt_required,
    get_jwt_identity,
)

from ..extensions import db, limiter
from ..models import User, Profile

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


def _issue_tokens(response, user: User):
    identity = str(user.id)
    set_access_cookies(response, create_access_token(identity=identity))
    set_refresh_cookies(response, create_refresh_token(identity=identity))
    return response


@auth_bp.post("/register")
@limiter.limit("10 per hour")
def register():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    full_name = (data.get("full_name") or "").strip() or None

    if not email or not password:
        return jsonify(error="Faltan email o contraseña."), 400
    if len(password) < 6:
        return jsonify(error="La contraseña necesita al menos 6 caracteres."), 400
    if User.query.filter_by(email=email).first():
        return jsonify(error="Ya existe una cuenta con ese email."), 409

    user = User(email=email)
    user.set_password(password)
    user.profile = Profile(full_name=full_name)
    db.session.add(user)
    db.session.commit()

    response = jsonify(user=user.to_dict())
    return _issue_tokens(response, user), 201


@auth_bp.post("/login")
@limiter.limit("20 per hour")
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify(error="Email o contraseña incorrectos."), 401

    response = jsonify(user=user.to_dict())
    return _issue_tokens(response, user), 200


@auth_bp.post("/logout")
def logout():
    response = jsonify(ok=True)
    unset_jwt_cookies(response)
    return response, 200


@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    response = jsonify(ok=True)
    set_access_cookies(response, create_access_token(identity=identity))
    return response, 200


@auth_bp.get("/me")
@jwt_required()
def me():
    user = db.session.get(User, get_jwt_identity())
    if not user:
        return jsonify(error="Usuario no encontrado."), 404
    return jsonify(user=user.to_dict()), 200
