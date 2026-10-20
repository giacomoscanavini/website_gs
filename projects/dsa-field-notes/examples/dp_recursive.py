# Time O(2^n): repeated calls, an exponential upper bound
# Extra space O(n): maximum recursion depth
def ways_recursive(n: int) -> int:
    if n < 0:
        raise ValueError("n must be nonnegative")
    if n <= 1:
        return 1
    return ways_recursive(n - 1) + ways_recursive(n - 2)
