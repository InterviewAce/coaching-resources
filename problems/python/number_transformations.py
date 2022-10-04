"""
You'll be given two numbers and two arrays: a startNum, a targetNum, an array additiveNums, and an array multiplicativeNums. You'll start at the startNum, and you want to figure out the fewest number of operations required to reach the targetNum.

An operation can be one of two things:
-You can take your current number and add any number from additiveNums to it.
-You can take your current number and multiply it by any number from multiplicativeNums.
"""

# TODO: write your code here

start_num = 3
target_num = 80
additive_nums = [1,2]
multiplicative_nums = [9,6,3]

print(f"Your answer: {find_shortest_transformation_length(start_num, target_num, additive_nums, multiplicative_nums)}")
print(f"Correct answer: {5}")
print()