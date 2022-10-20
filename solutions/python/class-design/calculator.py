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