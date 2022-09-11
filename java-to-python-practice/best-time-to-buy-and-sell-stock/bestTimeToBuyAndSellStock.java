class Solution {
    public int maxProfit(int[] prices) {
        int maxAchievableProfit = 0;
        int minPriceSoFar = prices[0];
        
        for (int i = 1; i < prices.length; i++) {
            int maxProfitIfSellAtCurPrice = prices[i] - minPriceSoFar;
            
            minPriceSoFar = Math.min(prices[i], minPriceSoFar);
            maxAchievableProfit = Math.max(maxAchievableProfit, maxProfitIfSellAtCurPrice);
        }

        return maxAchievableProfit;
    }
}