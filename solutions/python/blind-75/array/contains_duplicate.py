class Solution:
    def containsDuplicate(self, nums):
        """
        Solution overview:
        Track numbers we've seen so far. If we hit an element that we've already seen, return
        true.
        """
        seen = set()

        for num in nums:
            if num in seen:
                return True

            seen.add(num)

        return False
