

class Solution:
    def get_middle_node(self, head):
        slow_node = head
        fast_node = head

        # The slow node will reach the middle of the list when the fast node reaches the end
        while fast_node:
            fast_node = fast_node.next
            if not fast_node: return slow_node
            fast_node = fast_node.next
            slow_node = slow_node.next

        return slow_node

    def reverse_list(self, head):
        curNode = head
        prevNode = None

        while curNode:
            # Keep the next node so that you don't lose it when overwriting it
            nextNode = curNode.next

            # Set the current node's next neighbor to previous node
            curNode.next = prevNode

            # Move forward in the list
            prevNode = curNode
            curNode = nextNode

        return prevNode

    def merge_lists(self, list_one_node, list_two_node):
        while list_two_node.next:
            # We want to move the list_one_node forward by one (i.e. list_one_node = list_one_node.next). However,
            # we also want to overwrite list_one_node.next to be list_two_node. So, we store a reference to
            # list_one_node.next BEFORE we overwrite it.
            temporary = list_one_node.next
            list_one_node.next = list_two_node
            list_one_node = temporary

            # We do the same thing here but with list_two_node
            temporary = list_two_node.next
            list_two_node.next = list_one_node
            list_two_node = temporary

    def reorderList(self, head: Optional[ListNode]) -> None:
        # We want to split the list into two halves, so we find the middle node
        middleNode = self.get_middle_node(head)

        # We reverse the second half of the list (i.e. n, n - 1, n - 2 ...)
        reversedHalfNode = self.reverse_list(middleNode)
        firstHalfNode = head

        # We then merge the first half of the list (i.e. 1, 2, 3, ...) and the second half of the list which was reversed (i.e. n, n - 1, n - 2 ...)
        self.merge_lists(firstHalfNode, reversedHalfNode)

    

    