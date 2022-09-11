"""
Single-sourced BFS solution, passes 49/50 test cases on LeetCode. A passing solution can be found later in this file.
"""
from collections import deque

directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

def create_2d_list_of_size(num_rows, num_cols, fill_value = None):
    return [[fill_value for _col in range(num_cols)] for _row in range(num_rows)]
    
def is_in_bounds(matrix, row, col):
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    row_in_bounds = row >= 0 and row < num_rows
    col_in_bounds = col >= 0 and col < num_cols

    return row_in_bounds and col_in_bounds

class Solution:
    def get_adjacent_positions(self, row, col):
        adjacent_positions = []

        for direction in directions:
            row_change, col_change = direction

            adjacent_position_row = row + row_change
            adjacent_position_col = col + col_change

            adjacent_positions.append((adjacent_position_row, adjacent_position_col))

        return adjacent_positions

    def get_neighbor_positions(self, matrix, row, col):
        adjacent_positions = self.get_adjacent_positions(row, col)
        neighbors = []

        for adjacent_position in adjacent_positions:
            adjacent_position_row, adjacent_position_col = adjacent_position

            if not is_in_bounds(matrix, adjacent_position_row, adjacent_position_col):
                continue

            neighbors.append(adjacent_position)

        return neighbors

    def get_distance_to_nearest_zero(self, matrix, startRow, startCol):
        queue = deque()
        visited = set()

        start_position = (startRow, startCol, 0)
        
        queue.append(start_position)
        visited.add(start_position)

        while queue:
            # Remove node
            row, col, distance_from_start = queue.popleft()

            # Process node
            cur_value = matrix[row][col]
            if cur_value == 0:
                return distance_from_start

            # Add neighbors
            neighbor_position = self.get_neighbor_positions(matrix, row, col)
            for neighbor_position in neighbor_position:
                if neighbor_position in visited:
                    continue

                visited.add(neighbor_position)
                queue.append((*neighbor_position, distance_from_start + 1))


    def updateMatrix(self, matrix: List[List[int]]) -> List[List[int]]:
        num_rows = len(matrix)
        num_cols = len(matrix[0])

        distance_to_nearest_zero_grid = create_2d_list_of_size(num_rows, num_cols)

        for row in range(num_rows):
            for col in range(num_cols):
                cur_value = matrix[row][col]

                distance_to_nearest_zero = 0

                if cur_value == 1:
                    distance_to_nearest_zero = self.get_distance_to_nearest_zero(
                        matrix, row, col)

                distance_to_nearest_zero_grid[row][col] = distance_to_nearest_zero

        return distance_to_nearest_zero_grid

"""
Multi-sourced BFS solution, passes on LeetCode.
"""
from collections import deque

directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

def create_2d_list_of_size(num_rows, num_cols, fill_value = None):
    return [[fill_value for _col in range(num_cols)] for _row in range(num_rows)]

def is_in_bounds(matrix, row, col):
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    row_in_bounds = row >= 0 and row < num_rows
    col_in_bounds = col >= 0 and col < num_cols

    return row_in_bounds and col_in_bounds

class Solution:
    def get_cells_with_zero(self, matrix, num_rows, num_cols):
        cells_with_zero = []

        for row in range(num_rows):
            for col in range(num_cols):
                cell = matrix[row][col]

                if cell == 0:
                    cells_with_zero.append([row, col])

        return cells_with_zero

    def get_neighbors(self, matrix, row, col):
        neighbors = []

        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change

            if not is_in_bounds(matrix, new_row, new_col): continue

            neighbors.append((new_row, new_col))

        return neighbors


    def updateMatrix(self, matrix: List[List[int]]) -> List[List[int]]:
        num_rows = len(matrix)
        num_cols = len(matrix[0])

        distance_to_nearest_zero = create_2d_list_of_size(num_rows, num_cols, float("inf"))

        cells_with_zero = self.get_cells_with_zero(matrix, num_rows, num_cols)

        queue = deque()
        visited = set()

        for cell in cells_with_zero:
            row, col = cell

            cell_tuple = (row, col, 0)
            queue.append(cell_tuple)

            visited.add(cell_tuple)

        while queue:
            # Remove node
            row, col, distance_so_far = queue.popleft()

            # Process node
            if matrix[row][col] == 0:
                distance_to_nearest_zero[row][col] = 0
            elif matrix[row][col] == 1:
                distance_to_nearest_zero[row][col] = distance_so_far

            # Add neighbors
            neighbors = self.get_neighbors(matrix, row, col)
            for neighbor in neighbors:
                if neighbor in visited:
                    continue
                visited.add(neighbor)

                queue.append((*neighbor, distance_so_far + 1))

        return distance_to_nearest_zero
