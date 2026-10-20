from collections import deque

# Time O(n): every index enters and leaves the deque at most once
# Extra space O(k) working memory plus O(n - k + 1) output
def window_max(nums: list[int], k: int) -> list[int]:
    if not 1 <= k <= len(nums):
        raise ValueError("k must be between 1 and len(nums)")
    queue = deque()
    answer = []
    for right, value in enumerate(nums):
        while queue and queue[0] <= right - k:
            queue.popleft()
        while queue and nums[queue[-1]] <= value:
            queue.pop()
        queue.append(right)
        if right >= k - 1:
            answer.append(nums[queue[0]])
    return answer
