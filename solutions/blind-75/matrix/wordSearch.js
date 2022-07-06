const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const searchForWordSubstring = (word, wordIdx, row, col, board, visited) => {
  const curPosition = `${row}, ${col}`;

  const numRows = board.length;
  const numCols = board[0].length;

  // Base case
  const wordIsFinished = wordIdx >= word.length;
  if (wordIsFinished) return true;

  const rowInBounds = row >= 0 && row < numRows;
  const colInBounds = col >= 0 && col < numCols;

  if (!rowInBounds || !colInBounds) return false;
  if (visited.has(curPosition)) return false;

  const curBoardChar = board[row][col];
  const curCharInWord = word[wordIdx];

  if (curBoardChar !== curCharInWord) return false;

  visited.add(curPosition);

  for (const direction of directions) {
    const [rowChange, colChange] = direction;

    const newRow = row + rowChange;
    const newCol = col + colChange;

    const wordSubstringExists = searchForWordSubstring(
      word,
      wordIdx + 1,
      newRow,
      newCol,
      board,
      visited,
    );

    if (wordSubstringExists) return true;
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
