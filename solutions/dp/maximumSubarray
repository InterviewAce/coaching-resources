/*
BOTTOM-UP DP SOLUTION
*/
const maxSubArray = (nums) => {
    let currentSubarraySum = nums[0];
    let maxSubarraySum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        let number = nums[i];
        
        currentSubarraySum = Math.max(number, currentSubarraySum + number);
        maxSubarraySum = Math.max(maxSubarraySum, currentSubarraySum);
    }

    return maxSubarraySum;
};