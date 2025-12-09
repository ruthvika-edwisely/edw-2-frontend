from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from datetime import timedelta

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)


# -------------------------------
# JWT CONFIG
# -------------------------------
app.config["JWT_SECRET_KEY"] = "super-secret-key"  # change later
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=5)

jwt = JWTManager(app)

# --------------------------------
# FILE MANAGEMENT
# --------------------------------
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r') as f:
        return json.load(f)

def save_json(filename, data):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

# --------------------------------
# LOGIN API (JWT)
# --------------------------------
@app.post("/api/login")
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    users = load_json("users.json")

    # Replace with DB lookup in real apps
    user = next((u for u in users if u["email"] == email and u["password"] == password), None)

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    # Create JWT
    token = create_access_token(identity=email)

    return jsonify({
        "token": token,
        "user": {"email": email, "name": user["name"]}
    }), 200


# --------------------------------
# ALL YOUR EXISTING ROUTES
# (You can protect any route using @jwt_required())
# --------------------------------

@app.route('/api/problems', methods=['GET'])
@jwt_required()  # <----- PROTECTED
def get_problems():
    problems = load_json('problems.json')
    difficulty = request.args.get('difficulty')
    if difficulty:
        problems = [p for p in problems if p['difficulty'].lower() == difficulty.lower()]
    return jsonify(problems)

@app.route('/api/problems/<int:problem_id>', methods=['GET'])
@jwt_required()
def get_problem(problem_id):
    problems = load_json('problems.json')
    problem = next((p for p in problems if p['id'] == problem_id), None)
    if problem:
        return jsonify(problem)
    return jsonify({'error': 'Problem not found'}), 404

@app.route('/api/problems/<int:problem_id>/status', methods=['PATCH'])
@jwt_required()
def update_problem_status(problem_id):
    problems = load_json('problems.json')
    data = request.get_json()
    for problem in problems:
        if problem['id'] == problem_id:
            problem['status'] = data.get('status', problem['status'])
            save_json('problems.json', problems)
            return jsonify(problem)
    return jsonify({'error': 'Problem not found'}), 404

@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    users = load_json('users.json')
    return jsonify(users)

@app.route('/api/users/current', methods=['GET'])
@jwt_required()
def get_current_user():
    users = load_json('users.json')
    current_user = next((u for u in users if u.get('isCurrentUser')), None)
    if current_user:
        return jsonify(current_user)
    return jsonify({'error': 'Current user not found'}), 404

@app.route('/api/leaderboard', methods=['GET'])
@jwt_required()
def get_leaderboard():
    users = load_json('users.json')
    sorted_users = sorted(users, key=lambda x: x['xp'], reverse=True)
    for i, user in enumerate(sorted_users):
        user['rank'] = i + 1
    return jsonify(sorted_users)

@app.route('/api/progress', methods=['GET'])
@jwt_required()
def get_progress():
    progress = load_json('progress.json')
    return jsonify(progress)

@app.route('/api/topics', methods=['GET'])
@jwt_required()
def get_topics():
    topics = load_json('topics.json')
    return jsonify(topics)

@app.route('/api/daily-challenge', methods=['GET'])
@jwt_required()
def get_daily_challenge():
    progress = load_json('progress.json')
    return jsonify(progress.get('dailyChallenge', {}))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=False, use_reloader=False)
