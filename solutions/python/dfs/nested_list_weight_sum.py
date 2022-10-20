class Solution:
    def compute_depth_sum(self, nested_list, cur_depth):
        cur_depth_sum = 0

        for nested_integer in nested_list:
            if nested_integer.isInteger():
                integer = nested_integer.getInteger()
                cur_depth_sum += integer * cur_depth
            else:
                inner_list = nested_integer.getList()
                cur_depth_sum += self.compute_depth_sum(inner_list, cur_depth + 1)

        return cur_depth_sum

    def depthSum(self, nested_list: List[NestedInteger]) -> int:
        initial_depth = 1
        return self.compute_depth_sum(nested_list, initial_depth)