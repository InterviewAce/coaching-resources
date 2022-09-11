class Solution:
    def isValid(self, string: str) -> bool:
        mappings = {
            ')': '(',
            '}': '{',
            ']': '['
        }
        
        unclosed_parens = []
        
        for char in string:
            is_closing_paren = char in mappings
            
            if is_closing_paren:
                matching_open_paren = mappings[char]
                if len(unclosed_parens) > 0 and unclosed_parens.pop() == matching_open_paren:
                    continue
                    
                return False
            else:
                unclosed_parens.append(char)
                
        return len(unclosed_parens) == 0
    
