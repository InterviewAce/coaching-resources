

class Solution:
    def get_longest_palindrome_centered_at(self, string, left_start_idx, right_start_idx):
        left_idx = left_start_idx
        right_idx = right_start_idx

        while self.is_still_valid_palindrome(string, left_idx, right_idx):
            left_idx -= 1
            right_idx += 1

        longest_palindrome_start_idx = left_idx + 1
        longest_palindrome_end_idx = right_idx - 1

        return (longest_palindrome_start_idx, longest_palindrome_end_idx)

    def is_still_valid_palindrome(self, string, left_idx, right_idx):
        if left_idx < 0:
            return False
        if right_idx >= len(string):
            return False

        return string[left_idx] == string[right_idx]

    def longestPalindrome(self, string: str) -> str:
        longest_palindrome_start_idx = 0
        longest_palindrome_end_idx = 0

        for i in range(len(string)):
            odd_palindrome_indices = self.get_longest_palindrome_centered_at(
                string,
                i,
                i,
            )
            even_palindrome_indices = self.get_longest_palindrome_centered_at(
                string,
                i,
                i + 1,
            )

            odd_start_idx, odd_end_idx = odd_palindrome_indices
            even_start_idx, even_end_idx = even_palindrome_indices

            odd_length = odd_end_idx - odd_start_idx + 1
            even_length = even_end_idx - even_start_idx + 1

            cur_longest_palindrome_length = longest_palindrome_end_idx - longest_palindrome_start_idx + 1

            if odd_length > cur_longest_palindrome_length and odd_length > even_length:
                longest_palindrome_start_idx = odd_start_idx
                longest_palindrome_end_idx = odd_end_idx

            if even_length > cur_longest_palindrome_length and even_length > odd_length:
                longest_palindrome_start_idx = even_start_idx
                longest_palindrome_end_idx = even_end_idx

        longest_palindrome_string = string[
            longest_palindrome_start_idx : longest_palindrome_end_idx + 1
        ]
        return longest_palindrome_string

   