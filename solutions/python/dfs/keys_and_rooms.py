class Solution:
    def mark_reachable_nodes_as_visited(self, cur_node, graph, visited):
        # Base cases
        if cur_node in visited:
            return

        # Process node
        visited.add(cur_node)

        # Recurse on neighbors
        neighbors = graph[cur_node]

        for neighbor in neighbors:
            self.mark_reachable_nodes_as_visited(neighbor, graph, visited)

    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        visited = set()

        self.mark_reachable_nodes_as_visited(0, rooms, visited)

        num_reachable_rooms = len(visited)
        num_rooms = len(rooms)

        return num_reachable_rooms == num_rooms