class Solution:
    def is_still_valid_palindrome(self, string, left_idx, right_idx):
        if left_idx < 0:
            return False
        if right_idx >= len(string):
            return False

        return string[left_idx] == string[right_idx]
        
    def get_number_of_palindromes_centered_at(self, string, left_idx, right_idx):
        number_of_palindromes = 0

        while self.is_still_valid_palindrome(string, left_idx, right_idx):
            number_of_palindromes += 1

            left_idx -= 1
            right_idx += 1

        return number_of_palindromes

    def countSubstrings(self, string: str) -> int:
        number_of_palindromes = 0

        for i in range(len(string)):
            number_of_odd_palindromes = self.get_number_of_palindromes_centered_at(string, i, i)
            number_of_even_palindromes = self.get_number_of_palindromes_centered_at(string, i, i + 1)

            number_of_palindromes += number_of_odd_palindromes + number_of_even_palindromes

        return number_of_palindromes

    
    

    