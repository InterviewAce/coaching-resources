const NOT_POSSIBLE = -1;
const EMPTY = 0;
const FRESH_ORANGE = 1;
const ROTTEN_ORANGE = 2;
const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

class Cell {
    constructor(row, col, timeElapsedSinceBecameRotten) {
        this.row = row;
        this.col = col;
        this.timeElapsedSinceBecameRotten = timeElapsedSinceBecameRotten;
    }
}

const getAdjacentPositions = (row, col) => {
    const adjacentPositions = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const adjacentPositionRow = row + rowChange;
        const adjacentPositionCol = col + colChange;

        adjacentPositions.push([adjacentPositionRow, adjacentPositionCol]);
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

const getNeighboringCells = (grid, row, col) => {
    const adjacentPositions = getAdjacentPositions(row, col);
    const neighboringCells = [];

    for (const adjacentPosition of adjacentPositions) {
        const [adjacentPositionRow, adjacentPositionCol] = adjacentPosition;

        if (!isInBounds(grid, adjacentPositionRow, adjacentPositionCol))
            continue;

        neighboringCells.push([adjacentPositionRow, adjacentPositionCol]);
    }

    return neighboringCells;
};

const getNumFreshOranges = (grid, numRows, numCols) => {
    let numFreshOranges = 0;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] !== FRESH_ORANGE) continue;
            numFreshOranges += 1;
        }
    }

    return numFreshOranges;
};

const getRottenOrangeCells = (grid, numRows, numCols) => {
    const rottenOrangeCells = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] !== ROTTEN_ORANGE) continue;

            const rottenOrangeCell = new Cell(row, col, 0);
            rottenOrangeCells.push(rottenOrangeCell);
        }
    }

    return rottenOrangeCells;
};

const computeTimeToRotAllOranges = (
    grid,
    totalOrangesToRot,
    initiallyRottenCells,
    numRows,
    numCols,
) => {
    const queue = new Queue();

    for (const rottenCell of initiallyRottenCells) {
        queue.enqueue(rottenCell);
    }

    while (queue.size() > 0) {
        const { row, col, timeElapsedSinceBecameRotten } = queue.dequeue();

        if (grid[row][col] === FRESH_ORANGE) {
            grid[row][col] = ROTTEN_ORANGE;
            totalOrangesToRot -= 1;
        }

        if (totalOrangesToRot === 0) return timeElapsedSinceBecameRotten;

        const neighborCoords = getNeighboringCells(grid, row, col);
        for (const neighborCoord of neighborCoords) {
            const [neighborRow, neighborCol] = neighborCoord;

            if (grid[neighborRow][neighborCol] !== FRESH_ORANGE) continue;

            const neighborCell = new Cell(
                neighborRow,
                neighborCol,
                timeElapsedSinceBecameRotten + 1,
            );
            queue.enqueue(neighborCell);
        }
    }

    return NOT_POSSIBLE;
};

const orangesRotting = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const initialNumFreshOranges = getNumFreshOranges(grid, numRows, numCols);

    if (initialNumFreshOranges === 0) return 0;

    const rottenOrangeCells = getRottenOrangeCells(grid, numRows, numCols);

    if (rottenOrangeCells.length === 0) return NOT_POSSIBLE;

    return computeTimeToRotAllOranges(
        grid,
        initialNumFreshOranges,
        rottenOrangeCells,
        numRows,
        numCols,
    );
};
