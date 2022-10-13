const invertTree = (root) => {
    if (!root) return null;
    
    const invertedRightSubtree = invertTree(root.right);
    const invertedLeftSubtree = invertTree(root.left);
    
    root.left = invertedRightSubtree;
    root.right = invertedLeftSubtree;
    
    return root;
};