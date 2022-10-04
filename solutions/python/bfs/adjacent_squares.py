"""
We have a series of squares in a 2D plane, and each has a side length of 1. We want to find the size of the largest group of adjacent squares. Adjacent squares are squares that have at least some portion of their sides touching (but they should NOT be overlapping).

Each square will be represented as an x-y pair which denotes the center of the circle (e.g. [0,0] would be a circle that is centered at 0 and has a side length of 1). As an input, you'll be given an array of such squares (e.g. [[0,0], [1,1]]). You should return the size of the largest group of adjacent squares."""

from collections import defaultdict, deque

SIDE_LENGTH = 1

def are_connected(square_one, square_two):
    square_one_x, square_one_y = square_one
    square_two_x, square_two_y = square_two

    positive_delta_x = abs(square_one_x - square_two_x)
    positive_delta_y = abs(square_one_y - square_two_y)

    are_touching_in_x_direction = (positive_delta_x == SIDE_LENGTH and positive_delta_y < SIDE_LENGTH)
    are_touching_in_y_direction = (positive_delta_y == SIDE_LENGTH and positive_delta_x < SIDE_LENGTH)

    return are_touching_in_x_direction or are_touching_in_y_direction

def build_graph(nodes, are_connected):
    graph = defaultdict(list)

    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            if are_connected(nodes[i], nodes[j]):
                graph[i].append(j)
                graph[j].append(i)

    return graph
  
def get_component_size(start_node_id, graph, visited):
    queue = deque()
    queue.append(start_node_id)

    visited.add(start_node_id)
    component_size = 0

    while queue:
        node_id = queue.popleft()

        component_size += 1

        neighbor_ids = graph[node_id]
        for neighbor_id in neighbor_ids:
            if neighbor_id in visited:
                continue

            visited.add(neighbor_id)
            queue.append(neighbor_id)

    return component_size

def get_largest_adjacent_square_group_size(squares):
    graph = build_graph(squares, are_connected)

    largest_adjacent_square_group_size = 0
    visited = set()

    for square_id in range(len(squares)):
        if square_id in visited:
            continue

        adjacent_square_group_size = get_component_size(square_id, graph, visited)
        largest_adjacent_square_group_size = max(largest_adjacent_square_group_size, adjacent_square_group_size)

    return largest_adjacent_square_group_size

squares = [
    [0.5, 0.5],
    [1.5, 0.5],
    [2, 0.5],
    [2.5, -0.5],
    [2.5, -1.5],
    [1.5, -1.5]
]

print(f"Your answer: {get_largest_adjacent_square_group_size(squares)}")
print(f"Correct answer: {4}")
print()