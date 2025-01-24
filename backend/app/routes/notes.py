from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter()


# Create a new note
@router.post("/", response_model=schemas.NoteResponse)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    new_note = models.Note(**note.dict())
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

@router.get("/", response_model=list[schemas.NoteResponse])
def get_notes(title: str = None, db: Session = Depends(get_db)):
    """
    Get all notes or filter by title
    """
    query = db.query(models.Note)
    if title:
        query = query.filter(models.Note.title.contains(title))
    return query.all()

@router.get("/grouped", response_model=dict)
def get_notes_grouped_by_category(db: Session = Depends(get_db)):
    """
    Get all notes grouped by category.
    """
    notes = db.query(models.Note).all()
    grouped_notes = {}
    for note in notes:
        if note.category not in grouped_notes:
            grouped_notes[note.category] = []
        grouped_notes[note.category].append(note)
    return grouped_notes

# Delete a note by title
@router.delete("/")
def delete_note_by_title(title: str, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.title == title).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"message": f"Note titled '{title}' deleted successfully"}

# Update a note
@router.put("/{title}", response_model=schemas.NoteResponse)
def update_note(title: str, updated_note: schemas.NoteCreate, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.title == title).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    for key, value in updated_note.dict().items():
        setattr(note, key, value)
    db.commit()
    db.refresh(note)
    return note


