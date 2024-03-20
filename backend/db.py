from flask import g
from pathlib import Path
import sqlite3

def get_db():
    if "db" not in g:
        current_file = Path(__file__)
        current_folder = current_file.parent
        db_path = current_folder / "data.db"
        g.db = sqlite3.connect(db_path)
        g.db.row_factory = sqlite3.Row  # Convert results from [("admin", "1234"), ("ofer", "abcd")] to [{"username": "admin", "password": "1234"}]
    return g.db


def close_db(_e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()
