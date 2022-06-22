const EMPTY_STRING_LAST_INDEX = -1;

const longestCommonSubsequenceHelper = (
  text1,
  text2,
  text1LastIdx,
  text2LastIdx,
  lcsCache,
) => {
  const key = `${text1LastIdx}-${text2LastIdx}`;

  const keyInCache = lcsCache.hasOwnProperty(key);

  if (keyInCache) return lcsCache[key];

  if (
    text1LastIdx === EMPTY_STRING_LAST_INDEX ||
    text2LastIdx === EMPTY_STRING_LAST_INDEX
  )
    return 0;

  const text1SubstringLastChar = text1[text1LastIdx];
  const text2SubstringLastChar = text2[text2LastIdx];

  if (text1SubstringLastChar === text2SubstringLastChar) {
    lcsCache[key] =
      1 +
      longestCommonSubsequenceHelper(
        text1,
        text2,
        text1LastIdx - 1,
        text2LastIdx - 1,
        lcsCache,
      );
    return lcsCache[key];
  }

  const deleteFromText1 = longestCommonSubsequenceHelper(
    text1,
    text2,
    text1LastIdx - 1,
    text2LastIdx,
    lcsCache,
  );

  const deleteFromText2 = longestCommonSubsequenceHelper(
    text1,
    text2,
    text1LastIdx,
    text2LastIdx - 1,
    lcsCache,
  );

  lcsCache[key] = Math.max(deleteFromText1, deleteFromText2);
  return lcsCache[key];
};

const longestCommonSubsequence = (text1, text2) => {
  const text1LastIdx = text1.length - 1;
  const text2LastIdx = text2.length - 1;

  const lcsCache = {};

  return longestCommonSubsequenceHelper(
    text1,
    text2,
    text1LastIdx,
    text2LastIdx,
    lcsCache,
  );
};
