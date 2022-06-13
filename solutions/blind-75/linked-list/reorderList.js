const getMiddleNode = (head) => {
    let slowNode = head;
    let fastNode = head;

    // The slow node will reach the middle of the list when the fast node reaches the end
    while (fastNode) {
        fastNode = fastNode.next;
        if (!fastNode) return slowNode;
        fastNode = fastNode.next;
        slowNode = slowNode.next;
    }

    return slowNode;
};

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

const mergeLists = (listOneNode, listTwoNode) => {
    while (listTwoNode.next) {
        let temporary = listOneNode.next;
        listOneNode.next = listTwoNode;
        listOneNode = temporary;

        temporary = listTwoNode.next;
        listTwoNode.next = listOneNode;
        listTwoNode = temporary;
    }
};

const reorderList = (head) => {
    const middleNode = getMiddleNode(head);

    let reversedHalfNode = reverseList(middleNode);
    let firstHalfNode = head;

    const reorderedList = mergeLists(firstHalfNode, reversedHalfNode);

    return reorderedList;
};