"""
There are many religious fishermen at sea. Two fishermen will work together in a squad if either they have the same religion or the same fishing rod. Also, if fisherman Alex is willing to work with fisherman Bob, and fisherman Bob is willing to work with fisherman Caleb, then fisherman Alex and fisherman Caleb will be willing to work together (because they trust fisherman Bob).

You'll be given an array where each element represents a fisherman (e.g. [['christianity', 'Johnny Morris']] means we have 1 fisherman whose religion is 'christianity' and whose fishing rod is 'Johnny Morris'). You must return the size of the largest squad of fishermen.
"""
from collections import defaultdict, deque

def build_graph(nodes, are_connected):
    graph = defaultdict(list)

    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            if are_connected(nodes[i], nodes[j]):
                graph[i].append(j)
                graph[j].append(i)

    return graph

def are_connected(fisherman_one, fisherman_two):
    fisherman_one_religion, fisherman_one_fishing_rod = fisherman_one
    fisherman_two_religion, fisherman_two_fishing_rod = fisherman_two

    return fisherman_one_religion == fisherman_two_religion or fisherman_one_fishing_rod == fisherman_two_fishing_rod

def get_component_size(start_node_id, graph, visited):
    queue = deque()
    queue.append(start_node_id)

    visited.add(start_node_id)

    component_size = 0

    while queue:
        node_id = queue.popleft()

        component_size += 1

        neighbor_ids = graph[node_id]
        for neighbor_id in neighbor_ids:
            if neighbor_id in visited:
                continue

            visited.add(neighbor_id)
            queue.append(neighbor_id)

    return component_size

def find_largest_religious_fishermen_squad(fishermen):
    graph = build_graph(fishermen, are_connected)

    largest_squad_size = 0
    visited = set()

    for fisherman_id in range(len(fishermen)):
        if fisherman_id in visited:
            continue

        squad_size = get_component_size(fisherman_id, graph, visited)
        largest_squad_size = max(largest_squad_size, squad_size)

    return largest_squad_size

fishermen = [['Sikhism', 'Orvis'], ['Christianity', 'Johnny Morris'], ['Buddhism', 'Winn Grip'], ['Islam', 'Shimano'], ['Christianity', 'Fuji'], ['Buddhism', 'Shimano'], ['Christianity', 'Fuji'], ['Judaism', 'Fuji'], ['Christianity', 'Johnny Morris'], ['Hinduism', 'Orvis']]

print(f"Your answer: {find_largest_religious_fishermen_squad(fishermen)}")
print(f"Correct answer: {5}")
print()