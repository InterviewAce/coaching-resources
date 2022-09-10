class Solution:
    def maxProfit(self, prices):
        min_price_so_far = float('inf')
        max_profit = 0

        for price in prices:
            cur_max_profit = price - min_price_so_far
            
            if cur_max_profit > max_profit:
                max_profit = cur_max_profit
                
            if price < min_price_so_far:
                min_price_so_far = price
                
        return max_profit