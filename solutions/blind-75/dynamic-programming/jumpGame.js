const START_LOCATION = 0;

const createArrayOfSize = (size, fillValue) => {
  return new Array(size).fill(fillValue);
};

const canJump = (nums) => {
  const canReach = createArrayOfSize(nums.length, false);
  canReach[START_LOCATION] = true;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      const canReachJ = canReach[j];
      const canReachIFromJ = j + nums[j] >= i;

      if (canReachJ && canReachIFromJ) {
        canReach[i] = true;
        break;
      }
    }
  }

  const lastIdx = nums.length - 1;
  return canReach[lastIdx];
};
