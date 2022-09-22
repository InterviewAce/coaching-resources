const directions = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
];

class Node {
    constructor(row, col, distanceFromStartPosition) {
        this.row = row;
        this.col = col;
        this.distanceFromStartPosition = distanceFromStartPosition;
    }

    getPositionString() {
        return `${this.row}, ${this.col}`;
    }
}

const getNeighbors = (row, col) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const neighborRow = row + rowChange;
        const neighborCol = col + colChange;

        neighbors.push([neighborRow, neighborCol]);
    }

    return neighbors;
};

function getKnightShortestPath(targetRow, targetCol) {
    const queue = [];
    const startNode = new Node(0, 0, 0);
    queue.push(startNode);

    const visited = new Set();

    while (queue.length > 0) {
        // Remove node
        // In practice, we should use a real Queue class so that we can dequeue in O(1)
        // time instead of O(n) time.
        const node = queue.shift();
        const { row, col, distanceFromStartPosition } = node;

        // Process node
        if (row === targetRow && col === targetCol) return distanceFromStartPosition;
        visited.add(node.getPositionString());

        // Add neighbors
        for (const neighbor of getNeighbors(row, col)) {
            const [neighborRow, neighborCol] = neighbor;
            const neighborNode = new Node(neighborRow, neighborCol, distanceFromStartPosition + 1);

            if (visited.has(neighborNode.getPositionString())) continue;

            queue.push(neighborNode);
        }
    }
}
