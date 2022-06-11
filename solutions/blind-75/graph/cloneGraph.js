const cloneGraph = function (node) {
  if (!node) {
    return node;
  }

  const queue = new Queue();
  queue.enqueue(node);

  const originalToCloneMap = {};
  originalToCloneMap[node.val] = new Node(node.val, []);

  while (queue.size() > 0) {
    // Remove from queue
    const curNode = queue.dequeue();

    // Process node
    const curNodeNeighbors = curNode.neighbors;

    // Add neighbors
    curNodeNeighbors.forEach((neighbor) => {
      const hasNeighborClone = originalToCloneMap.hasOwnProperty(neighbor.val);
      if (!hasNeighborClone) {
        queue.enqueue(neighbor);

        // Note, for each node, we must create an entry in our originalToCloneMap
        // BEFORE we process that node. This is so that other nodes are able to
        // add its cloned version as a neighbor. For example, suppose we have [1,2].
        // At node 1, we'll want to do something like node1Clone.neighbors.push(node2Clone).
        // Thus, we must create node2Clone when processing node1, we cannot just wait until
        // we process node2.
        originalToCloneMap[neighbor.val] = new Node(neighbor.val, []);
      }

      const curNodeClone = originalToCloneMap[curNode.val];
      const neighborClone = originalToCloneMap[neighbor.val];

      curNodeClone.neighbors.push(neighborClone);
    });
  }

  return originalToCloneMap[node.val];
};
