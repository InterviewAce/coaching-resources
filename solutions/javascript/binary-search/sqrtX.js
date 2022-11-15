const SQRT_X_NOT_FOUND = -1;

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

/*
"""
Suppose x = 10

Our candidates are:
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

We can transform these candidates into booleans based on the condition arr[i]
is true if arr[i] * arr[i] <= x and false otherwise. That will produce the following:

[true, true, true, false, false, false, false, false, false, false]

Now, we need to find the last occurrence of a "true" which we can do using binary
search
"""
*/

const mySqrt = (x) => {
    if (x === 0) return 0;

    let leftNum = 1;
    let rightNum = x;

    let sqrtX = SQRT_X_NOT_FOUND;

    while (leftNum <= rightNum) {
        const midNum = getMidNum(leftNum, rightNum);
        const midNumSquared = midNum * midNum;

        if (midNumSquared > x) {
            rightNum = midNum - 1;
        } else {
            sqrtX = midNum;
            leftNum = midNum + 1;
        }
    }

    return sqrtX;
};
