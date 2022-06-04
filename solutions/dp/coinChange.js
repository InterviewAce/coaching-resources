/*
TOP-DOWN DP SOLUTION
*/
const CANNOT_PRODUCE_SPECIFIED_AMOUNT = -1;

const coinChangeHelper = (coins, amount, cache) => {
  const amountInCache = cache.hasOwnProperty(amount);

  if (amountInCache) {
    return cache[amount];
  }

  let fewestCoinsToMakeAmount = Infinity;

  coins.forEach((coinAmount) => {
    const remainingAmount = amount - coinAmount;

    if (remainingAmount < 0) return;

    const remainingCoinsRequired = coinChangeHelper(
      coins,
      remainingAmount,
      cache,
    );

    if (remainingCoinsRequired === CANNOT_PRODUCE_SPECIFIED_AMOUNT) return;

    fewestCoinsToMakeAmount = Math.min(
      fewestCoinsToMakeAmount,
      1 + remainingCoinsRequired,
    );
  });

  if (fewestCoinsToMakeAmount === Infinity) {
    fewestCoinsToMakeAmount = CANNOT_PRODUCE_SPECIFIED_AMOUNT;
  }

  cache[amount] = fewestCoinsToMakeAmount;

  return cache[amount];
};

const coinChange = (coins, amount) => {
  const cache = {};

  cache[0] = 0;

  return coinChangeHelper(coins, amount, cache);
};

/*
BOTTOM-UP DP SOLUTION
*/
const CANNOT_PRODUCE_SPECIFIED_AMOUNT = -1;

const coinChange = (coins, targetAmount) => {
  const cache = {};

  cache[0] = 0;

  for (let curAmount = 1; curAmount <= targetAmount; curAmount++) {
    let fewestCoinsToMakeCurAmount = Infinity;

    coins.forEach((coinAmount) => {
      const remainingAmount = curAmount - coinAmount;

      if (remainingAmount < 0) return;

      // If `remainingAmount` is in `cache`, set `minCoinsToMakeRemainingAmount` to `cache[remainingAmount]. Otherwise, set it to `Infinity`.
      const remainingAmountInCache = cache.hasOwnProperty(remainingAmount);
      const minCoinsToMakeRemainingAmount = remainingAmountInCache
        ? cache[remainingAmount]
        : Infinity;

      fewestCoinsToMakeCurAmount = Math.min(
        fewestCoinsToMakeCurAmount,
        1 + minCoinsToMakeRemainingAmount,
      );
    });

    cache[curAmount] = fewestCoinsToMakeCurAmount;
  }

  const result = cache[targetAmount];

  if (result === Infinity) {
    return CANNOT_PRODUCE_SPECIFIED_AMOUNT;
  }

  return result;
};
