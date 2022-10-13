
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        left_subtree_depth = self.maxDepth(root.left)
        right_subtree_depth = self.maxDepth(root.right)
        
        return max(left_subtree_depth, right_subtree_depth) + 1