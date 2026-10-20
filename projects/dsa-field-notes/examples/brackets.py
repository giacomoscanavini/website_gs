# Time O(n): each bracket is pushed or popped at most once
# Extra space O(n): unmatched opening brackets
def balanced(text: str) -> bool:
    opening = {"(", "[", "{"}
    matching = {")": "(", "]": "[", "}": "{"}
    stack = []
    for char in text:
        if char in opening:
            stack.append(char)
        elif char in matching:
            if not stack or stack.pop() != matching[char]:
                return False
        else:
            raise ValueError("Only brackets are accepted")
    return not stack
