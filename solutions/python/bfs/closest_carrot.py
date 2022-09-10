from collections import deque

NO_PATH = -1
WALL = 'X'
CARROT = 'C'

directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

def closest_carrot(grid, starting_row, starting_col):
  starting_position = (starting_row, starting_col)
  start_distance = 0
  
  queue = deque([(*starting_position, start_distance)])
  visited = set([starting_position])
  
  while queue:
    row, col, distance = queue.popleft()
    
    if grid[row][col] == CARROT:
      return distance
    
    for neighbor in get_neighbors(grid, row, col):
      if neighbor in visited:
        continue
      visited.add(neighbor)
      
      queue.append((*neighbor, distance + 1))
      
  return NO_PATH

def get_neighbors(grid, row, col):
  neighbors = []
  
  for row_difference, col_difference in directions:
    new_row = row + row_difference
    new_col = col + col_difference
    
    if not is_in_bounds(grid, new_row, new_col):
      continue
    if grid[new_row][new_col] == WALL:
      continue
      
    neighbors.append((new_row, new_col))
    
  return neighbors

def is_in_bounds(grid, row, col):
  num_rows = len(grid)
  num_cols = len(grid[0])
  
  row_in_bounds = row >= 0 and row < num_rows
  col_in_bounds = col >= 0 and col < num_cols
  
  return row_in_bounds and col_in_bounds