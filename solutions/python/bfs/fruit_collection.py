"""
There is a monkey who loves collecting and eating fruits. This monkey jumps from tree to tree using the vines that are attached to the tree. He would like to find the collection of trees that allows him to maximize the total amount of fruit that he can eat. Note that some trees contain more fruit than others.

You'll be given a list of trees, where each tree contains an x-coordinate, a y-coordinate, a number of fruits, and a vine length. For example, [2,4,5,10] indicates that we have a tree at the position (2,4) in a 2D grid, this tree has 5 fruits, and the monkey can jump to any tree within a 10 unit radius of this tree. Note that the monkey will never jump to another tree if its not possible to jump from the other tree to his current tree (since he doesn't want to get stranded).

You should return the maximum amount of fruit that the monkey can obtain while staying within one group of trees (i.e. one set of trees that he can jump between).
"""

from collections import defaultdict, deque
import math

NUM_FRUIT_IDX = 2

def get_distance(point_one, point_two):
    x_one, y_one = point_one
    x_two, y_two = point_two

    x_diff = x_one - x_two
    y_diff = y_one - y_two

    return math.sqrt(x_diff ** 2 + y_diff ** 2)


def are_connected(tree_one, tree_two):
    x_one, y_one, _, vine_length_one = tree_one
    x_two, y_two, _, vine_length_two = tree_two

    min_vine_length = min(vine_length_one, vine_length_two)
    distance_between_trees = get_distance((x_one, y_one), (x_two, y_two))

    return distance_between_trees <= min_vine_length

def build_graph(nodes, are_connected):
    graph = defaultdict(list)

    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            if are_connected(nodes[i], nodes[j]):
                graph[i].append(j)
                graph[j].append(i)

    return graph


def get_weighted_component_size(start_node, graph, visited, nodes, weight_idx):
    queue = deque()
    queue.append(start_node)

    visited.add(start_node)
    weighted_component_size = 0

    while queue:
        node_id = queue.popleft()

        node = nodes[node_id]
        weighted_component_size += node[weight_idx]

        neighbors = graph[node_id]
        for neighbor_id in neighbors:
            if neighbor_id in visited:
                continue

            visited.add(neighbor_id)
            queue.append(neighbor_id)

    return weighted_component_size

def get_max_reachable_fruit(trees):
    graph = build_graph(trees, are_connected)

    visited = set()
    max_fruit = 0

    for tree_id in graph:
        if tree_id in visited:
            continue

        weighted_component_size = get_weighted_component_size(tree_id, graph, visited, trees, NUM_FRUIT_IDX)
        max_fruit = max(max_fruit, weighted_component_size)

    return max_fruit

trees = [
[2,4,2,6],
[10,4,5,5],
[3,8,3,6],
[12,8,6,5],
[1,6,2,6]
]

print(f"Your answer: {get_max_reachable_fruit(trees)}")
print(f"Correct answer: {11}")
print()