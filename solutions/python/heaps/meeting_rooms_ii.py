"""
-sort by start times (if start times match, sort by end time)

num conference rooms: 1
ongoing meetings: [0,30]


0                   30
                            35   20


for each interval (starting at i=1)
    if start time < earliest end time of ongoing meetings
        new conference room
    else
        delete the ongoing meeting that ends at the earliest time
        
    add cur interval to ongoing meetings
        
        

[[0,30],[5,10],[15,20]]
         ^
"""

import heapq

START_TIME_IDX = 0
END_TIME_IDX = 1

class Solution:
    def minMeetingRooms(self, meetings: List[List[int]]) -> int:
        meetings.sort(key=lambda meeting: meeting[START_TIME_IDX])

        ongoing_meeting_end_times = []
        num_rooms_required = 1

        first_meeting_end_time = meetings[0][END_TIME_IDX]
        heapq.heappush(ongoing_meeting_end_times, first_meeting_end_time)

        for i in range(1, len(meetings)):
            start_time, end_time = meetings[i]
            earliest_end_time = ongoing_meeting_end_times[0] # This is equivalent to peeking

            overlaps_with_all_existing_meetings = start_time < earliest_end_time

            if overlaps_with_all_existing_meetings:
                num_overlapping_meetings = len(ongoing_meeting_end_times) + 1
                num_rooms_required = max(num_rooms_required, num_overlapping_meetings)
            else:
                heapq.heappop(ongoing_meeting_end_times)

            heapq.heappush(ongoing_meeting_end_times, end_time)

        return num_rooms_required