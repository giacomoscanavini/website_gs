# Time O(n): the two boundaries only move forward
# Extra space O(1)
def shortest_sum_at_least(nums: list[int], target: int) -> int:
    if target <= 0 or any(value < 0 for value in nums):
        raise ValueError("Use a positive target and nonnegative values")
    left = 0
    total = 0
    best = len(nums) + 1
    for right, value in enumerate(nums):
        total += value
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best > len(nums) else best
