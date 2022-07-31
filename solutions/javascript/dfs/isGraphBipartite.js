const SET_A = 1;
const SET_B = -1;
const UNVISITED = 0;

const checkIfCanBeBipartite = (graph, node, visited, prevColor) => {
    // Base cases
    if (visited[node] !== UNVISITED) return visited[node] !== prevColor;

    // Process node
    if (prevColor === null || prevColor === SET_B) visited[node] = SET_A;
    else visited[node] = SET_B;

    // Handle neighbors
    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        const canBeBipartite = checkIfCanBeBipartite(
            graph,
            neighbor,
            visited,
            visited[node],
        );

        if (!canBeBipartite) return false;
    }

    return true;
};

const isBipartite = (graph) => {
    const numNodes = graph.length;
    const visited = new Array(numNodes).fill(UNVISITED);

    for (let node = 0; node < numNodes; node++) {
        if (visited[node] !== UNVISITED) continue;

        const canBeBipartite = checkIfCanBeBipartite(
            graph,
            node,
            visited,
            null,
        );

        if (!canBeBipartite) return false;
    }

    return true;
};
