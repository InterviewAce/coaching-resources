from collections import deque

CLEAR = 0
NO_CLEAR_PATH = -1
TOP_LEFT_ROW = 0
TOP_LEFT_COL = 0

directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

class Solution:
    def shortestPathBinaryMatrix(self, grid):
        num_rows = len(grid)
        num_cols = len(grid[0])
        
        if grid[TOP_LEFT_ROW][TOP_LEFT_COL] != CLEAR:
            return NO_CLEAR_PATH

        start_cell = (TOP_LEFT_ROW, TOP_LEFT_COL)
        path_length = 1
        
        queue = deque([(*start_cell, path_length)])
        visited = set([start_cell])
        
        while queue:
            row, col, path_length = queue.popleft()
            
            is_bottom_right_cell = (row, col) == (num_rows - 1, num_cols - 1)
            if is_bottom_right_cell:
                return path_length
            
            for neighbor in self.get_neighbors(grid, row, col):
                if neighbor in visited:
                    continue
                visited.add(neighbor)
                
                queue.append((*neighbor, path_length + 1))
        
        return NO_CLEAR_PATH
    
    def get_neighbors(self, grid, row, col):
        neighbors = []
        
        for row_difference, col_difference in directions:
            new_row = row + row_difference
            new_col = col + col_difference
            
            if not self.is_in_bounds(grid, new_row, new_col):
                continue
            if grid[new_row][new_col] != CLEAR:
                continue
            
            neighbors.append((new_row, new_col))
        
        return neighbors
            
    def is_in_bounds(self, grid, row, col):
        num_rows = len(grid)
        num_cols = len(grid[0])
        
        row_in_bounds = row >= 0 and row < num_rows
        col_in_bounds = col >= 0 and col < num_cols
        
        return row_in_bounds and col_in_bounds