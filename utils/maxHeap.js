class MaxHeap {
    constructor(elements = []) {
        this.elements = elements;
        this.shouldSwap = (lowerElement, higherElement) => {
            // Max element should be at the top, so if the lower element is larger,
            // we should swap
            if (lowerElement > higherElement) return true;
            return false;
        };

        this.FIRST_IDX = 0;

        for (let i = this.FIRST_IDX; i <= this.FIRST_IDX; i += 1) {
            console.log(this.elements);
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

            if (this.shouldSwap(curElement, parentElement)) {
                this.swapElements(curIdx, parentIdx);
                curIdx = parentIdx;
            } else break;
        }
    }

    getMaxChildIdx(curIdx) {
        // We assume that at least one child exists

        const leftChildIdx = this.getLeftChildIdx(curIdx);
        const rightChildIdx = this.getRightChildIdx(curIdx);

        if (rightChildIdx >= this.size()) return leftChildIdx;

        const leftChild = this.elements[leftChildIdx];
        const rightChild = this.elements[rightChildIdx];

        if (this.shouldSwap(leftChild, rightChild)) return leftChildIdx;
        return rightChildIdx;
    }

    siftDown(curIdx) {
        while (this.getLeftChildIdx(curIdx) < this.size()) {
            // console.log(curIdx);
            const maxChildIdx = this.getMaxChildIdx(curIdx);

            const curElement = this.elements[curIdx];
            const maxChildElement = this.elements[maxChildIdx];

            if (this.shouldSwap(maxChildElement, curElement))
                this.swapElements(curIdx, maxChildIdx);
            else break;

            curIdx = maxChildIdx;
        }
    }

    // Use this for debugging purposes
    getElements() {
        return this.elements;
    }
}

const maxHeap = new MaxHeap([90, 5, 10]);

maxHeap.push(15);
maxHeap.push(25);
maxHeap.push(35);

console.log(maxHeap.getElements()); // [90,15,35,5,25,10]
console.log(maxHeap.size()); // 6
console.log(maxHeap.remove()); // 90
console.log(maxHeap.remove()); // 35
console.log(maxHeap.size()); // 4
