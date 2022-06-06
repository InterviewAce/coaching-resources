const robHelper = (nums, skipFirst) => {
    let previousTotalRobbed = 0;
    let currentTotalRobbed = 0;
    let temp;
    
    for (let i = skipFirst; i < nums.length - 1 + skipFirst; i++) {
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
    if (nums.length === 1) {
        const firstHouseMoney = nums[0];
        return firstHouseMoney;
    }
    if (nums.length === 2) {
        const firstHouseMoney = nums[0];
        const secondHouseMoney = nums[1];
        return Math.max(firstHouseMoney, secondHouseMoney);
    }
    
    const skipFirstHouse = robHelper(nums, 1);
    const dontSkipFirstHouse = robHelper(nums, 0);
    return Math.max(skipFirstHouse, dontSkipFirstHouse);
};