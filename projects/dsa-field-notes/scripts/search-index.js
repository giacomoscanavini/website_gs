window.DSA_SEARCH = [
  {
    "id": "two-pointers",
    "title": "Two pointers",
    "sections": [
      {
        "title": "Common patterns",
        "anchor": "two-pointers--common-patterns",
        "text": " A pointer here is an index , not a special Python object. Decide what each index means before writing the loop.  Pattern Meaning of the indices Typical use Opposite ends left and right bound the remaining choices Sorted pair sums, palindrome checks, reversing Read and write read examines input; write marks the next output slot Remove values, move zeros, keep unique values One index per sequence i and j track progress in different sequences Merge sorted data, check a subsequence Slow and fast One advances once; the other advances twice Middle of a linked list, cycle detection  Advantage: often one pass and constant extra space. Limitation: every move needs a reason why discarded positions cannot help. Two indices alone do not make an algorithm linear. "
      },
      {
        "title": "Opposite ends: a pair in sorted data",
        "anchor": "two-pointers--opposite-ends-a-pair-in-sorted-data",
        "text": " For an ascending list, compare nums[left] + nums[right] with the target.  If the sum is too small, increase left . Even the largest remaining partner was not enough for the old left value. If the sum is too large, decrease right . Even the smallest remaining partner was too much for the old right value. Return on equality. Stop when the indices meet: the pair must use different positions.  # Time O(n): each pointer moves at most n times # Extra space O(1) def pair_sorted ( nums : list [ int ], target : int ) -> tuple [ int , int ] | None : left , right = 0 , len ( nums ) - 1 while left < right : total = nums [ left ] + nums [ right ] if total == target : return left , right if total < target : left += 1 else : right -= 1 return None  Cost: at least one boundary moves on each unsuccessful iteration; neither reverses direction. Sorting an unsorted input first adds O(n log n) time and changes its index positions. This function assumes the input is already sorted.  "
      },
      {
        "title": "Read and write: keep a compact prefix",
        "anchor": "two-pointers--read-and-write-keep-a-compact-prefix",
        "text": " nums[:write] contains the values kept so far, in their original order. Read every element once. Copy a kept value to write , then advance write . A rejected value advances only read .  # Time O(n): one read per element # Extra space O(1): overwrite the original list def compact ( nums : list [ int ], remove : int ) -> int : write = 0 for read in range ( len ( nums )): if nums [ read ] != remove : nums [ write ] = nums [ read ] write += 1 return write  The return value is a length , not a new list. Only the prefix up to that length is meaningful. Overwriting is safe because write never passes read . Taking nums[:length] afterward creates a new list and costs O(length) time and space.  "
      },
      {
        "title": "Common mistakes",
        "anchor": "two-pointers--common-mistakes",
        "text": " Moving both ends when only one is justified can skip a solution. Sorting can destroy original indices. Repeated pop(i) or insert(i, value) in the middle shifts later values and can turn a one-pass idea into quadratic work. "
      }
    ]
  },
  {
    "id": "sliding-window",
    "title": "Sliding window",
    "sections": [
      {
        "title": "Common patterns",
        "anchor": "sliding-window--common-patterns",
        "text": " A window is a contiguous part of a sequence. In these examples, left and right are included, so its length is right - left + 1 .  Task What to maintain When to update the answer Fixed-size sum or average A running total After the window reaches size k Longest valid range Counts, a set, or another validity condition After shrinking away any violation Shortest range meeting a threshold A running total While valid, before removing the leftmost item Fixed-size maximum or minimum A deque of useful candidate indices Once the window is complete  Advantage: reuse the old window instead of recomputing its contents. Limitation: a variable window needs a condition that supports safe, one-directional boundary movement. It is not a general solution for every subarray problem. "
      },
      {
        "title": "Fixed size: add one, remove one",
        "anchor": "sliding-window--fixed-size-add-one-remove-one",
        "text": " Build the first total. Each following move adds nums[right] and subtracts nums[right - k] . The outgoing index is right - k , not the new left boundary right - k + 1 .  # Time O(n): add and subtract each element at most once # Extra space O(1) def max_window_sum ( nums : list [ int ], k : int ) -> int : if not 1 <= k <= len ( nums ): raise ValueError ( \"k must be between 1 and len(nums)\" ) total = 0 for i in range ( k ): total += nums [ i ] best = total for right in range ( k , len ( nums )): total += nums [ right ] - nums [ right - k ] best = max ( best , total ) return best  Negative values are fine here: the size is fixed. Initializing best from the first real window also handles an array whose window sums are all negative.  "
      },
      {
        "title": "Longest valid window: remove the violation",
        "anchor": "sliding-window--longest-valid-window-remove-the-violation",
        "text": " Keep a set of characters in the current window. Before adding a character already in the set, remove characters from the left until its previous occurrence is gone. Then add the new character and measure the window.  # Expected time O(n): each character enters and leaves once # Extra space O(min(n, u)): u is the number of possible characters def longest_unique ( text : str ) -> int : seen = set () left = 0 best = 0 for right , char in enumerate ( text ): while char in seen : seen . remove ( text [ left ]) left += 1 seen . add ( char ) best = max ( best , right - left + 1 ) return best  Use while , not if : removing one character may not remove the duplicate. The nested loop is still expected O(n) because each character enters and leaves the set at most once; left never resets.  "
      },
      {
        "title": "Shortest valid window: keep shrinking",
        "anchor": "sliding-window--shortest-valid-window-keep-shrinking",
        "text": " For nonnegative numbers and a positive target, extending a window cannot reduce its sum. Once the sum reaches the target, record its length and remove leftmost values while the condition remains true.  # Time O(n): the two boundaries only move forward # Extra space O(1) def shortest_sum_at_least ( nums : list [ int ], target : int ) -> int : if target <= 0 or any ( value < 0 for value in nums ): raise ValueError ( \"Use a positive target and nonnegative values\" ) left = 0 total = 0 best = len ( nums ) + 1 for right , value in enumerate ( nums ): total += value while total >= target : best = min ( best , right - left + 1 ) total -= nums [ left ] left += 1 return 0 if best > len ( nums ) else best  Why the restriction matters: with [1, -1, 5] and target 5 , this rule records length 3 , then removing 1 lowers the sum to 4 and stops shrinking. It misses the one-element range [5] . Negative numbers break this sum-based rule, not the fixed-window method above.  "
      }
    ]
  },
  {
    "id": "hash-table",
    "title": "Hash table",
    "sections": [
      {
        "title": "Dictionary or set?",
        "anchor": "hash-table--dictionary-or-set",
        "text": " A dictionary maps each key to a value. A set records whether a value is present. Hashing narrows where a key is stored; equality checks distinguish keys when hashes collide.  Need Python structure Common update Membership only set() seen.add(value) Frequency dict or Counter counts[value] = counts.get(value, 0) + 1 Earlier position dict seen[value] = index Group equivalent items dict of lists Map a canonical key to its group Reuse a subproblem result dict or @cache Map the full state to its answer  Advantage: expected constant-time lookup, insertion, and deletion with ordinary fixed-size keys. Limitations: extra memory, no sorted-key search, and worst-case linear operations under severe collisions. Hashing a new long string or tuple also takes work proportional to its size.  Python dict preserves insertion order, not sorted order. A set has no guaranteed iteration order. {} is an empty dictionary; an empty set is set() . Keys must be hashable : a tuple of integers works; a list does not. "
      },
      {
        "title": "Frequency counting",
        "anchor": "hash-table--frequency-counting",
        "text": " For each value, read its current count, using zero when absent, then add one. The number of dictionary entries is the number of distinct values, not the input length unless all values differ.  # Expected time O(n): one hash-table update per value # Extra space O(u): one entry per distinct value def frequencies ( nums : list [ int ]) -> dict [ int , int ]: counts = {} for value in nums : counts [ value ] = counts . get ( value , 0 ) + 1 return counts  "
      },
      {
        "title": "Complement lookup",
        "anchor": "hash-table--complement-lookup",
        "text": " To find two values summing to a target, the partner needed for value is target - value . Check earlier values before storing the current one.  # Expected time O(n): one lookup and at most one insert per value # Extra space O(n): remember earlier values and their indices def pair_unsorted ( nums : list [ int ], target : int ) -> tuple [ int , int ] | None : seen = {} for i , value in enumerate ( nums ): need = target - value if need in seen : return seen [ need ], i seen [ value ] = i return None  The input need not be sorted, and the returned positions are original indices. For [3, 3] with target 6 , the first 3 is stored at index 0 ; the second finds it and returns (0, 1) . Inserting before checking could reuse the same element.  "
      },
      {
        "title": "Choose what a key should store",
        "anchor": "hash-table--choose-what-a-key-should-store",
        "text": " Store a count to count matches, the earliest index to maximize a distance, or the latest index to enforce a recent boundary. Overwriting a value is correct only when the older information is no longer needed. For grouping anagrams, a sorted-character tuple or a fixed-alphabet count tuple can identify the group; constructing that key is part of the cost. "
      }
    ]
  },
  {
    "id": "prefix-sum",
    "title": "Prefix sum",
    "sections": [
      {
        "title": "One boundary convention",
        "anchor": "prefix-sum--one-boundary-convention",
        "text": " Let prefix[i] be the sum of values before index i . Then prefix[0] = 0 , and a list of n values has n + 1 prefix entries.  prefix[i + 1] = prefix[i] + nums[i] sum over [left, right) = prefix[right] − prefix[left]  The left endpoint is included; the right endpoint is excluded. For an inclusive range [left, right] , use prefix[right + 1] - prefix[left] .  Advantage: O(1) sum queries after an O(n) build; negative values are allowed. Limitations: O(n) storage, and changing one input value can invalidate all later prefixes. A minimum or maximum cannot generally be recovered by subtracting two prefix values. "
      },
      {
        "title": "Common patterns",
        "anchor": "prefix-sum--common-patterns",
        "text": " Task Stored information Main operation Many range sums All prefix sums Subtract two endpoints Count ranges with sum k Frequencies of earlier prefix sums Look up current_sum - k Longest range with sum k Earliest index of each prefix sum Subtract index positions Count sums divisible by k Frequencies of remainders, for k > 0 Match equal remainders Batch range additions Difference array of length n + 1 Add at left , subtract at excluded right ; prefix-sum once "
      },
      {
        "title": "Build and query",
        "anchor": "prefix-sum--build-and-query",
        "text": " # Build: time O(n), extra space O(n) # Each range query: time O(1), extra space O(1) def build_prefix ( nums : list [ int ]) -> list [ int ]: prefix = [ 0 ] for value in nums : prefix . append ( prefix [ - 1 ] + value ) return prefix def range_sum ( prefix : list [ int ], left : int , right : int ) -> int : if not 0 <= left <= right < len ( prefix ): raise ValueError ( \"Require 0 <= left <= right <= n\" ) return prefix [ right ] - prefix [ left ]  The leading zero handles a range starting at index 0 without a special case. An empty range [i, i) has sum zero. A range query is subtraction; creating nums[left:right] would instead copy and scan the range.  "
      },
      {
        "title": "Count subarrays with a target sum",
        "anchor": "prefix-sum--count-subarrays-with-a-target-sum",
        "text": " If the current prefix is total , an earlier prefix must equal total - target because their difference is the subarray sum. Count all such earlier prefixes, then record the current one.  # Expected time O(n): one prefix lookup per element # Extra space O(n): counts of earlier prefix sums def count_target_sums ( nums : list [ int ], target : int ) -> int : counts = { 0 : 1 } total = 0 answer = 0 for value in nums : total += value answer += counts . get ( total - target , 0 ) counts [ total ] = counts . get ( total , 0 ) + 1 return answer  {0: 1} counts the empty prefix. A frequency is needed because several earlier prefixes can have the same value. Query before inserting the current prefix so a target of zero does not count an empty subarray at every position.  "
      }
    ]
  },
  {
    "id": "stack",
    "title": "Stack",
    "sections": [
      {
        "title": "Last in, first out",
        "anchor": "stack--last-in-first-out",
        "text": " Use a Python list. stack.append(x) pushes; stack.pop() removes the top; stack[-1] reads it. Check if stack before reading or removing from an empty stack. Pushing and popping at the end are amortized O(1) .  Pattern What the stack stores What removes an item Nested brackets or expressions Unmatched opening symbols or partial values A matching close or completed expression Undo Previous actions or states An undo request Depth-first traversal Nodes still to explore Visiting the latest pending node Monotonic stack Unresolved indices in value order A new value that resolves or dominates the top  Advantage: direct support for nesting and reversing the order of unfinished work. Limitation: only the top is immediately accessible; searching inside is linear, and the pending stack can grow to O(n) . "
      },
      {
        "title": "Match nested brackets",
        "anchor": "stack--match-nested-brackets",
        "text": " An opening bracket is pushed. A closing bracket must match the most recent opening bracket. A closing bracket with an empty stack, a mismatch, or a nonempty final stack makes the string invalid.  # Time O(n): each bracket is pushed or popped at most once # Extra space O(n): unmatched opening brackets def balanced ( text : str ) -> bool : opening = { \"(\" , \"[\" , \"{\" } matching = { \")\" : \"(\" , \"]\" : \"[\" , \"}\" : \"{\" } stack = [] for char in text : if char in opening : stack . append ( char ) elif char in matching : if not stack or stack . pop () != matching [ char ]: return False else : raise ValueError ( \"Only brackets are accepted\" ) return not stack  The empty string is balanced. This function accepts bracket characters only; it rejects other characters rather than silently interpreting them as brackets.  "
      },
      {
        "title": "Monotonic stack: next greater value",
        "anchor": "stack--monotonic-stack-next-greater-value",
        "text": " Scan left to right. The stack stores indices whose next greater value is unknown. Its values are non-increasing from bottom to top. A new larger value resolves smaller values at the top; pop and record their answers before pushing the new index.  # Time O(n): each index is pushed once and popped at most once # Extra space O(n): stack and output def next_greater ( nums : list [ int ]) -> list [ int | None ]: answer = [ None ] * len ( nums ) stack = [] for i , value in enumerate ( nums ): while stack and nums [ stack [ - 1 ]] < value : j = stack . pop () answer [ j ] = value stack . append ( i ) return answer  Each popped index is finished permanently, so total pushes plus pops are linear. The comparison is < because the answer must be strictly greater . Equal values remain pending. Indices allow writing the answer back to the correct position; use i - j instead when the task asks for a distance.  "
      }
    ]
  },
  {
    "id": "queue",
    "title": "Queue",
    "sections": [
      {
        "title": "First in, first out",
        "anchor": "queue--first-in-first-out",
        "text": " Use collections.deque . queue.append(x) adds at the back; queue.popleft() removes from the front. Both end operations are O(1) . A list's pop(0) shifts all later elements and costs O(n) .  Pattern What is queued Main rule Work in arrival order Tasks or events Append at the back, remove from the front Breadth-first search Discovered, unprocessed vertices Mark discovered when enqueuing Level-by-level traversal Nodes in the current frontier Process the queue length captured at the level's start Monotonic deque Candidate indices for a window extremum Expire from the front, remove dominated values from the back  Advantage: FIFO order gives fair arrival-order processing and breadth-first traversal. Limitations: a wide frontier can consume substantial memory; a FIFO queue does not prioritize a cheaper path in a weighted graph. Access near the middle of a deque is linear. "
      },
      {
        "title": "Breadth-first distances",
        "anchor": "queue--breadth-first-distances",
        "text": " Start with the source at distance zero. Remove one vertex, discover its unseen neighbors at distance distance[node] + 1 , and enqueue them. With unweighted edges, every layer is one edge farther from the start.  from collections import deque # Expected time O(V + E): reachable vertices and their adjacency entries # Extra space O(V): the queue and distance table def bfs_distances ( graph : dict [ int , list [ int ]], start : int ) -> dict [ int , int ]: queue = deque ([ start ]) distance = { start : 0 } while queue : node = queue . popleft () for neighbor in graph . get ( node , []): if neighbor not in distance : distance [ neighbor ] = distance [ node ] + 1 queue . append ( neighbor ) return distance  Mark a vertex when enqueuing , not when removing it: otherwise two parents may enqueue the same vertex. V and E here refer to the reachable vertices and adjacency entries examined. Unreachable vertices do not appear in the result. A missing adjacency list means that vertex has no outgoing edges.  "
      },
      {
        "title": "Monotonic deque: a maximum in each window",
        "anchor": "queue--monotonic-deque-a-maximum-in-each-window",
        "text": " Keep candidate indices in increasing index order and decreasing value order. The front is the maximum candidate.  Remove front indices that have left the window. Remove back indices whose values are no larger than the new value. The new value is at least as useful and expires later. Append the new index. Read the front once a complete window exists.  from collections import deque # Time O(n): every index enters and leaves the deque at most once # Extra space O(k) working memory plus O(n - k + 1) output def window_max ( nums : list [ int ], k : int ) -> list [ int ]: if not 1 <= k <= len ( nums ): raise ValueError ( \"k must be between 1 and len(nums)\" ) queue = deque () answer = [] for right , value in enumerate ( nums ): while queue and queue [ 0 ] <= right - k : queue . popleft () while queue and nums [ queue [ - 1 ]] <= value : queue . pop () queue . append ( right ) if right >= k - 1 : answer . append ( nums [ queue [ 0 ]]) return answer  Both ends are necessary: a stack alone cannot efficiently remove expired indices from the oldest end. Every index is inserted once and removed at most once, so total deque work is O(n) .  "
      }
    ]
  },
  {
    "id": "binary-search",
    "title": "Binary search",
    "sections": [
      {
        "title": "Three different questions",
        "anchor": "binary-search--three-different-questions",
        "text": " All three examples use an ascending list and a half-open interval [lo, hi) . Set lo = 0 , hi = len(nums) , and continue while lo < hi . Never read nums[hi] just because hi is a boundary.  Search Return value When nothing qualifies Find a value Any index with nums[i] == target -1 Lower boundary First index with nums[i] >= target n Upper boundary First index with nums[i] > target n  Upper boundary is not the last matching index. It is the insertion position after all equal values. For [1, 2, 2, 2, 4, 6] and target 2 , the lower boundary is 1 , the upper boundary is 4 , and the last matching index is 3 .  Advantage: O(log n) comparisons and O(1) extra space. Limitations: data must be sorted or the tested condition must be monotonic. Preparing unsorted data costs time; inserting into a Python list is still O(n) after the position is found. "
      },
      {
        "title": "Find a value",
        "anchor": "binary-search--find-a-value",
        "text": " On equality, return. If the middle value is too small, discard it and everything before it by setting lo = mid + 1 . Otherwise set hi = mid , excluding the middle and everything after it from the remaining value search.  # Time O(log n): halve the remaining interval each iteration # Extra space O(1) def find_value ( nums : list [ int ], target : int ) -> int : lo , hi = 0 , len ( nums ) while lo < hi : mid = ( lo + hi ) // 2 if nums [ mid ] == target : return mid if nums [ mid ] < target : lo = mid + 1 else : hi = mid return - 1  This returns one occurrence, not necessarily the first when duplicates exist. An empty input immediately returns -1 .  "
      },
      {
        "title": "Find the lower boundary",
        "anchor": "binary-search--find-the-lower-boundary",
        "text": " All indices before lo have values below the target. All indices at or after hi have values at least the target. The loop narrows the unclassified region between them.  If nums[mid] < target , move lo past mid . Otherwise move hi to mid : equality is a reason to continue searching left, not to return.  # Time O(log n): halve the remaining interval each iteration # Extra space O(1) def lower_bound ( nums : list [ int ], target : int ) -> int : lo , hi = 0 , len ( nums ) while lo < hi : mid = ( lo + hi ) // 2 if nums [ mid ] < target : lo = mid + 1 else : hi = mid return lo  "
      },
      {
        "title": "Find the upper boundary",
        "anchor": "binary-search--find-the-upper-boundary",
        "text": " Change only the comparison: discard the left side when nums[mid] <= target . Equal values must lie before the answer, so search farther right.  # Time O(log n): halve the remaining interval each iteration # Extra space O(1) def upper_bound ( nums : list [ int ], target : int ) -> int : lo , hi = 0 , len ( nums ) while lo < hi : mid = ( lo + hi ) // 2 if nums [ mid ] <= target : lo = mid + 1 else : hi = mid return lo  "
      },
      {
        "title": "Reuse the boundaries",
        "anchor": "binary-search--reuse-the-boundaries",
        "text": " Need Calculation Count occurrences of x upper_bound(nums, x) - lower_bound(nums, x) First occurrence Compute i = lower_bound(nums, x) ; require i < n and nums[i] == x Last occurrence Compute i = upper_bound(nums, x) - 1 ; require i >= 0 and nums[i] == x Largest value below x Index lower_bound(nums, x) - 1 , if nonnegative Smallest value above x Index upper_bound(nums, x) , if below n  Python's bisect_left and bisect_right implement the lower and upper insertion boundaries. For binary search on an answer , the condition must change only once, such as False, False, True, True . Search for the first feasible value. If one feasibility check costs C , total time is O(C log R) over an integer search range of size R . "
      },
      {
        "title": "Boundary mistakes",
        "anchor": "binary-search--boundary-mistakes",
        "text": " lo = mid may fail to shrink a two-position interval. Mixing an inclusive hi = n - 1 template with half-open update rules can skip positions. Boundary searches may return n ; test the result before indexing. Sorting first is not part of the O(log n) search cost. "
      }
    ]
  },
  {
    "id": "dynamic-programming",
    "title": "Dynamic programming",
    "sections": [
      {
        "title": "Start with the recurrence",
        "anchor": "dynamic-programming--start-with-the-recurrence",
        "text": " Dynamic programming is useful when different choices lead to the same subproblem . A state must contain enough information to determine that subproblem's answer; otherwise two different situations may be incorrectly treated as the same one.  State: write one sentence defining dp[state] . Transition: express that answer using smaller states and the allowed choices. Base cases: give the smallest answers directly. Evaluation order: compute dependencies before using them. Final answer: identify the requested state, which is not always the last array entry.  Advantage: replaces repeated work with one computation per state. Limitations: a poor state definition gives wrong answers; too many states require too much time or memory. Recursion alone is not DP: reuse is what avoids repeated work. "
      },
      {
        "title": "A recurrence with two predecessors",
        "anchor": "dynamic-programming--a-recurrence-with-two-predecessors",
        "text": " Let f(i) count paths to step i using jumps of size 1 or 2. The final jump comes from i - 1 or i - 2 . These cases do not overlap, so their counts add.  f(0) = 1   ·   f(1) = 1 f(i) = f(i − 1) + f(i − 2), for i ≥ 2  f(0) = 1 counts one empty path. For i = 2 , the two paths are 1 + 1 and 2 ; thus f(2) = 2 . Continue: f(3) = 3 , f(4) = 5 , f(5) = 8 .  Direct recursion  The recurrence translates directly into code, but repeated calls compute the same answers again. For example, both f(4) and f(3) request f(2) .  # Time O(2^n): repeated calls, an exponential upper bound # Extra space O(n): maximum recursion depth def ways_recursive ( n : int ) -> int : if n < 0 : raise ValueError ( \"n must be nonnegative\" ) if n <= 1 : return 1 return ways_recursive ( n - 1 ) + ways_recursive ( n - 2 )  "
      },
      {
        "title": "Top-down and memoization",
        "anchor": "dynamic-programming--top-down-and-memoization",
        "text": " Top-down starts from the requested state and recursively asks for its dependencies. Memoization saves a state's answer so later calls return it immediately. @cache uses the function arguments as the key.  from functools import cache # Time O(n): each state is computed once # Extra space O(n): cached answers and recursion depth def ways_top_down ( n : int ) -> int : if n < 0 : raise ValueError ( \"n must be nonnegative\" ) @cache def solve ( i : int ) -> int : if i <= 1 : return 1 return solve ( i - 1 ) + solve ( i - 2 ) return solve ( n )  The cache is local to each outer call. Every state from 0 through n is computed at most once, but the recursion can still be O(n) deep. Large n can exceed Python's recursion limit. A memoization key must include every changing input that affects the answer.  "
      },
      {
        "title": "Bottom-up tabulation",
        "anchor": "dynamic-programming--bottom-up-tabulation",
        "text": " Bottom-up starts with base cases and fills states in an order that respects their dependencies. Here dp[i] depends on smaller indices, so increase i from 2 to n .  # Time O(n): fill n + 1 states once # Extra space O(n): the table def ways_bottom_up ( n : int ) -> int : if n < 0 : raise ValueError ( \"n must be nonnegative\" ) if n <= 1 : return 1 dp = [ 0 ] * ( n + 1 ) dp [ 0 ] = dp [ 1 ] = 1 for i in range ( 2 , n + 1 ): dp [ i ] = dp [ i - 1 ] + dp [ i - 2 ] return dp [ n ]  This avoids recursion overhead and recursion-depth limits, but computes every state in the chosen table. Keeping the table is useful when later queries or path reconstruction need older answers.  "
      },
      {
        "title": "Optimize the stored state",
        "anchor": "dynamic-programming--optimize-the-stored-state",
        "text": " Only the previous two values are needed for the next value. Before processing i , let older = f(i - 2) and previous = f(i - 1) . Calculate current , then shift the two saved values forward.  # Time O(n): one update per state # Extra space O(1): a constant number of integer slots def ways_rolling ( n : int ) -> int : if n < 0 : raise ValueError ( \"n must be nonnegative\" ) older , previous = 1 , 1 for i in range ( 2 , n + 1 ): current = older + previous older , previous = previous , current return previous  This uses a constant number of integer slots , but no longer retains the full history. Costs assume constant-time arithmetic on bounded-size values. Exact path counts grow with n ; Python's arbitrary-precision integers make the arithmetic and bit storage grow too.  "
      },
      {
        "title": "Common state patterns",
        "anchor": "dynamic-programming--common-state-patterns",
        "text": " Problem structure State and transition Typical cost Count paths Add counts from disjoint predecessor cases Number of states × choices per state Minimum cost Take the minimum of predecessor cost + current cost Number of states × choices per state Choose or skip Compare the answer with and without an item Often O(nC) for capacity C Grid paths dp[r][c] = dp[r-1][c] + dp[r][c-1] , with valid boundaries O(rows × columns) Two sequences dp[i][j] describes their prefixes Often O(nm)  For longest common subsequence, dp[i][j] is the best length in the first i and j elements. If the last elements match, use 1 + dp[i-1][j-1] ; otherwise use max(dp[i-1][j], dp[i][j-1]) . Empty prefixes have value zero. "
      },
      {
        "title": "Minimize: the final coin",
        "anchor": "dynamic-programming--minimize-the-final-coin",
        "text": " Let dp[total] be the fewest coins needed to make exactly total . For every coin that fits, try one coin plus the best answer for the remainder. Denominations may be reused.  dp[0] = 0 dp[t] = min(1 + dp[t − coin]) over coins ≤ t  # Time O(A * c): A is the amount, c is the number of denominations # Extra space O(A): one entry per subtotal def min_coins ( coins : list [ int ], amount : int ) -> int : if amount < 0 or any ( coin <= 0 for coin in coins ): raise ValueError ( \"Use a nonnegative amount and positive coins\" ) dp = [ amount + 1 ] * ( amount + 1 ) dp [ 0 ] = 0 for total in range ( 1 , amount + 1 ): for coin in coins : if coin <= total : dp [ total ] = min ( dp [ total ], 1 + dp [ total - coin ]) return - 1 if dp [ amount ] > amount else dp [ amount ]  The unreachable sentinel is amount + 1 : positive integer denominations cannot require more than amount coins for a feasible solution. An amount of zero returns zero; an unreachable positive amount returns -1 . The algorithm is pseudo-polynomial : its cost depends on the numeric amount, not only on the digits needed to represent it.  "
      },
      {
        "title": "Choose or skip: one item at most once",
        "anchor": "dynamic-programming--choose-or-skip-one-item-at-most-once",
        "text": " For 0/1 knapsack, let D(i, cap) be the best value using the first i items within capacity cap . Skip the new item, or take it and use the preceding item row at the remaining capacity.  D(i, cap) = max(D(i − 1, cap), value + D(i − 1, cap − weight))  The take branch exists only when the item fits. Compressing rows into one array requires capacities to run backward , so dp[cap - weight] still describes the previous item row.  # Time O(n * C): n items and capacity C # Extra space O(C): keep only one row def knapsack ( weights : list [ int ], values : list [ int ], capacity : int ) -> int : if len ( weights ) != len ( values ) or capacity < 0 : raise ValueError ( \"Check lengths and capacity\" ) if any ( weight <= 0 for weight in weights ): raise ValueError ( \"Weights must be positive integers\" ) dp = [ 0 ] * ( capacity + 1 ) for weight , value in zip ( weights , values ): for cap in range ( capacity , weight - 1 , - 1 ): dp [ cap ] = max ( dp [ cap ], dp [ cap - weight ] + value ) return dp [ capacity ]  Backward capacity: each item can be used once. Forward capacity: newly updated entries can reuse the same item, giving the unbounded variant. For weight 2 , value 3 , and capacity 4 , a forward pass can incorrectly use that single item twice and report 6 .  "
      },
      {
        "title": "Compare the approaches",
        "anchor": "dynamic-programming--compare-the-approaches",
        "text": " Approach Strength Cost or limitation Direct recursion Closely follows the recurrence May recompute states exponentially often Top-down + memoization Computes only reached states Cache memory and recursive call stack Bottom-up table Explicit order, no recursive calls Stores a table and may fill unused states Rolling state Keeps only live dependencies Usually loses easy reconstruction of earlier choices  For a grid stored in one row, an old dp[c] can mean \"above\" while updated dp[c-1] means \"left\". For a recurrence that also needs the old diagonal, save it before overwriting. Space optimization is safe only after checking which version of each state is required. "
      }
    ]
  },
  {
    "id": "sorting",
    "title": "Sorting",
    "sections": [
      {
        "title": "What to compare",
        "anchor": "sorting--what-to-compare",
        "text": " Stable means equal-key records keep their original order. In place means the main array is rearranged rather than replaced; recursion can still use extra memory. Here n is the number of values and b is the number of buckets.  Algorithm shown Best time Typical / expected time Worst time Extra memory Stable? Insertion O(n) O(n²) O(n²) O(1) Yes Selection O(n²) O(n²) O(n²) O(1) No Merge O(n log n) O(n log n) O(n log n) O(n) peak Yes Bubble, early stop O(n) O(n²) O(n²) O(1) Yes Bucket, insertion inside O(n + b) O(n + b + n²/b) under uniform independent inputs O(n² + b) O(n + b) Yes in this version Quicksort, final pivot O(n log n) O(n log n) for random distinct input order O(n²) O(log n) balanced; O(n) worst No  Insertion, selection, bubble, and quicksort below change the input and return None . Merge and bucket sort return a new list. In ordinary Python code, nums.sort() changes the list, while sorted(nums) returns a new one; both are stable. "
      },
      {
        "title": "Common uses of sorted order",
        "anchor": "sorting--common-uses-of-sorted-order",
        "text": " Task What sorting enables Find a pair with a target sum Move two pointers using value order Group equal items Equal keys become adjacent Merge overlapping intervals Sort by start, then scan while extending the current end Answer repeated ordered lookups Build the order once, then use binary search  Sorting is preprocessing: include its cost in the full algorithm. Sorting by one key can also destroy the original order needed by another part of the task. "
      },
      {
        "title": "Insertion sort",
        "anchor": "sorting--insertion-sort",
        "text": " Pattern: maintain a sorted prefix. Save the next value as key , shift larger prefix values one position right, and insert key into the gap.  Pros: simple, stable, and efficient on small or nearly sorted inputs. Cons: many shifts on reversed input. With I inversions, its work is O(n + I) ; in the worst case I is quadratic.  # Time O(n^2) worst case, O(n) for already sorted input # Extra space O(1) def insertion_sort ( nums : list [ int ]) -> None : for i in range ( 1 , len ( nums )): key = nums [ i ] j = i - 1 while j >= 0 and nums [ j ] > key : nums [ j + 1 ] = nums [ j ] j -= 1 nums [ j + 1 ] = key  Use > rather than >= to avoid moving equal values past one another. The prefix is sorted after each insertion, but those values are not necessarily in their final global positions yet.  "
      },
      {
        "title": "Selection sort",
        "anchor": "sorting--selection-sort",
        "text": " Pattern: find the smallest remaining value and swap it into the next final position. Before pass i , positions before i are final.  Pros: at most n - 1 placement swaps. Cons: the remaining suffix must still be scanned on sorted input; ordinary swapping is not stable. For equal-key records [2a, 2b, 1] , moving 1 to the front yields [1, 2b, 2a] .  # Time O(n^2) for every input order # Extra space O(1) def selection_sort ( nums : list [ int ]) -> None : for i in range ( len ( nums ) - 1 ): smallest = i for j in range ( i + 1 , len ( nums )): if nums [ j ] < nums [ smallest ]: smallest = j nums [ i ], nums [ smallest ] = nums [ smallest ], nums [ i ]  Cost: the comparisons add up to (n - 1) + (n - 2) + ... + 1 = n(n - 1)/2 .  "
      },
      {
        "title": "Merge sort",
        "anchor": "sorting--merge-sort",
        "text": " Pattern: divide into halves, sort each half, then merge with one index per half. Append the smaller available value. Once one half is exhausted, append the rest of the other.  Pros: predictable O(n log n) time and stable ordering. Cons: this array version allocates slices and merged lists. The merge itself is linear; roughly log n split levels give the total time.  # Time O(n log n): linear merging at each split level # Extra space O(n) peak including slices and output, plus O(log n) frames def merge_sort ( nums : list [ int ]) -> list [ int ]: if len ( nums ) <= 1 : return nums . copy () mid = len ( nums ) // 2 left = merge_sort ( nums [: mid ]) right = merge_sort ( nums [ mid :]) result = [] i = j = 0 while i < len ( left ) and j < len ( right ): if left [ i ] <= right [ j ]: result . append ( left [ i ]) i += 1 else : result . append ( right [ j ]) j += 1 while i < len ( left ): result . append ( left [ i ]) i += 1 while j < len ( right ): result . append ( right [ j ]) j += 1 return result  Taking from the left on equality preserves stability. Slices across a single recursive path have geometrically decreasing lengths, so peak live storage is O(n) , not O(n log n) . The total amount allocated over the whole run can still be O(n log n) .  "
      },
      {
        "title": "Bubble sort",
        "anchor": "sorting--bubble-sort",
        "text": " Pattern: exchange adjacent out-of-order values. After a left-to-right pass, the largest remaining value is at end , so shorten the next pass.  Pros: simple, stable, and stops early when a full pass makes no swaps. Cons: usually many comparisons and swaps; little reason to choose it over insertion sort for small inputs.  # Time O(n^2) worst case, O(n) for already sorted input # Extra space O(1) def bubble_sort ( nums : list [ int ]) -> None : for end in range ( len ( nums ) - 1 , 0 , - 1 ): swapped = False for j in range ( end ): if nums [ j ] > nums [ j + 1 ]: nums [ j ], nums [ j + 1 ] = nums [ j + 1 ], nums [ j ] swapped = True if not swapped : break  The no-swap test belongs after a complete pass , not after a single ordered pair. Only strict inversions are swapped, preserving equal-key order.  "
      },
      {
        "title": "Bucket sort",
        "anchor": "sorting--bucket-sort",
        "text": " Pattern: map values into ordered ranges, sort inside each bucket, then concatenate buckets in range order. This version accepts values in [0, 1) and maps a value to int(value * b) .  Pros: expected linear work when independent, roughly uniform inputs spread across b proportional to n buckets. Cons: the range and distribution matter; clustered values can put almost everything in one bucket. A value of 1 would map outside these buckets and is rejected.  # Expected time O(n + b + n^2 / b) for independent uniform values # Worst time O(n^2 + b), extra space O(n + b), b is the bucket count def bucket_sort ( nums : list [ float ], bucket_count : int | None = None ) -> list [ float ]: b = max ( 1 , len ( nums )) if bucket_count is None else bucket_count if b < 1 : raise ValueError ( \"The bucket count must be positive\" ) buckets = [[] for _ in range ( b )] for value in nums : if not 0 <= value < 1 : raise ValueError ( \"Values must lie in [0, 1)\" ) buckets [ int ( value * b )] . append ( value ) result = [] for bucket in buckets : for i in range ( 1 , len ( bucket )): key = bucket [ i ] j = i - 1 while j >= 0 and bucket [ j ] > key : bucket [ j + 1 ] = bucket [ j ] j -= 1 bucket [ j + 1 ] = key result . extend ( bucket ) return result  With bucket sizes m₀, m₁, ... , insertion sorting contributes O(Σ mᵢ²) . Uniform independent inputs give expected time O(n + b + n²/b) ; setting b proportional to n makes this O(n) . A fixed small bucket count does not guarantee linear scaling. This is bucket sort, not counting sort: a bucket can contain different values that still need sorting.  "
      },
      {
        "title": "Quicksort",
        "anchor": "sorting--quicksort",
        "text": " Pattern: partition around a pivot, put the pivot in its final position, and sort the two remaining intervals. This version chooses the last value as the pivot and uses inclusive bounds [lo, hi] inside its recursive calls.  During partition, nums[lo:i] contains values below the pivot. j scans the remaining non-pivot values. Swap a smaller value to i and advance i . Finally swap the pivot into i .  Pros: partitions the original array with little work per comparison and can be efficient with balanced splits. Cons: unstable; choosing the last value gives quadratic work on sorted, reversed, or all-equal inputs. Deep recursion can also exceed Python's recursion limit.  # Time O(n log n) for balanced partitions, O(n^2) worst case # Extra space O(log n) for balanced recursion, O(n) worst case def quicksort ( nums : list [ int ]) -> None : def partition ( lo : int , hi : int ) -> int : pivot = nums [ hi ] i = lo for j in range ( lo , hi ): if nums [ j ] < pivot : nums [ i ], nums [ j ] = nums [ j ], nums [ i ] i += 1 nums [ i ], nums [ hi ] = nums [ hi ], nums [ i ] return i def sort ( lo : int , hi : int ) -> None : if lo >= hi : return p = partition ( lo , hi ) sort ( lo , p - 1 ) sort ( p + 1 , hi ) sort ( 0 , len ( nums ) - 1 )  A balanced split gives T(n) ≈ 2T(n/2) + O(n) . Repeated splits of sizes 0 and n - 1 give T(n) = T(n - 1) + O(n) = O(n²) . Random pivots reduce dependence on input order; three-way partitioning handles many equal keys more directly. Neither change is included in the simple implementation above.  "
      }
    ]
  }
];
