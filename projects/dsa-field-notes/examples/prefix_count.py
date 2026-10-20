# Expected time O(n): one prefix lookup per element
# Extra space O(n): counts of earlier prefix sums
def count_target_sums(nums: list[int], target: int) -> int:
    counts = {0: 1}
    total = 0
    answer = 0
    for value in nums:
        total += value
        answer += counts.get(total - target, 0)
        counts[total] = counts.get(total, 0) + 1
    return answer
