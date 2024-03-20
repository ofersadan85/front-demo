from dataclasses import asdict

from dotenv import load_dotenv
from flask import Flask, Response, request
from models import NewUser, PublicUser, User
from db import get_db, close_db

def add_cors_headers(response: Response) -> Response:
    """Add CORS headers to the response"""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response


load_dotenv()  # Load environment variables from a .env file
app = Flask(__name__)

app.teardown_appcontext(close_db)
app.after_request(add_cors_headers)  # Add CORS headers to all responses


@app.route("/users")
def get_users() -> list[PublicUser]:
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT id, username, email, age FROM users")
    result = cursor.fetchall()
    users = [PublicUser(**row) for row in result]
    return users


@app.route("/users", methods=["POST"])
def create_user() -> dict:
    # TODO: Add validation, error handling (what if the user already exists? what if the request is missing fields? etc.)
    new_user = NewUser(**request.get_json())
    db = get_db()
    cursor = db.cursor()
    parameters = [new_user.username, new_user.password, new_user.email, new_user.age]
    cursor.execute("INSERT INTO users (username, password, email, age) VALUES (?, ?, ?, ?)", parameters)
    db.commit()
    cursor.execute("SELECT id FROM users WHERE username = ?", [new_user.username])
    result = cursor.fetchone()
    new_user_id = result["id"]
    
    user = User(id=new_user_id, **asdict(new_user))
    print("User created:", user)
    public_user = PublicUser(user.id, user.username, user.email, user.age)
    return asdict(public_user)


@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id: int):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM users WHERE id = ?", [user_id])
    db.commit()
    return ""

app.run()
