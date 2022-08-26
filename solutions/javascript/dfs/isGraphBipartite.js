const UNVISITED = 0;
const SET_A = -1;
const SET_B = 1;

const getOppositeSet = (prevAssignedSet) => prevAssignedSet * -1;

const checkIfIsBipartite = (graph, node, visited, prevAssignedSet) => {
    // Base cases
    if (visited[node] !== UNVISITED) {
        return visited[node] === getOppositeSet(prevAssignedSet);
    }

    // Process node
    visited[node] = getOppositeSet(prevAssignedSet);

    // Recurse on neighbors
    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        const remainingComponentIsBipartite = checkIfIsBipartite(
            graph,
            neighbor,
            visited,
            visited[node],
        );

        if (!remainingComponentIsBipartite) return false;
    }

    return true;
};

const isBipartite = (graph) => {
    const numNodes = graph.length;
    const visited = new Array(numNodes).fill(UNVISITED);

    for (let node = 0; node < numNodes; node += 1) {
        if (visited[node] !== UNVISITED) continue;

        const curComponentIsBipartite = checkIfIsBipartite(
            graph,
            node,
            visited,
            SET_B,
        );
        if (!curComponentIsBipartite) return false;
    }

    return true;
};
