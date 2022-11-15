const numberToLettersMap = {
    1: [],
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
};

const generateCombinations = (digits, location, stringSoFar, allCombinations) => {
    // Base case
    if (location === digits.length) {
        allCombinations.push(stringSoFar);
        return;
    }

    // Process node

    // Traverse neighbors
    const curDigit = digits[location];
    const chars = numberToLettersMap[curDigit];

    for (const char of chars) {
        generateCombinations(digits, location + 1, stringSoFar + char, allCombinations);
    }
};

const letterCombinations = (digits) => {
    if (digits.length === 0) return [];

    const allCombinations = [];

    generateCombinations(digits, 0, '', allCombinations);

    return allCombinations;
};
