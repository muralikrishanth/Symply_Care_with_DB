from flask import Blueprint, request, jsonify
from DB.database import get_connection
from datetime import date

mood_bp = Blueprint("mood", __name__)

# Save mood & energy
@mood_bp.route("/api/mood", methods=["POST"])
def add_mood():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO mood_energy (date, mood, energy, notes)
        VALUES (?, ?, ?, ?)
    """, (
        data.get("date", str(date.today())),
        data["mood"],
        data["energy"],
        data.get("notes", "")
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Mood saved!", "id": cursor.lastrowid}), 201

# Get all mood entries
@mood_bp.route("/api/mood", methods=["GET"])
def get_mood():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM mood_energy ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

# Delete a mood entry
@mood_bp.route("/api/mood/<int:id>", methods=["DELETE"])
def delete_mood(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM mood_energy WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Mood entry deleted!"})