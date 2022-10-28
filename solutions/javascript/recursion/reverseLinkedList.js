const reverseList = (head) => {
    if (head === null || head.next === null) return head;

    const headOfRemainingList = reverseList(head.next);

    const tailOfReversedRemainingList = head.next;
    tailOfReversedRemainingList.next = head;
    head.next = null;

    return headOfRemainingList;
};
