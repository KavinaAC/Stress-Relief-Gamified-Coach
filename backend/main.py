from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = sqlite3.connect("stress_coach.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS mood_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    mood TEXT,
    timestamp TEXT
)""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS user_points (
    user_id TEXT PRIMARY KEY,
    points INTEGER DEFAULT 0
)""")

conn.commit()

@app.get("/")
def root():
    return {"message": "Stress Relief Coach API is running"}

class MoodSubmission(BaseModel):
    user_id: str
    mood: str  # e.g., "happy", "neutral", "stressed"

class GameCompletion(BaseModel):
    user_id: str
    game_name: str
    points_earned: int

@app.post("/submit_mood")
def submit_mood(data: MoodSubmission):
    timestamp = datetime.utcnow().isoformat()
    cursor.execute(
        "INSERT INTO mood_logs (user_id, mood, timestamp) VALUES (?, ?, ?)",
        (data.user_id, data.mood, timestamp)
    )
    cursor.execute("SELECT points FROM user_points WHERE user_id = ?", (data.user_id,))
    row = cursor.fetchone()
    if row:
        new_points = row[0] + 10
        cursor.execute(
            "UPDATE user_points SET points = ? WHERE user_id = ?",
            (new_points, data.user_id)
        )
    else:
        cursor.execute(
            "INSERT INTO user_points (user_id, points) VALUES (?, ?)",
            (data.user_id, 10)
        )
    conn.commit()
    return {"message": "Mood logged and points added"}

@app.post("/game_completed")
def game_completed(data: GameCompletion):
    cursor.execute("SELECT points FROM user_points WHERE user_id = ?", (data.user_id,))
    row = cursor.fetchone()
    if row:
        new_points = row[0] + data.points_earned
        cursor.execute(
            "UPDATE user_points SET points = ? WHERE user_id = ?",
            (new_points, data.user_id)
        )
    else:
        cursor.execute(
            "INSERT INTO user_points (user_id, points) VALUES (?, ?)",
            (data.user_id, data.points_earned)
        )
    conn.commit()
    return {"message": f"Added {data.points_earned} points for game '{data.game_name}'"}

@app.get("/points/{user_id}")
def get_points(user_id: str):
    cursor.execute("SELECT points FROM user_points WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    return {"points": row[0] if row else 0}

@app.get("/mood_logs/{user_id}")
def mood_logs(user_id: str):
    cursor.execute(
        "SELECT mood, timestamp FROM mood_logs WHERE user_id = ? ORDER BY timestamp DESC",
        (user_id,)
    )
    logs = cursor.fetchall()
    return {"logs": [{"mood": mood, "timestamp": ts} for mood, ts in logs]}
