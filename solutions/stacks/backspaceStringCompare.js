const backspaceHelper = (s) => {
    const stack = [];

    for (let i = 0; i < s.length; i++) {
        character = s[i];
        
        if (character === '#') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(character);
        }
    }

    return stack.toString();
};

const backspaceCompare = (s, t) => {
    const parsedS = backspaceHelper(s);
    const parsedT = backspaceHelper(t);
    
    return parsedS === parsedT;
};