
class Solution:
    def generate_all_subsets(self, nums, cur_idx, running_array, all_subsets):
        if cur_idx == len(nums):
            all_subsets.append(running_array[:])
            return

        # Generate all subsets WITHOUT including current element
        self.generate_all_subsets(nums, cur_idx + 1, running_array, all_subsets)

        # Generate all subsets WITH including current element
        running_array.append(nums[cur_idx])
        self.generate_all_subsets(nums, cur_idx + 1, running_array, all_subsets)

        running_array.pop()

    def subsets(self, nums: List[int]) -> List[List[int]]:
        all_subsets = []

        self.generate_all_subsets(nums, 0, [], all_subsets)

        return all_subsets