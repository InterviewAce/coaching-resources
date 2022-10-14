BATTLESHIP_CELL = 'X'
directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

def is_in_bounds(grid, row, col):
    num_rows = len(grid)
    num_cols = len(grid[0])

    row_in_bounds = row >= 0 and row < num_rows
    col_in_bounds = col >= 0 and col < num_cols

    return row_in_bounds and col_in_bounds

class Solution:
    def mark_battleship_as_visited(self, row, col, board, visited):
        # Base case
        if not is_in_bounds(board, row, col):
            return

        if (row, col) in visited:
            return

        if board[row][col] != BATTLESHIP_CELL:
            return

        # Process node
        visited.add((row, col))

        # Recurse on potential neighbors
        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change

            self.mark_battleship_as_visited(new_row, new_col, board, visited)

    def countBattleships(self, board: List[List[str]]) -> int:
        num_rows = len(board)
        num_cols = len(board[0])

        num_battleships = 0
        visited = set()

        for row in range(num_rows):
            for col in range(num_cols):
                if board[row][col] != BATTLESHIP_CELL:
                    continue

                if (row, col) in visited:
                    continue

                num_battleships += 1
                self.mark_battleship_as_visited(row, col, board, visited)

        return num_battleships
