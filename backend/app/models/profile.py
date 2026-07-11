import uuid
from datetime import datetime

from sqlalchemy import String, Text, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..extensions import db


class Profile(db.Model):
    """Perfil de músico. Los campos instruments/genres/location son semillas
    para la futura red de músicos: se guardan desde ya para no migrar después.
    """

    __tablename__ = "profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    username: Mapped[str | None] = mapped_column(String(50), unique=True, nullable=True)
    full_name: Mapped[str | None] = mapped_column(String(120))
    avatar_url: Mapped[str | None] = mapped_column(String(500))
    bio: Mapped[str | None] = mapped_column(Text)

    instruments: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    genres: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    location: Mapped[str | None] = mapped_column(String(120))

    # Plan de suscripción. Hoy siempre 'free'; el muro de pago llega cuando se
    # defina el medio de pago.
    plan: Mapped[str] = mapped_column(String(20), default="free", nullable=False)

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user: Mapped["User"] = relationship("User", back_populates="profile")  # noqa: F821

    def to_dict(self) -> dict:
        return {
            "username": self.username,
            "full_name": self.full_name,
            "avatar_url": self.avatar_url,
            "bio": self.bio,
            "instruments": self.instruments or [],
            "genres": self.genres or [],
            "location": self.location,
            "plan": self.plan,
        }
