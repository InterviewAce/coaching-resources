NO_TRUE_ELEMENT = -1

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

"""
How this code works on an example:

Start:
[false, false, true, true, true]
  0      1      2     3     4   
  L                         R
boundary_idx = -1

Step 1:
[false, false, true, true, true]
  0      1      2     3     4   
  L             M           R
mid_val = true so we update boundary_idx
boundary_idx = 2

Step 2:
[false, false, true, true, true]
  0      1      2     3     4   
  L      R
we set right_idx to be mid_idx - 1
boundary_idx = 2

Step 3:
[false, false, true, true, true]
  0      1      2     3     4   
  LM     R
left_idx is 0 and mid_idx is 0
mid_val is false so we set left_idx to be mid_idx + 1
boundary_idx = 2

Step 4:
[false, false, true, true, true]
  0      1      2     3     4   
        LMR
left_idx, mid_idx, and right_idx are all 1
mid_val is false, so we move right_idx
boundary_idx = 2

Step 5:
[false, false, true, true, true]
  0      1      2     3     4   
  R      L
we now break out of the while loop and return boundary_idx which is 2

"""

def find_boundary(arr):
    last_idx = len(arr) - 1

    left_idx = 0
    right_idx = last_idx

    boundary_idx = NO_TRUE_ELEMENT

    while left_idx <= right_idx:
        mid_idx = get_mid_idx(left_idx, right_idx)
        mid_val = arr[mid_idx]

        if mid_val:
            boundary_idx = mid_idx
            right_idx = mid_idx - 1
        else:
            left_idx = mid_idx + 1

    return boundary_idx