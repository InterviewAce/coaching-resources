"""
Approach 1:
"""
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
    
"""
Approach 2:
*Note: this approach pretty much does the same thing as approach 1, the code is just
structured differently.
"""
class Solution:
    def get_num_ways_from_position_to_target(self, cur_position, target_position):
        cur_position_row, cur_position_col = cur_position
        target_position_row, target_position_col = target_position

        is_in_bounds = cur_position_row <= target_row and cur_position_col <= target_col
        if not is_in_bounds:
            return 0

        is_target_position = cur_position_row == target_row and cur_position_col == target_col
        if is_target_position:
            return 1

        down_position = (cur_position_row + 1, cur_position_col)
        right_position = (cur_position_row, cur_position_col + 1)

        num_ways_from_down_position_to_target = self.get_num_ways_from_position_to_target(down_position, target_position)
        num_ways_from_right_position_to_target = self.get_num_ways_from_position_to_target(right_position, target_position)

        num_ways_from_cur_position_to_target = num_ways_from_down_position_to_target + num_ways_from_right_position_to_target

        return num_ways_from_cur_position_to_target

    def uniquePaths(self, num_rows: int, num_cols: int) -> int:
        start_position = (0, 0)
        target_position = (num_rows - 1, num_cols - 1)

        return self.get_num_ways_from_position_to_target(start_position, target_position)
