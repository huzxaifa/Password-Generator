**Overview**
Password Cracker is a tool designed to recover passwords from data that has been encrypted or hashed. It supports various encryption and hashing algorithms and uses different attack strategies to find the original plaintext passwords. This tool is intended for ethical use only, with permission from the system owner.

**Features**
Supports multiple hashing algorithms: MD5, SHA-1, SHA-256, and more.
Attack strategies: Brute force, dictionary attack, and rainbow tables.
Highly configurable: Customize attack parameters and hashing methods.
Efficient and fast: Optimized for performance to quickly recover passwords.

**Installation**
To install and set up Password Cracker, follow these steps:

**1.Clone the repository:**
git clone https://github.com/your-username/password-cracker.git
cd password-cracker

**2. Install dependencies:**
python password_cracker.py --hash SHA256 --attack dictionary --input hashed_passwords.txt --wordlist common_passwords.txt
Available options:

--hash: Specify the hashing algorithm (e.g., MD5, SHA1, SHA256).
--attack: Choose the attack strategy (e.g., brute-force, dictionary).
--input: Path to the file containing hashed passwords.
--wordlist: Path to the dictionary file (only for dictionary attack).
--output: Path to save the cracked passwords (optional).

**Example commands:**
Dictionary attack
python password_cracker.py --hash SHA256 --attack dictionary --input hashed_passwords.txt --wordlist common_passwords.txt
Brute force attack
python password_cracker.py --hash MD5 --attack brute-force --input hashed_passwords.txt


