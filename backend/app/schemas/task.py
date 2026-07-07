from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    task: str
    owner: Optional[str] = None
    due_date: Optional[str] = None
    priority: str
    status: str = "Pending"

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    task: Optional[str] = None
    owner: Optional[str] = None
    due_date: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None

class TaskResponse(TaskBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class GeminiResponse(BaseModel):
    tasks: List[TaskCreate]

class GenerateRequest(BaseModel):
    notes: str
