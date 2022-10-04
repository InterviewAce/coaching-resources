"""
We have a series of squares in a 2D plane, and each has a side length of 1. We want to find the size of the largest group of adjacent squares. Adjacent squares are squares that have at least some portion of their sides touching (but they should NOT be overlapping).

Each square will be represented as an x-y pair which denotes the center of the circle (e.g. [0,0] would be a circle that is centered at 0 and has a side length of 1). As an input, you'll be given an array of such squares (e.g. [[0,0], [1,1]]). You should return the size of the largest group of adjacent squares."""

# TODO: write your code here

squares = [
    [0.5, 0.5],
    [1.5, 0.5],
    [2, 0.5],
    [2.5, -0.5],
    [2.5, -1.5],
    [1.5, -1.5]
]

print(f"Your answer: {get_largest_adjacent_square_group_size(squares)}")
print(f"Correct answer: {4}")
print()