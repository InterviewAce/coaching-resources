NO_ONES_IN_MATRIX = -1

def get_mid_idx(left_idx, right_idx):
    """
    Why do we use this math to find the middle index?
    Couldn't we just use
        mid_idx = (left_idx + right_idx) // 2

    The reason is integer overflow. In JavaScript, the maximum
    size of a number is (2^53) - 1. Suppose we used the above logic
    (i.e. `const midIdx = Math.floor((left + right) / 2);`). Let's
    say that `left` was (2^53) - 3 and `right` was (2^53) - 2.
    Then, we start my computing `left + right` which is 
        (2^53) - 3 + (2^53) - 2
        = 2 * (2^53) - 5
        = (2^54) - 5 > (2^53) - 1
    So, when computing `left + right` we try to store (2^54) - 5,
    but JavaScript cannot handle such a large number. This problem
    is called 'integer overflow'.

    Instead, we use the approach you see below. Mathematically,
    it's doing the same thing. It just does so in a different order.
    This logic is saying 'find the difference between right and left.
    then cut that in half. add this resulting value to left', which
    puts as at the middle index. But, there is no risk of computing
    numbers that cause integer overflow.
    """

    """
    Extra note: in Python, technically integer overflow is not possible
    because Python does not have a maximum integer size. However, in
    general, it's standard to use this approach to compute middle indices,
    so you should still use it.
    """
    
    mid_idx = left_idx + (right_idx - left_idx) // 2

    return mid_idx

class Solution:
    def find_first_col_with_one(self, binary_matrix, row):
        num_rows, num_cols = binary_matrix.dimensions()

        last_col = num_cols - 1

        left_col = 0
        right_col = last_col

        first_col_with_one = float('inf')

        while left_col <= right_col:
            mid_col = get_mid_idx(left_col, right_col)
            mid_col_value = binary_matrix.get(row, mid_col)

            if mid_col_value == 1:
                first_col_with_one = mid_col
                right_col = mid_col - 1
            else:
                left_col = mid_col + 1

        return first_col_with_one

    def leftMostColumnWithOne(self, binaryMatrix: 'BinaryMatrix') -> int:
        num_rows, num_cols = binaryMatrix.dimensions()

        left_most_col_with_one = float('inf')

        for row in range(num_rows):
            first_col_with_one = self.find_first_col_with_one(binaryMatrix, row)

            left_most_col_with_one = min(left_most_col_with_one, first_col_with_one)

        if left_most_col_with_one == float('inf'):
            return NO_ONES_IN_MATRIX

        return left_most_col_with_one


