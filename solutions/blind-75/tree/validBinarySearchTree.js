const isValidBST = (root) => {
    const stack = [];
    
    let previousValue = null;
    
    // We use iterative inorder traversal of the BST
    while (stack.length > 0 || root) {
        
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        
        // We check if the next element in inorder traversal is smaller than the previous one
        if (previousValue != null) {
            const inOrder = root.val > previousValue;
            if (!inOrder) return false;
        }
        previousValue = root.val;
        
        root = root.right
    }
    
    return true;
};