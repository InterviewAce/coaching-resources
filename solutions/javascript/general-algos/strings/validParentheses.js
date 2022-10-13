const isValid = (string) => {
    const stack = [];
    const correspondingParentheses = {'(': ')', '{': '}', '[': ']'};
    
    for (let i = 0; i < string.length; i++) {
        const char = string[i];

        const isOpeningParentheses = correspondingParentheses.hasOwnProperty(char);
        if (isOpeningParentheses) {
            stack.push(char);
            continue;
        }
        
        const lastChar = stack.pop();
        const isValidClosingParantheses = correspondingParentheses[lastChar] === char;
        if (!isValidClosingParantheses) return false;
    }
    
    const isStackEmpty = stack.length === 0;
    return isStackEmpty
};