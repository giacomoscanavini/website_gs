# Time O(n): one read per element
# Extra space O(1): overwrite the original list
def compact(nums: list[int], remove: int) -> int:
    write = 0
    for read in range(len(nums)):
        if nums[read] != remove:
            nums[write] = nums[read]
            write += 1
    return write
