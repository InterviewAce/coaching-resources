"""
Given 3 inputs: a start city, an end city, and a list of roads, return the shortest path (as an array) from the start city to the end city.
"""

from collections import deque, defaultdict

no_valid_path = []

class CityNode:
    def __init__(self, city, distance_from_start, prev_city):
        self.city = city
        self.distance_from_start = distance_from_start
        self.prev_city = prev_city

def build_graph(edges):
    graph = defaultdict(list)

    for node_one, node_two in edges:
        graph[node_one].append(node_two)
        graph[node_two].append(node_one)

    return graph

def construct_path(start_city, end_city, ideal_prev_city_map):
    cur_city = end_city
    path = []

    while cur_city is not None:
        path.append(cur_city)
        cur_city = ideal_prev_city_map[cur_city]
    
    path.reverse()
    return path

def get_shortest_path(start_city, end_city, roads):
    graph = build_graph(roads)

    queue = deque()
    start_node = CityNode(start_city, 0, None)
    queue.append(start_node)

    visited = set()
    ideal_prev_city_map = {}

    while queue:
        # Remove node
        city_node = queue.popleft()

        city = city_node.city
        distance_from_start = city_node.distance_from_start
        prev_city = city_node.prev_city

        # Process node
        visited.add(city)

        if city not in ideal_prev_city_map:
            ideal_prev_city_map[city] = prev_city

        if city == end_city:
            break

        # Add neighbors
        neighbors = graph[city]
        for neighbor_city in neighbors:
            if neighbor_city in visited:
                continue
        
            neighbor_node = CityNode(neighbor_city, distance_from_start + 1, city)
            queue.append(neighbor_node)

    if end_city not in ideal_prev_city_map:
        return no_valid_path

    return construct_path(start_city, end_city, ideal_prev_city_map)

start_city = 5
end_city = 10
roads = [[5,7], [5,3], [7,6], [7,4], [3,9], [6,4], [4,10], [4,9]]

print(f"Your answer: {get_shortest_path(start_city, end_city, roads)}")
print(f"Correct answer: {[5,7,4,10]}")
print()





