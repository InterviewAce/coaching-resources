/*
When passing a comparisonFunction, your comparisonFunction should take in
two elements a, b and return a positive number if a is greater than b,
a negative number if a is less than b, and 0 if a is equal to b.

For example, (a, b) => a - b works if we are just dealing with two numbers.
*/

class MinHeap {
    constructor(elements = [], comparisonFunction = null) {
        this.elements = elements;

        this.comparisonFunction =
            comparisonFunction !== null ? comparisonFunction : (a, b) => a - b;

        this.FIRST_IDX = 0;

        for (let i = this.FIRST_IDX; i < this.elements.length; i += 1) {
            this.siftDown(i);
        }
    }

    push(value) {
        this.elements.push(value);

        const lastIdx = this.size() - 1;
        this.siftUp(lastIdx);
    }

    peek() {
        if (this.size() === 0) return null;
        return this.elements[this.FIRST_IDX];
    }

    swapElements(i, j) {
        const temp = this.elements[i];
        this.elements[i] = this.elements[j];
        this.elements[j] = temp;
    }

    pop() {
        if (this.size() === 0) return null;

        const lastIdx = this.size() - 1;
        this.swapElements(this.FIRST_IDX, lastIdx);

        const elementToReturn = this.elements.pop();
        this.siftDown(this.FIRST_IDX);

        return elementToReturn;
    }

    size() {
        return this.elements.length;
    }

    getParentIdx(curIdx) {
        return Math.floor((curIdx - 1) / 2);
    }

    getLeftChildIdx(parentIdx) {
        // TODO: change?
        return parentIdx * 2 + 1;
    }

    getRightChildIdx(parentIdx) {
        return parentIdx * 2 + 2;
    }

    siftUp(curIdx) {
        while (curIdx > this.FIRST_IDX) {
            const parentIdx = this.getParentIdx(curIdx);

            const curElement = this.elements[curIdx];
            const parentElement = this.elements[parentIdx];

            if (this.comparisonFunction(curElement, parentElement) < 0) {
                this.swapElements(curIdx, parentIdx);
                curIdx = parentIdx;
            } else break;
        }
    }

    getMinChildIdx(curIdx) {
        // We assume that at least one child exists

        const leftChildIdx = this.getLeftChildIdx(curIdx);
        const rightChildIdx = this.getRightChildIdx(curIdx);

        if (rightChildIdx >= this.size()) return leftChildIdx;

        const leftChild = this.elements[leftChildIdx];
        const rightChild = this.elements[rightChildIdx];

        if (this.comparisonFunction(leftChild, rightChild) < 0) return leftChildIdx;
        return rightChildIdx;
    }

    siftDown(curIdx) {
        while (this.getLeftChildIdx(curIdx) < this.size()) {
            const minChildIdx = this.getMinChildIdx(curIdx);

            const curElement = this.elements[curIdx];
            const minChildElement = this.elements[minChildIdx];

            if (this.comparisonFunction(minChildElement, curElement) < 0)
                this.swapElements(curIdx, minChildIdx);
            else break;

            curIdx = minChildIdx;
        }
    }

    // Use this for debugging purposes
    getElements() {
        return this.elements;
    }
}

const minHeap = new MinHeap([90, 5, 100]);

minHeap.push(15);
minHeap.push(25);
minHeap.push(35);

console.log(minHeap.getElements()); // [5,15,35,90,25,100]
console.log(minHeap.size()); // 6
console.log(minHeap.pop()); // 5
console.log(minHeap.pop()); // 15
console.log(minHeap.size()); // 4

console.log(minHeap);

// const minHeap = new MinHeap([2, 3]);
// minHeap.push(1);
// console.log(minHeap.pop());
