NOT_POSSIBLE = -1
EMPTY = 0
FRESH_ORANGE = 1
ROTTEN_ORANGE = 2

directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
]

def is_in_bounds(matrix, row, col):
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    row_in_bounds = row >= 0 and row < num_rows
    col_in_bounds = col >= 0 and col < num_cols

    return row_in_bounds and col_in_bounds

def get_adjacent_positions(row, col):
    adjacent_positions = []

    for direction in directions:
        row_change, col_change = direction

        adjacent_position_row = row + row_change
        adjacent_position_col = col + col_change

        adjacent_positions.append((adjacent_position_row, adjacent_position_col))

    return adjacent_positions

FRESH_ORANGE = 1
ROTTEN_ORANGE = 2
NOT_POSSIBLE = -1

class Solution:
    def get_neighboring_cells(self, grid, row, col):
        adjacent_positions = get_adjacent_positions(row, col)
        neighboring_cells = []

        for adjacent_position in adjacent_positions:
            adjacent_position_row, adjacent_position_col = adjacent_position

            if not is_in_bounds(grid, adjacent_position_row, adjacent_position_col):
                continue

            neighboring_cells.append((adjacent_position_row, adjacent_position_col))

        return neighboring_cells

    def get_num_fresh_oranges(self, grid, num_rows, num_cols):
        num_fresh_oranges = 0

        for row in range(num_rows):
            for col in range(num_cols):
                if grid[row][col] != FRESH_ORANGE:
                    continue

                num_fresh_oranges += 1

        return num_fresh_oranges

    def get_rotten_orange_cells(self, grid, num_rows, num_cols):
        rotten_orange_cells = []

        for row in range(num_rows):
            for col in range(num_cols):
                if grid[row][col] != ROTTEN_ORANGE:
                    continue

                rotten_orange_cells.append((row, col, 0))

        return rotten_orange_cells

    def compute_time_to_rot_all_oranges(self, grid, total_oranges_to_rot, initially_rotten_cells, num_rows, num_cols):
        queue = deque()

        for rotten_cell in initially_rotten_cells:
            queue.append(rotten_cell)

        while queue:
            row, col, time_elapsed_since_became_rotten = queue.popleft()
            
            if grid[row][col] == FRESH_ORANGE:
                grid[row][col] = ROTTEN_ORANGE
                total_oranges_to_rot -= 1

            if total_oranges_to_rot == 0:
                return time_elapsed_since_became_rotten

            neighbor_coords = self.get_neighboring_cells(grid, row, col)
            for neighbor_coord in neighbor_coords:
                neighbor_row, neighbor_col = neighbor_coord

                if grid[neighbor_row][neighbor_col] != FRESH_ORANGE:
                    continue

                queue.append((*neighbor_coord, time_elapsed_since_became_rotten + 1))

        return NOT_POSSIBLE

    def orangesRotting(self, grid):
        num_rows = len(grid)
        num_cols = len(grid[0])

        initial_num_fresh_oranges = self.get_num_fresh_oranges(grid, num_rows, num_cols)

        if initial_num_fresh_oranges == 0:
            return 0

        rotten_orange_cells = self.get_rotten_orange_cells(grid, num_rows, num_cols)

        if len(rotten_orange_cells) == 0:
            return NOT_POSSIBLE

        return self.compute_time_to_rot_all_oranges(grid, initial_num_fresh_oranges, rotten_orange_cells, num_rows, num_cols)