const LAND = '1';

const getPositionString = (row, col) => `${row}, ${col}`;
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const markIslandAsVisited = (grid, row, col, visited) => {
    // Base case
    if (!isInBounds(grid, row, col)) return;

    const curPositionString = getPositionString(row, col);
    if (visited.has(curPositionString)) return;

    if (grid[row][col] !== LAND) return;

    // Process node
    visited.add(curPositionString);

    // Recurse on potential neighbors
    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        markIslandAsVisited(grid, newRow, newCol, visited);
    }
};

const numIslands = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    let numberOfIslands = 0;
    const visited = new Set();

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const curPositionString = getPositionString(row, col);

            if (visited.has(curPositionString)) continue;

            const terrainType = grid[row][col];
            if (terrainType !== LAND) continue;

            numberOfIslands++;
            markIslandAsVisited(grid, row, col, visited);
        }
    }

    return numberOfIslands;
};
