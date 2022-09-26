class Queue {
    constructor(array = []) {
        this.elements = array;

        this.startIdx = 0;
        this.endIdx = array.length - 1;
    }

    enqueue(newElement) {
        this.elements.push(newElement);
        this.endIdx++;
    }

    dequeue() {
        if (this.isEmpty()) return null;

        const returnElement = this.elements[this.startIdx];

        this.startIdx++;
        return returnElement;
    }

    isEmpty() {
        return this.size() <= 0;
    }

    size() {
        return this.endIdx - this.startIdx + 1;
    }
}

module.exports = { Queue };
