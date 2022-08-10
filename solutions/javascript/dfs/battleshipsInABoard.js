const BATTLESHIP_CELL = 'X';
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const getPositionString = (row, col) => `${row}, ${col}`;

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const markBattleshipAsVisited = (row, col, board, visited) => {
    // Base case
    if (!isInBounds(board, row, col)) return;

    const curPositionString = getPositionString(row, col);
    if (visited.has(curPositionString)) return;

    if (board[row][col] !== BATTLESHIP_CELL) return;

    // Process node
    visited.add(curPositionString);

    // Recurse on potential neighbors
    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        markBattleshipAsVisited(newRow, newCol, board, visited);
    }
};

const countBattleships = (board) => {
    const numRows = board.length;
    const numCols = board[0].length;

    let numBattleships = 0;
    const visited = new Set();

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (board[row][col] !== BATTLESHIP_CELL) continue;

            const curPositionString = getPositionString(row, col);
            if (visited.has(curPositionString)) continue;

            numBattleships += 1;
            markBattleshipAsVisited(row, col, board, visited);
        }
    }

    return numBattleships;
};
