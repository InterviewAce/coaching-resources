const lowestCommonAncestor = (root, p, q) => {
    const pInLeftSubtree = p.val < root.val;
    const qInLeftSubtree = q.val < root.val;
    if (pInLeftSubtree && qInLeftSubtree) {
        return lowestCommonAncestor(root.left, p, q);
    }
    
    const pInRightSubtree = p.val > root.val;
    const qInRightSubtree = q.val > root.val;
    if (pInRightSubtree && qInRightSubtree) {
        return lowestCommonAncestor(root.right, p, q);
    }
    
    return root;
};