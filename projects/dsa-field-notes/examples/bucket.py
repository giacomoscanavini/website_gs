# Expected time O(n + b + n^2 / b) for independent uniform values
# Worst time O(n^2 + b), extra space O(n + b), b is the bucket count
def bucket_sort(nums: list[float], bucket_count: int | None = None) -> list[float]:
    b = max(1, len(nums)) if bucket_count is None else bucket_count
    if b < 1:
        raise ValueError("The bucket count must be positive")
    buckets = [[] for _ in range(b)]
    for value in nums:
        if not 0 <= value < 1:
            raise ValueError("Values must lie in [0, 1)")
        buckets[int(value * b)].append(value)
    result = []
    for bucket in buckets:
        for i in range(1, len(bucket)):
            key = bucket[i]
            j = i - 1
            while j >= 0 and bucket[j] > key:
                bucket[j + 1] = bucket[j]
                j -= 1
            bucket[j + 1] = key
        result.extend(bucket)
    return result
