from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse, GenerateRequest
from app.services.gemini import generate_tasks_from_notes

router = APIRouter()

@router.post("/generate", response_model=List[TaskResponse])
def generate_tasks(request: GenerateRequest, db: Session = Depends(get_db)):
    try:
        raw_tasks = generate_tasks_from_notes(request.notes)
        
        # Depending on Gemini output, it might be a list or dict with a 'tasks' key
        task_list = raw_tasks if isinstance(raw_tasks, list) else raw_tasks.get('tasks', [])
        
        created_tasks = []
        for t in task_list:
            task_in = TaskCreate(**t)
            db_task = Task(**task_in.dict())
            db.add(db_task)
            db.commit()
            db.refresh(db_task)
            created_tasks.append(db_task)
            
        return created_tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tasks", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).order_by(Task.created_at.desc()).all()

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)
        
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"ok": True}
