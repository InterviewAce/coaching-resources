const printLinkedListInReverse = (head) => {
    if (head === null) return;

    printLinkedListInReverse(head.getNext());
    head.printValue();
};
