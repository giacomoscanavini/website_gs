# Time O(n * C): n items and capacity C
# Extra space O(C): keep only one row
def knapsack(weights: list[int], values: list[int], capacity: int) -> int:
    if len(weights) != len(values) or capacity < 0:
        raise ValueError("Check lengths and capacity")
    if any(weight <= 0 for weight in weights):
        raise ValueError("Weights must be positive integers")
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for cap in range(capacity, weight - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - weight] + value)
    return dp[capacity]
