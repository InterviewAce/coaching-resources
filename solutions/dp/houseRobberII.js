const robHelper = (nums, startIdx) => {
    let previousTotalRobbed = 0;
    let currentTotalRobbed = 0;
    let temp;
    
    const numHousesAccountingForPotentialSkips = nums.length - 1 + startIdx;
    for (let i = startIdx; i < numHousesAccountingForPotentialSkips; i++) {
        const money = nums[i];
        
        temp = currentTotalRobbed; 
        currentTotalRobbed = Math.max(previousTotalRobbed + money, currentTotalRobbed);
        previousTotalRobbed = temp;
    }
    
    return currentTotalRobbed;
};

/*
BOTTOM-UP DP SOLUTION
*/
const rob = (nums) => {
    const firstHouseMoney = nums[0];
    if (nums.length === 1) {
        return firstHouseMoney;
    }
    if (nums.length === 2) {
        const secondHouseMoney = nums[1];
        return Math.max(firstHouseMoney, secondHouseMoney);
    }
    
    const maxMoneyIfSkipFirstHouse = robHelper(nums, 1);
    const maxMoneyIfDontSkipFirstHouse = robHelper(nums, 0);
    return Math.max(maxMoneyIfSkipFirstHouse, maxMoneyIfDontSkipFirstHouse);
};