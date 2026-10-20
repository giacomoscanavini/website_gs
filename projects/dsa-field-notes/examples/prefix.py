# Build: time O(n), extra space O(n)
# Each range query: time O(1), extra space O(1)
def build_prefix(nums: list[int]) -> list[int]:
    prefix = [0]
    for value in nums:
        prefix.append(prefix[-1] + value)
    return prefix


def range_sum(prefix: list[int], left: int, right: int) -> int:
    if not 0 <= left <= right < len(prefix):
        raise ValueError("Require 0 <= left <= right <= n")
    return prefix[right] - prefix[left]
