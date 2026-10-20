from collections import deque

# Expected time O(V + E): reachable vertices and their adjacency entries
# Extra space O(V): the queue and distance table
def bfs_distances(graph: dict[int, list[int]], start: int) -> dict[int, int]:
    queue = deque([start])
    distance = {start: 0}
    while queue:
        node = queue.popleft()
        for neighbor in graph.get(node, []):
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)
    return distance
