/*
Imagine a calculator that has the following characters: 0-9, +, -, =, and the “c” symbol. 
This functions like an old school calculator, so when you press a number, that's the
only thing you see on the screen. When you press the equals sign, the calculator computes
the specified values and returns the result The "c" key clears the screen. Write a function
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
*/

/*
Instructions:
There is no starter code for this problem. Simply create your own .js file and write everything
from scratch. There are tests at the bottom of this file, and you should be able to copy
those over to your new file to test your solution (as long as you name your class `Calculator`
and you expose a function `keyPress`, then the tests should work). Our solution is also
included below for you to reference.
















*/

const ADD = '+';
const SUBTRACT = '-';
const EVALUATE = '=';
const CLEAR = 'c';

const DIGIT_REGEX_PATTERN = new RegExp('^[0-9]*$');

class Calculator {
    constructor() {
        this.resetToDefault();
    }

    resetToDefault() {
        this.numBeforeOperation = null;
        this.operation = null;
        this.numAfterOperation = null;
    }

    evaluateResult() {
        const canEvaluateResult =
            this.numBeforeOperation !== null &&
            this.operation !== null &&
            this.numAfterOperation !== null;

        if (!canEvaluateResult) {
            return null;
        }

        switch (this.operation) {
            case ADD:
                return this.numBeforeOperation + this.numAfterOperation;

            case SUBTRACT:
                return this.numBeforeOperation - this.numAfterOperation;
        }
    }

    updateNum(key) {
        if (this.numBeforeOperation !== null && this.operation !== null) {
            this.numAfterOperation = parseInt(key);
            return;
        }

        this.numBeforeOperation = parseInt(key);
    }

    isSequenceOfDigits(key) {
        const keyString = key.toString();

        // Checks if key is a sequence of only digits (could be as a number type or a string type)
        if (keyString.match(DIGIT_REGEX_PATTERN)) return true;

        return false;
    }

    keyPress(key) {
        switch (key) {
            case CLEAR:
                this.resetToDefault();
                break;

            case ADD:
                this.operation = ADD;
                break;

            case SUBTRACT:
                this.operation = SUBTRACT;
                break;

            case EVALUATE:
                const evaluationResult = this.evaluateResult();

                // If we were unable to evaluate the operation, we do NOT want to reset our state
                if (evaluationResult === null) return null;

                this.resetToDefault();
                this.numBeforeOperation = evaluationResult; // Set the result to be the num before the next opeartion

                // Example for the above line:
                // 7
                // +
                // 3
                // =  <-- this execution returns 10
                // +
                // 5
                // =  <-- on many calculators, this returns 15 because the previous 10 was stored.
                // So, we store `evaluationResult` as the new `this.numBeforeOperation`.

                return evaluationResult;

            default:
                if (!this.isSequenceOfDigits(key)) {
                    console.log(
                        "Error: invalid input, you must enter 0-9, '+', '-', '=', or 'c'",
                    );
                    return;
                }

                this.updateNum(key);

                return key;
        }
    }
}

// START OF TESTS. COPY FROM HERE ONWARDS TO TEST YOUR CODE.
const calc = new Calculator();

// Test 1
calc.keyPress('5');
calc.keyPress('+');
calc.keyPress('7');
let result = calc.keyPress('=');
console.log(`Expected: ${12}\nYour code's output: ${result}\n`);

calc.keyPress('c');

// Test 2
calc.keyPress('7');
calc.keyPress('-');
calc.keyPress('5');
result = calc.keyPress('=');
console.log(`Expected: ${2}\nYour code's output: ${result}\n`);
calc.keyPress('c');

// Test 3
calc.keyPress('15');
calc.keyPress('+');
calc.keyPress('3');
result = calc.keyPress('=');
console.log(`Expected: ${18}\nYour code's output: ${result}`);
calc.keyPress('-');
calc.keyPress('7');
result = calc.keyPress('=');
console.log(`Expected: ${11}\nYour code's output: ${result}\n`);
calc.keyPress('c');

// Test 4
calc.keyPress(15);
calc.keyPress('+');
calc.keyPress(3);
result = calc.keyPress('=');
console.log(`Expected: ${18}\nYour code's output: ${result}`);
calc.keyPress('-');
calc.keyPress(7);
result = calc.keyPress('=');
console.log(`Expected: ${11}\nYour code's output: ${result}\n`);
calc.keyPress('c');

// Test 5
calc.keyPress('15a');
calc.keyPress('+');
calc.keyPress('5');
result = calc.keyPress('=');
console.log(`Expected: ${null}\nYour code's output: ${result}`);
