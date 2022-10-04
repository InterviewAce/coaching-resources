"""
The colors of the rainbow are specified by the acronym "ROYGBIV" - red, orange, yellow, green, blue, indigo, violet (order matters here). You want to find the length of the shortest sequence of characters in a matrix that creates the acronym "ROYGBIV".

You'll be given a matrix that only consists of the strings "R", "O", "Y", "G", "B", "I", and "V". From each position, you can go up, down, left, or right to find another character. To find a rainbow, you must start at "R", end at "Y", and each intermediate cell should be the next character in "ROYGBIV". For example, "R" => "O" => "Y" => "G" => "B" => "I" => "V" is a valid rainbow.

Additionally, it is okay to use the have the same character more than once as long as it is done consecutively. For example, this is also a valid rainbow: "R" => "R" => "R" => "O" => "Y" => "Y" => "G" => "B" => "I" => "V".

Given this matrix of colors, you should return the length of the shortest sequence that forms a rainbow.
"""

from collections import deque

RAINBOW_STRING = 'ROYGBIV'
NO_RAINBOW_FOUND = -1

directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

class Node:
    def __init__(self, row, col, path_length_so_far, idx_in_word):
        self.row = row
        self.col = col
        self.path_length_so_far = path_length_so_far
        self.idx_in_word = idx_in_word

    def get_position_string(self):
        return f'{self.row},{self.col}'

def is_in_bounds(grid, row, col):
    num_rows = len(grid)
    num_cols = len(grid[0])

    row_in_bounds = row >= 0 and row < num_rows
    col_in_bounds = col >= 0 and col < num_cols

    return row_in_bounds and col_in_bounds
  
def get_neighbors(grid, row, col, idx_in_word, word, path_length_so_far):
    neighbors = []

    for direction in directions:
        row_change, col_change = direction

        new_row = row + row_change
        new_col = col + col_change

        if not is_in_bounds(grid, new_row, new_col):
            continue

        new_char = grid[new_row][new_col]

        cur_char_in_word = word[idx_in_word]
        next_char_in_word = word[idx_in_word + 1]

        if new_char != cur_char_in_word and new_char != next_char_in_word:
            continue

        new_char_idx_in_word = idx_in_word
        if new_char == next_char_in_word:
            new_char_idx_in_word += 1

        neighbor_node = Node(new_row, new_col, path_length_so_far + 1, new_char_idx_in_word)
        neighbors.append(neighbor_node)

    return neighbors

def find_shortest_sequence_to_form_word(word, start_row, start_col, grid):
    queue = deque()
    visited = set()

    start_node = Node(start_row, start_col, 1, 0)
    queue.append(start_node)
    visited.add(start_node.get_position_string())

    while queue:
        node = queue.popleft()
        row, col, path_length_so_far, idx_in_word = node.row, node.col, node.path_length_so_far, node.idx_in_word

        char = grid[row][col]
        word_last_idx = len(word) - 1

        if char == word[word_last_idx]:
            return path_length_so_far

        neighbors = get_neighbors(grid, row, col, idx_in_word, word, path_length_so_far)
        for neighbor in neighbors:
            neighbor_position_string = neighbor.get_position_string()

            if neighbor_position_string in visited:
                continue

            visited.add(neighbor_position_string)
            queue.append(neighbor)
            
    return NO_RAINBOW_FOUND

def find_shortest_rainbow_length(colors):
    num_rows = len(colors)
    num_cols = len(colors[0])

    shortest_rainbow_length = float('inf')

    for row in range(num_rows):
        for col in range(num_cols):
            color = colors[row][col]

            if color != RAINBOW_STRING[0]:
                continue
            
            shortest_rainbow_length_starting_at_cur = find_shortest_sequence_to_form_word(RAINBOW_STRING, row, col, colors)

            if shortest_rainbow_length_starting_at_cur == NO_RAINBOW_FOUND:
                continue

            shortest_rainbow_length = min(shortest_rainbow_length, shortest_rainbow_length_starting_at_cur)

    return shortest_rainbow_length if shortest_rainbow_length != float('inf') else NO_RAINBOW_FOUND

colors = [
    ['R', 'O', 'V', 'V', 'I'],
    ['B', 'I', 'B', 'G', 'Y'],
    ['Y', 'V', 'R', 'O', 'Y'],
    ['B', 'G', 'R', 'Y', 'R'],
]

print(f"Your answer: {find_shortest_rainbow_length(colors)}")
print(f"Correct answer: {8}")
print()