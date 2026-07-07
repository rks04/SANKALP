import sqlite3

try:
    conn = sqlite3.connect('d:/Riya/ai/backend/tasks.db')
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE id NOT IN (SELECT id FROM tasks ORDER BY id ASC LIMIT 5)")
    conn.commit()
    print("Database trimmed successfully.")
except Exception as e:
    print(f"Error: {e}")
finally:
    if conn:
        conn.close()
