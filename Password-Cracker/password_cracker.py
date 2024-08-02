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

def analyze_password(password):
    if all(c in string.digits for c in password):
        return 'numeric'
    elif all(c in string.ascii_letters for c in password):
        return 'alphabetical'
    elif any(c in string.punctuation for c in password):
        return 'complex'
    else:
        return 'alphanumeric'

def suggest_hash_function(password):
    password_type = analyze_password(password)
    if password_type == 'numeric':
        return 'sha256'
    elif password_type == 'alphabetical':
        return 'sha512'
    elif password_type == 'complex':
        return 'blake2b'
    else:  # alphanumeric
        return 'sha3_256'

def select_hash_function(hash_name):
    hash_functions = {
        'md5': hashlib.md5,
        'sha1': hashlib.sha1,
        'sha256': hashlib.sha256,
        'sha384': hashlib.sha384,
        'sha512': hashlib.sha512,
        'blake2b': hashlib.blake2b,
        'sha3_256': hashlib.sha3_256,
    }
    return hash_functions.get(hash_name.lower(), hashlib.sha256)  # default to sha256 if invalid

def hash_password(password, hash_function):
    hash_object = hash_function(password.encode())
    return hash_object.hexdigest()

def dictionary_attack(hashed_password, hash_function, dictionary_file):
    with open(dictionary_file, 'r', encoding="latin-1") as file:
        for word in file:
            word = word.strip()
            if hash_function(word.encode()).hexdigest() == hashed_password:
                return word
    return None

def main():
    print("Password Generator Tool")
    while True:
        print("\n1. Generate Basic Password")
        print("2. Generate Complex Password")
        print("3. Generate Complexity-Specific Password")
        print("4. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            password_type = input("Enter password type (numeric/alphabetical): ").strip().lower()
            length = int(input("Enter password length: "))
            password = generate_basic_password(password_type, length)
            print(f"Generated Password: {password}")

        elif choice == '2':
            case_type = input("Enter case type (lowercase/uppercase/both): ").strip().lower()
            length = int(input("Enter password length: "))
            password = generate_complex_password(case_type, length)
            print(f"Generated Password: {password}")

        elif choice == '3':
            length = int(input("Enter password length: "))
            output_format = input("Generate password in (bits/characters/hex): ").strip().lower()
            password = generate_complexity_specific_password(length, output_format)
            print(f"Generated Password: {password}")

        elif choice == '4':
            break
        else:
            print("Invalid choice. Please try again.")
            continue

        suggested_hash = suggest_hash_function(password)
        print(f"Suggested hash function based on your password: {suggested_hash}")

        user_hash_choice = input("Enter the hash function you want to use (md5/sha1/sha256/sha384/sha512/blake2b/sha3_256): ").strip().lower()
        hash_function = select_hash_function(user_hash_choice)
        hashed_password = hash_password(password, hash_function)
        print(f"Hashed Password: {hashed_password}")

        dictionary_file = 'rockyou.txt'
        cracked_password = dictionary_attack(hashed_password, hash_function, dictionary_file)

        if cracked_password:
            print(f"Password found in dictionary: {cracked_password}")
        else:
            print("Password not found in dictionary.")

if __name__ == '__main__':
    main()