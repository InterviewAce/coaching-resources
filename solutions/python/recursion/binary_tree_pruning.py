class Solution:
    def pruneTree(self, node: Optional[TreeNode]) -> Optional[TreeNode]:
        if node is None:
            return None
        
        left_subtree_root = self.pruneTree(node.left)
        right_subtree_root = self.pruneTree(node.right)
        
        node.left = left_subtree_root
        node.right = right_subtree_root

        left_subtree_has_a_one = left_subtree_root is not None
        right_subtree_has_a_one = right_subtree_root is not None

        cur_subtree_has_a_one = node.val == 1 or left_subtree_has_a_one or right_subtree_has_a_one

        if cur_subtree_has_a_one:
            return node

        return None
        