function getLastElement(array) {
    const lastIdx = array.length - 1;
    return array[lastIdx];
}

class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(element) {
        this.stack.push(element);

        const isNewMin = this.minStack.length === 0 || element <= this.getMin();
        if (isNewMin) {
            this.minStack.push(element);
        }
    }

    pop() {
        if (getLastElement(this.minStack) === getLastElement(this.stack)) {
            this.minStack.pop();
        }
        this.stack.pop();
    }

    top() {
        return getLastElement(this.stack);
    }

    getMin() {
        return getLastElement(this.minStack);
    }
}
