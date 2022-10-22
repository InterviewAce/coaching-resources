import heapq

"""
[[1,4,5],[1,3,4],[2,6]]
  ^       ^       ^

final linked list: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6


final_linked_list.next = newNode
"""

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        sentinel = ListNode()
        tail_of_merged_list = sentinel
        
        smallest_remaining_node_per_array = []
        smallest_remaining_node_per_array_size = 0

        # We're not totally sure why, but for this problem, we need to include the heap size
        # as the second element in each tuple of our heap (otherwise we get an issue
        # claiming that we cannot compare a ListNode with a ListNode).

        for head in lists:
            if head is not None:
                new_heap_element = (head.val, smallest_remaining_node_per_array_size, head)
                heapq.heappush(smallest_remaining_node_per_array, new_heap_element)
                smallest_remaining_node_per_array_size += 1

        while len(smallest_remaining_node_per_array) > 0:
            _a, _b, smallest_remaining_node = heapq.heappop(smallest_remaining_node_per_array)

            tail_of_merged_list.next = smallest_remaining_node
            tail_of_merged_list = tail_of_merged_list.next

            if smallest_remaining_node.next is not None:
                new_heap_element = (smallest_remaining_node.next.val, smallest_remaining_node_per_array_size, smallest_remaining_node.next)
                heapq.heappush(smallest_remaining_node_per_array, new_heap_element)
                smallest_remaining_node_per_array_size += 1

        return sentinel.next
