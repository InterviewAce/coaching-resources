/*
class Solution:
    def add(self, list_one, list_two, result=ListNode(), carry_over=0):
        if list_one is None and list_two is None and carry_over == 0:
            return result
        
        current_sum = carry_over

        if list_one:
            current_sum += list_one.val
            list_one = list_one.next
            
        if list_two:
            current_sum += list_two.val
            list_two = list_two.next
            
        # If current sum is 13, we convert this to carry_over=1, remainder=3
        carry_over, remainder = divmod(current_sum, 10)
        result.next = ListNode(remainder)
        
        self.add(list_one, list_two, result.next, carry_over)
        
        return result.next

    
    def addTwoNumbers(self, list_one: ListNode, list_two: ListNode) -> ListNode:            
        return self.add(list_one, list_two)

*/
const add = (listOne, listTwo, result = new ListNode(), carryOver = 0) => {
    if (listOne === null && listTwo === null && carryOver === 0) {
        return result;
    }

    let currentSum = carryOver;

    if (listOne) {
        currentSum += listOne.val;
        listOne = listOne.next;
    }

    if (listTwo) {
        currentSum += listTwo.val;
        listTwo = listTwo.next;
    }

    // If current sum is 13, we convert this to carryOver=1, remainder=3
    carryOver = Math.floor(currentSum / 10);
    const remainder = currentSum % 10;

    result.next = new ListNode(remainder);

    add(listOne, listTwo, result.next, carryOver);

    return result.next;
};

const addTwoNumbers = (listOne, listTwo) => {
    return add(listOne, listTwo);
};
