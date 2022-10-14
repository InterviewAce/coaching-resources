
START_NODE = 0

class Solution:
    def get_paths_from_node_to_target(self, graph, cur_node, target_node):
        # Base cases
        if cur_node == target_node:
            return [[cur_node]]

        # Process node
        all_paths_from_node_to_target = []

        # Recurse on neighbors
        neighbors = graph[cur_node]
        for neighbor in neighbors:
            paths_from_neighbor_to_target = self.get_paths_from_node_to_target(
                graph, neighbor, target_node)

            for path in paths_from_neighbor_to_target:
                path_from_cur_to_target = [cur_node, *path]

                all_paths_from_node_to_target.append(path_from_cur_to_target)

        return all_paths_from_node_to_target

    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        target_node = len(graph) - 1

        return self.get_paths_from_node_to_target(graph, START_NODE, target_node)