/*
There are many religious fishermen at sea. Two fishermen will work together in a squad if either they have the same religion or the same fishing rod. Also, if fisherman Alex is willing to work with fisherman Bob, and fisherman Bob is willing to work with fisherman Caleb, then fisherman Alex and fisherman Caleb will be willing to work together (because they trust fisherman Bob).

You'll be given an array where each element represents a fisherman (e.g. [['christianity', 'Johnny Morris']] means we have 1 fisherman whose religion is 'christianity' and whose fishing rod is 'Johnny Morris'). You must return the size of the largest squad of fishermen.
*/

const { Queue } = require('../../../utils/queue');

const haveEdge = (fishermanOne, fishermanTwo) => {
    const [fishermanOneReligion, fishermanOneRod] = fishermanOne;
    const [fishermanTwoReligion, fishermanTwoRod] = fishermanTwo;

    return fishermanOneReligion === fishermanTwoReligion || fishermanOneRod === fishermanTwoRod;
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

const getComponentSize = (startNode, graph, visited) => {
    const queue = new Queue();
    queue.enqueue(startNode);
    visited.add(startNode);

    let componentSize = 0;

    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        componentSize++;

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

    return componentSize;
};

const findLargestSquadSize = (fishermen) => {
    const graph = buildGraph(fishermen);

    let largestSquadSize = 0;
    const visited = new Set();

    for (let fishermanId = 0; fishermanId < fishermen.length; fishermanId++) {
        if (visited.has(fishermanId)) continue;

        const squadSize = getComponentSize(fishermanId, graph, visited);
        largestSquadSize = Math.max(largestSquadSize, squadSize);
    }

    return largestSquadSize;
};

const fishermen = [
    ['Sikhism', 'Orvis'],
    ['Christianity', 'Johnny Morris'],
    ['Buddhism', 'Winn Grip'],
    ['Islam', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Buddhism', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Judaism', 'Fuji'],
    ['Christianity', 'Johnny Morris'],
    ['Hinduism', 'Orvis'],
];

console.log(`Your answer: ${findLargestSquadSize(fishermen)}`);
console.log(`Correct answer: ${5}`);
console.log();
