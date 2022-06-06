const treeToDoublyList = (root) => {
    if (!root) return null;

    let head = null;
    let previous = null;

    stack = [];
    node = root;

    while (stack.length > 0 || node) {
        while (node) {
            stack.push(node);
            node = node.left;
        }

        node = stack.pop();

        if (!head) head = node;

        if (previous) previous.right = node;
        node.left = previous;

        previous = node;
        node = node.right;
    }

    head.left = previous;
    previous.right = head;

    return head;
};