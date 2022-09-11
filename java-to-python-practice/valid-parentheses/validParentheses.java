class Solution {
    public boolean isValid(String string) {
        Map<Character,Character> mappings = new HashMap<Character,Character>(){{
            put(')', '(');
            put('}', '{');
            put(']', '[');
        }};
        
        Stack<Character> unclosedParens = new Stack();
        
        for (int i = 0; i < string.length(); i++) {
            char curChar = string.charAt(i);
            
            boolean isClosingParen = mappings.containsKey(curChar);
            if (isClosingParen) {
                char matchingOpenParen = mappings.get(curChar);
                if (!unclosedParens.isEmpty() && unclosedParens.pop() == matchingOpenParen) continue;
                
                return false;
            }
            else {
                unclosedParens.push(curChar);
            }
        }
        
        return unclosedParens.isEmpty();
    }
}