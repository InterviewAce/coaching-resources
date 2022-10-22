CANNOT_PRODUCE_SPECIFIED_AMOUNT = -1

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        if amount == 0:
            return 0

        fewest_coins_to_make_amount = float('inf')

        for coin_amount in coins:
            remaining_amount = amount - coin_amount

            if remaining_amount < 0:
                continue

            remaining_coins_required = self.coinChange(coins, remaining_amount)

            if remaining_coins_required == CANNOT_PRODUCE_SPECIFIED_AMOUNT:
                continue

            fewest_coins_to_make_amount = min(fewest_coins_to_make_amount, 1 + remaining_coins_required)

        if fewest_coins_to_make_amount == float('inf'):
            return CANNOT_PRODUCE_SPECIFIED_AMOUNT

        return fewest_coins_to_make_amount