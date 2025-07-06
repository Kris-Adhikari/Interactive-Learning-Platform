import os
import openai
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.urandom(24))
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql://username:password@localhost:5432/your_db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)
openai.api_key = os.getenv("OPENAI_API_KEY")

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

# Initialize database tables
with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")

@app.route('/api/chatbot', methods=['POST'])
def chatbot_response():
    data = request.get_json()
    user_question = data.get("question", "").strip()
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": user_question}
        ]
    )
    if response and response.choices:
        answer = response.choices[0].message['content'].strip()
        return jsonify({"answer": answer}), 200
    return jsonify({"error": "Failed to retrieve answer from OpenAI."}), 500

@app.route('/api/save_email', methods=['POST'])
def save_email():
    data = request.get_json()
    email = data.get('email', '').strip()
    new_user = User(email=email)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Email saved successfully!"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Email already exists."}), 409
    except:
        db.session.rollback()
        return jsonify({"error": "Failed to save email."}), 500

@app.errorhandler(404)
def handle_not_found(e):
    return jsonify({"error": "Resource not found."}), 404

@app.errorhandler(500)
def handle_internal_error(e):
    return jsonify({"error": "Internal server error."}), 500

if __name__ == '__main__':
    app.run(debug=True)
