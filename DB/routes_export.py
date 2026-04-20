from flask import Blueprint, request, jsonify, make_response
from DB.database import get_connection
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from io import BytesIO
from datetime import datetime

export_bp = Blueprint("export", __name__)

# ─────────────────────────────────────────────────────────────
# PDF Language Strings
# ─────────────────────────────────────────────────────────────
PDF_STRINGS = {
    "en": {
        "title": "Symply — Health Report",
        "period": "Report period",
        "generated": "Generated",
        "disclaimer": (
            "This report is for informational purposes only and does not "
            "constitute medical advice. Always consult your doctor or healthcare provider."
        ),
        "meds": "Current Medications",
        "symptoms": "Symptoms Log",
        "mood": "Mood & Energy Log",
        "no_meds": "No medications recorded.",
        "no_symptoms": "No symptoms recorded in this period.",
        "no_mood": "No mood entries recorded in this period.",
        "med_name": "Medication",
        "dose": "Dose",
        "freq": "Frequency",
        "since": "Since",
        "date": "Date",
        "symptom": "Symptom",
        "severity": "Severity",
        "notes": "Notes",
        "mood_col": "Mood",
        "energy": "Energy",
        "mild": "Mild",
        "moderate": "Moderate",
        "severe": "Severe",
    },
    "de": {
        "title": "Symply — Gesundheitsbericht",
        "period": "Berichtszeitraum",
        "generated": "Erstellt",
        "disclaimer": (
            "Dieser Bericht dient nur zu Informationszwecken und stellt keine "
            "medizinische Beratung dar. Konsultieren Sie immer Ihren Arzt."
        ),
        "meds": "Aktuelle Medikamente",
        "symptoms": "Symptomprotokoll",
        "mood": "Stimmungs- & Energieprotokoll",
        "no_meds": "Keine Medikamente erfasst.",
        "no_symptoms": "Keine Symptome in diesem Zeitraum erfasst.",
        "no_mood": "Keine Stimmungseintraege in diesem Zeitraum erfasst.",
        "med_name": "Medikament",
        "dose": "Dosis",
        "freq": "Haeufigkeit",
        "since": "Seit",
        "date": "Datum",
        "symptom": "Symptom",
        "severity": "Schweregrad",
        "notes": "Notizen",
        "mood_col": "Stimmung",
        "energy": "Energie",
        "mild": "Leicht",
        "moderate": "Mittel",
        "severe": "Schwer",
    },
    "fr": {
        "title": "Symply — Rapport de Sante",
        "period": "Periode du rapport",
        "generated": "Genere le",
        "disclaimer": (
            "Ce rapport est fourni a titre informatif uniquement et ne constitue "
            "pas un avis medical. Consultez toujours votre medecin."
        ),
        "meds": "Medicaments actuels",
        "symptoms": "Journal des symptomes",
        "mood": "Journal humeur & energie",
        "no_meds": "Aucun medicament enregistre.",
        "no_symptoms": "Aucun symptome enregistre pour cette periode.",
        "no_mood": "Aucune entree d'humeur pour cette periode.",
        "med_name": "Medicament",
        "dose": "Dose",
        "freq": "Frequence",
        "since": "Depuis",
        "date": "Date",
        "symptom": "Symptome",
        "severity": "Severite",
        "notes": "Notes",
        "mood_col": "Humeur",
        "energy": "Energie",
        "mild": "Leger",
        "moderate": "Modere",
        "severe": "Severe",
    },
    "es": {
        "title": "Symply — Informe de Salud",
        "period": "Periodo del informe",
        "generated": "Generado",
        "disclaimer": (
            "Este informe es solo informativo y no constituye consejo medico. "
            "Siempre consulte a su medico o proveedor de salud."
        ),
        "meds": "Medicamentos actuales",
        "symptoms": "Registro de sintomas",
        "mood": "Registro de animo y energia",
        "no_meds": "No hay medicamentos registrados.",
        "no_symptoms": "No hay sintomas registrados en este periodo.",
        "no_mood": "No hay entradas de animo en este periodo.",
        "med_name": "Medicamento",
        "dose": "Dosis",
        "freq": "Frecuencia",
        "since": "Desde",
        "date": "Fecha",
        "symptom": "Sintoma",
        "severity": "Gravedad",
        "notes": "Notas",
        "mood_col": "Animo",
        "energy": "Energia",
        "mild": "Leve",
        "moderate": "Moderado",
        "severe": "Grave",
    },
    "ar": {
        "title": "Symply — تقرير صحي",
        "period": "فترة التقرير",
        "generated": "تاريخ الانشاء",
        "disclaimer": (
            "هذا التقرير لاغراض اعلامية فقط ولا يشكل نصيحة طبية. "
            "استشر دائما طبيبك او مقدم الرعاية الصحية."
        ),
        "meds": "الادوية الحالية",
        "symptoms": "سجل الاعراض",
        "mood": "سجل المزاج والطاقة",
        "no_meds": "لم يتم تسجيل اي ادوية.",
        "no_symptoms": "لم يتم تسجيل اي اعراض في هذه الفترة.",
        "no_mood": "لم يتم تسجيل اي مزاج في هذه الفترة.",
        "med_name": "الدواء",
        "dose": "الجرعة",
        "freq": "التكرار",
        "since": "منذ",
        "date": "التاريخ",
        "symptom": "العرض",
        "severity": "الشدة",
        "notes": "ملاحظات",
        "mood_col": "المزاج",
        "energy": "الطاقة",
        "mild": "خفيف",
        "moderate": "متوسط",
        "severe": "شديد",
    }
}


