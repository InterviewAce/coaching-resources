
class Solution:
    def two_sum(self, nums, start_idx, target_val, result):
        left_idx = start_idx
        right_idx = len(nums) - 1

        while left_idx < right_idx:
            left_val = nums[left_idx]
            right_val = nums[right_idx]

            if left_val + right_val == target_val:
                result.append([-target_val, left_val, right_val])

                left_idx += 1
                right_idx -= 1

                # skip duplicate pairs
                while left_idx < right_idx and nums[left_idx] == nums[left_idx - 1]:
                    left_idx += 1
                while left_idx < right_idx and nums[right_idx] == nums[right_idx + 1]:
                    right_idx -= 1

            elif left_val + right_val < target_val:
                left_idx += 1
            else:
                right_idx -= 1

    def three_sum(self, nums):
        """
        First sort the array. For each element in the array, use twoSum to find two values that sum up to the complement.  
        """
        result = []
        nums.sort()

        # a + b + c = 0 || a + b = -c
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            self.two_sum(nums, i + 1, -nums[i], result)

        return result

    def threeSum(self, nums: List[int]) -> List[List[int]]:
        result = []
        nums.sort()

        # a + b + c = 0 || a + b = -c
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            
            self.two_sum(nums, i + 1, -nums[i], result)
            
        return result