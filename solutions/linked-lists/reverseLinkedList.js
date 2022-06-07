const reverseList = (head) => {
    let current = head;
    let previous = null;

    while (current) {
        const temporary = current.next;
        current.next = previous;
        previous = current
        current = temporary;
    }

    return previous;
};