const isSameTree = (p, q) => {
    if (!p && !q) return true;
    // If either p or q is null, then we know there is a nonnull tree and a null tree, so we return false
    if (!p || !q) return false;
    
    const sameRootVal = p.val === q.val;
    
    const sameLeftSubtree = isSameTree(p.left, q.left);
    const sameRightSubtree = isSameTree(p.right, q.right);
    
    return sameRootVal && sameLeftSubtree && sameRightSubtree;
};