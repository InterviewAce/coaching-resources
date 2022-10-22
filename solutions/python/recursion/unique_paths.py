def is_in_bounds(row, col):
    row_in_bounds = row >= 0
    col_in_bounds = col >= 0

    return row_in_bounds and col_in_bounds

class Solution:
    def get_num_ways_from_start_to_target(self, target_row, target_col):
        # Base case
        is_start_position = target_row == 0 and target_col == 0
        if is_start_position:
            return 1

        if not is_in_bounds(target_row, target_col):
            return 0

        num_ways_from_start_to_left_cell = self.get_num_ways_from_start_to_target(target_row, target_col - 1)
        num_ways_from_start_to_up_cell = self.get_num_ways_from_start_to_target(target_row - 1, target_col)

        num_ways_from_start_to_target = num_ways_from_start_to_left_cell + num_ways_from_start_to_up_cell

        return num_ways_from_start_to_target

    def uniquePaths(self, num_rows: int, num_cols: int) -> int:
        target_row = num_rows - 1
        target_col = num_cols - 1

        return self.get_num_ways_from_start_to_target(target_row, target_col)
    