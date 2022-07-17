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

const markGroupAsVisited = (startNode, graph, visited) => {
    const queue = new Queue();
    queue.enqueue(startNode);

    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        visited.add(node);

        // Add neighbors
        const nodeInGraph = graph.hasOwnProperty(node);
        if (!nodeInGraph) continue;

        const neighbors = graph[node];

        for (const neighbor of neighbors) {
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
        markGroupAsVisited(node, graph, visited);
    }

    return numConnectedComponents;
};
