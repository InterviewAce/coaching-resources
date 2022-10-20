const WALL = -1;
const GATE = 0;
const EMPTY_ROOM = 2147483647;

const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

const copyMatrix = (matrix) => {
    const matrixCopy = JSON.parse(JSON.stringify(matrix));
    return matrixCopy;
};

const getLocationString = (location) => {
    const { row, col } = location;

    return `${row}, ${col}`;
};

const getTargetCellLocations = (matrix, targetValue) => {
    const targetCellLocations = [];

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; col += 1) {
            if (matrix[row][col] === targetValue) {
                targetCellLocations.push({
                    row,
                    col,
                });
            }
        }
    }

    return targetCellLocations;
};

const isInBounds = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const isRowInBounds = row >= 0 && row < numRows;
    const isColInBounds = col >= 0 && col < numCols;

    return isRowInBounds && isColInBounds;
};

const getNeighborLocations = (rooms, row, col) => {
    const neighborLocations = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (isInBounds(rooms, newRow, newCol) && rooms[newRow][newCol] === EMPTY_ROOM) {
            neighborLocations.push({
                row: newRow,
                col: newCol,
            });
        }
    }

    return neighborLocations;
};

const wallsAndGates = (rooms) => {
    const gateLocations = getTargetCellLocations(rooms, GATE);

    const queue = new Queue();
    const visited = new Set();

    for (const gateLocation of gateLocations) {
        queue.enqueue({
            ...gateLocation,
            distanceTraveled: 0,
        });

        visited.add(getLocationString(gateLocation));
    }

    while (queue.size() > 0) {
        // Remove node
        const { row, col, distanceTraveled } = queue.dequeue();

        // Process node
        rooms[row][col] = distanceTraveled;

        // Add neighbors
        const neighborsOfPosition = getNeighborLocations(rooms, row, col);

        for (const neighborPosition of neighborsOfPosition) {
            const neighborPositionString = getLocationString(neighborPosition);

            if (visited.has(neighborPositionString)) continue;

            visited.add(neighborPositionString);
            queue.enqueue({
                ...neighborPosition,
                distanceTraveled: distanceTraveled + 1,
            });
        }
    }
};
