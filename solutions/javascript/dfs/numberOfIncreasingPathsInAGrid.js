const FORMATTING_FACTOR = Math.pow(10, 9) + 7;
const INITIAL_PARENT = -Infinity;

const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getCoordinateStr = (row, col) => `${row}-${col}`;

const getAllIncreasingPaths = (
    grid,
    row,
    col,
    cellToIncreasingPathsCache,
    parentValue,
) => {
    if (!isInBounds(grid, row, col)) return 0;

    const currValue = grid[row][col];

    const isPathIncreasing = currValue > parentValue;
    if (!isPathIncreasing) return 0;

    const currCoords = getCoordinateStr(row, col);

    if (cellToIncreasingPathsCache.has(currCoords)) {
        const numIncreasingPathsFromCurrCell =
            cellToIncreasingPathsCache.get(currCoords);
        return numIncreasingPathsFromCurrCell;
    }

    let allIncreasingPathsFromCurrCell = 1;

    for (const direction of directions) {
        const [rowOffset, colOffset] = direction;
        const adjRow = row + rowOffset;
        const adjCol = col + colOffset;

        const allIncreasingPathsFromAdjCell = getAllIncreasingPaths(
            grid,
            adjRow,
            adjCol,
            cellToIncreasingPathsCache,
            currValue,
        );

        allIncreasingPathsFromCurrCell += allIncreasingPathsFromAdjCell;
    }

    cellToIncreasingPathsCache.set(
        currCoords,
        allIncreasingPathsFromCurrCell % FORMATTING_FACTOR,
    );

    const numIncreasingPathsFromCurrCell =
        cellToIncreasingPathsCache.get(currCoords);

    return numIncreasingPathsFromCurrCell;
};

const countPaths = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const cellToIncreasingPathsCache = new Map();

    let totalNumIncreasingPaths = 0;
    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; col += 1) {
            const numIncreasingPathsFromCurrCell = getAllIncreasingPaths(
                grid,
                row,
                col,
                cellToIncreasingPathsCache,
                INITIAL_PARENT,
            );
            totalNumIncreasingPaths += numIncreasingPathsFromCurrCell;
        }
    }

    return totalNumIncreasingPaths % FORMATTING_FACTOR;
};
