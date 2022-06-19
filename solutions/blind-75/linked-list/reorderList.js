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
        // We want to move the listNodeOne forward by one (i.e. listNodeOne = listNodeOne.next). However,
        // we also want to overwrite listNodeOne.next to be listNodeTwo. So, we store a reference to
        // listNodeOne.next BEFORE we overwrite it.
        let temporary = listOneNode.next;
        listOneNode.next = listTwoNode;
        listOneNode = temporary;

        // We do the same thing here but with listNodeTwo
        temporary = listTwoNode.next;
        listTwoNode.next = listOneNode;
        listTwoNode = temporary;
    }
};

const reorderList = (head) => {
    // We want to split the list into two halves, so we find the middle node
    const middleNode = getMiddleNode(head);

    // We reverse the second half of the list (i.e. n, n - 1, n - 2 ...)
    let reversedHalfNode = reverseList(middleNode);
    let firstHalfNode = head;

    // We then merge the first half of the list (i.e. 1, 2, 3, ...) and the second half of the list which was reversed (i.e. n, n - 1, n - 2 ...)
    mergeLists(firstHalfNode, reversedHalfNode);
};