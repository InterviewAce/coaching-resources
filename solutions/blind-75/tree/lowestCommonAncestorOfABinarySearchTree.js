const lowestCommonAncestor = (root, p, q) => {
    const parentVal = root.val;
    const pVal = p.val;
    const qVal = q.val;

    const pGreaterThanParent = pVal > parentVal;
    const qGreaterThanParent = qVal > parentVal;
    const bothGreaterThanParent = pGreaterThanParent && qGreaterThanParent;
    if (bothGreaterThanParent) {
        return lowestCommonAncestor(root.right, p, q);
    }
    
    const pLessThanParent = pVal < parentVal;
    const qLessThanParent = qVal < parentVal;
    const bothLessThanParent = pLessThanParent && qLessThanParent;
    if (bothLessThanParent) {
        return lowestCommonAncestor(root.left, p, q);
    }
    
    return root;
};