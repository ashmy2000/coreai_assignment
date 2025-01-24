import pytest
from pydantic import ValidationError
from backend.app.main import NoteCreate, NoteResponse


# Test the validation of the NoteCreate model
def test_note_create_valid_data():
    # Valid data for NoteCreate
    note_data = {
        "title": "Test Note",
        "content": "This is a test note content.",
        "category": "General"
    }
    note = NoteCreate(**note_data)

    assert note.title == "Test Note"
    assert note.content == "This is a test note content."
    assert note.category == "General"


# Test missing field in NoteCreate (should raise ValidationError)
def test_note_create_missing_field():
    note_data = {
        "title": "Test Note",
        "content": "This is a test note content."
    }
    with pytest.raises(ValidationError):
        note = NoteCreate(**note_data)


# Test the validation of the NoteResponse model
def test_note_response_valid_data():
    note_data = {
        "id": 1,
        "title": "Test Note",
        "content": "Test content",
        "category": "General"
    }
    note_response = NoteResponse(**note_data)

    assert note_response.id == 1
    assert note_response.title == "Test Note"
    assert note_response.content == "Test content"
    assert note_response.category == "General"


# Test invalid data for NoteResponse (should raise ValidationError)
def test_note_response_invalid_data():
    note_data = {
        "id": "not-an-integer",  # Invalid id type
        "title": "Test Note",
        "content": "Test content",
        "category": "General"
    }
    with pytest.raises(ValidationError):
        note_response = NoteResponse(**note_data)

