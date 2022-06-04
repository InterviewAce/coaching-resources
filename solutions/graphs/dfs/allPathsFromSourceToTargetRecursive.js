const START_NODE_ID = 0;

const getAllPathsSourceTarget = (graph, currentNodeId, targetNodeId) => {
    // Base case
    if (currentNodeId === targetNodeId) {
        return [[targetNodeId]];
    }

    // Process node
    const allPathsCurTarget = [];
    
    // Add neighbors
    const neighbors = graph[currentNodeId];
    
    neighbors.forEach((neighborId) => {
        const pathsFromNeighborToTarget = getAllPathsSourceTarget(graph, neighborId, targetNodeId);
        
        pathsFromNeighborToTarget.forEach((path) => {
            const pathIncludingCur = [currentNodeId, ...path];
            
            allPathsCurTarget.push(pathIncludingCur);
        });
    });
    
    return allPathsCurTarget;
}

var allPathsSourceTarget = function(graph) {
    const targetNodeId = graph.length - 1;
    
    return getAllPathsSourceTarget(graph, START_NODE_ID, targetNodeId);
};