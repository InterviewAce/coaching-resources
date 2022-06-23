// https://www.npmjs.com/package/heap-js
const heapJS = require('heap-js');

const findKthLargest = (nums, k) => {
    const kLargest = new heapJS.Heap();
    
    for (const num of nums) {
        kLargest.push(num);
        if (kLargest.size() > k) {
            kLargest.pop();
        }
    }
    
    const kthLargest = kLargest.pop();
    return kthLargest;
};