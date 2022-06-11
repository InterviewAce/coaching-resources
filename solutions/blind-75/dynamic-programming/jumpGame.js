const createArrayOfSize = (arraySize, fillValue) => {
  return new Array(arraySize, fillValue);
};

const canJump = (nums) => {
  const canReach = createArrayOfSize(nums.length, false);

  canReach[0] = true;

  for (let i = 1; i < nums.length; i++) {
    canReach[i] = false;

    for (let j = 0; j < i; j++) {
      const canReachJ = canReach[j];

      const jJumpSize = nums[j];
      const canReachIFromJ = j + jJumpSize >= i;

      if (canReachJ && canReachIFromJ) {
        canReach[i] = true;
        break;
      }
    }
  }

  const lastIdx = nums.length - 1;
  return canReach[lastIdx];
};
