const isStillValidPalindrome = (string, leftIdx, rightIdx) => {
  if (leftIdx < 0) return false;
  if (rightIdx >= string.length) return false;

  return string[leftIdx] === string[rightIdx];
};

const getLongestPalindromeCenteredAt = (
  string,
  leftIdxStart,
  rightIdxStart,
) => {
  let leftIdx = leftIdxStart;
  let rightIdx = rightIdxStart;

  while (isStillValidPalindrome(string, leftIdx, rightIdx)) {
    leftIdx--;
    rightIdx++;
  }

  const longestPalindromeLeftIdx = leftIdx + 1;
  const longestPalindromeRightIdx = rightIdx - 1;
  return [longestPalindromeLeftIdx, longestPalindromeRightIdx];
};

const longestPalindrome = (s) => {
  if (s.length === 0) return '';

  let longestPalindromeStart = 0;
  let longestPalindromeEnd = 0;

  for (let i = 0; i < s.length; i++) {
    const oddPalindromeIndices = getLongestPalindromeCenteredAt(s, i, i);
    const evenPalindromeIndices = getLongestPalindromeCenteredAt(s, i, i + 1);

    const [oddStart, oddEnd] = oddPalindromeIndices;
    const [evenStart, evenEnd] = evenPalindromeIndices;

    const oddLength = oddEnd - oddStart + 1;
    const evenLength = evenEnd - evenStart + 1;

    const curLongestPalindromeLength =
      longestPalindromeEnd - longestPalindromeStart + 1;

    if (oddLength > curLongestPalindromeLength) {
      longestPalindromeStart = oddStart;
      longestPalindromeEnd = oddEnd;
    }

    if (evenLength > curLongestPalindromeLength) {
      longestPalindromeStart = evenStart;
      longestPalindromeEnd = evenEnd;
    }
  }

  const longestPalindromicSubstring = s.substring(
    longestPalindromeStart,
    longestPalindromeEnd + 1,
  );
  return longestPalindromicSubstring;
};
