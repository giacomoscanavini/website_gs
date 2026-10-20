# Time O(n): each index is pushed once and popped at most once
# Extra space O(n): stack and output
def next_greater(nums: list[int]) -> list[int | None]:
    answer = [None] * len(nums)
    stack = []
    for i, value in enumerate(nums):
        while stack and nums[stack[-1]] < value:
            j = stack.pop()
            answer[j] = value
        stack.append(i)
    return answer
