const DOT = '.';
const STAR = '*';

const charsMatch = (stringChar, patternChar) => {
  if (patternChar === DOT) return true;

  return stringChar === patternChar;
};

const isMatchHelper = (
  string,
  pattern,
  stringStartIdx,
  patternStartIdx,
  isMatchCache,
) => {
  const key = `${stringStartIdx},${patternStartIdx}`;
  const keyInCache = isMatchCache.hasOwnProperty(key);

  if (keyInCache) return isMatchCache[key];

  const patternAtEnd = patternStartIdx === pattern.length;
  const stringAtEnd = stringStartIdx === string.length;

  if (patternAtEnd) return stringAtEnd;

  const startCharsMatch =
    stringStartIdx < string.length &&
    charsMatch(string[stringStartIdx], pattern[patternStartIdx]);

  const patternHasStarAtPosition1 =
    patternStartIdx + 1 < pattern.length &&
    pattern[patternStartIdx + 1] === STAR;

  if (patternHasStarAtPosition1) {
    const isMatchIfStarDoneMatching = isMatchHelper(
      string,
      pattern,
      stringStartIdx,
      patternStartIdx + 2,
      isMatchCache,
    );

    const isMatchIfStarStillMatching =
      startCharsMatch &&
      isMatchHelper(
        string,
        pattern,
        stringStartIdx + 1,
        patternStartIdx,
        isMatchCache,
      );

    isMatchCache[key] = isMatchIfStarDoneMatching || isMatchIfStarStillMatching;

    return isMatchCache[key];
  }

  // If we reach this point, we do not have a star at position 1 of the remaining pattern

  const remainingIsMatch =
    startCharsMatch &&
    isMatchHelper(
      string,
      pattern,
      stringStartIdx + 1,
      patternStartIdx + 1,
      isMatchCache,
    );

  isMatchCache[key] = remainingIsMatch;

  return isMatchCache[key];
};

const isMatch = (string, pattern) => {
  const isMatchCache = {};

  return isMatchHelper(string, pattern, 0, 0, isMatchCache);
};
