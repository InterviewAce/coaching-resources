const mergeTwoLists = (listOne, listTwo) => {
    if (listOne === null) return listTwo;
    if (listTwo === null) return listOne;

    if (listOne.val < listTwo.val) {
        listOne.next = mergeTwoLists(listOne.next, listTwo);
        return listOne;
    }

    listTwo.next = mergeTwoLists(listOne, listTwo.next);
    return listTwo;
};
