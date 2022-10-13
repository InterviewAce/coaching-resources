class Solution:
    def isValid(self, string: str) -> bool:
        stack = []
        corresponding_parentheses = {
            '(': ')',
            '{': '}',
            '[': ']',
        }
        
        for char in string:
            is_opening_parentheses = char in corresponding_parentheses

            if is_opening_parentheses:
                stack.append(char)
                continue
                
            if len(stack) == 0:
                return False
            
            last_char = stack.pop()
            
            is_valid_closing_parentheses = corresponding_parentheses[last_char] == char
            if not is_valid_closing_parentheses:
                return False
        
        is_stack_empty = len(stack) == 0
        return is_stack_empty