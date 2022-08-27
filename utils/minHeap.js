class MinHeap {
    constructor(elements = []) {
        this.elements = elements;
        this.comparisonFunction = (a, b) => a - b;

        this.FIRST_IDX = 0;

        for (let i = 0; i < this.elements.length; i += 1) {
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

    remove() {
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
        return (curIdx - 1) / 2;
    }

    getLeftChildIdx(parentIdx) {
        return parentIdx * 2;
    }

    getRightChildIdx(parentIdx) {
        return parentIdx * 2 + 1;
    }

    siftUp(curIdx) {
        while (curIdx > this.FIRST_IDX) {
            const parentIdx = this.getParentIdx(curIdx);

            const curElement = this.elements[curIdx];
            const parentElement = this.elements[parentIdx];

            const curSmallerThanParent = this.comparisonFunction(curElement, parentElement) < 0;

            if (curSmallerThanParent) {
                this.swapElements(curIdx, parentIdx);
                curIdx = parentIdx;
            } else break;
        }
    }

    getMinChild(curIdx) {
        const leftChildIdx = this.getLeftChildIdx(curIdx);
        const rightChildIdx = this.getRightChildIdx(curIdx);

        if (rightChildIdx >= this.size()) return leftChildIdx;

        const leftChild = this.elements[leftChildIdx];
        const rightChild = this.elements[rightChildIdx];

        if (leftChild < rightChild) return leftChildIdx;
        return rightChildIdx;
    }

    siftDown(curIdx) {
        while (this.getLeftChildIdx(curIdx) < this.size()) {
            const minChildIdx = this.getMinChild(curIdx);

            const curElement = this.elements[curIdx];
            const minChildElement = this.elements[minChildIdx];

            const curGreaterThanParent = this.comparisonFunction(curElement, minChildElement) > 0;
            if (curElement) this.swapElements(curIdx, minChildIdx);

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
console.log(minHeap.remove()); // 5
console.log(minHeap.remove()); // 15
console.log(minHeap.size()); // 4

console.log(minHeap);
