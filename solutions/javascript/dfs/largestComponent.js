const getComponentSize = (node, graph, visited) => {
    // Base case
    if (visited.has(node)) return 0;

    // Process node
    let curComponentSize = 1; // 1 because of the current node
    visited.add(node);

    // Recurse on neighbors
    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        curComponentSize += getComponentSize(neighbor, graph, visited);
    }

    return curComponentSize;
};

const largestComponent = (graph) => {
    const nodes = Object.keys(graph);

    const visited = new Set();
    let largestComponentSize = 0;

    for (const node of nodes) {
        if (visited.has(node)) continue;

        const curComponentSize = getComponentSize(node, graph, visited);
        largestComponentSize = Math.max(largestComponentSize, curComponentSize);
    }

    return largestComponentSize;
};

module.exports = {
    largestComponent,
};
