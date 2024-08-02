import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def create_and_store_rainbow_table(wordlist, filename):
    with open(filename, 'w') as f:
        for word in wordlist:
            hashed_word = hash_password(word)
            f.write(f"{hashed_word}:{word}\n")
    print(f"Rainbow table stored in {filename}")

def load_rainbow_table(filename):
    rainbow_table = {}
    with open(filename, 'r') as f:
        for line in f:
            hashed_word, word = line.strip().split(':')
            rainbow_table[hashed_word] = word
    return rainbow_table

def rainbow_table_attack(target_hash, rainbow_table):
    return rainbow_table.get(target_hash, None)


wordlist = ['password', '123456', 'Pa$$w0rd', 'admin', 'letmein', 'qwerty', '123456789', 'welcome' , '123456789' , '12345678' , '12345', '1234567' , 'letmein' , '1q2w3e4r' , 'Password/*' ]


create_and_store_rainbow_table(wordlist, 'rainbow_table.txt')


rainbow_table = load_rainbow_table('rainbow_table.txt')


target_password = 'Password/*'
target_hash = hash_password(target_password)


cracked_password = rainbow_table_attack(target_hash, rainbow_table)
print(f"Cracked Password: {cracked_password}")