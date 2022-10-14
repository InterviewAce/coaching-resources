from collections import defaultdict

def build_graph(edges):
    graph = defaultdict(list)

    for edge in edges:
        node_one, node_two = edge

        graph[node_one].append(node_two)
        graph[node_two].append(node_one)

    return graph

class Solution:
    def mark_component_as_visited(self, graph, node, visited):
        # Base cases
        if node in visited:
            return

        # Process node
        visited.add(node)

        # Add neighbors
        if node not in graph:
            return

        neighbors = graph[node]

        for neighbor in neighbors:
            self.mark_component_as_visited(graph, neighbor, visited)

    def count_components(self, num_nodes, edges):
        graph = build_graph(edges)

        num_connected_components = 0
        visited = set()

        for node in range(num_nodes):
            if node in visited:
                continue

            num_connected_components += 1
            self.mark_component_as_visited(graph, node, visited)

        return num_connected_components

    def countComponents(self, num_nodes: int, edges: List[List[int]]) -> int:
        graph = build_graph(edges)

        num_connected_components = 0
        visited = set()

        for node in range(num_nodes):
            if node in visited:
                continue

            num_connected_components += 1
            self.mark_component_as_visited(graph, node, visited)

        return num_connected_components