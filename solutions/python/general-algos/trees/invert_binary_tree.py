
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        
        inverted_right_subtree = self.invertTree(root.right)
        inverted_left_subtree = self.invertTree(root.left)
        
        root.left = inverted_right_subtree
        root.right = inverted_left_subtree
        
        return root