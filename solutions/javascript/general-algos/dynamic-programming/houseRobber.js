/*
Solution overview:
Consider two adjacent houses, we'll call them H0 and H1. All houses have >= 0 money. 
So clearly, we want to take either H0 or H1. Clearly, we should just take the max. 

What if we have H0 H1 H2? Then we can take H0+H2 or just take H1.

What if we have H0 H1 H2 H3? Then we can take H0+H2 or take H1+H3. But, there's a tricky 
case here. We could also take H0+H3. We need to design an algorithm that can catch this case.

In our previous example, let's just focus on H3. We need to make a decision to include or 
exclude H3. 

Suppose we exclude H3. Then we can simple take the max robbable money for this array: 
H0 H1 H2. We already know how to get this, we showed this case above.

Suppose we include H3. Then we know that we CANNOT include H2, anything else is fair game. 
So, if we had the answer to this question: "what's the maximum money we can get from H0 and H1?" 
then we would have our desired result. It would be the answer to that question + H3's money.

So, using this logic, we'll build an array `maxCanRob` that maps each house number to the 
maximum money we can rob from all houses up to (and including) that house.

For index 0, the answer is nums[0] (the only option we have is to rob the house at index 0).

For index 1, the answer is max(nums[0], nums[1]). We can rob EITHER H0 or H1, but not both.

For index 2, we have 2 choices. Exclude H2, in which case we simply need to find the maximum 
money we can rob from all houses up to (and including) H1. We already computed this, it's 
`maxCanRob[1]`. If we include H2, then we must exclude H1, so we take H2 + maximum money 
we can from all houses up to (and including) H0 = H2 + maxCanRob[0].

We continue to follow this process. At index i, if we exclude house i, then we simply take 
the max money we can rob up through and including (i - 1). If we include i, then we want to 
add the max money we can rob up through and including (i - 2) to house i's money. Whichever of 
these values is greater gives us the max money we can rob up through (and including) house i.
*/

const createArrayOfSize = (arraySize, fillValue) => {
  return new Array(arraySize).fill(fillValue);
};

const rob = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // This stores the max we can rob at each index when only considering indices <= the current index.
  const maxCanRob = createArrayOfSize(nums.length, 0);

  maxCanRob[0] = nums[0];
  maxCanRob[1] = Math.max(maxCanRob[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const curHouseMoney = nums[i];

    const maxMoneyIfIncludePrevHouse = maxCanRob[i - 1];
    const maxMoneyIfIncludeCurHouse = curHouseMoney + maxCanRob[i - 2];

    const maxMoneyUpThroughCurIdx = Math.max(
      maxMoneyIfIncludePrevHouse,
      maxMoneyIfIncludeCurHouse,
    );

    maxCanRob[i] = maxMoneyUpThroughCurIdx;
  }

  const lastIdx = nums.length - 1;
  const maxMoneyCanRob = maxCanRob[lastIdx];

  return maxMoneyCanRob;
};
