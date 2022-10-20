'''
Imagine a calculator that has the following characters: 0-9, +, -, =, and the “c” symbol. 
This functions like an old school calculator, so when you press a number, that's the
only thing you see on the screen. When you press the equals sign, the calculator computes
the specified values and returns the result. The "c" key clears the screen. Write a function
`keyPress` in a class `Calculator` that takes in a key and returns what would appear on the 
calculator screen.

Example usage:
const calc = new Calculator();
calc.keyPress('5');
calc.keyPress('+');
calc.keyPress('7');
console.log(calc.keyPress('=')); // This should print 12
calc.keyPress('-');
calc.keyPress('3');
console.log(calc.keyPress('=')); // This should print 9, since we stored the previous result of 12
'''

'''
Instructions:
There is no starter code for this problem. Simply create your own .js file and write everything
from scratch. There are tests at the bottom of this file, and you should be able to copy
those over to your new file to test your solution (as long as you name your class `Calculator`
and you expose a function `keyPress`, then the tests should work). Our solution is also
included below for you to reference.
'''

ADD = '+'
SUBTRACT = '-'
EVALUATE = '='
CLEAR = 'c'

class Calculator:
    def __init__(self):
        self.numBeforeOperation = None
        self.operation = None
        self.numAfterOperation = None

    def evaluateResult(self):
        canEvaluateResult = self.numBeforeOperation is not None and self.operation is not None and self.numAfterOperation is not None
        if not canEvaluateResult:
            return None

        if self.operation == '+':
            return self.numBeforeOperation + self.numAfterOperation
        elif self.operation == '-':
            return self.numBeforeOperation - self.numAfterOperation

    def updateNum(self, key):
        if self.numBeforeOperation is not None and self.operation is not None:
            self.numAfterOperation = int(key)
            return

        self.numBeforeOperation = int(key)

    def keyPress(self, key):
        if key == CLEAR:
            self.numBeforeOperation = None
            self.operation = None
            self.numAfterOperation = None
        elif key == ADD:
            self.operation = ADD
        elif key == SUBTRACT:
            self.operation = SUBTRACT
        elif key == EVALUATE:
            evaluationResult = self.evaluateResult()

            # If we were unable to evaluate the operation, we do NOT want to reset our state
            if evaluationResult is None:
                return None

            self.numBeforeOperation = evaluationResult # Set the result to be the num before the next operation
            self.operation = None
            self.numAfterOperation = None

            # Example for the above line:
            # 7
            # +
            # 3
            # =  <-- this execution returns 10
            # +
            # 5
            # =  <-- on many calculators, this returns 15 because the previous 10 was stored.
            # So, we store `evaluationResult` as the new `self.numBeforeOperation`.

            return evaluationResult
        else:
            if type(key) is not int and not key.isdigit():
                print("Error: invalid input, you must enter 0-9, '+', '-', '=', or 'c'")
                return

            self.updateNum(key)

            return key

# START OF TESTS. COPY FROM HERE ONWARDS TO TEST YOUR CODE.
calc = Calculator()

# Test 1
calc.keyPress('5')
calc.keyPress('+')
calc.keyPress('7')
result = calc.keyPress('=')
print(f"Expected: {12} Your code's output: {result}")

calc.keyPress('c')

# Test 2
calc.keyPress('7')
calc.keyPress('-')
calc.keyPress('5')
result = calc.keyPress('=')
print(f"Expected: {2} Your code's output: {result}")
calc.keyPress('c')

# Test 3
calc.keyPress('15')
calc.keyPress('+')
calc.keyPress('3')
result = calc.keyPress('=')
print(f"Expected: {18} Your code's output: {result}")
calc.keyPress('-')
calc.keyPress('7')
result = calc.keyPress('=')
print(f"Expected: {11} Your code's output: {result}")
calc.keyPress('c')

# Test 4
calc.keyPress(15)
calc.keyPress('+')
calc.keyPress(3)
result = calc.keyPress('=')
print(f"Expected: {18} Your code's output: {result}")
calc.keyPress('-')
calc.keyPress(7)
result = calc.keyPress('=')
print(f"Expected: {11} Your code's output: {result}")
calc.keyPress('c')

# Test 5
calc.keyPress('15a')
calc.keyPress('+')
calc.keyPress('5')
result = calc.keyPress('=')
print(f"Expected: {None} Your code's output: {result}")