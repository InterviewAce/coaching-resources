const MAX_INT = Math.pow(2, 31) - 1;
const MIN_INT = -Math.pow(2, 31);

const adjustForOverflowIfNeeded = (quotient) => {
  // If quotient is smaller than MIN_INT, our result should be MIN_INT.
  const result = Math.max(MIN_INT, quotient);

  // If result is greater than MAX_INT, we should return MAX_INT.
  return Math.min(MAX_INT, result);
};

const exponentiallyDivideWhilePossible = (dividend, divisor, quotient) => {
  let amountToRemove = divisor;
  let multiplier = 1;

  while (dividend >= amountToRemove) {
    // Remove `amountToRemove` from dividend and update quotient to reflect this change.
    dividend -= amountToRemove;
    quotient += multiplier;

    // Track how much we should be adding to quotient. At any time, `multiplier` should equal `amountToRemove / quotient`.
    multiplier += multiplier;
    amountToRemove += amountToRemove;
  }

  return [dividend, quotient];
};

const divide = (dividend, divisor) => {
  let remainingPortionOfDividend = Math.abs(dividend);
  const absDivisor = Math.abs(divisor);

  let quotient = 0;

  while (remainingPortionOfDividend >= absDivisor) {
    [remainingPortionOfDividend, quotient] = exponentiallyDivideWhilePossible(
      remainingPortionOfDividend,
      absDivisor,
      quotient,
    );
  }

  const quotientShouldBeNegative =
    (dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0);

  if (quotientShouldBeNegative) {
    quotient = -quotient;
  }

  return adjustForOverflowIfNeeded(quotient);
};
