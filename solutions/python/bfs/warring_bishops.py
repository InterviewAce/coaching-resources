"""
Imagine that we have an 8 x 8 chess board that has some bishops on it, and no other pieces. In chess, bishops can travel diagonally in all 4 directions, and they can move as far as they want in these directions (however, if there is another piece in the way, they cannot move past that piece).

You'll be a given an array of arrays. Each of the smaller arrays has size 2, and represents 1 bishop. For example, if we have, [[1,2]], then there is a bishop at row = 1, col = 2.

If 2 bishops can attack each other (i.e. they are in the same diagonal), we'll say that these are warring bishops. Additionally, if bishop 1 can attack bishop 2, and bishop 2 can attack bishop 3, then all 3 of these are warring bishops.

Given the input list of bishops, return true if all the bishops are part of the same group of warring bishops. Otherwise, return false.
"""

from collections import defaultdict, deque

def are_connected(bishop_one, bishop_two):
    bishop_one_row, bishop_one_col = bishop_one
    bishop_two_row, bishop_two_col = bishop_two

    slope_between_bishops = (bishop_two_row - bishop_one_row) / (bishop_two_col - bishop_one_col)

    return slope_between_bishops == 1 or slope_between_bishops == -1

def build_graph(nodes, are_connected):
    graph = defaultdict(list)

    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            if are_connected(nodes[i], nodes[j]):
                graph[i].append(j)
                graph[j].append(i)

    return graph

def mark_component_as_visited(start_node_id, graph, visited):
    queue = deque()
    queue.append(start_node_id)

    visited.add(start_node_id)

    while queue:
        node_id = queue.popleft()

        
        neighbor_ids = graph[node_id]
        for neighbor_id in neighbor_ids:
            if neighbor_id in visited:
                continue

            visited.add(neighbor_id)
            queue.append(neighbor_id)

def check_if_is_group_of_warring_bishops(bishops):
    if len(bishops) == 0:
        return True

    graph = build_graph(bishops, are_connected)

    visited = set()
    mark_component_as_visited(0, graph, visited)

    return len(visited) == len(bishops)

bishops = [[0,4], [2,6], [3,1], [6,2], [7,5]]

print(f"Your answer: {check_if_is_group_of_warring_bishops(bishops)}")
print(f"Correct answer: {True}")
print()