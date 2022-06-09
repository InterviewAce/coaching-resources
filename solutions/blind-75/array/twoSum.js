/*
Solution overview:
For each number, we want to check and see if we can pair the current number
with any previous number to form our target. More formally, for each number,
we compute its completed, and see if we have already seen its complement.
We need to also store the indices of each number as we see it so that
we can return indices in our output. We use the `numToIndexMap` to do this.

*/
const twoSum = (nums, target) => {
  const numToIndexMap = {};

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    const complement = target - num;

    const complementIsInMap = numToIndexMap.hasOwnProperty(complement);
    if (complementIsInMap) {
      const complementIdx = numToIndexMap[complement];

      return [complementIdx, i];
    }

    numToIndexMap[num] = i;
  }

  throw Error();
};
