/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solve = (board) => {
  const numRows = board.length;
  const numCols = board[0].length;

  // We should convert every O to an X EXCEPT for O's that meet one of
  // the following conditions:
  // 1) the O is on the border
  // 2) the O is touching an O that is on the border
  // Thus, if we find an O that is on the border, we mark it, and
  // everything touching it, as "escaped". This tells us that, when
  // we "capture" O's, we should NOT capture these.
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (isOnBorder(row, col, board)) {
        markEscaped(row, col, board);
      }
    }
  }

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (board[row][col] == 'O') {
        board[row][col] = 'X';
      }
      if (board[row][col] == 'E') {
        board[row][col] = 'O';
      }
    }
  }
};

const isOnBorder = (row, col, board) => {
  const numRows = board.length;
  const numCols = board[0].length;

  if (row == 0 || row == numRows - 1) {
    return true;
  }
  if (col == 0 || col == numCols - 1) {
    return true;
  }

  return false;
};

const markEscaped = (row, col, board) => {
  const queue = new Queue();
  queue.enqueue([row, col]);

  while (queue.size() > 0) {
    const [row, col] = queue.dequeue();

    if (!isValidPosition(row, col, board)) continue;
    if (board[row][col] != 'O') continue;

    board[row][col] = 'E';

    queue.enqueue([row - 1, col]);
    queue.enqueue([row + 1, col]);
    queue.enqueue([row, col + 1]);
    queue.enqueue([row, col - 1]);
  }
};

const isValidPosition = (row, col, board) => {
  const numRows = board.length;
  const numCols = board[0].length;

  if (row < 0 || row >= numRows) {
    return false;
  }
  if (col < 0 || col >= numCols) {
    return false;
  }

  return true;
};
