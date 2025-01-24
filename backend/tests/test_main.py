import pytest
from fastapi.testclient import TestClient
from backend.app.main import app  # Adjust import to reflect the correct app location
from backend.app.database import SessionLocal, engine  # Adjust import to reflect correct location
from backend.app.models import Base  # Correct model import

# Create the tables in the in-memory database for testing
Base.metadata.create_all(bind=engine)


@pytest.fixture(scope="function")
def client():
    with TestClient(app) as client:
        yield client


@pytest.fixture(scope="function")
def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Test creating a note
def test_create_note(client):
    payload = {"title": "Test Note", "content": "This is a test note.", "category": "General"}

    # Create the note via POST request
    response = client.post("/api/v1/notes/", json=payload)

    # Check if the response status code is 200
    assert response.status_code == 200
    assert "id" in response.json()  # Ensure the ID is in the response
    assert response.json()["title"] == "Test Note"
    assert response.json()["content"] == "This is a test note."
    assert response.json()["category"] == "General"
