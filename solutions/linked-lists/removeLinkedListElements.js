const removeElements = (head, val) => {
    sentinel = new ListNode(0, head);

    let previous = sentinel;
    let current = head;

    while (current) {
        if (current.val === val) previous.next = current.next;
        else previous = current;
        current = current.next;
    }

    return sentinel.next;
};