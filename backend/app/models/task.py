from sqlalchemy import Column, Integer, String, DateTime
from app.database.connection import Base
from datetime import datetime

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, index=True)
    owner = Column(String, nullable=True)
    due_date = Column(String, nullable=True)
    priority = Column(String, default="Medium")
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)
