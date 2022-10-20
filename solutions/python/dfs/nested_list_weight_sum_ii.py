"""
Note: that the test case “[[1,1],2,[1,1],[[[[]]]]]” is weird, so your code will probably fail that case. Don't worry about passing that case, if that's the only case you fail, then you're fine (our solution also fails against this case).
"""

class Solution:
    def get_max_depth(self, nested_list):
        max_depth = 1

        for nested_integer in nested_list:
            if nested_integer.isInteger():
                continue

            inner_list = nested_integer.getList()
            inner_list_max_depth = self.get_max_depth(inner_list)

            max_depth = max(max_depth, inner_list_max_depth + 1)

        return max_depth

    def compute_weighted_depth_sum(self, nested_list, cur_weight):
        weighted_depth_sum = 0

        for nested_integer in nested_list:
            if nested_integer.isInteger():
                integer = nested_integer.getInteger()
                weighted_depth_sum += integer * cur_weight
            else:
                inner_list = nested_integer.getList()
                inner_weight = cur_weight - 1

                weighted_depth_sum += self.compute_weighted_depth_sum(inner_list, inner_weight)

        return weighted_depth_sum

    def depthSumInverse(self, nested_list: List[NestedInteger]) -> int:
        max_depth = self.get_max_depth(nested_list)
        return self.compute_weighted_depth_sum(nested_list, max_depth)