const buildGraph = (prerequisites) => {
    const graph = {};

    prerequisites.forEach(([course, prereq]) => {
        const prereqInGraph = graph.hasOwnProperty(prereq);

        if (!prereqInGraph) graph[prereq] = [];

        graph[prereq].push(course);
    });

    return graph;
};

const createArrayOfSize = (size, fillValue) => {
    return new Array(size).fill(fillValue);
};

const checkForCycle = (courseNum, graph, visited) => {
    if (visited[courseNum] == -1) return true;
    visited[courseNum] = -1;

    const neighbours = graph[courseNum] || [];

    for (const neighbor of neighbours) {
        // This graph is directed, but it still CAN have cycles. For example, course 0
        // can require course 4, and course 4 can require course 0.
        // So, we must tracked visited nodes to prevent infinite loops.
        if (visited[n] != 1) {
            if (checkForCycle(neighbor, graph, visited)) return true;
        }
    }

    visited[courseNum] = 1;
    return false;
};

const canFinish = (numCourses, prerequisites) => {
    const graph = buildGraph(prerequisites);
    const visited = createArrayOfSize(numCourses, 0); // 0 means unvisited

    for (let courseNum = 0; courseNum < numCourses; courseNum++) {
        const hasCycle = checkForCycle(courseNum, graph, visited);

        if (hasCycle) return false;
    }

    return true;
};
