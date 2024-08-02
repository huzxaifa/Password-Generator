import random
import string
import hashlib


def generate_basic_password(password_type, length):
    if password_type == 'numeric':
        characters = string.digits
    elif password_type == 'alphabetical':
        characters = string.ascii_letters
    else:
        raise ValueError("Invalid password type. Choose 'numeric' or 'alphabetical'.")

    password = ''.join(random.choice(characters) for _ in range(length))
    return password


def generate_complex_password(case_type, length):
    if case_type == 'lowercase':
        characters = string.ascii_lowercase
    elif case_type == 'uppercase':
        characters = string.ascii_uppercase
    elif case_type == 'both':
        characters = string.ascii_letters
    else:
        raise ValueError("Invalid case type. Choose 'lowercase', 'uppercase', or 'both'.")

    characters += string.digits
    password = ''.join(random.choice(characters) for _ in range(length))
    return password


def generate_complexity_specific_password(length, output_format):
    characters = string.ascii_letters + string.digits + string.punctuation

    if output_format == 'bits':
        if length >= 80:
            while length > 60:
                print("Suggestion: A good approximate length for bits is 50.")
                length = int(input("Enter password length (<= 50): "))
        password_bits = ''.join(random.choice('01') for _ in range(length))
        return password_bits
    elif output_format == 'characters':
        password = ''.join(random.choice(characters) for _ in range(length))
        return password
    elif output_format == 'hex':
        password = ''.join(random.choice('0123456789abcdef') for _ in range(length))
        return password
    else:
        raise ValueError("Invalid output format. Choose 'bits', 'characters', or 'hex'.")