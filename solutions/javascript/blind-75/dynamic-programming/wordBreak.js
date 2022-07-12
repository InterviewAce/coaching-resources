/*
TOP-DOWN DP SOLUTION
*/

/**
 * Reduces a sequence of names to initials.
 * @param  {String} s a string containing potential words
 * @param  {Set} wordSet a set containing all valid words
 * @param  {Number} start an index in s indicating where to start
 * @param  {Object} cache cache Object
 * @return {Boolean} whether or not the string can be broken up into words
 */
const wordBreakHelper = (s, wordSet, start, cache) => {
  if (cache.has(start)) return false;
  if (start === s.length) return true;

  for (let end = start + 1; end < s.length + 1; end++) {
    const potentialWord = s.slice(start, end);

    if (wordSet.has(potentialWord)) {
      if (wordBreakHelper(s, wordSet, end, cache)) return true;
    }
  }

  cache.add(start);
  return false;
};

const wordBreak = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  return wordBreakHelper(s, wordSet, 0, new Set());
};

/*
BOTTOM-UP DP SOLUTION
*/
const createArrayOfSize = (size, fillValue) => {
  return new Array(size).fill(fillValue);
};

const wordBreak = (s, wordDict) => {
  const validWords = new Set(wordDict);

  const canSplit = createArrayOfSize(s.length + 1, false);
  canSplit[0] = true;

  for (let endIdx = 1; endIdx <= s.length; endIdx++) {
    for (let startIdx = 0; startIdx < endIdx; startIdx++) {
      const canSplitUpThroughStart = canSplit[startIdx];

      const remainingSubstring = s.substring(startIdx, endIdx);
      const remainingSubstringInWordDict = validWords.has(remainingSubstring);

      if (canSplitUpThroughStart && remainingSubstringInWordDict) {
        canSplit[endIdx] = true;
        break;
      }
    }
  }

  const lastIdx = s.length;
  return canSplit[lastIdx];
};
