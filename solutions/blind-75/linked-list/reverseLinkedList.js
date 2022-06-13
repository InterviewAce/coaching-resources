const reverseList = (head) => {
    let curNode = head;
    let prevNode = null;

    while (curNode) {
        // Keep the next node so that you don't lose it when overwriting it
        const nextNode = curNode.next;

        // Set the current node's next neighbor to previous node
        curNode.next = prevNode;

        // Move forward in the list
        prevNode = curNode;
        curNode = nextNode;
    }

    return prevNode;
};