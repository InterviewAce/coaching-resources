from collections import deque

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

    if row < 0 or row >= num_rows: return False
    if col < 0 or col >= num_cols: return False

    return True

class Solution:
    def get_neighbor_positions(self, grid, row, col):
        neighbors = []

        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change

            if not is_in_bounds(grid, new_row, new_col):
                continue
            if grid[new_row][new_col] != LAND:
                continue

            new_location = (new_row, new_col)
            neighbors.append(new_location)
        
        return neighbors

    def mark_whole_island_as_visited(self, grid, start_row, start_col, visited):
        queue = deque()
        start_location = (start_row, start_col)

        queue.append(start_location)
        visited.add(start_location)

        while queue:
            # Remove node
            row, col = queue.popleft()

            # Process node
            # No work required here

            # Add neighbors
            neighbor_positions = self.get_neighbor_positions(grid, row, col)
            for neighbor_position in neighbor_positions:
                # This is an undirected graph. From [0,0] we can go to [0,1] and from
                # [0,1] we can go to [0,0].
                # Thus, this graph CAN have cycles (all undirected graphs can have cycles),
                # so we must tracked visited nodes to prevent infinite loops.
                if neighbor_position in visited:
                    continue

                visited.add(neighbor_position)
                queue.append(neighbor_position)

    def numIslands(self, grid):
        num_rows = len(grid)

        if num_rows == 0:
            return 0

        num_cols = len(grid[0])

        number_of_islands = 0
        visited = set()

        for row in range(num_rows):
            for col in range(num_cols):
                terrain_type = grid[row][col]
                cur_position = (row, col)

                if terrain_type != LAND or cur_position in visited:
                    continue

                number_of_islands += 1
                self.mark_whole_island_as_visited(grid, row, col, visited)

        return number_of_islands