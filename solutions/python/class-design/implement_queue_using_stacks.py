class MyQueue:
    def __init__(self):
        self.size = 0
        self.stack1 = []
        self.stack2 = []

    def push(self, element):
        self.stack1.append(element)
        self.size += 1

    def moveToStack2(self):
        while len(self.stack1) > 0:
            newElement = self.stack1.pop()
            self.stack2.append(newElement)

    def pop(self):
        if self.empty():
            raise Exception('cannot pop, queue is empty')

        if len(self.stack2) == 0:
            self.moveToStack2()

        self.size -= 1
        return self.stack2.pop()

    def peek(self):
        if self.empty():
            raise Exception('cannot peek, queue is empty')

        if len(self.stack2) == 0:
            self.moveToStack2()

        return self.stack2[-1]

    def empty(self):
        return self.size == 0
