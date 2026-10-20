# Expected time O(n): one hash-table update per value
# Extra space O(u): one entry per distinct value
def frequencies(nums: list[int]) -> dict[int, int]:
    counts = {}
    for value in nums:
        counts[value] = counts.get(value, 0) + 1
    return counts
