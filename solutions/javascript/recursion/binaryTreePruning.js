const pruneTree = (node) => {
    if (node === null) return null;

    const leftSubtreeRoot = pruneTree(node.left);
    const rightSubtreeRoot = pruneTree(node.right);

    node.left = leftSubtreeRoot;
    node.right = rightSubtreeRoot;

    const leftSubtreeHasAOne = leftSubtreeRoot !== null;
    const rightSubtreeHasAOne = rightSubtreeRoot !== null;

    const curSubtreeHasAOne = node.val === 1 || leftSubtreeHasAOne || rightSubtreeHasAOne;

    if (curSubtreeHasAOne) return node;

    return null;
};
