"""
Given 3 inputs: a start city, an end city, and a list of roads, return the shortest path (as an array) from the start city to the end city.
"""

# TODO: write your code here

start_city = 5
end_city = 10
roads = [[5,7], [5,3], [7,6], [7,4], [3,9], [6,4], [4,10], [4,9]]

print(f"Your answer: {get_shortest_path(start_city, end_city, roads)}")
print(f"Correct answer: {2}")
print()