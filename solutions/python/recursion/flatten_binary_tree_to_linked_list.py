class Solution:
    def flatten(self, node: Optional[TreeNode]) -> None:
        if node is None:
            return None

        is_leaf = node.left is None and node.right is None
        if is_leaf:
            return node

        left_subtree_linked_list_tail = self.flatten(node.left)
        right_subtree_linked_list_tail = self.flatten(node.right)

        left_subtree_linked_list_head = node.left
        right_subtree_linked_list_head = node.right

        if left_subtree_linked_list_tail is not None:
            node.right = left_subtree_linked_list_head
            node.left = None

            left_subtree_linked_list_tail.right = right_subtree_linked_list_head

        if right_subtree_linked_list_tail is not None:
            return right_subtree_linked_list_tail

        return left_subtree_linked_list_tail
        