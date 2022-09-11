class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_achievable_profit = 0
        min_price_so_far = prices[0]
        
        for i in range(1, len(prices)):
            max_profit_if_sell_at_cur_price = prices[i] - min_price_so_far
            
            min_price_so_far = min(prices[i], min_price_so_far)
            max_achievable_profit = max(max_achievable_profit, max_profit_if_sell_at_cur_price)
            
        return max_achievable_profit
        