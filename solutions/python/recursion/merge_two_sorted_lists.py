class Solution:
    def mergeTwoLists(self, list_one, list_two):
        if not list_one:
            return list_two
        if not list_two:
            return list_one
            
        if list_one.val < list_two.val:
            list_one.next = self.mergeTwoLists(list_one.next, list_two)
            return list_one
        
        list_two.next = self.mergeTwoLists(list_one, list_two.next)
        return list_two