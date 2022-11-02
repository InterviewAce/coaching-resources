"""
Given a sorted array of integers and a target integer, find the first
occurrence of the target and return its index. Return -1 if the target
is not in the array.
"""

# TODO: write your code here

arr = [1, 3, 3, 3, 3, 6, 10, 10, 10, 100]
target = 3
print(f"Your answer: {find_first_occurrence(arr, target)}")
print(f"Correct answer: {1}")
print()

arr = [2, 3, 5, 7, 11, 13, 17, 19]
target = 6
print(f"Your answer: {find_first_occurrence(arr, target)}")
print(f"Correct answer: {-1}")
print()
