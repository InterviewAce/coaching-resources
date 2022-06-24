const QUESTION_MARK = '?';
const STAR = '*';

const peek = (stack) => {
  if (stack.length === 0) throw new Error('cannot peek, stack is empty');

  const lastIdx = stack.length - 1;
  return stack[lastIdx];
};

const removeDuplicateStars = (pattern) => {
  const stack = [];

  for (const char of pattern) {
    if (char !== STAR) {
      stack.push(char);
      continue;
    }

    if (stack.length === 0 || peek(stack) !== STAR) {
      stack.push(char);
    }
  }

  return stack.join('');
};

const isMatchHelper = (string, pattern, stringMatchesPatternCache) => {
  const key = `${string}-${pattern}`;

  const keyInCache = stringMatchesPatternCache.hasOwnProperty(key);

  if (keyInCache) return stringMatchesPatternCache[key];

  if (string === pattern) return true;
  if (pattern === STAR) return true;
  if (string.length === 0 || pattern.length === 0) return false;

  // Handle ?
  const stringChar = string[0];
  const patternChar = pattern[0];

  const remainingString = string.substring(1);
  const remainingPattern = pattern.substring(1);
  if (patternChar === QUESTION_MARK || stringChar === patternChar) {
    const remainingIsMatch = isMatchHelper(
      remainingString,
      remainingPattern,
      stringMatchesPatternCache,
    );

    stringMatchesPatternCache[key] = remainingIsMatch;
    return stringMatchesPatternCache[key];
  }

  // Handle *
  if (patternChar === STAR) {
    const isMatchIfStarIsDoneMatching = isMatchHelper(
      string,
      remainingPattern,
      stringMatchesPatternCache,
    );
    const isMatchIfStarIsStillMatching = isMatchHelper(
      remainingString,
      pattern,
      stringMatchesPatternCache,
    );

    const curSubstringsMatch =
      isMatchIfStarIsDoneMatching || isMatchIfStarIsStillMatching;

    stringMatchesPatternCache[key] = curSubstringsMatch;
    return stringMatchesPatternCache[key];
  }

  return false;
};

const isMatch = (string, pattern) => {
  const stringMatchesPatternCache = {};

  const patternWithoutDuplicateStars = removeDuplicateStars(pattern);

  return isMatchHelper(
    string,
    patternWithoutDuplicateStars,
    stringMatchesPatternCache,
  );
};
