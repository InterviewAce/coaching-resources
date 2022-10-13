const isStillValidPalindrome = (string, leftIdx, rightIdx) => {
    if (leftIdx < 0) return false;
    if (rightIdx >= string.length) return false;

    return string[leftIdx] === string[rightIdx];
};

const getLongestPalindromeCenteredAt = (
    string,
    leftStartIdx,
    rightStartIdx,
) => {
    let leftIdx = leftStartIdx;
    let rightIdx = rightStartIdx;

    while (isStillValidPalindrome(string, leftIdx, rightIdx)) {
        leftIdx -= 1;
        rightIdx += 1;
    }

    const longestPalindromeStartIdx = leftIdx + 1;
    const longestPalindromeEndIdx = rightIdx - 1;

    return [longestPalindromeStartIdx, longestPalindromeEndIdx];
};

const longestPalindrome = (string) => {
    let longestPalindromeStartIdx = 0;
    let longestPalindromeEndIdx = 0;

    for (let i = 0; i < string.length; i += 1) {
        const oddPalindromeIndices = getLongestPalindromeCenteredAt(
            string,
            i,
            i,
        );
        const evenPalindromeIndices = getLongestPalindromeCenteredAt(
            string,
            i,
            i + 1,
        );

        const [oddStartIdx, oddEndIdx] = oddPalindromeIndices;
        const [evenStartIdx, evenEndIdx] = evenPalindromeIndices;

        const oddLength = oddEndIdx - oddStartIdx + 1;
        const evenLength = evenEndIdx - evenStartIdx + 1;

        const curLongestPalindromeLength =
            longestPalindromeEndIdx - longestPalindromeStartIdx + 1;

        if (oddLength > curLongestPalindromeLength && oddLength > evenLength) {
            longestPalindromeStartIdx = oddStartIdx;
            longestPalindromeEndIdx = oddEndIdx;
        }

        if (evenLength > curLongestPalindromeLength && evenLength > oddLength) {
            longestPalindromeStartIdx = evenStartIdx;
            longestPalindromeEndIdx = evenEndIdx;
        }
    }

    const longestPalindromeString = string.substring(
        longestPalindromeStartIdx,
        longestPalindromeEndIdx + 1,
    );
    return longestPalindromeString;
};
