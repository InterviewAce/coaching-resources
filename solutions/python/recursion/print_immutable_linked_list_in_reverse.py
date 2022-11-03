class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        if head is None:
            return
        
        self.printLinkedListInReverse(head.getNext())
        head.printValue()