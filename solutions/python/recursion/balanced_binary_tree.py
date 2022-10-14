class Solution:
    def get_subtree_is_balanced_and_height(self, node):
        # Base case
        if node is None:
            return True, 0

        left_subtree_is_balanced, left_subtree_height = self.get_subtree_is_balanced_and_height(
            node.left)
        right_subtree_is_balanced, right_subtree_height = self.get_subtree_is_balanced_and_height(
            node.right)

        cur_subtree_is_balanced = abs(left_subtree_height - right_subtree_height) <= 1
        is_balanced = left_subtree_is_balanced and right_subtree_is_balanced and cur_subtree_is_balanced

        cur_subtree_height = max(left_subtree_height, right_subtree_height) + 1

        return is_balanced, cur_subtree_height

    def isBalanced(self, node: Optional[TreeNode]) -> bool:
        is_balanced, _subtree_height = self.get_subtree_is_balanced_and_height(node)

        return is_balanced