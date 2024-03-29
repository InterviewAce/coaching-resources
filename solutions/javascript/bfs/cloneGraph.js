const cloneGraph = function (startNode) {
    if (!startNode) return startNode;

    const queue = new Queue();
    queue.enqueue(startNode);

    const originalToCloneMap = {};
    originalToCloneMap[startNode.val] = new Node(startNode.val, []);

    while (queue.size() > 0) {
        // Remove from queue
        const node = queue.dequeue();

        // Process node
        // Note: there is no process node step for this problem.

        // Add neighbors
        for (const neighbor of node.neighbors) {
            const hasNeighborClone = originalToCloneMap.hasOwnProperty(
                neighbor.val,
            );

            // This is an undirected graph, so cycles are definitely possible. This means that
            // we could traverse this graph forever, meaning we must keep track of which nodes
            // we visit. This `!hasNeighborClone` check is implicitly checking if the current
            // neighbor node has already been visited. This is because any time we visit a node,
            // we create an entry for it in `originalToCloneMap`. Thus, if `originalToCloneMap`
            // has no key for `neighbor.val` then we know that the current neighbor has NOT
            // been visited yet. So, this functions as our visited check.
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

            const curNodeClone = originalToCloneMap[node.val];
            const neighborClone = originalToCloneMap[neighbor.val];

            curNodeClone.neighbors.push(neighborClone);
        }
    }

    return originalToCloneMap[startNode.val];
};
