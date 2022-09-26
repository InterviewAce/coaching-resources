"""
Given an array of edges of an undirected graph and two nodes, return the length of the shortest path between these two nodes. If no such path exists, return -1. Note that the length of a path is the number of edges in the path, not the number of nodes.
"""

# TODO: write your code here

edges = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v']
]
start_node = 'w'
target_node = 'z'

print(f"Your answer: {get_shortest_path_length(edges, start_node, target_node)}")
print(f"Correct answer: {2}")
print()