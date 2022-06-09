const robHelper = (nums, startIdx) => {
    let previousTotalRobbed = 0;
    let currentTotalRobbed = 0;
    
    const numHousesAccountingForPotentialSkips = nums.length - 1 + startIdx;
    for (let i = startIdx; i < numHousesAccountingForPotentialSkips; i++) {
        const money = nums[i];
        
        const temp = currentTotalRobbed; 
        currentTotalRobbed = Math.max(previousTotalRobbed + money, currentTotalRobbed);
        previousTotalRobbed = temp;
    }
    
    return currentTotalRobbed;
};

/*
BOTTOM-UP DP SOLUTION
*/
const rob = (nums) => {
    if (nums.length === 1) return nums[0];
    
    const maxMoneyIfSkipFirstHouse = robHelper(nums, 1);
    const maxMoneyIfDontSkipFirstHouse = robHelper(nums, 0);
    return Math.max(maxMoneyIfSkipFirstHouse, maxMoneyIfDontSkipFirstHouse);
};