const mergeTwoLists = (list1, list2) => {
    const sentinel = new ListNode();
    let previous = sentinel;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            previous.next = list1;
            list1 = list1.next;
        } else {
            previous.next = list2;
            list2 = list2.next;
        }
        previous = previous.next;
    }

    if (list1) previous.next = list1;
    else previous.next = list2

    return sentinel.next;
};