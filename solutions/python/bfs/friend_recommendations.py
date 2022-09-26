"""
Facebook often shows a section called “People You May Know” on a user's feed to recommend them to add new friends on Facebook. Imagine that we want to write an algorithm that outputs friend recommendations for a given user.

We'll write a simple algorithm: anyone who is a “friend of a friend” should be a friend recommendation (unless, of course, this individual is already friends with our given user). For example, if Alice is friends with Bob and Bob is friends with Carla (but Alice is not friends with Carla), then Alice should see Carla in her “People You May Know” section.

Each of our users will be represented by an ID (a number) in the range [0, n - 1] where n is the total number of users. You'll receive two pieces of information as input: a userId (this represents the user for whom we would like to provide friend recommendations) and an adjacency matrix. In our adjacency matrix, if matrix[r][c] = 1, then user r is friends with user c (and vice versa). Otherwise, matrix[r][c] should be 0. You should return a list of user IDs that are valid individuals for our given user's “People You May Know” section. This list can be in any order.
"""

from collections import deque

DESIRED_DEGREES_OF_SEPARATION = 2
FRIENDS = 1

def get_neighbors(user_id, friendships):
    num_users = len(friendships)
    neighbors = []

    for other_user_id in range(num_users):
        if user_id == other_user_id:
            continue

        if friendships[user_id][other_user_id] == FRIENDS:
            neighbors.append(other_user_id)

    return neighbors

def get_friend_recommendations(initial_user_id, friendships):
    friend_recommendations = []

    queue = deque()
    start_user = (initial_user_id, 0)
    queue.append(start_user)

    visited = set()
    visited.add(initial_user_id)

    while queue:
        user_id, distance_from_initial_user = queue.popleft()

        is_friends_with_initial_user = friendships[user_id][initial_user_id] == FRIENDS

        if distance_from_initial_user == DESIRED_DEGREES_OF_SEPARATION and not is_friends_with_initial_user:
            friend_recommendations.append(user_id)
        
        if distance_from_initial_user > DESIRED_DEGREES_OF_SEPARATION:
            break

        neighbors = get_neighbors(user_id, friendships)
        for neighbor_user_id in neighbors:
            if neighbor_user_id in visited:
                continue

            visited.add(neighbor_user_id)
            neighbor_user = (neighbor_user_id, distance_from_initial_user + 1)
            queue.append(neighbor_user)

    return friend_recommendations

user_id = 0
friendships = [
    [1,1,0,0,1,1],
    [1,1,1,0,0,1],
    [0,1,1,1,0,0],
    [0,0,1,1,0,1],
    [1,0,0,0,1,0],
    [1,1,0,1,0,1],
]

print(f"Your answer: {get_friend_recommendations(user_id, friendships)}")
print(f"Correct answer: {[2,3]}")
print()