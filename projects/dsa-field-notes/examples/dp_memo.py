from functools import cache

# Time O(n): each state is computed once
# Extra space O(n): cached answers and recursion depth
def ways_top_down(n: int) -> int:
    if n < 0:
        raise ValueError("n must be nonnegative")

    @cache
    def solve(i: int) -> int:
        if i <= 1:
            return 1
        return solve(i - 1) + solve(i - 2)

    return solve(n)
