const NOT_FOUND = -1;

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
}

/**
 * Returns the index of target in array within the range [startIdx, endIdx]
 * if it exists, else NOT_FOUND (-1).
*/
const getComplementIdxIfExists = (array, target, startIdx, endIdx) => {
    let leftIdx = startIdx;
    let rightIdx = endIdx;
    
    while (leftIdx <= rightIdx) {
        let midIdx = getMidIdx(leftIdx, rightIdx);
        
        const midVal = array[midIdx];
        
        if (midVal === target) return midIdx;
        if (midVal < target) leftIdx = midIdx + 1;
        if (midVal > target) rightIdx = midIdx - 1;
    }
    
    return NOT_FOUND;
}

const getOneIndexedValue = (idx) => {
    return idx + 1;
}

const twoSum = (numbers, target) => {
    const lastIdx = numbers.length - 1;
    
    for (let curIdx = 0; curIdx < numbers.length; curIdx++) {
        const curNum = numbers[curIdx];
        const complement = target - curNum;
        
        const complementIdx = getComplementIdxIfExists(numbers, complement, curIdx + 1, lastIdx);
        
        if (complementIdx === NOT_FOUND) continue;
        
        return [getOneIndexedValue(curIdx), getOneIndexedValue(complementIdx)];
    }
    
    throw 'Error: no valid solution exists';
};