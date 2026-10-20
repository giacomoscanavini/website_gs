# Time O(n log n): linear merging at each split level
# Extra space O(n) peak including slices and output, plus O(log n) frames
def merge_sort(nums: list[int]) -> list[int]:
    if len(nums) <= 1:
        return nums.copy()
    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    while i < len(left):
        result.append(left[i])
        i += 1
    while j < len(right):
        result.append(right[j])
        j += 1
    return result
