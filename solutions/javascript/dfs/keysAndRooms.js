const START_ROOM = 0;

const markReachableNodesAsVisited = (curNode, graph, visited) => {
    // Base cases
    if (visited.has(curNode)) return;

    // Process node
    visited.add(curNode);

    // Recurse on neighbors
    const neighbors = graph[curNode];
    for (const neighbor of neighbors) {
        markReachableNodesAsVisited(neighbor, graph, visited);
    }
};

const canVisitAllRooms = (rooms) => {
    const visited = new Set();

    markReachableNodesAsVisited(START_ROOM, rooms, visited);

    const numReachableRooms = visited.size;
    const numRooms = rooms.length;

    return numReachableRooms === numRooms;
};
