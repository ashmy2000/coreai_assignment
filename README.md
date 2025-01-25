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

### Frontend:
- **React**: JavaScript library for building the user interface
- **Axios**: HTTP client for making API requests.
- 
### Backend:
- **FastAPI**: Framework for building the API.
- **SQLAlchemy**: ORM for database interaction.
- **SQLite**: Lightweight database for storing notes.
- **Uvicorn**: ASGI server for running the FastAPI application.
- **Pytest**: Testing framework for ensuring code reliability.

### Tools and Deployment::
- **PyCharm**: IDE used for development.
- **Git and GitHub**: For version control and code collaboration.
- **Render**: Cloud platform for deploying both the frontend and backend.

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

