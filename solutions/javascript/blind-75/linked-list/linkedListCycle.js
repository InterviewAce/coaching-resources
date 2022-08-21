const hasCycle = (head) => {
    let slowPointer = head;
    let fastPointer = head;

    while (fastPointer) {
        // Move the slow pointer once
        slowPointer = slowPointer.next;
        // Move the fast pointer twice, checking if it we can do so
        fastPointer = fastPointer.next?.next;

        // If the slow pointer and the fast pointer point to the same node, this list is a cycle
        if (slowPointer === fastPointer) return true;
    }

    // If you have reached the end, this list is not a cycle
    return false;
};