import sqlite3
from pathlib import Path

current_file = Path(__file__)
current_folder = current_file.parent
schema_file_path = current_folder / "schema.sql"
schema_sql = schema_file_path.read_text()
db_path = current_folder / "data.db"

db = sqlite3.connect(db_path)
cursor = db.cursor()
cursor.execute(schema_sql)
# cursor.execute("""
#     INSERT INTO users (username, password) VALUES ('ofer', 'abcd')
# """)
# db.commit()
