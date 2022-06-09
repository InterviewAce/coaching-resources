/*
binary search for point when the array decreases
*/
const findMin = (nums) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;
  
    while (leftIdx < rightIdx) {
        let mid = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

        if (nums[mid] > nums[rightIdx]) {
            leftIdx = mid + 1;
        } else {
            rightIdx = mid;
        }
    }
    
    return nums[leftIdx];
};