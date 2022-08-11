const CANNOT_REACH_ALL_NODES = -1;

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [src, dest, weight] = edge;

        const srcInGraph = graph.hasOwnProperty(src);
        if (!srcInGraph) graph[src] = {};

        graph[src][dest] = weight;
    }

    return graph;
};

const findMinTimeToReachNodesInComponent = (
    graph,
    node,
    minTimeToReach,
    timeElapsedSoFar,
) => {
    // Base cases
    if (minTimeToReach[node] <= timeElapsedSoFar) return;

    // Process node
    minTimeToReach[node] = timeElapsedSoFar;

    // Recurse on neighbors
    const nodeInGraph = graph.hasOwnProperty(node);
    if (!nodeInGraph) return;

    const neighbors = Object.keys(graph[node]);
    for (const neighbor of neighbors) {
        const timeToReachNeighbor = graph[node][neighbor];

        findMinTimeToReachNodesInComponent(
            graph,
            neighbor,
            minTimeToReach,
            timeElapsedSoFar + timeToReachNeighbor,
        );
    }
};

const networkDelayTime = (times, numNodes, startNode) => {
    const graph = buildGraph(times);

    const minTimeToReach = new Array(numNodes + 1).fill(Infinity);
    minTimeToReach[0] = -Infinity;

    findMinTimeToReachNodesInComponent(graph, startNode, minTimeToReach, 0);

    const minTimeToReachAllNodes = Math.max(...minTimeToReach);

    if (minTimeToReachAllNodes === Infinity) return CANNOT_REACH_ALL_NODES;

    return minTimeToReachAllNodes;
};
