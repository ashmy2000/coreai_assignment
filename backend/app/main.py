from fastapi import FastAPI
from .database import Base, engine
from .routes.notes import router as notes_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
Base.metadata.create_all(bind=engine)

# Include API routes
app.include_router(notes_router, prefix="/api/v1/notes", tags=["Notes"])

@app.get("/")
def home():
    return {"message": "Welcome to Smart Notes Organizer!"}
