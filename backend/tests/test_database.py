import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from backend.app.database import Base, get_db, SessionLocal

# Use an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# Create an engine and session maker for testing
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables (note: this is an in-memory database, so it will not persist data)
Base.metadata.create_all(bind=engine)


# Test fixture for getting a new database session
@pytest.fixture(scope="function")
def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Test the database session creation using get_db
def test_get_db(db_session):
    # Ensure that the db_session is correctly initialized
    assert db_session is not None

    # Test the session is an instance of SQLAlchemy's Session class
    assert isinstance(db_session, Session)  # Confirm the session is of type Session

    # Make sure the session can perform simple queries (e.g., checking the existence of tables)
    result = db_session.execute(text("SELECT 1"))  # Wrap SQL statement in text()
    assert result.scalar() == 1


# Test the database session management through get_db function
def test_get_db_function():
    db = next(get_db())  # Using the get_db generator
    assert db is not None

    # Make sure the session is properly closed after use
    assert db.is_active  # Ensure the session is active

    # Close the session
    db.close()

    # After closing, the session should no longer be active
    try:
        db.execute("SELECT 1")
        assert False, "Session should be closed and no longer executable"
    except Exception:
        pass  # Expected behavior is to raise an exception after closing
