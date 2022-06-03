const getMid = (leftIdx, rightIdx) => {
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

const square = (x) => {
  return x * x;
};

const isPerfectSquare = (num) => {
  let lowerBound = 0;
  let upperBound = num;

  while (lowerBound <= upperBound) {
    const mid = getMid(lowerBound, upperBound);

    const midSquared = square(mid);

    if (midSquared === num) return true;
    if (midSquared < num) lowerBound = mid + 1;
    if (midSquared > num) upperBound = mid - 1;
  }

  return false;
};
