"""
Imagine that we have an 8 x 8 chess board that has some bishops on it, and no other pieces. In chess, bishops can travel diagonally in all 4 directions, and they can move as far as they want in these directions (however, if there is another piece in the way, they cannot move past that piece).

You'll be a given an array of arrays. Each of the smaller arrays has size 2, and represents 1 bishop. For example, if we have, [[1,2]], then there is a bishop at row = 1, col = 2.

If 2 bishops can attack each other (i.e. they are in the same diagonal), we'll say that these are warring bishops. Additionally, if bishop 1 can attack bishop 2, and bishop 2 can attack bishop 3, then all 3 of these are warring bishops.

Given the input list of bishops, return true if all the bishops are part of the same group of warring bishops. Otherwise, return false.
"""

# TODO: write your code here

bishops = [[0,4], [2,6], [3,1], [6,2], [7,5]]

print(f"Your answer: {check_if_is_group_of_warring_bishops(bishops)}")
print(f"Correct answer: {True}")
print()