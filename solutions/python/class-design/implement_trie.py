class Trie:
    def __init__(self):
        self.trie = {}
        self.end_symbol = "*"

    def insert(self, word: str) -> None:
        cur_position = self.trie

        for char in word:
            if char not in cur_position:
                cur_position[char] = {}
            cur_position = cur_position[char]

        cur_position[self.end_symbol] = True

    def search(self, word: str) -> bool:
        cur_position = self.trie

        for char in word:
            if char not in cur_position:
                return False
            cur_position = cur_position[char]

        return self.end_symbol in cur_position

    def startsWith(self, prefix: str) -> bool:
        cur_position = self.trie

        for char in prefix:
            if char not in cur_position:
                return False
            cur_position = cur_position[char]

        return True