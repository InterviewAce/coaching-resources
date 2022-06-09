/*
BOTTOM-UP DP SOLUTION
*/
const rob = (nums) => {
    let previousTotalRobbed = 0;
    let currentTotalRobbed = 0;
    
    nums.forEach((money) => {
        const temp = currentTotalRobbed; 
        currentTotalRobbed = Math.max(previousTotalRobbed + money, currentTotalRobbed);
        previousTotalRobbed = temp;
    });
    
    return currentTotalRobbed;
};