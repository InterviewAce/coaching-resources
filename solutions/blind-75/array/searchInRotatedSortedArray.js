/*
First find the maximum value. Then search in the left or right of that accordingly.
*/
const findMax = (nums) => {
    leftIdx = 0;
    rightIdx = nums.length - 1;
    
    while (leftIdx <= rightIdx) {
        const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
        
        if (nums[midIdx] >= nums[0]) leftIdx = midIdx + 1;
        else rightIdx = midIdx - 1;
    }
    
    return rightIdx;
}

const search = (nums, target) => {
    maxIdx = findMax(nums);
    
    leftIdx = 0;
    rightIdx = maxIdx;
    if (target < nums[0]) {
        leftIdx = maxIdx + 1;
        rightIdx = nums.length - 1;
    }
    
    while (leftIdx <= rightIdx) {
        const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
        
        if (nums[midIdx] === target) return midIdx;
        
        if (target < nums[midIdx]) rightIdx = midIdx - 1;
        else leftIdx = midIdx + 1;
    }
    
    return -1;
}