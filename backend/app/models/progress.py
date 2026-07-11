import uuid
from datetime import datetime

from sqlalchemy import String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..extensions import db


class LessonProgress(db.Model):
    """Progreso por lección (slug de la ruta /teoria/[slug])."""

    __tablename__ = "lesson_progress"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    lesson_slug: Mapped[str] = mapped_column(String(160), primary_key=True)
    completed: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def to_dict(self) -> dict:
        return {
            "lesson_slug": self.lesson_slug,
            "completed": self.completed,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
