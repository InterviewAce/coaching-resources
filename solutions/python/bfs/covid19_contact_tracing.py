"""
During the COVID-19 pandemic, contact tracing became incredibly important. For this problem, you'll implement a contact tracing algorithm. Given a person, you want to return the distance between them and the closest person to them who has COVID-19.

For example, if Alice has a friend of a friend of a friend who has COVID-19, then Alice's output would be 3 (or potentially lower if she has a shorter path to someone with COVID-19). In this problem, people will be represented as IDs (numbers in the range [0, n-1] where n is the number of people).

You'll be given a person number, an array of friendships, and an array of individuals infected with COVID-19. The friendships array will contain a bunch of smaller arrays of size 2. For each smaller array [a,b], we conclude that a is friends with b and b is friends with a. You must return the smallest degree of separation between the given person and an individual who has COVID-19, or -1 if the given person has no connection to an infected individual.
"""

from collections import defaultdict, deque

NO_CONNECTION_TO_INFECTED_INDIVIDUAL = -1

def build_graph(edges):
    graph = defaultdict(list)

    for node_one, node_two in edges:
        graph[node_one].append(node_two)
        graph[node_two].append(node_one)

    return graph

def find_closest_contact_distance(initial_person_id, friendships, infected_people):
    graph = build_graph(friendships)
    infected_people_set = set(infected_people)

    queue = deque()
    start_person = (initial_person_id, 0)
    queue.append(start_person)

    visited = set()
    visited.add(initial_person_id)

    while queue:
        person_id, distance_from_initial_person = queue.popleft()

        if person_id in infected_people:
            return distance_from_initial_person

        if person_id not in graph:
            continue

        neighbor_ids = graph[person_id]
        for neighbor_id in neighbor_ids:
            if neighbor_id in visited:
                continue
            visited.add(neighbor_id)

            neighbor = (neighbor_id, distance_from_initial_person + 1)
            queue.append(neighbor)



    return NO_CONNECTION_TO_INFECTED_INDIVIDUAL

initial_person_id = 0
friendships = [[0,1], [0,2], [2,8], [2,9], [1,3], [3,4], [4,6], [6,7], [8,9], [7,5]]
infected_people = [5,6,7]

print(f"Your answer: {find_closest_contact_distance(initial_person_id, friendships, infected_people)}")
print(f"Correct answer: {4}")
print()

