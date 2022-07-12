const hasCycle = (head) => {
    let slowNode = head;
    let fastNode = head;

    while (fastNode) {
        // Move the slow node once
        slowNode = slowNode.next;
        // Move the fast node twice, checking if it we can do so
        fastNode = fastNode.next?.next;

        // If the slow node and the fast node have met, this list is a cycle
        if (slowNode === fastNode) return true;
    }

    // If you have reached the end, this list is not a cycle
    return false;
};