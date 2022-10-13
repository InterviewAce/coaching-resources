

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        """
        We are only considering continguous subarrays. Thus, we consider our "current subarray" and we continuously expand this, tracking our sum as we go. If we ever hit a point where just taking the current number is better than taking our current subarray + the current number, then we reset our current subarray to just include the current number. For example:
        say our current subarray was [-4,5,-2] and our current number (the one that's after -2 in the input `nums`) is 10. We could let [-4,5,-2,10] be our subarray (this has a sum of 9) or we could let [10] be our subarray (which has a sum of 10). So, in this case, we discard the current subarray we've been tracking and create a new subarray that just contains 10, our current number.

        Using this approach, for each number, we compute the max subarray that could be created using the current number (only including numbers that occur before that number or itself). Then, we track these values over time, which gives us the max subarray sum.
        """
        max_subarray_sum = float('-inf')
        cur_subarray_sum = 0

        for num in nums:
            if cur_subarray_sum + num > num:
                cur_subarray_sum += num
            else:
                cur_subarray_sum = num

            max_subarray_sum = max(max_subarray_sum, cur_subarray_sum)

        return max_subarray_sum