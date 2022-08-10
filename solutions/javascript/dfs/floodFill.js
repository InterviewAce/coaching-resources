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

const replaceColorOfConnectedComponent = (
    image,
    row,
    col,
    colorToReplace,
    newColor,
    visited,
) => {
    // Base cases
    if (!isInBounds(image, row, col)) return;

    const curPositionString = getPositionString(row, col);
    if (visited.has(curPositionString)) return;

    const curColor = image[row][col];
    if (curColor !== colorToReplace) return;

    // Process node
    image[row][col] = newColor;
    visited.add(curPositionString);

    // Recurse on potential neighbors
    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        replaceColorOfConnectedComponent(
            image,
            newRow,
            newCol,
            colorToReplace,
            newColor,
            visited,
        );
    }
};

const floodFill = (row, col, newColor, image) => {
    const colorToReplace = image[row][col];
    const visited = new Set();

    replaceColorOfConnectedComponent(
        image,
        row,
        col,
        colorToReplace,
        newColor,
        visited,
    );

    return image;
};
