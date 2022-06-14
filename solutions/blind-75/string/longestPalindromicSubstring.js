const isStillPalindrome = (leftIdx, rightIdx, string) => {
    if (leftIdx < 0) return false;
    if (rightIdx >= string.length) return false;
    if (string[leftIdx] != string[rightIdx]) return false;

    return true;
};

const getLongestPalindromeCenteredAt = (leftIdx, rightIdx, string) => {
    let palindrome = '';

    while (isStillPalindrome(leftIdx, rightIdx, string)) {
        palindrome = string.substring(leftIdx, rightIdx + 1);
        leftIdx--;
        rightIdx++;
    }

    return palindrome;
};

const longestPalindrome = (string) => {
    let longestPalindromicSubstring = '';

    for (let i = 0; i < string.length; i++) {
        const oddLengthPalindrome = getLongestPalindromeCenteredAt(i, i, string);
        const evenLengthPalindrome = getLongestPalindromeCenteredAt(i, i + 1, string);

        let currentLongestPalindrome = oddLengthPalindrome;
        if (evenLengthPalindrome.length > oddLengthPalindrome.length) currentLongestPalindrome = evenLengthPalindrome;
        if (currentLongestPalindrome.length > longestPalindromicSubstring.length) longestPalindromicSubstring = currentLongestPalindrome;
    }

    return longestPalindromicSubstring;
};