"""
Given an array of integers sorted in increasing order and a target, find the 
index of the first element in the array that is larger than or equal to the 
target. Assume that it is guaranteed to find a satisfying number.
"""

# TODO: write your code here

arr = [1, 3, 3, 5, 8, 8, 10]
target = 2
print(f"Your answer: {first_not_smaller(arr, target)}")
print(f"Correct answer: {1}")
print()

arr = [2, 3, 5, 7, 11, 13, 17, 19]
target = 6
print(f"Your answer: {first_not_smaller(arr, target)}")
print(f"Correct answer: {3}")
print()
