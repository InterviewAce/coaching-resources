const EMPTY_STRING_LAST_INDEX = -1;

const longestCommonSubsequenceHelper = (
  text1,
  text2,
  text1LastIdx,
  text2LastIdx,
  lcsEndingAtIndices,
) => {
  const indices = `${text1LastIdx}-${text2LastIdx}`;

  const indicesInCache = lcsEndingAtIndices.hasOwnProperty(indices);

  if (indicesInCache) return lcsEndingAtIndices[indices];

  if (
    text1LastIdx === EMPTY_STRING_LAST_INDEX ||
    text2LastIdx === EMPTY_STRING_LAST_INDEX
  )
    return 0;

  const text1SubstringLastChar = text1[text1LastIdx];
  const text2SubstringLastChar = text2[text2LastIdx];

  if (text1SubstringLastChar === text2SubstringLastChar) {
    lcsEndingAtIndices[indices] =
      1 +
      longestCommonSubsequenceHelper(
        text1,
        text2,
        text1LastIdx - 1,
        text2LastIdx - 1,
        lcsEndingAtIndices,
      );
    return lcsEndingAtIndices[indices];
  }

  const lcsIfDeleteFromText1 = longestCommonSubsequenceHelper(
    text1,
    text2,
    text1LastIdx - 1,
    text2LastIdx,
    lcsEndingAtIndices,
  );

  const lcsIfDeleteFromText2 = longestCommonSubsequenceHelper(
    text1,
    text2,
    text1LastIdx,
    text2LastIdx - 1,
    lcsEndingAtIndices,
  );

  lcsEndingAtIndices[indices] = Math.max(
    lcsIfDeleteFromText1,
    lcsIfDeleteFromText2,
  );
  return lcsEndingAtIndices[indices];
};

const longestCommonSubsequence = (text1, text2) => {
  const text1LastIdx = text1.length - 1;
  const text2LastIdx = text2.length - 1;

  const lcsEndingAtIndices = {};

  return longestCommonSubsequenceHelper(
    text1,
    text2,
    text1LastIdx,
    text2LastIdx,
    lcsEndingAtIndices,
  );
};
