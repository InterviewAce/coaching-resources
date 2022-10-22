const flatten = (node) => {
    if (node === null) return null;

    const isLeaf = node.left === null && node.right === null;
    if (isLeaf) return node;

    const leftSubtreeLinkedListTail = flatten(node.left);
    const rightSubtreeLinkedListTail = flatten(node.right);

    const leftSubtreeLinkedListHead = node.left;
    const rightSubtreeLinkedListHead = node.right;

    if (leftSubtreeLinkedListTail !== null) {
        node.right = leftSubtreeLinkedListHead;
        node.left = null;

        leftSubtreeLinkedListTail.right = rightSubtreeLinkedListHead;
    }

    if (rightSubtreeLinkedListTail !== null) return rightSubtreeLinkedListTail;

    return leftSubtreeLinkedListTail;
};
