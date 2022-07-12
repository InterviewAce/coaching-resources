const buildGraph = (edges) => {
    const graph = {};

    edges.forEach((edge) => {
        const [nodeOne, nodeTwo] = edge;

        if (!graph[nodeOne]) graph[nodeOne] = [];
        if (!graph[nodeTwo]) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    });

    return graph;
};

const markComponentAsVisited = (graph, startNode, visited) => {
    const queue = new Queue();
    queue.enqueue(startNode);

    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        visited.add(node);

        // Add neighbors
        const neighbors = graph[node];

        // Some nodes may have no neighbors, in which case neighbors would be
        // `undefined`, causing an error when we try to iterate over it.
        if (!neighbors) continue;

        for (const neighbor of neighbors) {
            // This graph CAN have cycles (all undirected graphs can have cycles), so we must
            // tracked visited nodes to prevent infinite loops.
            if (visited.has(neighbor)) continue;

            queue.enqueue(neighbor);
        }
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
