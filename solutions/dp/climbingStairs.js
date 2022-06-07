/*
TOP-DOWN DP SOLUTION
*/
const climbStairsHelper = (n, cache) => {
  const nInCache = cache.hasOwnProperty(n);

  if (nInCache) {
    return cache[n];
  }

  const result =
    climbStairsHelper(n - 1, cache) + climbStairsHelper(n - 2, cache);
  cache[n] = result;

  return cache[n];
};

const climbStairs = (n) => {
  const cache = {};

  cache[0] = 1;
  cache[1] = 1;

  return climbStairsHelper(n, cache);
};

/*
BOTTOM-UP DP SOLUTION
*/
const climbStairs = (n) => {
  const cache = {};

  cache[0] = 1;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    const numWaysToReachI = cache[i - 1] + cache[i - 2];

    cache[i] = numWaysToReachI;
  }

  return cache[n];
};

/*
BETTER BOTTOM-UP DP SOLUTION
*/
const climbStairs = (n) => {
  if (n <= 1) return 1;

  let totalWaysToReachI = 0;
  let oneStepBack = 1;
  let twoStepsBack = 1;

  for (let i = 2; i <= n; i++) {
    totalWaysToReachI = oneStepBack + twoStepsBack;
    twoStepsBack = oneStepBack;
    oneStepBack = totalWaysToReachI;
  }

  return totalWaysToReachI;
};
