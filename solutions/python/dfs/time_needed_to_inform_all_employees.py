HAS_NO_MANAGER = -1

class Solution:
    def build_graph(self, num_employees, managers):
        graph = {}

        for employee_id in range(num_employees):
            graph[employee_id] = []

        for employee_id in range(num_employees):
            manager_id = managers[employee_id]

            if manager_id == HAS_NO_MANAGER:
                continue

            graph[manager_id].append(employee_id)

        return graph

    def get_time_required_to_inform(self, employee_id, graph, inform_time):
        # Base cases
        # No base  cases needed. Note: this is graph is acyclic, so we do not need a visited set.

        # Process node
        time_for_cur_employee_to_inform_subordinates = inform_time[employee_id]

        # Handle neighbors
        max_time_to_tell_subordinate_tree = 0

        subordinates = graph[employee_id]
        for subordinate_id in subordinates:
            time_required_to_inform_subordinate_tree = self.get_time_required_to_inform(
                subordinate_id, graph, inform_time
            )

            max_time_to_tell_subordinate_tree = max(
                max_time_to_tell_subordinate_tree,
                time_required_to_inform_subordinate_tree,
            )

        total_time_to_inform_cur_subtree = (
            time_for_cur_employee_to_inform_subordinates
            + max_time_to_tell_subordinate_tree
        )
        return total_time_to_inform_cur_subtree

    def numOfMinutes(self, num_employees, head_id, managers, inform_time):
        graph = self.build_graph(num_employees, managers)

        return self.get_time_required_to_inform(head_id, graph, inform_time)