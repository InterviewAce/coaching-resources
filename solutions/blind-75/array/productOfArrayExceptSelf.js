/*
First find products from beginning to index. Then find products from end to index. Multiply these together to get products except self.
*/
const productExceptSelf = (nums) => {
    const result = [];
    
    let productSoFar = 1;
    for (let i = 0; i < nums.length; i++) {
        result[i] = productSoFar;
        productSoFar *= nums[i];
    }
    
    productSoFar = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= productSoFar;
        productSoFar *= nums[i];
    }
    
    return result;
};