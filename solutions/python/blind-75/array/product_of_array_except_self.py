
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        """
        First find products from beginning to index. Then find products from end to index. Multiply these together to get products except self.
        """
        result = []

        product_so_far = 1
        for i in range(len(nums)):
            result.append(product_so_far)
            product_so_far *= nums[i]

        product_so_far = 1
        for i in range(len(nums) - 1, -1, -1):
            result[i] *= product_so_far
            product_so_far *= nums[i]

        return result