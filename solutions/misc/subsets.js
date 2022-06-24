const generateAllSubsets = (nums, curIdx, runningArray, allSubsets) => {
  if (curIdx === nums.length) {
    allSubsets.push(runningArray.slice());
    return;
  }

  // Generate all subsets WITHOUT including current element
  generateAllSubsets(nums, curIdx + 1, runningArray, allSubsets);

  // Generate all subsets WITH including current element
  runningArray.push(nums[curIdx]);
  generateAllSubsets(nums, curIdx + 1, runningArray, allSubsets);

  runningArray.pop();
};

const subsets = (nums) => {
  const allSubsets = [];

  generateAllSubsets(nums, 0, [], allSubsets);

  return allSubsets;
};
