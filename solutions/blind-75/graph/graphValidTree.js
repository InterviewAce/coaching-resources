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

const validTree = (n, edges) => {
    if (edges.length != n - 1) return false;

    const graph = buildUndirectedGraph(n, edges);

    nodeToParent = { 0: -1 };
    stack = [0];

    while (stack.length > 0) {
        node = stack.pop();

        neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (neighbor === nodeToParent[node]) continue;
            if (nodeToParent.hasOwnProperty(neighbor)) return false;

            nodeToParent[neighbor] = node;
            stack.push(neighbor);
        }
    }

    const numberOfKeys = Object.keys(nodeToParent).length;
    return numberOfKeys === n
};