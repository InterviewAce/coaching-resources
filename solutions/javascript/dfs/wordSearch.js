const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const getPositionString = (row, col) => `${row}, ${col}`;

const isInBounds = (board, row, col) => {
    const numRows = board.length;
    const numCols = board[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const checkIfWordExists = (board, row, col, visited, word, wordIdx) => {
    // Base cases
    const curPositionString = getPositionString(row, col);

    if (wordIdx >= word.length) return true;

    if (!isInBounds(board, row, col)) return false;
    if (visited.has(curPositionString)) return false;

    // Process node
    const boardChar = board[row][col];
    const wordChar = word[wordIdx];

    visited.add(curPositionString);

    if (boardChar !== wordChar) {
        visited.delete(curPositionString);
        return false;
    }

    // Recurse on neighbors
    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        const remainingWordExists = checkIfWordExists(
            board,
            newRow,
            newCol,
            visited,
            word,
            wordIdx + 1,
        );
        if (remainingWordExists) {
            visited.delete(curPositionString);
            return true;
        }
    }

    visited.delete(curPositionString);
    return false;
};

const exist = (board, word) => {
    const numRows = board.length;
    const numCols = board[0].length;

    // const wordFirstChar = word[0];
    const visited = new Set();

    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; col += 1) {
            const wordExistsHere = checkIfWordExists(board, row, col, visited, word, 0);
            if (wordExistsHere) return true;
        }
    }

    return false;
};
