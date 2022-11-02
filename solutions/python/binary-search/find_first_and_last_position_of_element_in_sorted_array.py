NOT_FOUND = -1

def get_mid_idx(left_idx, right_idx):
    """
    Why do we use this math to find the middle index?
    Couldn't we just use
        mid_idx = (left_idx + right_idx) // 2

    The reason is integer overflow. In JavaScript, the maximum
    size of a number is (2^53) - 1. Suppose we used the above logic
    (i.e. `const midIdx = Math.floor((left + right) / 2);`). Let's
    say that `left` was (2^53) - 3 and `right` was (2^53) - 2.
    Then, we start my computing `left + right` which is 
        (2^53) - 3 + (2^53) - 2
        = 2 * (2^53) - 5
        = (2^54) - 5 > (2^53) - 1
    So, when computing `left + right` we try to store (2^54) - 5,
    but JavaScript cannot handle such a large number. This problem
    is called 'integer overflow'.

    Instead, we use the approach you see below. Mathematically,
    it's doing the same thing. It just does so in a different order.
    This logic is saying 'find the difference between right and left.
    then cut that in half. add this resulting value to left', which
    puts as at the middle index. But, there is no risk of computing
    numbers that cause integer overflow.
    """

    """
    Extra note: in Python, technically integer overflow is not possible
    because Python does not have a maximum integer size. However, in
    general, it's standard to use this approach to compute middle indices,
    so you should still use it.
    """
    
    mid_idx = left_idx + (right_idx - left_idx) // 2

    return mid_idx

class Solution:
    def get_first_occurrence_idx(self, nums, target):
        last_idx = len(nums) - 1

        left_idx = 0
        right_idx = last_idx

        first_occurrence_idx = NOT_FOUND

        while left_idx <= right_idx:
            mid_idx = get_mid_idx(left_idx, right_idx)
            mid_val = nums[mid_idx]

            if mid_val == target:
                first_occurrence_idx = mid_idx

            if mid_val >= target:
                right_idx = mid_idx - 1
            else:
                left_idx = mid_idx + 1

        return first_occurrence_idx

    def get_last_occurrence_idx(self, nums, target):
        last_idx = len(nums) - 1

        left_idx = 0
        right_idx = last_idx

        last_occurrence_idx = NOT_FOUND

        while left_idx <= right_idx:
            mid_idx = get_mid_idx(left_idx, right_idx)
            mid_val = nums[mid_idx]

            if mid_val == target:
                last_occurrence_idx = mid_idx

            if mid_val <= target:
                left_idx = mid_idx + 1
            else:
                right_idx = mid_idx - 1

        return last_occurrence_idx

    def searchRange(self, nums: List[int], target: int) -> List[int]:
        first_occurrence_idx = self.get_first_occurrence_idx(nums, target)
        last_occurrence_idx = self.get_last_occurrence_idx(nums, target)

        if first_occurrence_idx <= last_occurrence_idx:
            return [first_occurrence_idx, last_occurrence_idx]

        return [NOT_FOUND, NOT_FOUND]
