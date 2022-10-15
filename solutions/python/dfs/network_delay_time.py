from collections import defaultdict

CANNOT_REACH_ALL_NODES = -1

class Solution:
    def build_graph(self, edges):
        graph = defaultdict(dict)

        for src, dest, weight in edges:
            graph[src][dest] = weight

        return graph

    def find_min_time_to_reach_nodes_in_component(self, graph, node, min_time_to_reach, time_elapsed_so_far):
        # Base cases
        if min_time_to_reach[node] <= time_elapsed_so_far:
            return

        # Process node
        min_time_to_reach[node] = time_elapsed_so_far

        # Recurse on neighbors
        if node not in graph:
            return

        neighbors = graph[node]
        for neighbor in neighbors:
            time_to_reach_neighbor = neighbors[neighbor]
            self.find_min_time_to_reach_nodes_in_component(
                graph,
                neighbor,
                min_time_to_reach,
                time_elapsed_so_far + time_to_reach_neighbor,
            )

    def networkDelayTime(self, times: List[List[int]], num_nodes: int, start_node: int) -> int:
        graph = self.build_graph(times)

        min_time_to_reach = [float('inf') for _ in range(num_nodes + 1)]
        min_time_to_reach[0] = -float('inf')

        self.find_min_time_to_reach_nodes_in_component(graph, start_node, min_time_to_reach, 0)

        min_time_to_reach_all_nodes = max(min_time_to_reach)

        if min_time_to_reach_all_nodes == float('inf'):
            return CANNOT_REACH_ALL_NODES

        return min_time_to_reach_all_nodes