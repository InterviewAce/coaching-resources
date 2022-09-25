from collections import deque

LAND = 0
WATER = 1

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
    def check_neighbor_positions(self, grid, row, col):
        neighbor_positions = []
        has_neighbor_on_border = False

        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change
            new_location = (new_row, new_col)

            if not is_in_bounds(grid, new_row, new_col):
                has_neighbor_on_border = True
                continue

            if grid[new_row][new_col] == WATER:
                continue

            neighbor_positions.append(new_location)
            
        return neighbor_positions, has_neighbor_on_border

    def check_if_is_closed(self, grid, start_row, start_col, visited):
        queue = deque()
        start_location = (start_row, start_col)

        queue.append(start_location)
        visited.add(start_location)

        is_closed = True

        while queue:
            # Remove node
            row, col = queue.popleft()

            # Process node
            # No work needs to be done at the process node step for this problem

            # Add neighbors
            neighbor_positions, has_neighbor_on_border = self.check_neighbor_positions(grid, row, col)
            is_closed = is_closed and not has_neighbor_on_border
            for neighbor_position in neighbor_positions:
                # This is an undirected graph. From [0,0] we can go to [0,1] and from
                # [0,1] we can go to [0,0].
                # Thus, this graph CAN have cycles (all undirected graphs can have cycles),
                # so we must tracked visited nodes to prevent infinite loops.
                if neighbor_position in visited:
                    continue

                visited.add(neighbor_position)
                queue.append(neighbor_position)

        return is_closed

    def closedIsland(self, grid):
        num_rows = len(grid)
        num_cols = len(grid[0])

        num_closed_islands = 0
        visited = set()

        for row in range(num_rows):
            for col in range(num_cols):
                cur_position = (row, col)

                if cur_position in visited: continue
                if grid[row][col] != LAND: continue

                is_closed = self.check_if_is_closed(grid, row, col, visited)
                print
                if is_closed:
                    num_closed_islands += 1

        return num_closed_islands
