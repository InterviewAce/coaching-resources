/*
For each stock price, we compute the max profit using that stock price. To do so, we need to know the minimum stock price that appears BEFORE the current stock price. Thus, we continuously track the minimum stock price so far. Then, at each stock, we compute the max profit using the current stock (which is cur stock price - min price so far) and keep a running variable for our max profit.
*/
const maxProfit = (prices) => {
  let minPriceSoFar = Infinity;
  let maxProfit = 0;

  prices.forEach((price) => {
    const maxProfitUsingCurPrice = price - minPriceSoFar;

    minPriceSoFar = Math.min(minPriceSoFar, price);
    maxProfit = Math.max(maxProfit, maxProfitUsingCurPrice);
  });

  return maxProfit;
};
