const longestPalindromeSubseqHelper = (
  string,
  leftIdx,
  rightIdx,
  longestPalindromeCache,
) => {
  const key = `${leftIdx},${rightIdx}`;

  const keyInCache = longestPalindromeCache.hasOwnProperty(key);

  if (keyInCache) return longestPalindromeCache[key];

  if (leftIdx === rightIdx) return 1;
  if (leftIdx > rightIdx) return 0;

  const leftChar = string[leftIdx];
  const rightChar = string[rightIdx];

  const outerCharsMatch = leftChar === rightChar;

  if (outerCharsMatch) {
    longestPalindromeCache[key] =
      2 +
      longestPalindromeSubseqHelper(
        string,
        leftIdx + 1,
        rightIdx - 1,
        longestPalindromeCache,
      );

    return longestPalindromeCache[key];
  }

  const withoutLeftChar = longestPalindromeSubseqHelper(
    string,
    leftIdx + 1,
    rightIdx,
    longestPalindromeCache,
  );
  const withoutRightChar = longestPalindromeSubseqHelper(
    string,
    leftIdx,
    rightIdx - 1,
    longestPalindromeCache,
  );

  longestPalindromeCache[key] = Math.max(withoutLeftChar, withoutRightChar);

  return longestPalindromeCache[key];
};

const longestPalindromeSubseq = (string) => {
  const lastIdx = string.length - 1;
  const longestPalindromeCache = {};

  return longestPalindromeSubseqHelper(
    string,
    0,
    lastIdx,
    longestPalindromeCache,
  );
};
