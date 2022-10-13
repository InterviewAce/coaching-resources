
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q:
            return True
        if not p or not q:
            return False
        
        same_root_val = p.val == q.val
        
        same_left_subtree = self.isSameTree(p.left, q.left)
        same_right_subtree = self.isSameTree(p.right, q.right)
        
        return same_root_val and same_left_subtree and same_right_subtree