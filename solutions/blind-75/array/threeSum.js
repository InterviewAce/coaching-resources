/*
First sort the array. For each element in the array, use twoSum to find two values that sum up to the complement.  
*/
const twoSum = (nums, startIdx, targetVal, result) => {
    leftIdx = startIdx;
    rightIdx = nums.length - 1;

    while (leftIdx < rightIdx) {
        let leftVal = nums[leftIdx];
        let rightVal = nums[rightIdx];

        if (leftVal + rightVal === targetVal) {
            result.push([-targetVal, leftVal, rightVal]);

            leftIdx++;
            rightIdx--;

            // skip duplicate pairs
            while (leftIdx < rightIdx && nums[leftIdx] === nums[leftIdx - 1]) {
                leftIdx++;
            }
            while (leftIdx < rightIdx && nums[rightIdx] === nums[rightIdx + 1]) {
                rightIdx--;
            }

        } else if ( leftVal + rightVal < targetVal) {
            leftIdx++;
        } else {
            rightIdx--;
        }
    }
}

const threeSum = (nums) => {
    let result = [];
    nums.sort((a, b) => a - b);

    // a + b + c = 0 || a + b = -c
    for (let i = 0 ; i < nums.length - 2; i++) {
        
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        twoSum(nums, i + 1, -nums[i], result);
    }

    return result;
};
