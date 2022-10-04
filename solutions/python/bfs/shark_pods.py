"""
Imagine that we have some special sharks, and these sharks tend to travel in pods. However, these sharks are competitive. Two sharks will only be willing to hunt together if they deem each other to be worthy. The sharks will deem each other worthy if the difference between their tooth size is less than or equal to 1 (inches) OR the difference between their fin size is less than or equal to 4 (inches).

Additionally, these sharks are highly respectful creatures. So, if shark 1 believes shark 2 is worthy, and shark 2 believes shark 3 is worth, then shark 1 and shark 3 will deem each other to be worthy (because they respect shark 2’s opinion).

Given a list of smaller arrays representing sharks (e.g. [[2,4]] means we have one shark with a tooth size of 2 and a fin size of 4), return the number of pods that these sharks will form.
"""
from collections import defaultdict, deque

MAX_ALLOWABLE_TOOTH_SIZE_DIFFERENCE = 1
MAX_ALLOWABLE_FIN_SIZE_DIFFERENCE = 4

def build_graph(nodes, are_connected):
    graph = defaultdict(list)

    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            if are_connected(nodes[i], nodes[j]):
                graph[i].append(j)
                graph[j].append(i)

    return graph

def are_connected(shark_one, shark_two):
    shark_one_tooth_size, shark_one_fin_size = shark_one
    shark_two_tooth_size, shark_two_fin_size = shark_two

    tooth_size_difference = abs(shark_one_tooth_size - shark_two_tooth_size)
    fin_size_difference = abs(shark_one_fin_size - shark_two_fin_size)

    return tooth_size_difference <= MAX_ALLOWABLE_TOOTH_SIZE_DIFFERENCE or fin_size_difference <= MAX_ALLOWABLE_FIN_SIZE_DIFFERENCE

def mark_component_as_visited(start_node_id, graph, visited):
    queue = deque()
    queue.append(start_node_id)

    visited.add(start_node_id)

    while queue:
        node_id = queue.popleft()

        
        neighbor_ids = graph[node_id]
        for neighbor_id in neighbor_ids:
            if neighbor_id in visited:
                continue

            visited.add(neighbor_id)
            queue.append(neighbor_id)

def count_shark_pods(sharks):
    graph = build_graph(sharks, are_connected)

    visited = set()
    num_pods = 0

    for shark_id in range(len(sharks)):
        if shark_id in visited:
            continue

        num_pods += 1
        mark_component_as_visited(shark_id, graph, visited)

    return num_pods


sharks = [[2,4], [10,20], [1.5, 9], [10,22], [0.1,1], [19,18], [7,13], [12,26]]

print(f"Your answer: {count_shark_pods(sharks)}")
print(f"Correct answer: {2}")
print()