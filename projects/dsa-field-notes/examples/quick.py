# Time O(n log n) for balanced partitions, O(n^2) worst case
# Extra space O(log n) for balanced recursion, O(n) worst case
def quicksort(nums: list[int]) -> None:
    def partition(lo: int, hi: int) -> int:
        pivot = nums[hi]
        i = lo
        for j in range(lo, hi):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[hi] = nums[hi], nums[i]
        return i

    def sort(lo: int, hi: int) -> None:
        if lo >= hi:
            return
        p = partition(lo, hi)
        sort(lo, p - 1)
        sort(p + 1, hi)

    sort(0, len(nums) - 1)
