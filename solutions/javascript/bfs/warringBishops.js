/*
Imagine that we have an 8 x 8 chess board that has some bishops on it, and no other pieces. In chess, bishops can travel diagonally in all 4 directions, and they can move as far as they want in these directions (however, if there is another piece in the way, they cannot move past that piece).

You'll be a given an array of arrays. Each of the smaller arrays has size 2, and represents 1 bishop. For example, if we have, [[1,2]], then there is a bishop at row = 1, col = 2.

If 2 bishops can attack each other (i.e. they are in the same diagonal), we'll say that these are warring bishops. Additionally, if bishop 1 can attack bishop 2, and bishop 2 can attack bishop 3, then all 3 of these are warring bishops.

Given the input list of bishops, return true if all the bishops are part of the same group of warring bishops. Otherwise, return false.
*/

const { Queue } = require('../../../utils/queue');

const FIRST_INDEX = 0;

const areConnected = (bishopOne, bishopTwo) => {
    const [bishopOneRow, bishopOneCol] = bishopOne;
    const [bishopTwoRow, bishopTwoCol] = bishopTwo;

    const slopeBetweenBishops = (bishopTwoRow - bishopOneRow) / (bishopTwoCol - bishopOneCol);

    return slopeBetweenBishops === 1 || slopeBetweenBishops === -1;
};

const buildGraph = (nodes) => {
    const graph = {};

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const nodeOne = nodes[i];
            const nodeTwo = nodes[j];

            if (!areConnected(nodeOne, nodeTwo)) continue;

            const nodeOneIdInGraph = graph.hasOwnProperty(i);
            const nodeTwoIdInGraph = graph.hasOwnProperty(j);

            if (!nodeOneIdInGraph) graph[i] = [];
            if (!nodeTwoIdInGraph) graph[j] = [];

            graph[i].push(j);
            graph[j].push(i);
        }
    }

    return graph;
};

const markComponentAsVisited = (startNode, graph, visited) => {
    const queue = new Queue();
    queue.enqueue(startNode);
    visited.add(startNode);

    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        // No work required in the process node step for this problem

        // Add neighbors
        const nodeInGraph = graph.hasOwnProperty(node);
        if (!nodeInGraph) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            queue.enqueue(neighbor);
            visited.add(neighbor);
        }
    }
};

const checkIfIsGroupOfWarringBishops = (bishops) => {
    if (bishops.length === 0) return true;

    const graph = buildGraph(bishops);

    const visited = new Set();
    markComponentAsVisited(FIRST_INDEX, graph, visited);

    return visited.size === bishops.length;
};

const bishops = [
    [0, 4],
    [2, 6],
    [3, 1],
    [6, 2],
    [7, 5],
];

console.log(`Your answer: ${checkIfIsGroupOfWarringBishops(bishops)}`);
console.log(`Correct answer: ${true}`);
console.log();
