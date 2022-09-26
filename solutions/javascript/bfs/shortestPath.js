/*
Given an array of edges of an undirected graph and two nodes, return the length of the shortest path between these two nodes. If no such path exists, return -1. Note that the length of a path is the number of edges in the path, not the number of nodes.
*/

const NO_PATH_FOUND = -1;

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const nodeOneInGraph = graph.hasOwnProperty(nodeOne);
        const nodeTwoInGraph = graph.hasOwnProperty(nodeTwo);

        if (!nodeOneInGraph) graph[nodeOne] = [];
        if (!nodeTwoInGraph) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const getShortestPathLength = (edges, startNode, targetNode) => {
    const graph = buildGraph(edges);

    const queue = [];
    const visited = new Set();

    queue.push({
        node: startNode,
        distanceFromStart: 0,
    });
    visited.add(startNode);

    while (queue.length > 0) {
        const { node, distanceFromStart } = queue.shift();

        if (node === targetNode) return distanceFromStart;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;
            visited.add(neighbor);

            queue.push({
                node: neighbor,
                distanceFromStart: distanceFromStart + 1,
            });
        }
    }

    return NO_PATH_FOUND;
};

const edges = [
    ['w', 'x'],
    ['x', 'y'],
    ['z', 'y'],
    ['z', 'v'],
    ['w', 'v'],
];
const startNode = 'w';
const targetNode = 'z';

console.log(`Your answer: ${getShortestPathLength(edges, startNode, targetNode)}`);
console.log(`Correct answer: ${2}`);
console.log();
