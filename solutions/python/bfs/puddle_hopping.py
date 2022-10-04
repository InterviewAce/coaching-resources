"""
We have a frog who loves being in the water (especially in puddles). Because of this, he refuses to travel on land. But, he loves hopping from one puddle to the next. So, he's looking to find the area that has the largest number of puddles for him to jump between.

You'll be given an input which is an array of puddles (note that every puddle is a circle), and for each puddle you have 3 pieces of information: x-position of its center, y-position of its center, and its radius. You'll also be given an input jumpSize which tells you how far our frog can jump.

Return the size of the largest group of puddles that our frog can freely jump between.
"""

from collections import defaultdict, deque
import math

def get_distance(point_one, point_two):
    x_one, y_one = point_one
    x_two, y_two = point_two

    x_diff = x_one - x_two
    y_diff = y_one - y_two

    return math.sqrt(x_diff ** 2 + y_diff ** 2)

def are_connected(puddle_one, puddle_two, jump_size):
    puddle_one_x, puddle_one_y, puddle_one_radius = puddle_one
    puddle_two_x, puddle_two_y, puddle_two_radius = puddle_two

    distance_between_centers = get_distance((puddle_one_x, puddle_one_y), (puddle_two_x, puddle_two_y))
    radius_sum = puddle_one_radius + puddle_two_radius

    return distance_between_centers - radius_sum <= jump_size

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

def get_largest_puddle_group_size(puddles, jump_size):
    graph = build_graph(puddles, lambda x, y: are_connected(x, y, jump_size))

    visited = set()
    largest_puddle_group_size = 0

    for puddle_id in range(len(puddles)):
        if puddle_id in visited:
            continue

        cur_puddle_group_size = get_component_size(puddle_id, graph, visited)
        largest_puddle_group_size = max(largest_puddle_group_size, cur_puddle_group_size)

    return largest_puddle_group_size

puddles = [[0,0,1], [10,5,1], [11,-5,1], [3,1,1], [11,2,2], [2,-3,1], [13,4,3], [2,2,1]]
jump_size = 5

print(f"Your answer: {get_largest_puddle_group_size(puddles, jump_size)}")
print(f"Correct answer: {4}")
print()