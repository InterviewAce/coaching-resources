const START_NODE_ID = 0;

const getAllPathsSourceTarget = (graph, currentNodeId, targetNodeId) => {
  // Base case
  if (currentNodeId === targetNodeId) {
    return [[targetNodeId]];
  }

  // Process node - we don't really need to do much here. We
  // basically look at paths from our neighbor to the target
  // and then just prepend the current node.

  // Recurse on neighbors
  const allPathsCurToTarget = [];
  const neighbors = graph[currentNodeId];

  for (const neighborId of neighbors) {
    const pathsFromNeighborToTarget = getAllPathsSourceTarget(
      graph,
      neighborId,
      targetNodeId,
    );

    for (const path of pathsFromNeighborToTarget) {
      const pathIncludingCur = [currentNodeId, ...path];

      allPathsCurToTarget.push(pathIncludingCur);
    }
  }

  return allPathsCurToTarget;
};

const allPathsSourceTarget = (graph) => {
  const targetNodeId = graph.length - 1;

  return getAllPathsSourceTarget(graph, START_NODE_ID, targetNodeId);
};
