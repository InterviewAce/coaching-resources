"""
PROBLEM 1:
longest doubling sequence (n, 2n, 4n, 8n, ..., (2^i)*n)
there are no duplicate nums

input = [93,4,3,17,186,34,290,813,372,8,6]
length of longest = 3
example longest sequence: [93, 186, 372]

{
  93: 1
  4: 1
  3: 1
  17: 1
  186: 2
  34: 1
}
"""


def find_longest_doubling_seq_length(nums):
    n = len(nums)
    longest_ending_with = [1 for _ in range(n + 1)]
    
    for i in range(n):
        for prev_idx in range(i):
            if nums[prev_idx] * 2 == nums[i]:
                longest_ending_with[i] = max(longest_ending_with[i], 1 + longest_ending_with[prev_idx])

    return max(longest_ending_with)

# print(find_longest_doubling_seq_length([93,4,3,17,186,34,290,813,372,8,6]))

"""
PROBLEM 2:
at top of building with height h
need to reach floor at height 0

at each height, there are fixed set of options for how far you can jump down
(e.g. if we have [1,3], then you CANNOT jump down 2 floors)

return min jumps to reach ground floor (if not possible, return -1)


[[],   [1], [5], [1,2] [1,3], [1,2]]
 0      1    2    3     4      5

h=5

to be done, index must be <= 0

example output: 3 (5 => 3 => 2 => 0)
"""

# def min_jumps_to_ground(height, jump_sizes, cache={}):
#     assert len(jump_sizes) >= height + 1

#     if height <= 0:
#         return 0
    
#     if height in cache:
#         return cache[height]

#     min_jumps = float('inf')

#     for jump_size in jump_sizes[height]:
#         min_jumps = min(min_jumps, 1 + min_jumps_to_ground(height - jump_size, jump_sizes, cache))

#     # Doesn't properly handle the case where it's possible. Would
#     # need to modify this
#     cache[height] = min_jumps
#     return min_jumps

def min_jumps_to_ground(height, jump_sizes):
    min_jumps_from = [float('inf') for _ in range(height + 1)]
    min_jumps_from[0] = 0

    for h in range(1, height + 1):
        for jump_size in jump_sizes[h]:
            if h - jump_size <= 0:
                min_jumps_from[h] = 1
                break

            min_jumps_from[h] = min(min_jumps_from[h], 1 + min_jumps_from[h - jump_size])

    return min_jumps_from[height]

print(min_jumps_to_ground(5, [[],   [1], [5], [1,2], [1,3], [1,2]]))


