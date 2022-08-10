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

const hasValidPath = (curNode, targetNode, graph, visited) => {
    // Base case
    if (curNode === targetNode) return true;
    if (visited.has(curNode)) return false;

    // Process node
    visited.add(curNode);

    // Recurse on neighbors
    const neighbors = graph[curNode];
    for (const neighbor of neighbors) {
        const neighborHasValidPath = hasValidPath(
            neighbor,
            targetNode,
            graph,
            visited,
        );

        if (neighborHasValidPath) return true;
    }

    return false;
};

const validPath = (n, edges, startNode, targetNode) => {
    const graph = buildGraph(edges);
    const visited = new Set();

    return hasValidPath(startNode, targetNode, graph, visited);
};
