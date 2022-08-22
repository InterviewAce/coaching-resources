const getNode = (head, n) => {
    let nthNode = head;
    
    for (let i = 0; i < n - 1; i++) {
        nthNode = nthNode.next;
    }
    
    return nthNode;
};

const deleteNextNode = (prevNode) => {
    prevNode.next = prevNode.next.next;
};

const removeNthFromEnd = (head, n) => {
    // We use a dummy node to avoid having to check if the node to remove is the head
    const sentinel = new ListNode(0, head);
    
    // first and second pointer are n nodes apart
    let firstPointer = sentinel;
    let secondPointer = getNode(head, n + 1);
    
    // We move both pointers until the second pointer reaches the end
    while (secondPointer) {
        firstPointer = firstPointer.next;
        secondPointer = secondPointer.next;
    }
    
    // By this point, the first pointer will have n nodes in front of it
    deleteNextNode(firstPointer);
    
    // We skip the dummy node to return the list
    return sentinel.next
};