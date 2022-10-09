/*
We have a frog who loves being in the water (especially in puddles). Because of this, he refuses to travel on land. But, he loves hopping from one puddle to the next. So, he's looking to find the area that has the largest number of puddles for him to jump between.

You'll be given an input which is an array of puddles (note that every puddle is a circle), and for each puddle you have 3 pieces of information: x-position of its center, y-position of its center, and its radius. You'll also be given an input jumpSize which tells you how far our frog can jump.

Return the size of the largest group of puddles that our frog can freely jump between.
*/

const { Queue } = require('../../../utils/queue');

const getDistance = (pointOne, pointTwo) => {
    const [xOne, yOne] = pointOne;
    const [xTwo, yTwo] = pointTwo;

    return Math.sqrt(Math.pow(xTwo - xOne, 2) + Math.pow(yTwo - yOne, 2));
};

const areConnected = (puddleOne, puddleTwo, jumpSize) => {
    const [puddleOneX, puddleOneY, puddleOneRadius] = puddleOne;
    const [puddleTwoX, puddleTwoY, puddleTwoRadius] = puddleTwo;

    const distanceBetweenCenters = getDistance([puddleOneX, puddleOneY], [puddleTwoX, puddleTwoY]);
    const radiusSum = puddleOneRadius + puddleTwoRadius;

    return distanceBetweenCenters - radiusSum <= jumpSize;
};

const buildGraph = (puddles, jumpSize) => {
    const graph = {};

    for (let i = 0; i < puddles.length; i++) {
        for (let j = i + 1; j < puddles.length; j++) {
            const puddleOne = puddles[i];
            const puddleTwo = puddles[j];

            if (!areConnected(puddleOne, puddleTwo, jumpSize)) continue;

            const puddleOneIdInGraph = graph.hasOwnProperty(i);
            const puddleTwoIdInGraph = graph.hasOwnProperty(j);

            if (!puddleOneIdInGraph) graph[i] = [];
            if (!puddleTwoIdInGraph) graph[j] = [];

            graph[i].push(j);
            graph[j].push(i);
        }
    }

    return graph;
};

const getPuddleGroupSize = (startNode, graph, visited) => {
    const queue = [];
    queue.push(startNode);
    visited.add(startNode);

    let curPuddleGroupSize = 0;

    while (queue.length > 0) {
        // Remove node
        const node = queue.shift();

        // Process node
        curPuddleGroupSize++;

        // Add neighbors
        const nodeInGraph = graph.hasOwnProperty(node);
        if (!nodeInGraph) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            queue.push(neighbor);
            visited.add(neighbor);
        }
    }

    return curPuddleGroupSize;
};

const getLargestPuddleGroupSize = (puddles, jumpSize) => {
    const graph = buildGraph(puddles, jumpSize);

    const visited = new Set();
    let largestPuddleGroupSize = 0;

    for (let puddleId = 0; puddleId < puddles.length; puddleId++) {
        if (visited.has(puddleId)) continue;

        const curPuddleGroupSize = getPuddleGroupSize(puddleId, graph, visited);
        largestPuddleGroupSize = Math.max(largestPuddleGroupSize, curPuddleGroupSize);
    }

    return largestPuddleGroupSize;
};

const puddles = [
    [0, 0, 1],
    [10, 5, 1],
    [11, -5, 1],
    [3, 1, 1],
    [11, 2, 2],
    [2, -3, 1],
    [13, 4, 3],
    [2, 2, 1],
];
const jumpSize = 5;

console.log(`Your answer: ${getLargestPuddleGroupSize(puddles, jumpSize)}`);
console.log(`Correct answer: ${4}`);
console.log();
