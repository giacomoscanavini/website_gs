# Time O(n): fill n + 1 states once
# Extra space O(n): the table
def ways_bottom_up(n: int) -> int:
    if n < 0:
        raise ValueError("n must be nonnegative")
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
