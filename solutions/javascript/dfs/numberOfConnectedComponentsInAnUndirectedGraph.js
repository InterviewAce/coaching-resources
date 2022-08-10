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

const markComponentAsVisited = (graph, node, visited) => {
    // Base cases
    if (visited.has(node)) return;

    // Process node
    visited.add(node);

    // Add neighbors
    const nodeInGraph = graph.hasOwnProperty(node);
    if (!nodeInGraph) return;

    const neighbors = graph[node];

    for (const neighbor of neighbors) {
        markComponentAsVisited(graph, neighbor, visited);
    }
};

const countComponents = (numNodes, edges) => {
    const graph = buildGraph(edges);

    let numConnectedComponents = 0;
    const visited = new Set();

    for (let node = 0; node < numNodes; node++) {
        if (visited.has(node)) continue;

        numConnectedComponents++;
        markComponentAsVisited(graph, node, visited);
    }

    return numConnectedComponents;
};
