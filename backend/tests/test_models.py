import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.models import Note  # Import the model
from backend.app.database import Base, SessionLocal
from sqlalchemy import Column, Integer, String, Text

# Create an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# Create a new engine and sessionmaker for testing
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the database schema (tables)
Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="function")
def db_session():
    """Fixture for creating and closing a new database session."""
    db = SessionLocal()
    try:
        db.begin()
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

# Test creating a Note object
def test_create_note(db_session):
    note_data = {"title": "Test Note", "content": "This is a test note content.", "category": "General"}
    note = Note(**note_data)

    db_session.add(note)
    db_session.commit()
    db_session.refresh(note)

    assert note.id is not None
    assert note.title == "Test Note"
    assert note.content == "This is a test note content."
    assert note.category == "General"

def test_query_note_by_title(db_session):
    note_data = {"title": "Test Note", "content": "This is a test note content.", "category": "General"}
    note = Note(**note_data)
    db_session.add(note)
    db_session.commit()

    queried_note = db_session.query(Note).filter(Note.title == "Test Note").first()

    assert queried_note is not None
    assert queried_note.title == "Test Note"
    assert queried_note.content == "This is a test note content."
    assert queried_note.category == "General"

def test_query_note_by_category(db_session):
    note_data = {"title": "Another Test Note", "content": "Different content", "category": "Work"}
    note = Note(**note_data)
    db_session.add(note)
    db_session.commit()

    queried_note = db_session.query(Note).filter(Note.category == "Work").first()

    assert queried_note is not None
    assert queried_note.category == "Work"

def test_query_note_not_found(db_session):
    queried_note = db_session.query(Note).filter(Note.title == "Non-existent Note").first()
    assert queried_note is None

def test_update_note_title(db_session):
    note_data = {"title": "Initial Title", "content": "Content", "category": "General"}
    note = Note(**note_data)
    db_session.add(note)
    db_session.commit()

    note.title = "Updated Title"
    db_session.commit()

    updated_note = db_session.query(Note).filter(Note.id == note.id).first()

    assert updated_note.title == "Updated Title"

# Test deleting a note
def test_delete_note(db_session):
    note_data = {"title": "Note to Delete", "content": "This note will be deleted", "category": "General"}
    note = Note(**note_data)
    db_session.add(note)
    db_session.commit()

    db_session.delete(note)
    db_session.commit()

    deleted_note = db_session.query(Note).filter(Note.id == note.id).first()

    assert deleted_note is None
