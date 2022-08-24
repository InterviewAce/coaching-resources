const mergeTwoLists = (listOne, listTwo) => {
    const sentinel = new ListNode();
    let previous = sentinel;

    while (listOne && listTwo) {
        if (listOne.val < listTwo.val) {
            previous.next = listOne;
            listOne = listOne.next;
        } else {
            previous.next = listTwo;
            listTwo = listTwo.next;
        }
        previous = previous.next;
    }

    if (listOne) previous.next = listOne;
    if (listTwo) previous.next = listTwo;

    return sentinel.next;
};