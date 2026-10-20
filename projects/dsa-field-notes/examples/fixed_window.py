# Time O(n): add and subtract each element at most once
# Extra space O(1)
def max_window_sum(nums: list[int], k: int) -> int:
    if not 1 <= k <= len(nums):
        raise ValueError("k must be between 1 and len(nums)")
    total = 0
    for i in range(k):
        total += nums[i]
    best = total
    for right in range(k, len(nums)):
        total += nums[right] - nums[right - k]
        best = max(best, total)
    return best
