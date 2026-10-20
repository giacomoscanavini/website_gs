# Time O(n^2) for every input order
# Extra space O(1)
def selection_sort(nums: list[int]) -> None:
    for i in range(len(nums) - 1):
        smallest = i
        for j in range(i + 1, len(nums)):
            if nums[j] < nums[smallest]:
                smallest = j
        nums[i], nums[smallest] = nums[smallest], nums[i]
