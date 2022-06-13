const getNthNode = (sentinel, n) => {
    let nthNode = sentinel;

    for (let i = 0; i <= n; i++) {
        nthNode = nthNode.next;
    }

    return nthNode;
};

const removeNthFromEnd = (head, n) => {
    // We use a dummy node to avoid having to check if the node to remove is the head
    const sentinel = new ListNode(0, head);
    
    let nthNode = getNthNode(sentinel, n);

    let nPlusOneFromEnd = sentinel;

    // We move the nth node to the end while also moving the other node the same number of times
    while (nthNode) {
        nthNode = nthNode.next;
        nPlusOneFromEnd = nPlusOneFromEnd.next;
    }

    // The second node is now behind the node we want to delete, so we use it to delete the nth node from the end
    nPlusOneFromEnd.next = nPlusOneFromEnd.next.next;

    // We skip the dummy node to return the list
    return sentinel.next;
};