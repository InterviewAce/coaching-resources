// https://www.npmjs.com/package/heap-js
const heapJS = require('heap-js');

const compareNodes = (nodeOne, nodeTwo) => {
    const valueOne = nodeOne.val;
    const valueTwo = nodeTwo.val;
    
    return valueOne - valueTwo;
};

const mergeKLists = (lists) => {
    const sentinel = new ListNode();
    const mergedTail = sentinel;
    const headsOfLists = new heapJS.Heap(compareNodes);
    
    for (const head of lists) {
        if (head) headsOfLists.push(head);
    }
    
    while (headsOfLists.size() > 0) {
        mergedTail.next = headsOfLists.pop();
        mergedTail = mergedTail.next;
        
        if (mergedTail.next) headsOfLists.push(mergedTail.next);
    }
    
    return sentinel.next;
};