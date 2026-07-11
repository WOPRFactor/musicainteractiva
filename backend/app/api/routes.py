"""Endpoints de la API: salud, perfil y progreso de lecciones."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..extensions import db
from ..models import User, LessonProgress

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.get("/health")
def health():
    return jsonify(status="ok", service="emion-backend"), 200


def _current_user() -> User | None:
    return db.session.get(User, get_jwt_identity())


@api_bp.put("/profile")
@jwt_required()
def update_profile():
    user = _current_user()
    if not user or not user.profile:
        return jsonify(error="Perfil no encontrado."), 404

    data = request.get_json(silent=True) or {}
    p = user.profile

    if "username" in data:
        p.username = (data.get("username") or "").strip() or None
    if "full_name" in data:
        p.full_name = (data.get("full_name") or "").strip() or None
    if "bio" in data:
        p.bio = (data.get("bio") or "").strip() or None
    if "location" in data:
        p.location = (data.get("location") or "").strip() or None
    if "instruments" in data and isinstance(data["instruments"], list):
        p.instruments = [str(x).strip() for x in data["instruments"] if str(x).strip()]
    if "genres" in data and isinstance(data["genres"], list):
        p.genres = [str(x).strip() for x in data["genres"] if str(x).strip()]

    db.session.commit()
    return jsonify(profile=p.to_dict()), 200


@api_bp.get("/progress")
@jwt_required()
def list_progress():
    rows = LessonProgress.query.filter_by(user_id=get_jwt_identity()).all()
    return jsonify(progress=[r.to_dict() for r in rows], count=len(rows)), 200


@api_bp.post("/progress/<lesson_slug>")
@jwt_required()
def mark_progress(lesson_slug: str):
    uid = get_jwt_identity()
    row = db.session.get(LessonProgress, {"user_id": uid, "lesson_slug": lesson_slug})
    if row is None:
        row = LessonProgress(user_id=uid, lesson_slug=lesson_slug, completed=True)
        db.session.add(row)
    else:
        row.completed = True
    db.session.commit()
    return jsonify(progress=row.to_dict()), 200
