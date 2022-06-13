const mergeTwoLists = (list1, list2) => {
    // We start by creating a dummy node so that we can add new nodes without checking for null
    const sentinel = new ListNode();

    let endOfMergedList = sentinel;

    const listOneNode = list1;
    const listTwoNode = list2;

    while (listOneNode && listTwoNode) {
        if (listOneNode.val < listTwoNode.val) {
            endOfMergedList.next = listOneNode;
            listOneNode = listOneNode.next;
        } else {
            endOfMergedList.next = listTwoNode;
            listTwoNode = listTwoNode.next;
        }

        endOfMergedList = endOfMergedList.next;
    }

    if (listOneNode) {
        endOfMergedList.next = listOneNode;
    } else {
        endOfMergedList.next = listTwoNode;
    }

    // We skip the dummy node to return the beginning of the merged list
    return sentinel.next;
};