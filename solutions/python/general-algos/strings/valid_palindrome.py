
class Solution:
    def isPalindrome(self, string: str) -> bool:
        left_idx = 0
        right_idx = len(string) - 1

        while left_idx < right_idx:
            while left_idx < right_idx and not string[left_idx].isalnum():
                left_idx += 1
            while left_idx < right_idx and not string[right_idx].isalnum():
                right_idx -= 1
            
            if string[left_idx].lower() != string[right_idx].lower():
                return False

            left_idx += 1
            right_idx -= 1

        return True