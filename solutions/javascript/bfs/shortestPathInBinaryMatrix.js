/*
What is our implicit graph?
-What are our nodes? Each cell in our matrix/grid is a node (e.g. grid[row][col]).
-What are our edges/neighbors? The neighbors are the (at most) 8 cells that are adjacent
to the current cell (meaning they are touching horizontally, vertically, or diagonally).

A node would look like: (0,0)
An edge would look like: [(0,0), (1,1)]
*/

/*
This graph is undirected (e.g. (0,0) is connected to (1,1) AND (1,1) is connected to (0,0)).
This means we must use a visited set to prevent cycles.
*/
const CLEAR = 0;
const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
const NO_CLEAR_PATH = -1;

class Node {
    constructor(row, col, curPathSize) {
        this.row = row;
        this.col = col;
        this.curPathSize = curPathSize;
    }
}

const getNeighbors = (row, col) => {
    const neighbors = [];
    
    for (const direction of directions) {
        const [rowChange, colChange] = direction;
        
        const newRow = row + rowChange;
        const newCol = col + colChange;
        
        neighbors.push([newRow, newCol]);
    }
    
    return neighbors;
}

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    
    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;
    
    return rowInBounds && colInBounds;
}

const shortestPathBinaryMatrix = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    
    if (grid[0][0] !== CLEAR || grid[numRows - 1][numCols - 1] !== CLEAR) return NO_CLEAR_PATH;
    
    const startNode = new Node(0, 0, 1);
    const visited = new Set();
    
    const queue = new Queue();
    queue.enqueue(startNode);
    
    while (queue.size() > 0) {
        // Remove node
        const { row, col, curPathSize } = queue.dequeue();
        
        // Process node
        const curPosition = `${row}, ${col}`;
        
        // We've tried adding the visited check in the "add neighbors" step, but it doesn't work for this problem. We're not totally sure why.
        if (visited.has(curPosition)) continue;
        
        visited.add(curPosition);
        
        const isEndPosition = row === numRows - 1 && col === numCols - 1;
        if (isEndPosition) return curPathSize;
        
        // Add neighbors
        const neighbors = getNeighbors(row, col);
        for (const neighbor of neighbors) {
            const [neighborRow, neighborCol] = neighbor;
            const neighborPosition = `${neighborRow}, ${neighborCol}`;
            
            if (!isInBounds(grid, neighborRow, neighborCol)) continue;
            if (grid[neighborRow][neighborCol] !== CLEAR) continue;
            
            const neighborNode = new Node(neighborRow, neighborCol, curPathSize + 1);
            queue.enqueue(neighborNode);
        }
    }
    
    return NO_CLEAR_PATH;
};