@export_bp.route("/api/export/pdf", methods=["GET"])
def export_pdf():
    from_date = request.args.get("from", "")
    to_date = request.args.get("to", "")
    lang = request.args.get("lang", "en")

    # Get language strings — fall back to English if unknown
    s = PDF_STRINGS.get(lang, PDF_STRINGS["en"])

    conn = get_connection()
    cursor = conn.cursor()

    # Fetch data
    cursor.execute("""
        SELECT date, symptom, severity, notes FROM symptoms
        WHERE date BETWEEN ? AND ?
        ORDER BY date DESC
    """, (from_date, to_date))
    symptoms = cursor.fetchall()

    cursor.execute("""
        SELECT date, mood, energy, notes FROM mood_energy
        WHERE date BETWEEN ? AND ?
        ORDER BY date DESC
    """, (from_date, to_date))
    moods = cursor.fetchall()

    cursor.execute(
        "SELECT name, dose, frequency, start_date FROM medications WHERE active = 1"
    )
    medications = cursor.fetchall()
    conn.close()

    # ── Build PDF ─────────────────────────────────────────
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )

    styles = getSampleStyleSheet()
    elements = []

    # Styles
    title_style = ParagraphStyle(
        "title",
        parent=styles["Heading1"],
        fontSize=20,
        textColor=colors.HexColor("#2E7D6E"),
        spaceAfter=4
    )
    sub_style = ParagraphStyle(
        "sub",
        parent=styles["Normal"],
        fontSize=10,
        textColor=colors.HexColor("#888780"),
        spaceAfter=20
    )
    section_style = ParagraphStyle(
        "section",
        parent=styles["Heading2"],
        fontSize=13,
        textColor=colors.HexColor("#2E7D6E"),
        spaceBefore=16,
        spaceAfter=8
    )
    disclaimer_style = ParagraphStyle(
        "disclaimer",
        parent=styles["Normal"],
        fontSize=9,
        textColor=colors.HexColor("#854F0B"),
        backColor=colors.HexColor("#FAEEDA"),
        borderPadding=8,
        spaceAfter=16
    )
    normal = styles["Normal"]
    normal.fontSize = 10

    # Table style helper
    def make_table_style():
        return TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2E7D6E")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1),
             [colors.white, colors.HexColor("#F8F7F4")]),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D3D1C7")),
            ("PADDING", (0, 0), (-1, -1), 6),
        ])

    # ── Title ─────────────────────────────────────────────
    elements.append(Paragraph("🩺 " + s["title"], title_style))
    elements.append(Paragraph(
        f"{s['period']}: {from_date} — {to_date} · "
        f"{s['generated']}: {datetime.now().strftime('%d %b %Y')}",
        sub_style
    ))

    # ── Disclaimer ────────────────────────────────────────
    elements.append(Paragraph("⚠️  " + s["disclaimer"], disclaimer_style))

    # ── Medications ───────────────────────────────────────
    elements.append(Paragraph(s["meds"], section_style))
    if medications:
        med_data = [[s["med_name"], s["dose"], s["freq"], s["since"]]]
        for m in medications:
            med_data.append([m["name"], m["dose"], m["frequency"], m["start_date"]])
        med_table = Table(med_data, colWidths=[4.5*cm, 3*cm, 4*cm, 3*cm])
        med_table.setStyle(make_table_style())
        elements.append(med_table)
    else:
        elements.append(Paragraph(s["no_meds"], normal))

    # ── Symptoms ──────────────────────────────────────────
    elements.append(Paragraph(s["symptoms"], section_style))
    if symptoms:
        sym_data = [[s["date"], s["symptom"], s["severity"], s["notes"]]]
        for sym in symptoms:
            sev = sym["severity"]
            if sev <= 3:
                label = s["mild"]
            elif sev <= 6:
                label = s["moderate"]
            else:
                label = s["severe"]
            sym_data.append([
                sym["date"],
                sym["symptom"],
                f"{sev}/10 ({label})",
                sym["notes"] or "—"
            ])
        sym_table = Table(sym_data, colWidths=[2.5*cm, 4*cm, 3.5*cm, 4.5*cm])
        sym_table.setStyle(make_table_style())
        elements.append(sym_table)
    else:
        elements.append(Paragraph(s["no_symptoms"], normal))

    # ── Mood ──────────────────────────────────────────────
    elements.append(Paragraph(s["mood"], section_style))
    mood_labels = ["", s["mild"], "Bad", "Okay", "Good", "Great"]

    # Use language-specific mood labels
    lang_mood_labels = {
        "en": ["", "Terrible", "Bad", "Okay", "Good", "Great"],
        "de": ["", "Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"],
        "fr": ["", "Terrible", "Mauvais", "Correct", "Bien", "Tres bien"],
        "es": ["", "Terrible", "Malo", "Regular", "Bien", "Excelente"],
        "ar": ["", "سيء جداً", "سيء", "مقبول", "جيد", "ممتاز"],
    }
    mood_labels = lang_mood_labels.get(lang, lang_mood_labels["en"])

    if moods:
        mood_data = [[s["date"], s["mood_col"], s["energy"], s["notes"]]]
        for m in moods:
            mood_data.append([
                m["date"],
                f"{mood_labels[m['mood']]} ({m['mood']}/5)",
                f"{m['energy']}/10",
                m["notes"] or "—"
            ])
        mood_table = Table(mood_data, colWidths=[2.5*cm, 4*cm, 3*cm, 5*cm])
        mood_table.setStyle(make_table_style())
        elements.append(mood_table)
    else:
        elements.append(Paragraph(s["no_mood"], normal))

    # ── Build & return PDF ────────────────────────────────
    doc.build(elements)
    buffer.seek(0)

    response = make_response(buffer.read())
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = (
        f"attachment; filename=symptom-journal-{from_date}-to-{to_date}.pdf"
    )
    return response