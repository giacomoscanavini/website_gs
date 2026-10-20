# Time O(n^2) worst case, O(n) for already sorted input
# Extra space O(1)
def bubble_sort(nums: list[int]) -> None:
    for end in range(len(nums) - 1, 0, -1):
        swapped = False
        for j in range(end):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                swapped = True
        if not swapped:
            break
