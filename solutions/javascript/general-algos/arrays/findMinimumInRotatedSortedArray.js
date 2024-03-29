/*
binary search for point when the array decreases
*/
const findMin = (nums) => {
    leftIdx = 0;
    rightIdx = nums.length - 1;

    const lastValue = nums[nums.length - 1];
    
    while (leftIdx <= rightIdx) {
        const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
        
        if (nums[midIdx] <= lastValue) rightIdx = midIdx - 1;
        else leftIdx = midIdx + 1;
    }
    
    return nums[leftIdx];
}