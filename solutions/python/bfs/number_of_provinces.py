from collections import deque

CONNECTED = 1

class Solution:
    def get_neighbors(self, node_id, adjacency_matrix):
        num_nodes = len(adjacency_matrix)
        neighbors = []

        for potential_neighbor_id in range(num_nodes):
            is_neighbor = adjacency_matrix[node_id][potential_neighbor_id] == CONNECTED
            if not is_neighbor:
                continue

            neighbors.append(potential_neighbor_id)

        return neighbors

    def mark_component_as_visited(self, start_node_id, adjacency_matrix, visited):
        queue = deque()
        queue.append(start_node_id)

        while queue:
            # Remove node
            node_id = queue.popleft()

            # Process node
            # No work required here

            # Add neighbors
            neighbor_ids = self.get_neighbors(node_id, adjacency_matrix)
            for neighbor_id in neighbor_ids:
                if neighbor_id in visited:
                    continue

                visited.add(neighbor_id)
                queue.append(neighbor_id)
            

    def findCircleNum(self, cityConnections: List[List[int]]) -> int:
        num_cities = len(cityConnections)
        num_provinces = 0

        visited = set()

        for city in range(num_cities):
            if city in visited:
                continue

            num_provinces += 1
            self.mark_component_as_visited(city, cityConnections, visited)
            
        return num_provinces

