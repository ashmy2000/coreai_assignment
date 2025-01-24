from pydantic import BaseModel

class NoteBase(BaseModel):
    title: str
    content: str
    category: str

class NoteCreate(NoteBase):
    pass

class NoteResponse(NoteBase):
    id: int

    class Config:
        orm_mode = True
