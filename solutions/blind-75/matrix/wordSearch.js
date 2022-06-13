const isInBounds = (board, row, col) => {
    const numRows = board.length;
    const numCols = board[0].length;
    
    if (row < 0 || row >= numRows) return false;
    if (col < 0 || col >= numCols) return false;
    
    return true;
};

const existAtPosition = (board, word, wordIdx, row, col, visited) => {
    if (wordIdx === word.length) return true;
    if (!isInBounds(board, row, col)) return false;

    const boardChar = board[row][col];
    const desiredChar = word[wordIdx];
    const matchesDesiredChar = boardChar === desiredChar;
    if (!matchesDesiredChar) return false;

    const position = row + ' ' + col;
    if (visited.has(position)) return false;

    visited.add(position);

    const neighbors = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];
    
    for (const [newRow, newCol] of neighbors) {
        const restOfWordExists = existAtPosition(board, word, wordIdx + 1, newRow, newCol, visited);
        if (restOfWordExists) return true; 
    }

    visited.delete(position);

    return false;
};

const exist = (board, word) => {
    const numRows = board.length;
    if (!numRows) return false;
    const numCols = board[0].length;
    
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const wordExistsAtPosition = existAtPosition(board, word, 0, row, col, new Set());
            if (wordExistsAtPosition) return true;
        }
    }

    return false;
};