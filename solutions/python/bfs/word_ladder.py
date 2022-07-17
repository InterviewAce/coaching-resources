NO_VALID_SEQUENCE = 0

WORD = 'word'
SEQUENCE_LENGTH_SO_FAR = 'sequence_length_so_far'

LOWERCASE_A_ASCII_VALUE = ord('a')
LOWERCASE_Z_ASCII_VALUE = ord('z')

class Solution:
    def generate_all_valid_character_insertions(self, beginning, ending, valid_words):
        all_character_insertions = []
        
        for num in range(LOWERCASE_A_ASCII_VALUE, LOWERCASE_Z_ASCII_VALUE + 1):
            new_char = chr(num)
            new_string = beginning + new_char + ending
            
            if new_string not in valid_words:
                continue
                
            all_character_insertions.append(new_string)
            
        return all_character_insertions
    
    def generate_valid_one_diff_words(self, word, valid_words):
        valid_one_diff_words = []
        
        for i in range(len(word)):
            beginning = word[:i]
            ending = word[i + 1:]
            
            all_valid_character_insertions = self.generate_all_valid_character_insertions(beginning, ending, valid_words)
            
            for new_string in all_valid_character_insertions:
                valid_one_diff_words.append(new_string)
        
        return valid_one_diff_words

    def ladderLength(self, begin_word: str, end_word: str, word_list: List[str]) -> int:
        valid_words = set(word_list)
        
        if end_word not in valid_words:
            return NO_VALID_SEQUENCE
        
        queue = deque()
        queue.append({
            WORD: begin_word,
            SEQUENCE_LENGTH_SO_FAR: 1
        })
        
        visited = set()
        
        while queue:
            # Remove node
            node = queue.popleft()
            
            word = node[WORD]
            sequence_length_so_far = node[SEQUENCE_LENGTH_SO_FAR]
            
            # Process node
            if word == end_word:
                return sequence_length_so_far
            
            visited.add(word)
            
            # Add neighbors
            one_diff_words = self.generate_valid_one_diff_words(word, valid_words)
            
            for new_word in one_diff_words:
                if new_word in visited:
                    continue
                    
                queue.append({
                    WORD: new_word,
                    SEQUENCE_LENGTH_SO_FAR: sequence_length_so_far + 1
                })
        
        return NO_VALID_SEQUENCE