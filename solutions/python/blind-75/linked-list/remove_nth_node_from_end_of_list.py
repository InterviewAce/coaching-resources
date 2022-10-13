
class Solution:
    def get_node(self, head, n):
        nthNode = head
        
        for i in range(n - 1):
            nthNode = nthNode.next
        
        return nthNode
    
    def delete_next_node(self, prevNode):
        prevNode.next = prevNode.next.next
        
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # We use a dummy node to avoid having to check if the node to remove is the head
        sentinel = ListNode(0, head)
        
        # first and second pointer are n nodes apart
        firstPointer = sentinel
        secondPointer = self.get_node(head, n + 1)
        
        # We move both pointers until the second pointer reaches the end
        while secondPointer:
            firstPointer = firstPointer.next
            secondPointer = secondPointer.next
        
        # By this point, the first pointer will have n nodes in front of it
        self.delete_next_node(firstPointer)
        
        # We skip the dummy node to return the list
        return sentinel.next
    
    