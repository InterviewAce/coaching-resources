const isPalindrome = (string, startIdx, endIdx, isPalindromeCache) => {
  const key = `${startIdx},${endIdx}`;

  const keyInIsPalindromeCache = isPalindromeCache.hasOwnProperty(key);

  if (keyInIsPalindromeCache) return isPalindromeCache[key];

  if (startIdx === endIdx) return true;
  if (startIdx > endIdx) return true;

  const startChar = string[startIdx];
  const endChar = string[endIdx];

  if (startChar === endChar) {
    const innerStringIsPalindrome = isPalindrome(
      string,
      startIdx + 1,
      endIdx - 1,
      isPalindromeCache,
    );

    isPalindromeCache[key] = innerStringIsPalindrome;
    return isPalindromeCache[key];
  }

  isPalindromeCache[key] = false;
  return isPalindromeCache[key];
};

const countSubstrings = (string) => {
  let numPalindromicSubstrings = 0;

  const isPalindromeCache = {};

  for (let startIdx = 0; startIdx < string.length; startIdx++) {
    for (let endIdx = startIdx; endIdx < string.length; endIdx++) {
      if (isPalindrome(string, startIdx, endIdx, isPalindromeCache))
        numPalindromicSubstrings++;
    }
  }

  return numPalindromicSubstrings;
};
