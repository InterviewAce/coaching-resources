const getSubtreeIsBalancedAndHeight = (node) => {
    // Base case
    if (node === null) return { isBalanced: true, subtreeHeight: 0 };

    const { isBalanced: leftSubtreeIsBalanced, subtreeHeight: leftSubtreeHeight } =
        getSubtreeIsBalancedAndHeight(node.left);
    const { isBalanced: rightSubtreeIsBalanced, subtreeHeight: rightSubtreeHeight } =
        getSubtreeIsBalancedAndHeight(node.right);

    const curSubtreeIsBalanced = Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1;
    const isBalanced = leftSubtreeIsBalanced && rightSubtreeIsBalanced && curSubtreeIsBalanced;

    const curSubtreeHeight = Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;

    return {
        isBalanced,
        subtreeHeight: curSubtreeHeight,
    };
};

const isBalanced = (node) => {
    const { isBalanced, subtreeHeight } = getSubtreeIsBalancedAndHeight(node);

    return isBalanced;
};
