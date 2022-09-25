"""
Implicit graph:
-nodes are stones
-edges/neighbors: the neighbors of a stone are all stones in the same row OR in the same column as the stone

From each connected component, we can remove every stone except 1 (verify
this yourself). So, we simply calculate the size of each component. Then,
for each component, we add componentSize - 1 to numRemovableStones (since
1 stone must remain).
"""

from collections import defaultdict, deque

X_IDX = 0
Y_IDX = 1

class Solution:
    def group_coordinates(self, coordinates, idx_to_use):
        grouped_coordinates = defaultdict(list)

        for coordinate in coordinates:
            value = coordinate[idx_to_use]

            grouped_coordinates[value].append(coordinate)

        return grouped_coordinates

    def build_graph(self, coordinates):
        coordinates_with_x_equals = self.group_coordinates(coordinates, X_IDX)
        coordinates_with_y_equals = self.group_coordinates(coordinates, Y_IDX)

        graph = {}

        for coordinate in coordinates:
            x, y = coordinate

            x_neighbors = coordinates_with_x_equals[x]
            y_neighbors = coordinates_with_y_equals[y]

            graph[coordinate] = x_neighbors + y_neighbors

        return graph

    def get_component_size(self, start_location, graph, visited):
        queue = deque()
        queue.append(start_location)
        visited.add(start_location)

        component_size = 0

        while queue:
            location = queue.popleft()

            component_size += 1

            neighbors = graph[location]
            for neighbor in neighbors:
                if neighbor in visited:
                    continue

                visited.add(neighbor)
                queue.append(neighbor)

        return component_size

    def removeStones(self, stones):
        stones = list(map(lambda stone: tuple(stone), stones))

        graph = self.build_graph(stones)
        visited = set()

        num_removable_stones = 0

        for stone in stones:
            if stone in visited:
                continue

            component_size = self.get_component_size(stone, graph, visited)
            num_removable_stones += component_size - 1

        return num_removable_stones

