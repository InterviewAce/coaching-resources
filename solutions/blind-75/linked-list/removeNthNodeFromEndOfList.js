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
    let nodeBeforeNthFromEnd = sentinel;

    let leadNode = getNode(head, n + 1);
    
     // We move the nth node to the end while also moving the other node the same number of times
    while (leadNode) {
        leadNode = leadNode.next;
        nodeBeforeNthFromEnd = nodeBeforeNthFromEnd.next;
    }
    
    deleteNextNode(nodeBeforeNthFromEnd);
    
    // We skip the dummy node to return the list
    return sentinel.next
};