const lengthOfLIS = (nums) => {
    if (!nums.length) return 0;

    let cache = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) cache[i] = Math.max(cache[i], cache[j] + 1);
        }
    }

    return Math.max(...cache);
};