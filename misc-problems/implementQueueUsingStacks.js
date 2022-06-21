var MyQueue = function () {
  this.size = 0;
  this.stack1 = [];
  this.stack2 = [];
};

const peek = (stack) => {
  if (stack.length === 0) throw new Error('cannot peek, stack is empty');

  const lastIdx = stack.length - 1;
  return stack[lastIdx];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
  this.size++;
};

MyQueue.prototype.moveToStack2 = function () {
  while (this.stack1.length > 0) {
    const newElement = this.stack1.pop();
    this.stack2.push(newElement);
  }
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (this.empty()) throw new Error('cannot pop, queue is empty');

  if (this.stack2.length === 0) {
    this.moveToStack2();
  }

  this.size--;
  return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (this.empty()) throw new Error('cannot peek, queue is empty');

  if (this.stack2.length === 0) {
    this.moveToStack2();
  }

  return peek(this.stack2);
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.size === 0;
};
