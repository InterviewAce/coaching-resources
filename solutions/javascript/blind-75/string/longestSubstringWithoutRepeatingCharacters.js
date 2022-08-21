const lengthOfLongestSubstring = (string) => {
    let maxValidSubstringLength = 0;
    const charsInSubstring = new Set();
    
    let windowStart = 0;
    let windowEnd = 0;
    
    const numChars = string.length;
    while (windowEnd < numChars) {
        // BEFORE updating window_end, check if string is valid and update pointers/set
        const newChar = string[windowEnd];
        
        while (charsInSubstring.has(newChar)) {
            const charAtStart = string[windowStart];
            charsInSubstring.delete(charAtStart);
            windowStart++;
        }
        
        const curValidSubstringLength = windowEnd - windowStart + 1;
        maxValidSubstringLength = Math.max(maxValidSubstringLength, curValidSubstringLength);
        
        charsInSubstring.add(newChar);
        windowEnd++;
    }
    
    return maxValidSubstringLength;
};