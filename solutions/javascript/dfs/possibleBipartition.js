const NO_GROUP_ASSIGNED_YET = -1;
const GROUP_ONE = 1;
const GROUP_TWO = 2;

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

const checkIfCanBeBipartite = (graph, node, groups, prevNodeGroup) => {
    // Base cases
    if (groups[node] !== NO_GROUP_ASSIGNED_YET) {
        const hasConflict = groups[node] === prevNodeGroup;

        return !hasConflict;
    }

    // Process node
    if (prevNodeGroup === null || prevNodeGroup === GROUP_TWO)
        groups[node] = GROUP_ONE;
    else groups[node] = GROUP_TWO;

    // Handle neighbors
    const nodeInGraph = graph.hasOwnProperty(node);
    if (!nodeInGraph) return true;

    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        const canBeBipartite = checkIfCanBeBipartite(
            graph,
            neighbor,
            groups,
            groups[node],
        );

        if (!canBeBipartite) return false;
    }

    return true;
};

const possibleBipartition = (numPeople, dislikes) => {
    const graph = buildGraph(dislikes);
    const groups = new Array(numPeople + 1).fill(NO_GROUP_ASSIGNED_YET);

    for (let personId = 1; personId < numPeople; personId += 1) {
        if (groups[personId] !== NO_GROUP_ASSIGNED_YET) continue;

        const canBeBipartite = checkIfCanBeBipartite(
            graph,
            personId,
            groups,
            null,
        );

        if (!canBeBipartite) return false;
    }

    return true;
};
