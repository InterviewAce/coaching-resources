const LAND = "L";
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const isValidPosition = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getIslandArea = (row, col, grid, visited) => {
    // Base case
    if (!isValidPosition(grid, row, col)) return 0;
    if (grid[row][col] !== LAND) return 0;

    // Process node
    const position = `${row}, ${col}`;
    if (visited.has(position)) return 0;
    visited.add(position);

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
            if (terrainType !== LAND) continue;
          
            const islandArea = getIslandArea(
                row,
                col,
                grid,
                visited,
            );
          
            if (islandArea === 0) continue;

            minimumIslandArea = Math.min(minimumIslandArea, islandArea);
        }
    }

    return minimumIslandArea;
};
