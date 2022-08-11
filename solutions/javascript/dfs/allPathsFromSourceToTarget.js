const START_NODE = 0;

const getPathsFromNodeToTarget = (graph, curNode, targetNode) => {
    // Base cases
    if (curNode === targetNode) return [[curNode]];

    // Process node
    const allPathsFromNodeToTarget = [];

    // Recurse on neighbors
    const neighbors = graph[curNode];
    for (const neighbor of neighbors) {
        const pathsFromNeighborToTarget = getPathsFromNodeToTarget(
            graph,
            neighbor,
            targetNode,
        );

        for (const path of pathsFromNeighborToTarget) {
            const pathFromCurToTarget = [curNode, ...path];

            allPathsFromNodeToTarget.push(pathFromCurToTarget);
        }
    }

    return allPathsFromNodeToTarget;
};

const allPathsSourceTarget = (graph) => {
    const targetNode = graph.length - 1;

    return getPathsFromNodeToTarget(graph, START_NODE, targetNode);
};
