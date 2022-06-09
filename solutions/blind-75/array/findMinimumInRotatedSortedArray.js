/*
binary search for point when the array decreases
*/
const findMin = (nums) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;
  
    while (leftIdx < rightIdx) {
        const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

        if (nums[midIdx] > nums[rightIdx]) {
            leftIdx = midIdx + 1;
        } else {
            rightIdx = midIdx;
        }
    }
    
    return nums[leftIdx];
};