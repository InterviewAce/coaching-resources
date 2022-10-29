class Solution:
    def compute_min_path_sum_to(self, row, col, grid):
        if row < 0 or col < 0:
            return float('inf')

        if row == 0 and col == 0:
            return grid[row][col]

        min_path_sum_to_up_cell = self.compute_min_path_sum_to(row - 1, col, grid)
        min_path_sum_to_left_cell = self.compute_min_path_sum_to(row, col - 1, grid)

        cur_position_num = grid[row][col]

        min_path_sum_to_cur_position = min(min_path_sum_to_up_cell, min_path_sum_to_left_cell) + cur_position_num

        return min_path_sum_to_cur_position

    def minPathSum(self, grid):
        last_row = len(grid) - 1
        last_col = len(grid[0]) - 1

        return self.compute_min_path_sum_to(last_row, last_col, grid)