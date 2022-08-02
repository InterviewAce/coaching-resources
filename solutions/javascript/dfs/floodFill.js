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

const replaceColorOfConnectedComponent = (row, col, initialPixelColor, newPixelColor, image) => {
    // Base case
    if (!isValidPosition(image, row, col)) return;
    if (image[row][col] !==  initialPixelColor) return;

    // Process node
    image[row][col] = newPixelColor;

    // Recurse on neighbors
    // Try going up, left, down, and right
    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        replaceColorOfConnectedComponent(newRow, newCol, initialPixelColor, newPixelColor, image);
    }
};

const floodFill = (row, col, newPixelColor, image) => {
    const initialPixelColor = image[row][col];
    replaceColorOfConnectedComponent(row, col, initialPixelColor, newPixelColor, image);
    return image;
};