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

const isOdd = (n) => {
  return n % 2 === 1;
};

const singleNonDuplicate = (nums) => {
  const lastIdx = nums.length - 1;

  let leftIdx = 0;
  let rightIdx = nums.length - 1;

  while (leftIdx < rightIdx) {
    let midIdx = getMidIdx(leftIdx, rightIdx);

    // Make sure `midIdx` points to the first element in the current pair.
    if (isOdd(midIdx)) {
      midIdx -= 1;
    }

    // If we have a pair at midIdx and (midIdx + 1), then the non-duplicate is in the right half of the remaining section. So, we set `leftIdx = midIdx + 2` to skip past the current pair.
    const midVal = nums[midIdx];
    const nextVal = nums[midIdx + 1];
    if (midVal === nextVal) {
      leftIdx = midIdx + 2;
    }

    // Otherwise, the non-duplicate must be in the left half of the remaining section (including `midIdx`).
    else {
      rightIdx = midIdx;
    }
  }

  const nonDuplicateNum = nums[leftIdx];
  return nonDuplicateNum;
};
