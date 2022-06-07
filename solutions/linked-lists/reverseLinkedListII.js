const reverseBetween = (head, left, right) => {
    if (!head) return null;

    let current = head;
    let previous = null;

    for (let i = 0; i < left - 1; i++) {
        previous = current;
        current = current.next;
        right--;
    }

    front = current;
    end = previous;

    for (let i = 0; i < right; i++) {
        temporary = current.next;
        current.next = previous;
        previous = current;
        current = temporary;
    }

    if (end) end.next = previous;
    else head = previous;

    front.next = current;

    return head;
};