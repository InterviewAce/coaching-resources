const ZERO = '0';
const ONE = '1';

const countZerosAndOnes = (binaryString) => {
  let numZeros = 0;
  let numOnes = 0;

  for (const char of binaryString) {
    if (char === ZERO) numZeros++;
    if (char === ONE) numOnes++;
  }

  return { numZerosInCur: numZeros, numOnesInCur: numOnes };
};

const findLargestValidSubsetSize = (
  strings,
  startIdx,
  numZerosRemaining,
  numOnesRemaining,
  largestValidSubsetSizeCache,
) => {
  const key = `${startIdx}, ${numZerosRemaining}, ${numOnesRemaining}`;

  const keyInCache = largestValidSubsetSizeCache.hasOwnProperty(key);
  if (keyInCache) return largestValidSubsetSizeCache[key];

  if (numZerosRemaining === 0 && numOnesRemaining === 0) return 0;
  if (startIdx >= strings.length) return 0;

  const curBinaryString = strings[startIdx];

  // Include cur string
  const { numZerosInCur, numOnesInCur } = countZerosAndOnes(curBinaryString);

  const zerosLeftAfterIncludingCur = numZerosRemaining - numZerosInCur;
  const onesLeftAfterIncludingCur = numOnesRemaining - numOnesInCur;

  const canIncludeCurString =
    zerosLeftAfterIncludingCur >= 0 && onesLeftAfterIncludingCur >= 0;

  let largestSubsetSizeIncludingCur = -Infinity;
  if (canIncludeCurString) {
    largestSubsetSizeIncludingCur =
      1 +
      findLargestValidSubsetSize(
        strings,
        startIdx + 1,
        zerosLeftAfterIncludingCur,
        onesLeftAfterIncludingCur,
        largestValidSubsetSizeCache,
      );
  }

  // DON'T include cur string
  const largestSubsetSizeExcludingCur = findLargestValidSubsetSize(
    strings,
    startIdx + 1,
    numZerosRemaining,
    numOnesRemaining,
    largestValidSubsetSizeCache,
  );

  largestValidSubsetSizeCache[key] = Math.max(
    largestSubsetSizeIncludingCur,
    largestSubsetSizeExcludingCur,
  );

  return largestValidSubsetSizeCache[key];
};

const findMaxForm = (strs, numZerosAllowed, numOnesAllowed) => {
  const largestValidSubsetSizeCache = {};

  return findLargestValidSubsetSize(
    strs,
    0,
    numZerosAllowed,
    numOnesAllowed,
    largestValidSubsetSizeCache,
  );
};
