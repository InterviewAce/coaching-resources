from collections import defaultdict

class Solution:
    def build_graph(self, edges):
        graph = defaultdict(list)

        for edge in edges:
            node_one, node_two = edge

            graph[node_one].append(node_two)
            graph[node_two].append(node_one)

        return graph

    def has_valid_path(self, cur_node, target_node, graph, visited):
        # Base case
        if cur_node == target_node:
            return True
        if cur_node in visited:
            return False

        # Process node
        visited.add(cur_node)

        # Recurse on neighbors
        neighbors = graph[cur_node]
        for neighbor in neighbors:
            neighbor_has_valid_path = self.has_valid_path(
                neighbor, target_node, graph, visited
            )

            if neighbor_has_valid_path:
                return True

        return False

    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        graph = self.build_graph(edges)
        visited = set()

        return self.has_valid_path(source, destination, graph, visited)