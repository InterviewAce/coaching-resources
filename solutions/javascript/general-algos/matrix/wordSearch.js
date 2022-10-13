const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const isValidPosition = (grid, row, col, visited, curPosition) => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const rowInBounds = row >= 0 && row < numRows;
  const colInBounds = col >= 0 && col < numCols;

  if (!rowInBounds || !colInBounds) return false;
  if (visited.has(curPosition)) return false;

  return true;
};

const searchForWordSubstring = (word, wordIdx, row, col, board, visited) => {
  const curPosition = `${row}, ${col}`;

  // Base cases
  const wordIsFinished = wordIdx >= word.length;
  if (wordIsFinished) return true;

  if (!isValidPosition(board, row, col, visited, curPosition)) return false;

  // Process node
  const curBoardChar = board[row][col];
  const curCharInWord = word[wordIdx];

  if (curBoardChar !== curCharInWord) return false;

  visited.add(curPosition);

  // Recurse on neighbors

  // Try going up, left, down, and right
  for (const direction of directions) {
    const [rowChange, colChange] = direction;

    const newRow = row + rowChange;
    const newCol = col + colChange;

    // If the next square that we're looking at contains the remaining substring of `word`, then we've found our answer. For example, suppose word is "abcdef" and we have found "a", "b", "c" (so the letter we're currently on is "c"). Then, if we go one of our 4 directions and find that the position can form "def" without revisiting any of our visited squares, then we know we can form "abcdef" (since we already found "abc").
    const remainingWordSubstringExists = searchForWordSubstring(
      word,
      wordIdx + 1,
      newRow,
      newCol,
      board,
      visited,
    );

    if (remainingWordSubstringExists) return true;
  }

  visited.delete(curPosition);

  return false;
};

const exist = (board, word) => {
  const numRows = board.length;
  const numCols = board[0].length;

  const visited = new Set();

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const foundWord = searchForWordSubstring(
        word,
        0,
        row,
        col,
        board,
        visited,
      );

      if (foundWord) return true;
    }
  }

  return false;
};
