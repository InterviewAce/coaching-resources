const wiggleMaxLength = (nums) => {
    const lengthOfNums = nums.length;
    if (lengthOfNums < 2) return lengthOfNums;

    let longestWiggleEndingDown = 1;
    let longestWiggleEndingUp = 1;

    for (let i = 1; i < lengthOfNums; i++) {
        currentNum = nums[i];
        previousNum = nums[i - 1];

        const wiggleUp = currentNum > previousNum;
        const wiggleDown = currentNum < previousNum;

        if (wiggleUp) longestWiggleEndingUp = longestWiggleEndingDown + 1;
        if (wiggleDown) longestWiggleEndingDown = longestWiggleEndingUp + 1;
    }

    const longestWiggle = Math.max(longestWiggleEndingUp, longestWiggleEndingDown);
    return longestWiggle;
};