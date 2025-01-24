from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Smart Notes Organizer!"}

def test_create_note():
    response = client.post("/api/v1/notes/", json={
        "title": "Test Note",
        "content": "This is a test note.",
        "category": "Testing"
    })
    assert response.status_code == 200
    assert response.json()["title"] == "Test Note"
