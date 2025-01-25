from fastapi import FastAPI
from .database import Base, engine
from .routes.notes import router as notes_router
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to your frontend's live URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base schema
class NoteBase(BaseModel):
    title: str
    content: str
    category: str

# Create schema
class NoteCreate(NoteBase):
    pass

# Response schema with 'id' field
class NoteResponse(NoteBase):
    id: int

    class Config:
        orm_mode = True  # Make sure this is correctly placed for ORM support

# Initialize database
Base.metadata.create_all(bind=engine)

# Include API routes
app.include_router(notes_router, prefix="/api/v1/notes", tags=["Notes"])

# Home Route
@app.get("/")
def home():
    return {"message": "Welcome to Smart Notes Organizer!"}
