import math
from collections import defaultdict

def compute_distance_between_points(point_one, point_two):
    x_one, y_one = point_one
    x_two, y_two = point_two

    delta_x = x_two - x_one
    delta_y = y_two - y_one

    delta_x_squared = delta_x * delta_x
    delta_y_squared = delta_y * delta_y

    return math.sqrt(delta_x_squared + delta_y_squared)

class Solution:
    def build_graph(self, bombs):
        graph = defaultdict(list)

        for i in range(len(bombs)):
            for j in range(i + 1, len(bombs)):
                i_bomb_data = bombs[i]
                j_bomb_data = bombs[j]

                i_can_detonate_j = self.can_detonate(i_bomb_data, j_bomb_data)
                j_can_detonate_i = self.can_detonate(j_bomb_data, i_bomb_data)

                if i_can_detonate_j:
                    graph[i].append(j)
                
                if j_can_detonate_i:
                    graph[j].append(i)

        return graph

    def get_component_size(self, graph, node, visited):
        # Base case
        if node in visited:
            return 0

        # Process node
        component_size = 1  # The 1 represents the current node
        visited.add(node)

        # Recurse on neighbors
        if node not in graph:
            return component_size

        neighbors = graph[node]
        for neighbor in neighbors:
            component_size += self.get_component_size(graph, neighbor, visited)

        return component_size

    def can_detonate(self, cur_bomb_data, other_bomb_data):
        cur_bomb_x, cur_bomb_y, cur_bomb_radius = cur_bomb_data
        other_bomb_x, other_bomb_y, _other_bomb_radius = other_bomb_data

        distance_between_bombs = compute_distance_between_points((cur_bomb_x, cur_bomb_y), (other_bomb_x, other_bomb_y))

        return distance_between_bombs <= cur_bomb_radius

    def maximumDetonation(self, bombs: List[List[int]]) -> int:
        graph = self.build_graph(bombs)
        max_bombs_can_detonate = 0

        for bomb_id in range(len(bombs)):
            bomb = bombs[bomb_id]

            visited = set()
            num_bombs_can_detonate = self.get_component_size(graph, bomb_id, visited)

            max_bombs_can_detonate = max(max_bombs_can_detonate, num_bombs_can_detonate)

        return max_bombs_can_detonate
