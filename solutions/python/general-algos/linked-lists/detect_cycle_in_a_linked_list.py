class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow_pointer = head
        fast_pointer = head

        while fast_pointer:
            # Move the slow pointer once
            slow_pointer = slow_pointer.next
            # Move the fast pointer twice, checking if it we can do so
            fast_pointer = fast_pointer.next.next if fast_pointer.next else None

            # If the slow pointer and the fast pointer point to the same node, this list is a cycle
            if slow_pointer == fast_pointer and slow_pointer is not None:
                return True

        # If you have reached the end, this list is not a cycle
        return False