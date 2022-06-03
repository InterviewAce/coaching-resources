const square = (x) => {
  return x * x;
};

const mySqrt = (x) => {
  let num = 1;

  while (square(num) <= x) {
    num += 1;
  }

  // Our logic overshoots the square root by 1. This is because
  // we only break out of the loop when square(num) > x. So, we
  // must account for this
  num -= 1;

  return num;
};
