const peek = (stack) => {
    if (stack.length === 0) throw new Error('cannot peek, stack is empty');

    const lastIdx = stack.length - 1;
    return stack[lastIdx];
};

class MyQueue {
    constructor() {
        this.size = 0;
        this.stack1 = [];
        this.stack2 = [];
    }

    push(element) {
        this.stack1.push(element);
        this.size++;
    }

    moveToStack2() {
        while (this.stack1.length > 0) {
            const newElement = this.stack1.pop();
            this.stack2.push(newElement);
        }
    }

    pop() {
        if (this.empty()) throw new Error('cannot pop, queue is empty');

        if (this.stack2.length === 0) {
            this.moveToStack2();
        }

        this.size--;
        return this.stack2.pop();
    }

    peek() {
        if (this.empty()) throw new Error('cannot peek, queue is empty');

        if (this.stack2.length === 0) {
            this.moveToStack2();
        }

        return peek(this.stack2);
    }

    empty() {
        return this.size === 0;
    }
}
