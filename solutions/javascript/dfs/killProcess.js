const HAS_NO_PARENT_PROCESS = 0;

const buildGraph = (processIds, parentProcessIds) => {
    const graph = {};

    for (let i = 0; i < parentProcessIds.length; i++) {
        const curProcessId = processIds[i];
        const parentProcessId = parentProcessIds[i];

        if (parentProcessId === HAS_NO_PARENT_PROCESS) continue;

        parentProcessIdInGraph = graph.hasOwnProperty(parentProcessId);
        if (!parentProcessIdInGraph) graph[parentProcessId] = [];

        graph[parentProcessId].push(curProcessId);
    }

    return graph;
};

const fillIdsThatWillBeKilled = (processId, graph, idsThatWillBeKilled) => {
    // Base cases

    // Process node
    idsThatWillBeKilled.push(processId);

    // Handle neighbors
    const childProcesses = graph[processId];

    const processIdInGraph = graph.hasOwnProperty(processId);
    if (!processIdInGraph) return;

    for (const childProcessId of childProcesses) {
        fillIdsThatWillBeKilled(childProcessId, graph, idsThatWillBeKilled);
    }
};

const killProcess = (processIds, parentProcessIds, killId) => {
    const graph = buildGraph(processIds, parentProcessIds);

    const idsThatWillBeKilled = [];

    fillIdsThatWillBeKilled(killId, graph, idsThatWillBeKilled);

    return idsThatWillBeKilled;
};
