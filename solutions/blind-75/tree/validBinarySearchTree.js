const isValidBST = (root) => {
    const stack = [];

    let node = root;
    
    let previousValue = null;
    
    // We use iterative inorder traversal of the BST
    while (stack.length > 0 || node) {
        
        while (node) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        
        // We check if the next element in inorder traversal is smaller than the previous one
        if (previousValue != null) {
            const inOrder = node.val > previousValue;
            if (!inOrder) return false;
        }
        previousValue = node.val;
        
        node = node.right
    }
    
    return true;
};