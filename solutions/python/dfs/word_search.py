directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

def is_in_bounds(board, row, col):
    num_rows = len(board)
    num_cols = len(board[0])

    row_in_bounds = row >= 0 and row < num_rows
    col_in_bounds = col >= 0 and col < num_cols

    return row_in_bounds and col_in_bounds

class Solution:
    def check_if_word_exists(self, board, row, col, visited, word, word_idx):
        # Base cases
        if word_idx >= len(word):
            return True

        if not is_in_bounds(board, row, col):
            return False

        if (row, col) in visited:
            return False

        # Process node
        board_char = board[row][col]
        word_char = word[word_idx]

        visited.add((row, col))

        if board_char != word_char:
            visited.remove((row, col))
            return False

        # Recurse on neighbors
        for direction in directions:
            row_change, col_change = direction

            new_row = row + row_change
            new_col = col + col_change

            remaining_word_exists = self.check_if_word_exists(
                board,
                new_row,
                new_col,
                visited,
                word,
                word_idx + 1,
            )

            if remaining_word_exists:
                visited.remove((row, col))
                return True
            
        visited.remove((row, col))
        return False

    def exist(self, board: List[List[str]], word: str) -> bool:
        num_rows = len(board)
        num_cols = len(board[0])

        visited = set()

        for row in range(num_rows):
            for col in range(num_cols):
                word_exists_here = self.check_if_word_exists(board, row, col, visited, word, 0)
                if word_exists_here:
                    return True

        return False