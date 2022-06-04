/*
Alternate solution (still needs some clean up):
const mySqrt = (x) => {
  let left = 1;
  let right = x;
  let result = 0;
  
  while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midSquared = mid ** 2;
      
      if (midSquared > x) right = mid - 1;
      if (midSquared <= x) {
          result = mid;
          left = mid + 1;
      }
  }
  return result;
};

*/

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
