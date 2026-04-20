from flask import Blueprint, request, jsonify
from DB.database import get_connection
from datetime import date

symptoms_bp = Blueprint("symptoms", __name__)

# Save a new symptom
@symptoms_bp.route("/api/symptoms", methods=["POST"])
def add_symptom():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO symptoms (date, symptom, severity, notes)
        VALUES (?, ?, ?, ?)
    """, (
        data.get("date", str(date.today())),
        data["symptom"],
        data["severity"],
        data.get("notes", "")
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Symptom saved!", "id": cursor.lastrowid}), 201

# Get all symptoms
@symptoms_bp.route("/api/symptoms", methods=["GET"])
def get_symptoms():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM symptoms ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

# Delete a symptom
@symptoms_bp.route("/api/symptoms/<int:id>", methods=["DELETE"])
def delete_symptom(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM symptoms WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Symptom deleted!"})