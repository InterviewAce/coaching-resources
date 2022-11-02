NON_DUPLICATE_NOT_FOUND = -1

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

def is_odd(n):
    return n % 2 == 1

class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        last_idx = len(nums) - 1

        left_idx = 0
        right_idx = last_idx
        
        non_duplicate_idx = NON_DUPLICATE_NOT_FOUND

        while left_idx < right_idx:
            mid_idx = get_mid_idx(left_idx, right_idx)

            # Make sure `midIdx` points to the first element in the current pair.
            if is_odd(mid_idx):
                mid_idx -= 1
                
            # If we have a pair at midIdx and (midIdx + 1), then the non-duplicate is in the right half of the remaining section. So, we set `leftIdx = midIdx + 2` to skip past the current pair.
            mid_val = nums[mid_idx]
            next_val = nums[mid_idx + 1]
            if mid_val == next_val:
                left_idx = mid_idx + 2

            # Otherwise, the non-duplicate must be in the left half of the remaining section (including `midIdx`).
            else:
                non_duplicate_idx = mid_idx
                right_idx = mid_idx

        non_duplicate_num = nums[non_duplicate_idx]
        return non_duplicate_num