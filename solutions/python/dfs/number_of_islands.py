LAND = '1'
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
    def mark_island_as_visited(self, grid, row, col, visited):
        # Base case
        if not is_in_bounds(grid, row, col):
            return

        if (row, col) in visited:
            return

        if grid[row][col] != LAND:
            return

        # Process node
        visited.add((row, col))

        # Recurse on potential neighbors
        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change

            self.mark_island_as_visited(grid, new_row, new_col, visited)

    def numIslands(self, grid: List[List[str]]) -> int:
        num_rows = len(grid)
        num_cols = len(grid[0])

        number_of_islands = 0
        visited = set()

        for row in range(num_rows):
            for col in range(num_cols):
                if (row, col) in visited:
                    continue

                terrain_type = grid[row][col]
                if terrain_type != LAND: continue

                number_of_islands += 1
                self.mark_island_as_visited(grid, row, col, visited)

        return number_of_islands