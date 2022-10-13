class Solution:
    def mergeTwoLists(self, list_one: Optional[ListNode], list_two: Optional[ListNode]) -> Optional[ListNode]:
        sentinel = ListNode()
        tail_of_merged_list = sentinel

        cur_node_in_list_one = list_one
        cur_node_in_list_two = list_two

        while cur_node_in_list_one and cur_node_in_list_two:
            if cur_node_in_list_one.val < cur_node_in_list_two.val:
                tail_of_merged_list.next = cur_node_in_list_one
                cur_node_in_list_one = cur_node_in_list_one.next
            else:
                tail_of_merged_list.next = cur_node_in_list_two
                cur_node_in_list_two = cur_node_in_list_two.next
            tail_of_merged_list = tail_of_merged_list.next

        if cur_node_in_list_one:
            tail_of_merged_list.next = cur_node_in_list_one
        if cur_node_in_list_two:
            tail_of_merged_list.next = cur_node_in_list_two

        return sentinel.next