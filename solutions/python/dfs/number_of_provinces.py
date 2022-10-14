CONNECTED = 1

class Solution:
    def mark_province_as_visited(self, visited, city, is_connected):
        # For this problem, our base case in automatically handled
        # (our base case occurs when the current city has 0 unvisited
        # neighbor cities).

        # Process node
        visited.add(city)

        # Recurse on neighbors
        for potential_neighbor_city in range(len(is_connected)):
            is_neighbor = is_connected[city][potential_neighbor_city] == CONNECTED

            if not is_neighbor:
                continue

            # This is an undirected graph. If we can go from city 0 to city 1,
            # then we can go from city 1 to city 0.
            # Thus, this graph CAN have cycles (all undirected graphs can have cycles),
            # so we must tracked visited nodes to prevent infinite loops.
            if potential_neighbor_city in visited:
                continue

            self.mark_province_as_visited(visited, potential_neighbor_city, is_connected)

    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        num_cities = len(isConnected)

        num_provinces = 0
        visited = set()

        for start_city in range(num_cities):
            if start_city in visited:
                continue

            num_provinces += 1
            self.mark_province_as_visited(visited, start_city, isConnected)

        return num_provinces