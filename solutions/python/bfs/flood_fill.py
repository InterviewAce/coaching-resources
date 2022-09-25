from collections import deque

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
    def get_neighbors(self, image, row, col, color_to_replace):
        neighbors = []

        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change

            if not is_in_bounds(image, new_row, new_col): continue
            if image[new_row][new_col] != color_to_replace: continue

            neighbor_location = (new_row, new_col)
            neighbors.append(neighbor_location)

        return neighbors

    def replace_color_of_connected_component(self, image, start_row, start_col, color_to_replace, new_color, visited):
        queue = deque()
        start_location = (start_row, start_col)

        queue.append(start_location)
        visited.add(start_location)

        while queue:
            # Remove node
            row, col = queue.popleft()

            # Process node
            image[row][col] = new_color

            # Add neighbors
            neighbor_positions = self.get_neighbors(image, row, col, color_to_replace)
            for neighbor_position in neighbor_positions:
                if neighbor_position in visited:
                    continue

                visited.add(neighbor_position)
                queue.append(neighbor_position)
    
    def floodFill(self, image, start_row, start_col, new_color):
        color_to_replace = image[start_row][start_col]
        visited = set()

        self.replace_color_of_connected_component(image, start_row, start_col, color_to_replace, new_color, visited)

        return image