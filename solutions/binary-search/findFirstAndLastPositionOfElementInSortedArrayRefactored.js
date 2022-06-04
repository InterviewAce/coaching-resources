const NOT_FOUND = -1;

const FIND_FIRST_OCCURRENCE = 'find_first_occurrence';
const FIND_LAST_OCCURRENCE = 'find_last_occurrence';

const getMidIdx = (leftIdx, rightIdx) => {
  /*
    Why do we use this math to find the middle index?
    Couldn't we just use
      const midIdx = Math.floor((left + right) / 2);
      
    The reason is integer overflow. In JavaScript, the maximum
    size of a number is (2^53) - 1. Suppose we used the above logic
    (i.e. `const midIdx = Math.floor((left + right) / 2);`). Let's
    say that `left` was (2^53) - 3 and `right` was (2^53) - 2.
    Then, we start my computing `left + right` which is 
      (2^53) - 3 + (2^53) - 2
      = 2 * (2^53) - 5
      = (2^54) - 5 > (2^53) - 1
    So, when computing `left + right` we try to store (2^54) - 5,
    but JavaScript cannot handle such a large number. This problem
    is called 'integer overflow'.
    
    Instead, we use the approach you see below. Mathematically,
    it's doing the same thing. It just does so in a different order.
    This logic is saying 'find the difference between right and left.
    then cut that in half. add this resulting value to left', which
    puts as at the middle index. But, there is no risk of computing
    numbers that cause integer overflow.
    */
  const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

  return midIdx;
};

const getFirstOccurrenceIdxUpdates = (
  leftIdx,
  rightIdx,
  midIdx,
  midVal,
  target,
) => {
  if (midVal >= target) return [leftIdx, midIdx - 1];
  else return [midIdx + 1, rightIdx];
};

const getLastOccurrenceIdxUpdates = (
  leftIdx,
  rightIdx,
  midIdx,
  midVal,
  target,
) => {
  if (midVal <= target) return [midIdx + 1, rightIdx];
  else return [leftIdx, midIdx - 1];
};

const getUpdatedIndices = (
  leftIdx,
  rightIdx,
  midIdx,
  midVal,
  target,
  occurrenceType,
) => {
  if (occurrenceType === FIND_FIRST_OCCURRENCE) {
    return getFirstOccurrenceIdxUpdates(
      leftIdx,
      rightIdx,
      midIdx,
      midVal,
      target,
    );
  } else if (occurrenceType === FIND_LAST_OCCURRENCE) {
    return getLastOccurrenceIdxUpdates(
      leftIdx,
      rightIdx,
      midIdx,
      midVal,
      target,
    );
  }
};

const getOccurrenceIdx = (nums, target, occurrenceType) => {
  const lastIdx = nums.length - 1;

  let leftIdx = 0;
  let rightIdx = lastIdx;

  while (leftIdx <= rightIdx) {
    const midIdx = getMidIdx(leftIdx, rightIdx);
    const midVal = nums[midIdx];

    [leftIdx, rightIdx] = getUpdatedIndices(
      leftIdx,
      rightIdx,
      midIdx,
      midVal,
      target,
      occurrenceType,
    );
  }

  if (occurrenceType === FIND_FIRST_OCCURRENCE) return leftIdx;
  else if (occurrenceType === FIND_LAST_OCCURRENCE) return rightIdx;
};

const searchRange = (nums, target) => {
  const firstOccurrenceIdx = getOccurrenceIdx(
    nums,
    target,
    FIND_FIRST_OCCURRENCE,
  );
  const lastOccurrenceIdx = getOccurrenceIdx(
    nums,
    target,
    FIND_LAST_OCCURRENCE,
  );

  if (firstOccurrenceIdx <= lastOccurrenceIdx)
    return [firstOccurrenceIdx, lastOccurrenceIdx];

  return [NOT_FOUND, NOT_FOUND];
};
