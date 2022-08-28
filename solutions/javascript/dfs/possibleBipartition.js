const GROUP_A = -1;
const NO_GROUP_ASSIGNED_YET = 0;
const GROUP_B = 1;

const getOppositeGroup = (group) => -1 * group;

const buildGraph = (numNodes, edges) => {
    const graph = {};

    for (let node = 1; node <= numNodes; node += 1) {
        graph[node] = [];
    }

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const checkIfComponentIsBipartite = (graph, node, groupAssignments, prevNodeGroupAssignment) => {
    // Base cases
    const hasAssignedGroup = groupAssignments[node] !== NO_GROUP_ASSIGNED_YET;
    if (hasAssignedGroup)
        return groupAssignments[node] === getOppositeGroup(prevNodeGroupAssignment);

    // Process node
    groupAssignments[node] = getOppositeGroup(prevNodeGroupAssignment);

    // Recurse on neighbors
    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        const neighborComponentIsBipartite = checkIfComponentIsBipartite(
            graph,
            neighbor,
            groupAssignments,
            groupAssignments[node],
        );

        if (!neighborComponentIsBipartite) return false;
    }

    return true;
};

const possibleBipartition = (numPeople, dislikes) => {
    const graph = buildGraph(numPeople, dislikes);
    const groupAssignments = new Array(numPeople + 1).fill(NO_GROUP_ASSIGNED_YET);

    for (let personId = 1; personId <= numPeople; personId += 1) {
        const hasBeenAssignedToGroup = groupAssignments[personId] !== NO_GROUP_ASSIGNED_YET;
        if (hasBeenAssignedToGroup) continue;

        const componentIsBipartite = checkIfComponentIsBipartite(
            graph,
            personId,
            groupAssignments,
            GROUP_B,
        );
        if (!componentIsBipartite) return false;
    }

    return true;
};
