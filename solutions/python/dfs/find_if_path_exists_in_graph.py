from collections import defaultdict

class Solution:
    def build_graph(self, edges):
        graph = defaultdict(list)
        
        for node_one, node_two in edges:
            graph[node_one].append(node_two)
            graph[node_two].append(node_one)
            
        return graph

    def has_valid_path(self, cur_node, target_node, graph, visited):
        if cur_node == target_node:
            return True
        if cur_node in visited:
            return False

        visited.add(cur_node)

        for neighbor in graph[cur_node]:
            neighbor_has_valid_path = self.has_valid_path(
                neighbor, target_node, graph, visited
            )
            if neighbor_has_valid_path:
                return True

        return False

    def validPath(self, n: int, edges: List[List[int]], start_node: int, target_node: int) -> bool:
        graph = self.build_graph(edges)
        visited = set()
        
        return self.has_valid_path(start_node, target_node, graph, visited)