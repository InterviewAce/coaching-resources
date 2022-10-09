/*
Imagine that we have some special sharks, and these sharks tend to travel in pods. However, these sharks are competitive. Two sharks will only be willing to hunt together if they deem each other to be worthy. The sharks will deem each other worthy if the difference between their tooth size is less than or equal to 1 (inches) OR the difference between their fin size is less than or equal to 4 (inches).

Additionally, these sharks are highly respectful creatures. So, if shark 1 believes shark 2 is worthy, and shark 2 believes shark 3 is worth, then shark 1 and shark 3 will deem each other to be worthy (because they respect shark 2's opinion).

Given a list of smaller arrays representing sharks (e.g. [[2,4]] means we have one shark with a tooth size of 2 and a fin size of 4), return the number of pods that these sharks will form.
*/

const { Queue } = require('../../../utils/queue');

const MAX_ALLOWABLE_TOOTH_SIZE_DIFFERENCE = 1;
const MAX_ALLOWABLE_FIN_SIZE_DIFFERENCE = 4;

const areConnected = (sharkOne, sharkTwo) => {
    const [sharkOneToothSize, sharkOneFinSize] = sharkOne;
    const [sharkTwoToothSize, sharkTwoFinSize] = sharkTwo;

    const toothSizeDifference = Math.abs(sharkOneToothSize - sharkTwoToothSize);
    const finSizeDifference = Math.abs(sharkOneFinSize - sharkTwoFinSize);

    return (
        toothSizeDifference <= MAX_ALLOWABLE_TOOTH_SIZE_DIFFERENCE ||
        finSizeDifference <= MAX_ALLOWABLE_FIN_SIZE_DIFFERENCE
    );
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

const countSharkPods = (sharks) => {
    const graph = buildGraph(sharks);

    console.log(graph);

    const visited = new Set();
    let numPods = 0;

    for (let sharkId = 0; sharkId < sharks.length; sharkId++) {
        if (visited.has(sharkId)) continue;

        numPods++;
        markComponentAsVisited(sharkId, graph, visited);
    }

    return numPods;
};

const sharks = [
    [2, 4],
    [10, 20],
    [1.5, 9],
    [10, 22],
    [0.1, 1],
    [19, 18],
    [7, 13],
    [12, 26],
];

console.log(`Your answer: ${countSharkPods(sharks)}`);
console.log(`Correct answer: ${2}`);
console.log();
