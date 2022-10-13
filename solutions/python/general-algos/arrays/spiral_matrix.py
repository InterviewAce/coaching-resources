directions = [
    (0, 1),
    (1, 0),
    (0, -1),
    (-1, 0)
]
RIGHT = 0

def get_next_direction_idx(direction_idx):
    num_directions = len(directions)

    return (direction_idx + 1) % num_directions

def is_in_bounds(matrix, row, col):
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    is_row_in_bounds = row >= 0 and row < num_rows
    is_col_in_bounds = col >= 0 and col < num_cols

    return is_row_in_bounds and is_col_in_bounds

class Solution:
    def move_until_hit_visited_or_oob(self, matrix, start_row, start_col, cur_direction_idx, visited, elements_in_spiral_order):
        row = start_row
        col = start_col

        row_change, col_change = directions[cur_direction_idx]

        while is_in_bounds(matrix, row + row_change, col + col_change) and not (row + row_change, col + col_change) in visited:
            row += row_change
            col += col_change

            elements_in_spiral_order.append(matrix[row][col])
            visited.add((row, col))

        return row, col

    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        elements_in_spiral_order = []
        visited = set()

        cur_row = 0
        cur_col = 0

        cur_direction_idx = RIGHT

        elements_in_spiral_order.append(matrix[cur_row][cur_col])
        visited.add((cur_row, cur_col))

        num_rows = len(matrix)
        num_cols = len(matrix[0])

        num_elements_in_matrix = num_rows * num_cols

        while len(visited) < num_elements_in_matrix:
            new_row, new_col = self.move_until_hit_visited_or_oob(
                matrix,
                cur_row,
                cur_col,
                cur_direction_idx,
                visited,
                elements_in_spiral_order,
            )

            cur_direction_idx = get_next_direction_idx(cur_direction_idx)

            cur_row = new_row
            cur_col = new_col

        return elements_in_spiral_order