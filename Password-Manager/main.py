import os
from encryption import generate_key, load_key, encrypt_password, decrypt_password
from database import create_connection, create_table, insert_password, select_all_passwords
from utils import get_master_password

DATABASE = "passwords.db"

def setup():
    # Check if the database exists
    if not os.path.exists(DATABASE):
        conn = create_connection(DATABASE)
        if conn is not None:
            create_table(conn)
        else:
            print("Error! Cannot create the database connection.")
    else:
        print("Database already exists.")

def add_password(service, username, password, key):
    conn = create_connection(DATABASE)
    if conn is not None:
        encrypted_password = encrypt_password(password, key)
        password_entry = (service, username, encrypted_password)
        insert_password(conn, password_entry)
        conn.close()
        print("Password added successfully.")
    else:
        print("Error! Cannot create the database connection.")

def view_passwords(key):
    conn = create_connection(DATABASE)
    if conn is not None:
        rows = select_all_passwords(conn)
        for row in rows:
            service, username, encrypted_password = row[1], row[2], row[3]
            decrypted_password = decrypt_password(encrypted_password, key)
            print(f"Service: {service}, Username: {username}, Password: {decrypted_password}")
        conn.close()
    else:
        print("Error! Cannot create the database connection.")

def main():
    setup()

    master_password = get_master_password()
    key, salt = generate_key(master_password)

    while True:
        choice = input("1. Add password\n2. View passwords\n3. Exit\nEnter your choice: ")
        if choice == '1':
            service = input("Enter service name: ")
            username = input("Enter username: ")
            password = input("Enter password: ")
            add_password(service, username, password, key)
        elif choice == '2':
            view_passwords(key)
        elif choice == '3':
            break
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
