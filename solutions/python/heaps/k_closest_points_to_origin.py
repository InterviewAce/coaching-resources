import heapq
import math

def compute_distance(x_one, y_one, x_two, y_two):
    delta_x = x_one - x_two
    delta_y = y_one - y_two

    return math.sqrt(delta_x * delta_x + delta_y * delta_y)

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        k_closest_points = []

        for point in points:
            distance_from_origin = compute_distance(0, 0, *point)

            # We want a max heap, but heapq only supports min heaps. So,
            # we can take the negative of the distance, effectively
            # turning the min heap into a max heap.
            new_heap_element = (-distance_from_origin, point)

            heapq.heappush(k_closest_points, new_heap_element)

            if len(k_closest_points) > k:
                heapq.heappop(k_closest_points)

        return [point for _, point in k_closest_points]