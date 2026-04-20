from flask import Blueprint, request, jsonify
from DB.database import get_connection
from datetime import date
import requests as http_requests

medications_bp = Blueprint("medications", __name__)

# Add a medication
@medications_bp.route("/api/medications", methods=["POST"])
def add_medication():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO medications (name, dose, frequency, start_date)
        VALUES (?, ?, ?, ?)
    """, (
        data["name"],
        data["dose"],
        data["frequency"],
        data.get("start_date", str(date.today()))
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Medication saved!", "id": cursor.lastrowid}), 201

# Get all active medications
@medications_bp.route("/api/medications", methods=["GET"])
def get_medications():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM medications WHERE active = 1 ORDER BY name")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

# Stop a medication (soft delete)
@medications_bp.route("/api/medications/<int:id>", methods=["DELETE"])
def delete_medication(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE medications SET active = 0 WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Medication removed!"})

@medications_bp.route("/api/drug-search", methods=["GET"])
def drug_search():
    query = request.args.get("q", "").strip()
    if len(query) < 3:
        return jsonify([])
    try:
        res = http_requests.get(
            "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search",
            params={"terms": query, "ef": "DISPLAY_NAME"},
            timeout=8
        )
        data = res.json()

        # NIH API response format:
        # [total_count, codes, extra_fields_dict, display_strings]
        # extra_fields_dict contains {"DISPLAY_NAME": [list of names]}
        extra_fields = data[2] or {}
        display_names = extra_fields.get("DISPLAY_NAME", [])

        clean = []
        seen = set()

        for name in display_names:
            # Each name might be a list or a string
            if isinstance(name, list):
                name = name[0] if name else ""
            name = str(name).strip()

            # Keep only the base drug name — remove anything in brackets/parentheses
            base = name.split("(")[0].strip()
            base = base.split("[")[0].strip()

            # Title case
            base = base[0].upper() + base[1:].lower() if len(base) > 1 else base

            normalized = base.lower()
            if normalized not in seen and len(base) > 1:
                seen.add(normalized)
                clean.append(base)

            if len(clean) >= 7:
                break

        return jsonify(clean)

    except Exception as e:
        return jsonify({"error": str(e)}), 500