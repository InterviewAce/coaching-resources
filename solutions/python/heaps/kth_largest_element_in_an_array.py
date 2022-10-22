import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        kth_largest_elements = []

        for num in nums:
            heapq.heappush(kth_largest_elements, num)

            if len(kth_largest_elements) > k:
                heapq.heappop(kth_largest_elements)

        kth_largest_element = heapq.heappop(kth_largest_elements)
        return kth_largest_element