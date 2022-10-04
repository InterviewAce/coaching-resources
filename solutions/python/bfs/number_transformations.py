"""
You'll be given two numbers and two arrays: a startNum, a targetNum, an array additiveNums, and an array multiplicativeNums. You'll start at the startNum, and you want to figure out the fewest number of operations required to reach the targetNum.

An operation can be one of two things:
-You can take your current number and add any number from additiveNums to it.
-You can take your current number and multiply it by any number from multiplicativeNums.
"""
from collections import deque

def get_neighbors(num, additive_nums, multiplicative_nums):
    neighbors = []

    for additive_num in additive_nums:
        neighbors.append(num + additive_num)

    for multiplicative_num in multiplicative_nums:
        neighbors.append(num * multiplicative_num)

    return neighbors


def find_shortest_transformation_length(start_num, target_num, additive_nums, multiplicative_nums):
    queue = deque()
    start_tuple = (start_num, 0)
    queue.append(start_tuple)

    visited = set()
    visited.add(start_num)

    while queue:
        num, num_transformations_so_far = queue.popleft()

        if num == target_num:
            return num_transformations_so_far

        neighbor_nums = get_neighbors(num, additive_nums, multiplicative_nums)
        for neighbor_num in neighbor_nums:
            if neighbor_num in visited:
                continue

            visited.add(neighbor_num)
            
            neighbor_tuple = (neighbor_num, num_transformations_so_far + 1)
            queue.append(neighbor_tuple)

start_num = 3
target_num = 80
additive_nums = [1,2]
multiplicative_nums = [9,6,3]

print(f"Your answer: {find_shortest_transformation_length(start_num, target_num, additive_nums, multiplicative_nums)}")
print(f"Correct answer: {5}")
print()