const longestConsecutive = (nums) => {
    const numsSet = new Set(nums);
    
    let longestStreak = 0;
    
    for (const num of numsSet) {
        if (numsSet.has(num - 1)) continue;
        
        let currentNum = num;
        let currentStreak = 1;
        
        while (numsSet.has(currentNum + 1)) {
            currentNum++;
            currentStreak++;
        }
        
        longestStreak = Math.max(longestStreak, currentStreak);
    }
    
    return longestStreak;
};