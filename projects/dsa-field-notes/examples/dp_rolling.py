# Time O(n): one update per state
# Extra space O(1): a constant number of integer slots
def ways_rolling(n: int) -> int:
    if n < 0:
        raise ValueError("n must be nonnegative")
    older, previous = 1, 1
    for i in range(2, n + 1):
        current = older + previous
        older, previous = previous, current
    return previous
