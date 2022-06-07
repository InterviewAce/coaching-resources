const hasCycle = (head) => {
    let nodeOne = head;
    let nodeTwo = head;

    while (nodeTwo) {
        nodeOne = nodeOne.next;
        nodeTwo = nodeTwo.next;
        if (!nodeTwo) return false;
        nodeTwo = nodeTwo.next;
        if (nodeOne === nodeTwo) return true;
    }

    return false;
};