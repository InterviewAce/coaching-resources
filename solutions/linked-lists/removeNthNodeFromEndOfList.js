const removeNthFromEnd = (head, n) => {
    const sentinel = new ListNode(0, head);
    let first = sentinel;
    let second = sentinel;

    for (let i = 0; i <= n; i++) {
        first = first.next;
    }

    while (first) {
        first = first.next;
        second = second.next;
    }

    second.next = second.next.next;

    return sentinel.next;
};