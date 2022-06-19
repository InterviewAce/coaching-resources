const isStillValidPalindrome = (string, leftIdx, rightIdx) => {
    if (leftIdx < 0) return false;
    if (rightIdx >= string.length) return false;

    return string[leftIdx] === string[rightIdx];
};

const numberOfPalindromesCenteredAt = (
    string,
    leftIdxStart,
    rightIdxStart,
) => {
    let leftIdx = leftIdxStart;
    let rightIdx = rightIdxStart;

    let numberOfPalindromes = 0;

    while (isStillValidPalindrome(string, leftIdx, rightIdx)) {
        numberOfPalindromes++;

        leftIdx--;
        rightIdx++;
    }

    return numberOfPalindromes;
};

const countSubstrings = (string) => {
    if (string.length === 0) return 0;

    let numberOfPalindromes = 0;

    for (let i = 0; i < string.length; i++) {
        const numberOfOddPalindromes = numberOfPalindromesCenteredAt(string, i, i);
        const numberOfEvenPalindromes = numberOfPalindromesCenteredAt(string, i, i + 1);

        numberOfPalindromes += numberOfOddPalindromes + numberOfEvenPalindromes;
    }

    return numberOfPalindromes;
};
