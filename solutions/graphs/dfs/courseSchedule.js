const CURRENTLY_VISITING = -1;
const UNVISITED = 0;
const PREVIOUSLY_VISITED = 1;

const buildGraph = (dependencies) => {
    // Note that we have made an effort to keep this function generic & reusable
    const graph = {};

    dependencies.forEach(([node, prereq]) => {
        const prereqInGraph = graph.hasOwnProperty(prereq);

        if (!prereqInGraph) graph[prereq] = [];

        graph[prereq].push(node);
    });

    return graph;
};

const checkIfHasCycle = (courseNum, graph, visited) => {
    // Base case
    if (visited[courseNum] == CURRENTLY_VISITING) return true;

    // Process node
    visited[courseNum] = CURRENTLY_VISITING;

    // Recurse on neighbors

    // If graph[courseNum] is undefined, set neighbors to be []
    const neighbors = graph[courseNum] || [];

    for (const neighbor of neighbors) {
        // This graph is directed, but it still CAN have cycles. For example, course 0
        // can require course 4, and course 4 can require course 0.
        // So, we must tracked visited nodes to prevent infinite loops.
        if (visited[neighbor] != PREVIOUSLY_VISITED) {
            if (checkIfHasCycle(neighbor, graph, visited)) return true;
        }
    }

    visited[courseNum] = PREVIOUSLY_VISITED;
    return false;
};

const canFinish = (numCourses, prerequisites) => {
    const graph = buildGraph(prerequisites);
    const visited = new Array(numCourses).fill(UNVISITED);

    for (let courseNum = 0; courseNum < numCourses; courseNum++) {
        const hasCycle = checkIfHasCycle(courseNum, graph, visited);

        if (hasCycle) return false;
    }

    return true;
};
