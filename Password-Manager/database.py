import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)
    return conn

def create_table(conn):
    create_table_sql = """ CREATE TABLE IF NOT EXISTS passwords (
                                        id integer PRIMARY KEY,
                                        service text NOT NULL,
                                        username text NOT NULL,
                                        password text NOT NULL
                                    ); """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def insert_password(conn, password_entry):
    sql = ''' INSERT INTO passwords(service, username, password)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, password_entry)
    conn.commit()
    return cur.lastrowid

def select_all_passwords(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM passwords")
    rows = cur.fetchall()
    return rows
