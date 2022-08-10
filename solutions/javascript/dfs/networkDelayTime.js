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
    node,
    graph,
    minTimeToReach,
    timeElapsedSoFar,
) => {
    // Base cases
    if (timeElapsedSoFar >= minTimeToReach[node]) return;

    // Process node
    minTimeToReach[node] = timeElapsedSoFar;

    // Recurse on neighbors
    const nodeInGraph = graph.hasOwnProperty(node);
    if (!nodeInGraph) return;

    const neighbors = Object.keys(graph[node]);
    for (const neighbor of neighbors) {
        const timeToReachNeighbor = graph[node][neighbor];

        findMinTimeToReachNodesInComponent(
            neighbor,
            graph,
            minTimeToReach,
            timeElapsedSoFar + timeToReachNeighbor,
        );
    }
};

const networkDelayTime = (times, numNodes, startNode) => {
    const graph = buildGraph(times);

    const minTimeToReach = new Array(numNodes + 1).fill(Infinity);

    findMinTimeToReachNodesInComponent(startNode, graph, minTimeToReach, 0);

    let minTimeToReachAllNodes = -Infinity;
    for (let node = 1; node <= numNodes; node += 1) {
        minTimeToReachAllNodes = Math.max(
            minTimeToReachAllNodes,
            minTimeToReach[node],
        );
    }

    if (minTimeToReachAllNodes === Infinity) return CANNOT_REACH_ALL_NODES;

    return minTimeToReachAllNodes;
};
