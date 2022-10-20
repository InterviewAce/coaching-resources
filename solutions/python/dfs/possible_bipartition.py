from collections import defaultdict

GROUP_A = -1
NO_GROUP_ASSIGNED_YET = 0
GROUP_B = 1

class Solution:
    def get_opposite_group(self, group):
        return -1 * group

    def build_graph(self, num_nodes, edges):
        graph = defaultdict(list)

        for edge in edges:
            node_one, node_two = edge

            graph[node_one].append(node_two)
            graph[node_two].append(node_one)

        return graph

    def check_if_component_is_bipartite(self, graph, node, group_assignments, prev_node_group_assignment):
        # Base cases
        has_assigned_group = group_assignments[node] != NO_GROUP_ASSIGNED_YET
        if has_assigned_group:
            return group_assignments[node] == self.get_opposite_group(prev_node_group_assignment)

        # Process node
        group_assignments[node] = self.get_opposite_group(prev_node_group_assignment)

        # Recurse on neighbors
        neighbors = graph[node]
        for neighbor in neighbors:
            neighbor_component_is_bipartite = self.check_if_component_is_bipartite(
                graph,
                neighbor,
                group_assignments,
                group_assignments[node],
            )

            if not neighbor_component_is_bipartite:
                return False

        return True

    def possibleBipartition(self, num_people: int, dislikes: List[List[int]]) -> bool:
        graph = self.build_graph(num_people, dislikes)
        group_assignments = [NO_GROUP_ASSIGNED_YET for _ in range(num_people + 1)]

        for person_id in range(1, num_people + 1):
            has_been_assigned_to_group = group_assignments[person_id] != NO_GROUP_ASSIGNED_YET
            if has_been_assigned_to_group:
                continue

            component_is_bipartite = self.check_if_component_is_bipartite(graph, person_id, group_assignments, GROUP_B)
            if not component_is_bipartite:
                return False

        return True