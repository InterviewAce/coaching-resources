
class Solution:
    def lengthOfLongestSubstring(self, string: str) -> int:
        max_valid_substring_length = 0
        chars_in_substring = set()

        window_start = 0
        window_end = 0

        num_chars = len(string)
        while window_end < num_chars:
            # BEFORE updating window_end, check if string is valid and update pointers/set
            new_char = string[window_end]

            while new_char in chars_in_substring:
                char_at_start = string[window_start]
                chars_in_substring.remove(char_at_start)
                window_start += 1

            cur_valid_substring_length = window_end - window_start + 1
            max_valid_substring_length = max(max_valid_substring_length, cur_valid_substring_length)

            chars_in_substring.add(new_char)
            window_end += 1

        return max_valid_substring_length