directions = [
    (0, 1),
    (1, 0),
    (0, -1),
    (-1, 0),
]

def is_in_bounds(matrix, row, col):
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    row_in_bounds = row >= 0 and row < num_rows
    col_in_bounds = col >= 0 and col < num_cols

    return row_in_bounds and col_in_bounds

class Solution:
    def get_longest_path_starting_at(self, matrix, row, col, longest_increasing_path_starting_at):
        # Base cases
        cur_position_in_cache = (row, col) in longest_increasing_path_starting_at

        if cur_position_in_cache:
            return longest_increasing_path_starting_at[(row, col)]

        # Process node
        longest_increasing_path_starting_at[(row, col)] = 1

        # Recurse on neighbors
        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change

            if not is_in_bounds(matrix, new_row, new_col):
                continue

            is_increasing = matrix[row][col] < matrix[new_row][new_col]
            if is_increasing:
                path_size_with_new_position = (
                    1
                    + self.get_longest_path_starting_at(
                        matrix,
                        new_row,
                        new_col,
                        longest_increasing_path_starting_at,
                    )
                )

                longest_increasing_path_starting_at[(row, col)] = max(
                    longest_increasing_path_starting_at[(row, col)],
                    path_size_with_new_position,
                )

        return longest_increasing_path_starting_at[(row, col)]

    def longestIncreasingPath(self, matrix):
        num_rows = len(matrix)
        num_cols = len(matrix[0])

        longest_increasing_path_length = 0
        longest_increasing_path_starting_at = {}

        for row in range(num_rows):
            for col in range(num_cols):
                longest_increasing_path_starting_at_cur = self.get_longest_path_starting_at(
                    matrix,
                    row,
                    col,
                    longest_increasing_path_starting_at,
                )

                longest_increasing_path_length = max(
                    longest_increasing_path_length,
                    longest_increasing_path_starting_at_cur,
                )

        return longest_increasing_path_length
