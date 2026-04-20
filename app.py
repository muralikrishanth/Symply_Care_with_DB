from flask import Flask, render_template
from flask_cors import CORS
from DB.database import init_db
from DB.routes_symptoms import symptoms_bp
from DB.routes_mood import mood_bp
from DB.routes_medications import medications_bp
from DB.routes_interactions import interactions_bp
from DB.routes_export import export_bp
import os

app = Flask(
    __name__,
    template_folder=os.path.join("UI", "templates"),
    static_folder=os.path.join("UI", "static")
)
CORS(app)

init_db()

app.register_blueprint(symptoms_bp)
app.register_blueprint(mood_bp)
app.register_blueprint(medications_bp)
app.register_blueprint(interactions_bp)
app.register_blueprint(export_bp)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)