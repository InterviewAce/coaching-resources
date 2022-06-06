const addTwoNumbers = (l1, l2) => {
    let carryOver = 0;

    const sentinel = new ListNode();

    let previous = sentinel;

    while (l1 || l2) {
        let value = carryOver;

        if (l1) {
            value += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            value += l2.val;
            l2 = l2.next;
        }

        if (value > 9) {
            carryOver = 1;
            value -= 10;
        } else {
            carryOver = 0
        }

        previous.next = new ListNode(value);
        previous = previous.next
    }

    if (carryOver) previous.next = new ListNode(1);

    return sentinel.next;
};