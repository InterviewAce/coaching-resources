
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        p_in_left_subtree = p.val < root.val
        q_in_left_subtree = q.val < root.val

        if p_in_left_subtree and q_in_left_subtree:
            return self.lowestCommonAncestor(root.left, p, q)
        
        p_in_right_subtree = p.val > root.val
        q_in_right_subtree = q.val > root.val

        if p_in_right_subtree and q_in_right_subtree:
            return self.lowestCommonAncestor(root.right, p, q)
        
        return root