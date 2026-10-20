# Expected time O(n): each character enters and leaves once
# Extra space O(min(n, u)): u is the number of possible characters
def longest_unique(text: str) -> int:
    seen = set()
    left = 0
    best = 0
    for right, char in enumerate(text):
        while char in seen:
            seen.remove(text[left])
            left += 1
        seen.add(char)
        best = max(best, right - left + 1)
    return best
