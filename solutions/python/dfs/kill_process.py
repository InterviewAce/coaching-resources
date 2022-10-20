from collections import defaultdict

HAS_NO_PARENT_PROCESS = 0

class Solution:
    def build_graph(self, process_ids, parent_process_ids):
        graph = defaultdict(list)

        for i in range(len(parent_process_ids)):
            cur_process_id = process_ids[i]
            parent_process_id = parent_process_ids[i]

            if parent_process_id == HAS_NO_PARENT_PROCESS:
                continue

            graph[parent_process_id].append(cur_process_id)

        return graph

    def fill_ids_that_will_be_killed(self, process_id, graph, ids_that_will_be_killed):
        # Base cases

        # Process node
        ids_that_will_be_killed.append(process_id)

        # Handle neighbors
        child_processes = graph[process_id]

        for child_process_id in child_processes:
            self.fill_ids_that_will_be_killed(child_process_id, graph, ids_that_will_be_killed)

    def killProcess(self, process_ids: List[int], parent_process_ids: List[int], kill_id: int) -> List[int]:
        graph = self.build_graph(process_ids, parent_process_ids)

        ids_that_will_be_killed = []

        self.fill_ids_that_will_be_killed(kill_id, graph, ids_that_will_be_killed)

        return ids_that_will_be_killed
