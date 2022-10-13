const LAND = '1';

const isInBounds = (heights, row, col) => {
    const numRows = heights.length;
    const numCols = heights[0].length;

    if (row < 0 || row >= numRows) return false;
    if (col < 0 || col >= numCols) return false;

    return true;
};

const rainflowBackwards = (heights, startRow, startCol, oceanSet) => {
    const queue = new Queue();
    queue.enqueue([startRow, startCol]);

    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        const coordinates = row + ' ' + col;
        if (oceanSet.has(coordinates)) continue;
        oceanSet.add(coordinates);

        const height = heights[row][col];
        const neighbors = [[row - 1, col], [row + 1, col], [row, col + 1], [row, col - 1]];

        for (const [newRow, newCol] of neighbors) {
            if (!isInBounds(heights, newRow, newCol)) continue;
            const newHeight = heights[newRow][newCol];
            if (newHeight < height) continue;
            
            queue.enqueue([newRow, newCol]);
        }
    }
};

var pacificAtlantic = function (heights) {
    const numRows = heights.length;
    if (numRows === 0) return [];
    const numCols = heights[0].length;

    let atlanticSet = new Set();
    let pacificSet = new Set();

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            // if on pacific edge
            if (row === 0 || col === 0) {
                rainflowBackwards(heights, row, col, pacificSet);
            }
            // if on atlantic edge
            if (row === numRows - 1 || col === numCols - 1) {
                rainflowBackwards(heights, row, col, atlanticSet);
            }
        }
    }

    const result = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const coordinate = row + ' ' + col;
            // if rain can flow to atlantic and pacific from this coordinate
            if (atlanticSet.has(coordinate) && pacificSet.has(coordinate)) {
                result.push([row, col])
            }
        }
    }

    return result
};
