const copyRandomList = (head) => {
    let copies = new Map();
    copies.set(null, null);

    let current = head;

    while (current) {
        const copy = new Node(current.val);
        copies.set(current, copy);
        current = current.next;
    }

    current = head;

    while (current) {
        const copy = copies.get(current);
        copy.next = copies.get(current.next);
        copy.random = copies.get(current.random);
        current = current.next;
    }

    return copies.get(head);
};

/*
O(1) space solution. Honestly, don't even worry about knowing how to do this.
*/
const copyRandomList = (head) => {
    if (!head) return null;

    let current = head;

    while (current) {
        let copy = new Node(current.val, current.next, null);
        copy.next = current.next;
        current.next = copy;
        current = current.next;
        current = current.next;
    }
    
    current = head;

    while(current) {
        current.next.random = current.random ? current.random.next : null;
        current = current.next.next;
    }
    
    current = head;
    let copy = head.next;
    let copyPointer = copy;

    while(current) {
        current.next = current.next.next;
        current = current.next;
        copyPointer.next = copyPointer.next ? copyPointer.next.next : null;
        copyPointer = copyPointer.next;
    }
    
    return copy;
};