/*
RECURSIVE SOLUTION (NO DP)
*/
const fib = (n) => {
  if (n <= 1) return n;

  return fib(n - 1) + fib(n - 2);
};

/*
TOP-DOWN DP SOLUTION
*/
const fibHelper = (n, cache) => {
  const nInCache = cache.hasOwnProperty(n);

  if (nInCache) {
    return cache[n];
  }

  const result = fibHelper(n - 1, cache) + fibHelper(n - 2, cache);
  cache[n] = result;

  return cache[n];
};

const fib = (n) => {
  const cache = {};
  cache[0] = 0;
  cache[1] = 1;

  return fibHelper(n, cache);
};

/*
BOTTOM-UP DP SOLUTION
*/
const fib = (n) => {
  const cache = {};

  cache[0] = 0;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    const fibOfI = cache[i - 1] + cache[i - 2];

    cache[i] = fibOfI;
  }

  return cache[n];
};

/*
BETTER BOTTOM-UP DP SOLUTION
*/
const fib = (n) => {
  if (n <= 1) return n;

  let curFib = 0;
  let lastFib = 1;
  let lastLastFib = 0;

  for (let i = 2; i <= n; i++) {
    curFib = lastFib + lastLastFib;
    lastLastFib = lastFib;
    lastFib = curFib;
  }
  
  return curFib;
};
