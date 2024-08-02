import base64
import os
import hashlib
from cryptography.fernet import Fernet

def generate_key(master_password):
    # Derive a key from the master password
    salt = os.urandom(16)
    kdf = hashlib.pbkdf2_hmac(
        'sha256',
        master_password.encode(),
        salt,
        100000
    )
    key = base64.urlsafe_b64encode(kdf)
    return key, salt

def load_key(master_password, salt):
    kdf = hashlib.pbkdf2_hmac(
        'sha256',
        master_password.encode(),
        salt,
        100000
    )
    key = base64.urlsafe_b64encode(kdf)
    return key

def encrypt_password(password, key):
    fernet = Fernet(key)
    encrypted_password = fernet.encrypt(password.encode())
    return encrypted_password

def decrypt_password(encrypted_password, key):
    fernet = Fernet(key)
    decrypted_password = fernet.decrypt(encrypted_password).decode()
    return decrypted_password
