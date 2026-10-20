# Time O(A * c): A is the amount, c is the number of denominations
# Extra space O(A): one entry per subtotal
def min_coins(coins: list[int], amount: int) -> int:
    if amount < 0 or any(coin <= 0 for coin in coins):
        raise ValueError("Use a nonnegative amount and positive coins")
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for total in range(1, amount + 1):
        for coin in coins:
            if coin <= total:
                dp[total] = min(dp[total], 1 + dp[total - coin])
    return -1 if dp[amount] > amount else dp[amount]
