/*
Solution overview:
Track numbers we've seen so far. If we hit an element that we've already seen, return
true.
*/
const containsDuplicate = (nums) => {
  const seen = new Set();
  
  for (const num of nums) {
      if (seen.has(num)) return true;
      
      seen.add(num);
  }
  
  return false;
};