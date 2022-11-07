"""
You'll be given an actor's name as your input, and you must return that actor's bacon number. An actor's bacon number is defined as the minimum number of degrees of separation between that actor and "Kevin Bacon". For example, if A worked with B and B worked with "Kevin Bacon", you would say A has a bacon number of 2. For this question, you'll automatically have access to a utility function "get_actors_who_have_worked_with" that will take in an actor's name as a string and return an array of strings representing actors that the input actor has worked with.
"""

from collections import deque

actor_graph = {
  "Kevin Bacon": ["Carly", "Fred", "Isabella"],
  "Carly": ["Kevin Bacon"],
  "Fred": ["Kevin Bacon", "Emma", "Richard"],
  "Emma": ["Molly", "Justin", "Fred"],
  "Molly": ["Emma"],
  "Justin": ["Emma", "Jacob"],
  "Jacob": ["Justin", "Julia"],
  "Julia": ["Jacob"],
  "Richard": ["Fred", "Olivia", "Andrew"],
  "Olivia": ["Richard", "Ben"],
  "Ben": ["Olivia"],
  "Andrew": ["Richard", "Sophia"],
  "Sophia": ["Andrew"],
  "Isabella": ["Edward", "Brian", "Alexa", "Kevin Bacon"],
  "Edward": ["Isabella"],
  "Brian": ["Isabella", "Kendall"],
  "Kendall": ["Brian"],
  "Alexa": ["Isabella", "Harry", "Diana", "Grace"],
  "Harry": ["Alexa"],
  "Diana": ["Alexa"],
  "Grace": ["Alexa", "Monica"],
  "Monica": ["Grace", "Taylor"],
  "Taylor": ["Monica", "Robert"],
  "Robert": ["Taylor", "Hayley"],
  "Hayley": ["Robert", "Jessica"],
  "Jessica": ["Hayley", "Jennifer"],
  "Jennifer": ["Jessica", "Kate"],
  "Kate": ["Jennifer"]
}

def get_actors_who_have_worked_with(actor):
    if actor not in actor_graph:
        return []

    return actor_graph[actor]

def get_bacon_number(actor):
    queue = deque()
    visited = set()

    start_node = (actor, 0)

    queue.append(start_node)
    visited.add(actor)

    while queue:
        actor_name, distance_from_start = queue.popleft()

        if actor_name == "Kevin Bacon":
            return distance_from_start

        neighbors = get_actors_who_have_worked_with(actor_name)
        for neighbor in neighbors:
            if neighbor in visited:
                continue
            visited.add(neighbor)

            neighbor_node = (neighbor, distance_from_start + 1)
            queue.append(neighbor_node)

print(f"Your answer: {get_bacon_number('Grace')}")
print(f"Correct answer: {3}")
print()