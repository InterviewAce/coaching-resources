const EMPTY_STRING_LAST_INDEX = -1;

const deleteLastChar = (string) => {
  const lastIdx = string.length - 1;
  return string.substring(0, lastIdx);
};

const minDistanceBetweenWords = (
  word1,
  word2,
  word1LastIdx,
  word2LastIdx,
  minDistanceCache,
) => {
  const key = `${word1LastIdx}-${word2LastIdx}`;

  const keyInCache = minDistanceCache.hasOwnProperty(key);

  if (keyInCache) return minDistanceCache[key];

  if (word1LastIdx === EMPTY_STRING_LAST_INDEX) return word2LastIdx + 1;
  if (word2LastIdx === EMPTY_STRING_LAST_INDEX) return word1LastIdx + 1;

  const lastChar1 = word1[word1LastIdx];
  const lastChar2 = word2[word2LastIdx];

  if (lastChar1 === lastChar2) {
    minDistanceCache[key] = minDistanceBetweenWords(
      word1,
      word2,
      word1LastIdx - 1,
      word2LastIdx - 1,
      minDistanceCache,
    );

    return minDistanceCache[key];
  }

  const minDistanceIfDeleteFrom1 = minDistanceBetweenWords(
    word1,
    word2,
    word1LastIdx - 1,
    word2LastIdx,
    minDistanceCache,
  );
  const minDistanceIfDeleteFrom2 = minDistanceBetweenWords(
    word1,
    word2,
    word1LastIdx,
    word2LastIdx - 1,
    minDistanceCache,
  );
  const minDistanceIfDeleteFromBoth = minDistanceBetweenWords(
    word1,
    word2,
    word1LastIdx - 1,
    word2LastIdx - 1,
    minDistanceCache,
  );

  minDistanceCache[key] =
    Math.min(
      minDistanceIfDeleteFrom1,
      minDistanceIfDeleteFrom2,
      minDistanceIfDeleteFromBoth,
    ) + 1;

  return minDistanceCache[key];
};

const minDistance = (word1, word2) => {
  const minDistanceCache = {};

  const word1LastIdx = word1.length - 1;
  const word2LastIdx = word2.length - 1;

  return minDistanceBetweenWords(
    word1,
    word2,
    word1LastIdx,
    word2LastIdx,
    minDistanceCache,
  );
};
