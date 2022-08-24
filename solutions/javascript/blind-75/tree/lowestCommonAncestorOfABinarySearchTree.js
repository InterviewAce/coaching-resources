const lowestCommonAncestor = (root, p, q) => {
    const pLessThanParent = p.val < root.val;
    const qLessThanParent = q.val < root.val;
    if (pLessThanParent && qLessThanParent) {
        return lowestCommonAncestor(root.left, p, q);
    }
    
    const pGreaterThanParent = p.val > root.val;
    const qGreaterThanParent = q.val > root.val;
    if (pGreaterThanParent && qGreaterThanParent) {
        return lowestCommonAncestor(root.right, p, q);
    }
    
    return root;
};