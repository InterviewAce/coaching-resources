/*
We have a series of squares in a 2D plane, and each has a side length of 1. We want to find the size of the largest group of adjacent squares. Adjacent squares are squares that have at least some portion of their sides touching (but they should NOT be overlapping).

Each square will be represented as an x-y pair which denotes the center of the circle (e.g. [0,0] would be a circle that is centered at 0 and has a side length of 1). As an input, you'll be given an array of such squares (e.g. [[0,0], [1,1]]). You should return the size of the largest group of adjacent squares.
*/

const { Queue } = require('../../../utils/queue');

const SIDE_LENGTH = 1;

const areConnected = (squareOne, squareTwo) => {
    const [squareOneX, squareOneY] = squareOne;
    const [squareTwoX, squareTwoY] = squareTwo;

    const positiveDeltaX = Math.abs(squareOneX - squareTwoX);
    const positiveDeltaY = Math.abs(squareOneY - squareTwoY);

    const areTouchingInXDirection = positiveDeltaX === SIDE_LENGTH && positiveDeltaY < SIDE_LENGTH;

    const areTouchingInYDirection = positiveDeltaY === SIDE_LENGTH && positiveDeltaX < SIDE_LENGTH;

    return areTouchingInXDirection || areTouchingInYDirection;
};

const buildGraph = (nodes) => {
    const graph = {};

    for (let i = 0; i < nodes.length; i += 1) {
        const iNode = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
            const jNode = nodes[j];

            if (!areConnected(iNode, jNode)) continue;

            const iInGraph = graph.hasOwnProperty(i);
            const jInGraph = graph.hasOwnProperty(j);

            if (!iInGraph) graph[i] = [];
            if (!jInGraph) graph[j] = [];

            graph[i].push(j);
            graph[j].push(i);
        }
    }

    return graph;
};

const getComponentSize = (graph, startNode, visited) => {
    const queue = new Queue();
    queue.enqueue(startNode);
    visited.add(startNode);

    let componentSize = 0;

    while (!queue.isEmpty()) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        componentSize += 1;

        // Add neighbors
        const nodeInGraph = graph.hasOwnProperty(node);
        if (!nodeInGraph) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;
            visited.add(neighbor);

            queue.enqueue(neighbor);
        }
    }

    return componentSize;
};

const getLargestAdjacentSquareGroupSize = (squares) => {
    const graph = buildGraph(squares);

    let largestAdjacentSquareGroupSize = 0;
    const visited = new Set();

    for (let squareId = 0; squareId < squares.length; squareId += 1) {
        if (visited.has(squareId)) continue;

        const adjacentSquareGroupSize = getComponentSize(graph, squareId, visited);
        largestAdjacentSquareGroupSize = Math.max(
            largestAdjacentSquareGroupSize,
            adjacentSquareGroupSize,
        );
    }

    return largestAdjacentSquareGroupSize;
};

const squares = [
    [0.5, 0.5],
    [1.5, 0.5],
    [2, 0.5],
    [2.5, -0.5],
    [2.5, -1.5],
    [1.5, -1.5],
];

console.log(`Your answer: ${getLargestAdjacentSquareGroupSize(squares)}`);
console.log(`Correct answer: ${4}`);
console.log();
