const computeMinPathSumTo = (row, col, grid) => {
    if (row < 0 || col < 0) return Infinity;
    if (row === 0 && col === 0) return grid[row][col];

    const minPathSumToUpCell = computeMinPathSumTo(row - 1, col, grid);
    const minPathSumToLeftCell = computeMinPathSumTo(row, col - 1, grid);

    const curPositionNum = grid[row][col];

    const minPathSumToCurPosition =
        Math.min(minPathSumToUpCell, minPathSumToLeftCell) + curPositionNum;

    return minPathSumToCurPosition;
};

const minPathSum = (grid) => {
    const lastRow = grid.length - 1;
    const lastCol = grid[0].length - 1;

    return computeMinPathSumTo(lastRow, lastCol, grid);
};
