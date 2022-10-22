from collections import defaultdict
import heapq

def get_frequencies(elements):
    frequencies = defaultdict(int)

    for element in elements:
        frequencies[element] += 1

    return frequencies

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        frequencies = get_frequencies(nums)

        k_most_frequent_elements = []
        unique_nums = set(nums)

        for num in unique_nums:
            new_heap_element = (frequencies[num], num)
            heapq.heappush(k_most_frequent_elements, new_heap_element)

            if len(k_most_frequent_elements) > k:
                heapq.heappop(k_most_frequent_elements)

        return [num for _, num in k_most_frequent_elements]