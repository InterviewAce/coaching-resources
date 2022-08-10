const LAND = 'L';
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

const getIslandArea = (row, col, grid, visited) => {
    // Base case
    if (!isInBounds(grid, row, col)) return 0;
    if (grid[row][col] !== LAND) return 0;

    const curPositionString = getPositionString(row, col);
    if (visited.has(curPositionString)) return 0;

    // Process node
    visited.add(curPositionString);
    let islandArea = 1; // The 1 represents our current cell

    // Recurse on neighbors
    // Try going up, left, down, and right
    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        islandArea += getIslandArea(newRow, newCol, grid, visited);
    }

    return islandArea;
};

const minimumIsland = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const visited = new Set();

    let minimumIslandArea = Infinity;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const terrainType = grid[row][col];
            const curPositionString = getPositionString(row, col);

            if (terrainType !== LAND) continue;
            if (visited.has(curPositionString)) continue;

            const islandArea = getIslandArea(row, col, grid, visited);

            minimumIslandArea = Math.min(minimumIslandArea, islandArea);
        }
    }

    return minimumIslandArea;
};

module.exports = {
    minimumIsland,
};
