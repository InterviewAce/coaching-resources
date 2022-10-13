/*
Keep track of current min and current max at each index. Use current max to keep track of overall max.
*/
const maxProduct = (nums) => {
    let max = -Infinity;
    let currentMax = 1;
    let currentMin = 1;
    
    for(let i = 0; i < nums.length; i++) {
        let prevMax = currentMax;
        currentMax = Math.max(nums[i], prevMax * nums[i], currentMin * nums[i]);
        currentMin = Math.min(nums[i], prevMax * nums[i], currentMin * nums[i]);
        max = Math.max(currentMax, max);               
    }
    
    return max;
};