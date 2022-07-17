const buildGraph = (numNodes, prerequisites) => {
    const graph = {};

    for (let node = 0; node < numNodes; node++) {
        graph[node] = [];
    }

    prerequisites.forEach(([node, prerequisite]) => {
        graph[prerequisite].push(node);
    });

    return graph;
};

const buildIndegreeMap = (numNodes, prerequisites) => {
    const indegreeMap = {};

    for (let node = 0; node < numNodes; node++) {
        indegreeMap[node] = 0;
    }

    prerequisites.forEach(([node, prerequisite]) => {
        indegreeMap[node]++;
    });

    return indegreeMap;
};

const getNodesWithIndegreeZero = (numCourses, indegreeMap) => {
    const zeroIndegreeCourses = new Queue();

    for (let course = 0; course < numCourses; course++) {
        const indegree = indegreeMap[course];

        if (indegree === 0) {
            zeroIndegreeCourses.enqueue(course);
        }
    }

    return zeroIndegreeCourses;
};

const getValidOrdering = (numNodes, graph, indegreeMap) => {
    const zeroIndegreeQueue = getNodesWithIndegreeZero(numNodes, indegreeMap);
    const validOrdering = [];

    // We do NOT have any visited checks in this solution. Why don't we need them?
    // Note that this graph is directed, but it certainly CAN have cycles. The problem
    // even tells us to return [] when we have a cycle.
    // Consider a simple cycle. B depends on A, C depends on B, and A depends on C.
    // What would happen with these nodes? Well, they would never be added to our
    // `zeroIndegreeQueue`.

    // This is because it is impossible for any of them to reach
    // indegree 0. Consider A. A has an inbound edge from C. To make A reach indegree
    // 0, we must first make C reach indegree 0. C has an inbound edge from B. To
    // make C reach indegree 0, we must first make B reach indegree 0. B has an
    // inbound edge from A. To make B reach indegree 0, we must first make A reach
    // indegree 0. So, to make A reach indegree 0, we must first make A reach indegree 0.
    // Clearly, this is impossible. We can't make A reach indegree 0 BEFORE A has
    // indegree 0.

    // In the way we have written our topological sort, we ONLY traverse nodes once
    // they have indegree 0. Thus, we will NEVER traverse nodes that are a part of a
    // cycle. For that reason, we do NOT need to have a visited set.
    while (zeroIndegreeQueue.size() > 0) {
        const node = zeroIndegreeQueue.dequeue();

        // Process node
        validOrdering.push(node);

        // Add neighbors
        const neighbors = graph[node];

        neighbors.forEach((neighbor) => {
            indegreeMap[neighbor] -= 1;

            if (indegreeMap[neighbor] === 0) {
                zeroIndegreeQueue.enqueue(neighbor);
            }
        });
    }

    return validOrdering;
};

const findOrder = (numCourses, prerequisites) => {
    const graph = buildGraph(numCourses, prerequisites);
    const indegreeMap = buildIndegreeMap(numCourses, prerequisites);

    const validCourseSequence = getValidOrdering(
        numCourses,
        graph,
        indegreeMap,
    );

    if (validCourseSequence.length !== numCourses) return [];
    return validCourseSequence;
};
