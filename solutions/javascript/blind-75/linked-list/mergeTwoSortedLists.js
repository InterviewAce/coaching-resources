const mergeTwoLists = (listOne, listTwo) => {
    const sentinel = new ListNode();
    let tailOfMergedList = sentinel;

    let curNodeInListOne = listOne;
    let curNodeInListTwo = listTwo;

    while (curNodeInListOne && curNodeInListTwo) {
        if (curNodeInListOne.val < curNodeInListTwo.val) {
            tailOfMergedList.next = curNodeInListOne;
            curNodeInListOne = curNodeInListOne.next;
        } else {
            tailOfMergedList.next = curNodeInListTwo;
            curNodeInListTwo = curNodeInListTwo.next;
        }
        tailOfMergedList = tailOfMergedList.next;
    }

    if (curNodeInListOne) tailOfMergedList.next = curNodeInListOne;
    if (curNodeInListTwo) tailOfMergedList.next = curNodeInListTwo;

    return sentinel.next;
};
