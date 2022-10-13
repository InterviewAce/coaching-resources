const maxDepth = (root) => {
    if (!root) return 0;
    
    const leftSubtreeDepth = maxDepth(root.left);
    const rightSubtreeDepth = maxDepth(root.right);
    
    return Math.max(leftSubtreeDepth, rightSubtreeDepth) + 1;
};