const middleNode = (head) => {
    nodeOne = head;
    nodeTwo = head;

    while (nodeTwo) {
        nodeTwo = nodeTwo.next;
        if (!nodeTwo) return nodeOne;
        nodeTwo = nodeTwo.next;
        nodeOne = nodeOne.next;
    }

    return nodeOne;
};