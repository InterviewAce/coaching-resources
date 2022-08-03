const LAND = 'L';
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const getPositionString = (row, col) => `${row},${col}`;

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getValidAdjacentPositions = (grid, row, col) => {
    const adjacentPositions = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isInBounds(grid, newRow, newCol)) continue;

        adjacentPositions.push([newRow, newCol]);
    }

    return adjacentPositions;
};

const getFirstIslandPoints = (grid, startRow, startCol) => {
    const queue = [];
    const visited = new Set();

    queue.push({
        row: startRow,
        col: startCol,
    });
    visited.add(getPositionString(startRow, startCol));

    const firstIslandPoints = new Set();

    while (queue.length > 0) {
        // Remove node
        const { row, col } = queue.shift();

        // Process node
        firstIslandPoints.add(getPositionString(row, col));

        // Add neighbors
        const adjacentPositions = getValidAdjacentPositions(grid, row, col);
        for (const adjacentPosition of adjacentPositions) {
            const [adjacentPositionRow, adjacentPositionCol] = adjacentPosition;
            const adjacentPositionString = getPositionString(
                adjacentPositionRow,
                adjacentPositionCol,
            );

            if (grid[adjacentPositionRow][adjacentPositionCol] !== LAND)
                continue;

            if (visited.has(adjacentPositionString)) continue;
            visited.add(adjacentPositionString);

            queue.push({
                row: adjacentPositionRow,
                col: adjacentPositionCol,
            });
        }
    }

    return firstIslandPoints;
};

const findFirstIsland = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    let firstIslandPoints = null;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const terrainType = grid[row][col];

            if (terrainType !== LAND) continue;

            firstIslandPoints = getFirstIslandPoints(grid, row, col);
            return firstIslandPoints;
        }
    }
};

const getDistanceBetweenIslands = (grid, firstIslandPoints) => {
    const queue = [];
    const visited = new Set();

    for (const firstIslandPoint of firstIslandPoints) {
        const [row, col] = firstIslandPoint.split(',').map(Number);

        queue.push({
            row,
            col,
            distanceSoFar: 0,
        });
    }

    while (queue.length > 0) {
        // Remove node
        const { row, col, distanceSoFar } = queue.shift();

        // Process node
        const positionString = getPositionString(row, col);
        const isInFirstIsland = firstIslandPoints.has(positionString);

        const terrainType = grid[row][col];

        if (terrainType === LAND && !isInFirstIsland) {
            const numWaterCells = distanceSoFar - 1;
            return numWaterCells;
        }

        // Add neighbors
        const adjacentPositions = getValidAdjacentPositions(grid, row, col);
        for (const adjacentPosition of adjacentPositions) {
            const [adjacentPositionRow, adjacentPositionCol] = adjacentPosition;
            const adjacentPositionString = getPositionString(
                adjacentPositionRow,
                adjacentPositionCol,
            );

            if (visited.has(adjacentPositionString)) continue;
            visited.add(adjacentPositionString);

            queue.push({
                row: adjacentPositionRow,
                col: adjacentPositionCol,
                distanceSoFar: distanceSoFar + 1,
            });
        }
    }

    // We should never reach here
};

const bestBridge = (grid) => {
    const firstIslandPoints = findFirstIsland(grid);

    return getDistanceBetweenIslands(grid, firstIslandPoints);
};

module.exports = {
    bestBridge,
};
