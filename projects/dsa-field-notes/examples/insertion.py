# Time O(n^2) worst case, O(n) for already sorted input
# Extra space O(1)
def insertion_sort(nums: list[int]) -> None:
    for i in range(1, len(nums)):
        key = nums[i]
        j = i - 1
        while j >= 0 and nums[j] > key:
            nums[j + 1] = nums[j]
            j -= 1
        nums[j + 1] = key
