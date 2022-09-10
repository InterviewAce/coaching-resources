class Solution:
    def twoSum(self, nums, target):
        num_to_idx_map = {}

        for i in range(len(nums)):
            num = nums[i]

            complement = target - num

            if complement in num_to_idx_map:
                complement_idx = num_to_idx_map[complement]
                
                return [complement_idx, i]
            
            num_to_idx_map[num] = i