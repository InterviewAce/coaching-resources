const input = [
  [0, 1],
  [0, 2],
  // [2, 0],
  [1, 3],
  [1, 4],
  [3, 5],
  [4, 5],
];

const processDirectedGraph = (input) => {
  const graph = {};

  input.forEach((edge) => {
    const [start, end] = edge;

    if (!graph[start]) graph[start] = [];

    graph[start].push(end);
  });

  return graph;
};

const processUndirectedGraph = (input) => {
  const graph = {};

  input.forEach((edge) => {
    const [nodeOne, nodeTwo] = edge;

    if (!graph[nodeOne]) graph[nodeOne] = [];
    if (!graph[nodeTwo]) graph[nodeTwo] = [];

    graph[nodeOne].push(nodeTwo);
    graph[nodeTwo].push(nodeOne);
  });

  return graph;
};

// if (!nodeOne in graph)
// if (graph[nodeOne] === undefined)
// // best practice
// // if (!graph.hasOwnProperty(nodeOne));

// const nodeOneInGraph = graph.hasOwnProperty(nodeOne);

// if (!nodeOneInGraph)

// if (graph[nodeOne]) {
//   graph[nodeOne].push(nodeTwo);
// }
// else {
//   graph[nodeOne] = [nodeTwo];
// }

const graph = processDirectedGraph(input);
console.log(graph);
// const graph2 = processUndirectedGraph(input);
// console.log('Directed graph:');
// console.log(graph);
// console.log('Undirected graph:');
// console.log(graph2);
// console.log();

class Queue {
  constructor(array = []) {
    this.elements = array;

    this.startIdx = 0;
    this.endIdx = array.length - 1;
  }

  enqueue(newElement) {
    this.elements.push(newElement);
    this.endIdx++;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const returnElement = this.elements[this.startIdx];

    this.startIdx++;
    return returnElement;
  }

  isEmpty() {
    return this.size() <= 0;
  }

  size() {
    return this.endIdx - this.startIdx + 1;
  }
}

/*
{ '0': [ 1, 2 ], '1': [ 3, 4 ], '2': [ 0 ], '3': [ 5 ], '4': [ 5 ] }
queue = [3, 4, 0]
*/
const printInLevelOrder = (input, startNode) => {
  const graph = processDirectedGraph(input);

  const queue = new Queue();
  queue.enqueue(startNode);
  const visited = new Set();

  while (queue.size() > 0) {
    // remove node
    const node = queue.dequeue();

    // process node
    if (visited.has(node)) continue;
    visited.add(node);

    console.log(node);

    // add children
    const nodeInGraph = graph.hasOwnProperty(node);
    if (!nodeInGraph) continue;

    const neighbors = graph[node];
    neighbors.forEach((neighbor) => {
      queue.enqueue(neighbor);
    });
  }
};

// printInLevelOrder(input, 0);

const shortestPathBetweenNodes = (input, startNode, endNode) => {
  const graph = processDirectedGraph(input);

  const queue = new Queue();
  queue.enqueue({ node: startNode, distanceFromStart: 0 });

  while (queue.size() > 0) {
    const { node, distanceFromStart } = queue.dequeue();

    if (node === endNode) return distanceFromStart;

    const nodeInGraph = graph.hasOwnProperty(node);
    if (!nodeInGraph) continue;

    const neighbors = graph[node];
    neighbors.forEach((neighbor) => {
      queue.enqueue({
        node: neighbor,
        distanceFromStart: distanceFromStart + 1,
      });
    });
  }
};

console.log(shortestPathBetweenNodes(input, 0, 4));
