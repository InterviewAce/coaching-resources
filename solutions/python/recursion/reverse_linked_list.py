class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None or head.next is None:
            return head
        
        head_of_remaining_list = self.reverseList(head.next)
        
        tail_of_reversed_remaining_list = head.next
        
        tail_of_reversed_remaining_list.next = head
        head.next = None
        
        return head_of_remaining_list