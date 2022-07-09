const getMidNum = (leftNum, rightNum) => {
    /*
  Why do we use this math to find the middle index?
  Couldn't we just use
    const midNum = Math.floor((left + right) / 2);
    
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
    const midNum = leftNum + Math.floor((rightNum - leftNum) / 2);

    return midNum;
};

const isPerfectSquare = (num) => {
    let lowerBound = 0;
    let upperBound = num;

    while (lowerBound <= upperBound) {
        const midNum = getMidNum(lowerBound, upperBound);
        const midNumSquared = midNum * midNum;

        if (midNumSquared === num) return true;
        if (midNumSquared < num) lowerBound = midNum + 1;
        if (midNumSquared > num) upperBound = midNum - 1;
    }

    return false;
};
