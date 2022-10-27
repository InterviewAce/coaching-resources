from collections import defaultdict

ALPHABET_SIZE = 26
LOWERCASE_A = 'a'

class Solution:
    def groupAnagrams(self, strings: List[str]) -> List[List[str]]:
        anagram_groupings = defaultdict(list)
        
        for string in strings:
            char_frequencies = self.get_char_frequencies(string)
            anagram_groupings[char_frequencies].append(string)
        
        return list(anagram_groupings.values())
    
    def get_char_frequencies(self, string):
        char_frequencies = [0 for _ in range(ALPHABET_SIZE)]
        
        for char in string:
            index = ord(char) - ord(LOWERCASE_A)
            char_frequencies[index] += 1
        
        return tuple(char_frequencies)