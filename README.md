# Smart Notes Organiser - README

## Overview

The **Smart Notes Organiser** is a simple web application built using FastAPI that allows users to create, view, update, and delete notes. This app also features AI tools that can be integrated to analyze note content or categorize them based on predefined rules or machine learning models.

### Features:
- **Create**: Users can create new notes with a title, content, and category.
- **View**: View notes by searching through titles or categories.
- **Update**: Modify existing notes to change their content or category.
- **Delete**: Remove notes from the system.

---

## Technologies and Tools Used

The **Smart Notes Organizer** uses the following technologies and tools:

### Backend:
- **FastAPI**: A high-performance web framework for building APIs with Python 3.7+.
- **SQLAlchemy**: ORM (Object-Relational Mapping) used to interact with databases.
- **SQLite**: A lightweight database used for development and testing (can be easily replaced with other DBs like PostgreSQL, MySQL).
- **Pydantic**: Used for data validation and serialization (e.g., validating note content).
- **pytest**: A testing framework used for unit tests and test-driven development.

### AI/ML Tools (if applicable):
- **Natural Language Processing (NLP)**: To implement AI features such as categorizing or analyzing note content (e.g., using `spaCy`, `transformers`).

---

## Running the App Locally

### Prerequisites
Before running the application, ensure that you have Python 3.7+ installed on your system.

## Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <project_directory>

2. **Create a virtual environment(MAC)**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate

3. **Create a virtual environment(Windows)**:
   ```bash
    python -m venv venv
    .\venv\Scripts\activate
    
4. **Install the required dependencies:**:
   ```bash
    pip install -r requirements.txt

5. **Run the frontend:**:
   ```bash
   cd frontend
    npm install
    npm start

   
6. **Run the FastAPI server:**:
   ```bash
    uvicorn backend.app.main:app --reload

   The server will be running on http://localhost:8000.
   You can check the API documentation at http://localhost:8000/docs.

## Testing Approach & Running Tests

### Test Structure
**Create**: Ensure notes are added successfully.
**Read**: Test that notes can be retrieved by title or category.
**Update**: Verify that notes can be updated with new information.
**Delete***: Ensure that notes are properly deleted from the system.
### Testing Framework:
The app uses **pytest** for unit testing, and tests are located in the tests folder.

7. **Activate your virtual environment:**:
   ```bash
    source venv/bin/activate  # Linux/macOS
    .\venv\Scripts\activate  # Windows

8. **Activate your virtual environment:**:
   ```bash
    python3 -m pytest backend/tests/

