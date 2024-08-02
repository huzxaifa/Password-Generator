from password_gen import generate_basic_password,generate_complex_password,generate_complexity_specific_password


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


if __name__ == "__main__":
    main()