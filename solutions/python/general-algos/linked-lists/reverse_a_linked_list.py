
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        cur_node = head
        prev_node = None

        while cur_node:
            # Keep the next node so that you don't lose it when overwriting it
            next_node = cur_node.next

            # Set the current node's next neighbor to previous node
            cur_node.next = prev_node

            # Move forward in the list
            prev_node = cur_node
            cur_node = next_node

        return prev_node