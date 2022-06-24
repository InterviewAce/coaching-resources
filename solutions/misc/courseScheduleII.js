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

  const validCourseSequence = getValidOrdering(numCourses, graph, indegreeMap);

  if (validCourseSequence.length !== numCourses) return [];
  return validCourseSequence;
};
