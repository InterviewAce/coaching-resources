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

const getNeighbors = (image, row, col, colorToReplace) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isInBounds(image, newRow, newCol)) continue;
        if (image[newRow][newCol] !== colorToReplace) continue;

        neighbors.push({
            row: newRow,
            col: newCol,
        });
    }

    return neighbors;
};

const replaceColorOfConnectedComponent = (
    image,
    startRow,
    startCol,
    colorToReplace,
    newColor,
    visited,
) => {
    const queue = new Queue();
    queue.enqueue({
        row: startRow,
        col: startCol,
    });

    visited.add(getPositionString(startRow, startCol));

    while (queue.size() > 0) {
        // Remove node
        const { row, col } = queue.dequeue();

        // Process node
        image[row][col] = newColor;

        // Add neighbors
        const neighborPositions = getNeighbors(image, row, col, colorToReplace);
        for (const neighborPosition of neighborPositions) {
            const { row: neighborRow, col: neighborCol } = neighborPosition;
            const neighborPositionString = getPositionString(neighborRow, neighborCol);

            if (visited.has(neighborPositionString)) continue;
            visited.add(neighborPositionString);

            queue.enqueue({
                row: neighborRow,
                col: neighborCol,
            });
        }
    }
};

const floodFill = (image, startRow, startCol, newColor) => {
    const colorToReplace = image[startRow][startCol];
    const visited = new Set();

    replaceColorOfConnectedComponent(image, startRow, startCol, colorToReplace, newColor, visited);

    return image;
};
