const TOP_LEFT_CELL_ROW = 0;
const TOP_LEFT_CELL_COL = 0;
const NO_CLEAR_PATH = -1;
const CLEAR = 0;

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

const getPositionString = (row, col) => `${row}, ${col}`;

const getAdjacentPositions = (row, col) => {
    const adjacentPositions = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        adjacentPositions.push([newRow, newCol]);
    }

    return adjacentPositions;
};

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getNeighbors = (grid, row, col) => {
    const adjacentPositions = getAdjacentPositions(row, col); // [[0,0], [0,1], [-1,0], ...]
    const neighbors = [];

    for (const adjacentPosition of adjacentPositions) {
        const [adjacentPositionRow, adjacentPositionCol] = adjacentPosition;

        if (!isInBounds(grid, adjacentPositionRow, adjacentPositionCol))
            continue;
        if (grid[adjacentPositionRow][adjacentPositionCol] !== CLEAR) continue;

        // We know the adjacent position is in bounds AND is a 0. Therefore, it is
        // a neighbor.
        neighbors.push([adjacentPositionRow, adjacentPositionCol]);
    }

    return neighbors;
};

const shortestPathBinaryMatrix = (grid) => {
    if (grid[TOP_LEFT_CELL_ROW][TOP_LEFT_CELL_COL] !== CLEAR)
        return NO_CLEAR_PATH;

    const numRows = grid.length;
    const numCols = grid[0].length;

    const queue = new Queue();
    const visited = new Set();

    queue.enqueue({
        row: TOP_LEFT_CELL_ROW,
        col: TOP_LEFT_CELL_COL,
        pathLengthSoFar: 1,
    });

    const startPositionString = getPositionString(
        TOP_LEFT_CELL_ROW,
        TOP_LEFT_CELL_COL,
    );
    visited.add(startPositionString);

    while (!queue.isEmpty()) {
        // Remove node
        const { row, col, pathLengthSoFar } = queue.dequeue();

        // Process node
        // We know that the current cell is in bounds and is a 0
        const isBottomRightCell = row === numRows - 1 && col === numCols - 1;
        if (isBottomRightCell) return pathLengthSoFar;

        // Add neighbors
        const neighbors = getNeighbors(grid, row, col); // [[0,0], [0,1], [1,0], ...]
        for (const neighbor of neighbors) {
            const [neighborRow, neighborCol] = neighbor;
            const neighborPositionString = getPositionString(
                neighborRow,
                neighborCol,
            );

            if (visited.has(neighborPositionString)) continue;
            visited.add(neighborPositionString);

            queue.enqueue({
                row: neighborRow,
                col: neighborCol,
                pathLengthSoFar: pathLengthSoFar + 1,
            });
        }
    }

    return NO_CLEAR_PATH;
};
