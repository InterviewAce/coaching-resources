const buildUndirectedGraph = (n, edges) => {
    const graph = {};

    for (let i = 0; i < n; i++) {
        graph[i] = [];
    }

    for (const [nodeOne, nodeTwo] of edges) {
        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const depthFirstSearch = (graph, startNode, visited) => {
    stack = [startNode];

    while (stack.length) {
        node = stack.pop();

        if (visited.has(node)) continue;
        visited.add(node);

        neighbors = graph[node];
        for (const neighbor of neighbors) {
            stack.push(neighbor);
        }
    }
};

const countComponents = (n, edges) => {
    const visited = new Set();
    const graph = buildUndirectedGraph(n, edges);

    let count = 0;

    for (let node = 0; node < n; node++) {
        if (visited.has(node)) continue;
        depthFirstSearch(graph, node, visited);
        count++;
    }

    return count
};

