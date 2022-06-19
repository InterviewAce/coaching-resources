const isSameTree = (rootOne, rootTwo) => {
    if (!rootOne) return !rootTwo;
    if (!rootTwo) return !rootOne;

    const rootsHaveSameValue = rootOne.val == rootTwo.val;
    if (rootsHaveSameValue) {
        const areLeftSubtreeSame = isSameTree(rootOne.left, rootTwo.left);
        const areRightSubtreeSame = isSameTree(rootOne.right, rootTwo.right);
        const areSubtreesSame = areLeftSubtreeSame && areRightSubtreeSame;
        return areSubtreesSame;
    }

    return false;
}

const isSubtree = (root, subRoot) => {
    if (!root) return false;
    
    const areSameTrees = isSameTree(root, subRoot);
    if (areSameTrees) return true;
    
    const isSubtreeOfLeftSubtree = isSubtree(root.left, subRoot);
    const isSubtreeOfRightSubtree = isSubtree(root.right, subRoot);
    const isSubtreeOfASubtree = isSubtreeOfLeftSubtree || isSubtreeOfRightSubtree;
    return isSubtreeOfASubtree;
};