/*
There is a monkey who loves collecting and eating fruits. This monkey jumps from tree to tree using the vines that are attached to the tree. He would like to find the collection of trees that allows him to maximize the total amount of fruit that he can eat. Note that some trees contain more fruit than others.

You'll be given a list of trees, where each tree contains an x-coordinate, a y-coordinate, a number of fruits, and a vine length. For example, [2,4,5,10] indicates that we have a tree at the position (2,4) in a 2D grid, this tree has 5 fruits, and the monkey can jump to any tree within a 10 unit radius of this tree. Note that the monkey will never jump to another tree if its not possible to jump from the other tree to his current tree (since he doesn't want to get stranded).

You should return the maximum amount of fruit that the monkey can obtain while staying within one group of trees (i.e. one set of trees that he can jump between).
*/

const { Queue } = require('../../../utils/queue');

const getDistance = (pointOne, pointTwo) => {
    const [xOne, yOne] = pointOne;
    const [xTwo, yTwo] = pointTwo;

    return Math.sqrt(Math.pow(xTwo - xOne, 2) + Math.pow(yTwo - yOne, 2));
};

const haveEdge = (treeOne, treeTwo) => {
    const [xOne, yOne, fruitOne, vineLengthOne] = treeOne;
    const [xTwo, yTwo, fruitTwo, vineLengthTwo] = treeTwo;

    const minVineLength = Math.min(vineLengthOne, vineLengthTwo);
    const distanceBetweenTrees = getDistance([xOne, yOne], [xTwo, yTwo]);

    return distanceBetweenTrees <= minVineLength;
};

const buildGraph = (nodes) => {
    const graph = {};

    for (let i = 0; i < nodes.length; i++) {
        const iNode = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
            const jNode = nodes[j];

            if (!haveEdge(iNode, jNode)) continue;

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

const getWeightedComponentSize = (startNode, graph, visited, nodes) => {
    const queue = new Queue();
    queue.enqueue(startNode);
    visited.add(startNode);

    let weightedComponentSize = 0;

    while (queue.size() > 0) {
        // Remove node
        const nodeId = queue.dequeue();

        // Process node
        weightedComponentSize += nodes[nodeId][2];

        // Add neighbors
        const nodeIdInGraph = graph.hasOwnProperty(nodeId);
        if (!nodeIdInGraph) continue;

        const neighbors = graph[nodeId];
        for (const neighborId of neighbors) {
            if (visited.has(neighborId)) continue;

            queue.enqueue(neighborId);
            visited.add(neighborId);
        }
    }

    return weightedComponentSize;
};

const getMaxReachableFruit = (trees) => {
    const graph = buildGraph(trees);

    const visited = new Set();
    let maxFruit = 0;

    for (let treeId = 0; treeId < trees.length; treeId++) {
        if (visited.has(treeId)) continue;

        const fruitInCurGroup = getWeightedComponentSize(treeId, graph, visited, trees);
        maxFruit = Math.max(maxFruit, fruitInCurGroup);
    }

    return maxFruit;
};

const trees = [
    [2, 4, 2, 6],
    [10, 4, 5, 5],
    [3, 8, 3, 6],
    [12, 8, 6, 5],
    [1, 6, 2, 6],
];

console.log(`Your answer: ${getMaxReachableFruit(trees)}`);
console.log(`Correct answer: ${11}`);
console.log();
