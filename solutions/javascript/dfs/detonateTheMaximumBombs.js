const computeDistanceBetweenPoints = (pointOne, pointTwo) => {
    const [xOne, yOne] = pointOne;
    const [xTwo, yTwo] = pointTwo;

    const deltaX = xTwo - xOne;
    const deltaY = yTwo - yOne;

    const deltaXSquared = deltaX * deltaX;
    const deltaYSquared = deltaY * deltaY;

    return Math.sqrt(deltaXSquared + deltaYSquared);
};

const canDetonate = (curBombData, otherBombData) => {
    const [curBombX, curBombY, curBombRadius] = curBombData;
    const [otherBombX, otherBombY, _otherBombRadius] = otherBombData;

    const distanceBetweenBombs = computeDistanceBetweenPoints(
        [curBombX, curBombY],
        [otherBombX, otherBombY],
    );

    return distanceBetweenBombs <= curBombRadius;
};

const buildGraph = (bombs, idToBombData) => {
    const graph = {};

    for (let i = 0; i < bombs.length; i += 1) {
        for (let j = i + 1; j < bombs.length; j += 1) {
            const iBombData = bombs[i];
            const jBombData = bombs[j];

            const iCanDetonateJ = canDetonate(iBombData, jBombData);
            const jCanDetonateI = canDetonate(jBombData, iBombData);

            const iInGraph = graph.hasOwnProperty(i);
            const jInGraph = graph.hasOwnProperty(j);

            if (!iInGraph) graph[i] = [];
            if (!jInGraph) graph[j] = [];

            if (iCanDetonateJ) graph[i].push(j);
            if (jCanDetonateI) graph[j].push(i);
        }
    }

    return graph;
};

const getComponentSize = (graph, node, visited) => {
    // Base case
    if (visited.has(node)) return 0;

    // Process node
    let componentSize = 1; // The 1 represents the current node
    visited.add(node);

    // Recurse on neighbors
    const nodeInGraph = graph.hasOwnProperty(node);
    if (!nodeInGraph) return componentSize;

    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        componentSize += getComponentSize(graph, neighbor, visited);
    }

    return componentSize;
};

const maximumDetonation = (bombs) => {
    const graph = buildGraph(bombs);
    let maxBombsCanDetonate = 0;

    for (let id = 0; id < bombs.length; id += 1) {
        const bomb = bombs[id];

        const visited = new Set();
        const numBombsCanDetonate = getComponentSize(graph, id, visited);

        maxBombsCanDetonate = Math.max(
            maxBombsCanDetonate,
            numBombsCanDetonate,
        );
    }

    return maxBombsCanDetonate;
};
