# Expected time O(n): one lookup and at most one insert per value
# Extra space O(n): remember earlier values and their indices
def pair_unsorted(nums: list[int], target: int) -> tuple[int, int] | None:
    seen = {}
    for i, value in enumerate(nums):
        need = target - value
        if need in seen:
            return seen[need], i
        seen[value] = i
    return None
