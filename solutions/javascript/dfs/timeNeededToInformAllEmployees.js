const HAS_NO_MANAGER = -1;

const buildGraph = (numEmployees, managers) => {
    const graph = {};

    for (let employeeId = 0; employeeId < numEmployees; employeeId++) {
        graph[employeeId] = [];
    }

    for (let employeeId = 0; employeeId < numEmployees; employeeId++) {
        const managerId = managers[employeeId];

        if (managerId === HAS_NO_MANAGER) continue;
        graph[managerId].push(employeeId);
    }

    return graph;
};

const getTimeRequiredToInform = (employeeId, graph, informTime) => {
    // Base cases
    // No base  cases needed. Note: this is graph is acyclic, so we do not need a visited set.

    // Process node
    const timeForCurEmployeeToInformSubordinates = informTime[employeeId];

    // Handle neighbors
    let maxTimeToTellSubordinateTree = 0;

    const subordinates = graph[employeeId];
    for (const subordinateId of subordinates) {
        const timeRequiredToInformSubordinateTree = getTimeRequiredToInform(
            subordinateId,
            graph,
            informTime,
        );

        maxTimeToTellSubordinateTree = Math.max(
            maxTimeToTellSubordinateTree,
            timeRequiredToInformSubordinateTree,
        );
    }

    const totalTimeToInformCurSubtree =
        timeForCurEmployeeToInformSubordinates + maxTimeToTellSubordinateTree;
    return totalTimeToInformCurSubtree;
};

const numOfMinutes = (numEmployees, headId, managers, informTime) => {
    const graph = buildGraph(numEmployees, managers);

    return getTimeRequiredToInform(headId, graph, informTime);
};
