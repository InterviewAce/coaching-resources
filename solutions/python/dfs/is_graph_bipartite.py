UNVISITED = 0
SET_A = -1
SET_B = 1

class Solution:
    def get_opposite_set(self, prev_assigned_set):
        return prev_assigned_set * -1

    def checkIfIsBipartite(self, graph, node, visited, prev_assigned_set):
        # Base cases
        if visited[node] != UNVISITED:
            return visited[node] == self.get_opposite_set(prev_assigned_set)

        # Process node
        visited[node] = self.get_opposite_set(prev_assigned_set)

        # Recurse on neighbors
        neighbors = graph[node]
        for neighbor in neighbors:
            remaining_component_is_bipartite = self.checkIfIsBipartite(
                graph, neighbor, visited, visited[node]
            )

            if not remaining_component_is_bipartite:
                return False

        return True

    def isBipartite(self, graph: List[List[int]]) -> bool:
        num_nodes = len(graph)
        visited = [UNVISITED for _ in range(num_nodes)]

        for node in range(num_nodes):
            if visited[node] != UNVISITED:
                continue

            cur_component_is_bipartite = self.checkIfIsBipartite(graph, node, visited, SET_B)

            if not cur_component_is_bipartite:
                return False

        return True
