START_TIME_INDEX = 0
END_TIME_INDEX = 1

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key = lambda interval: interval[START_TIME_INDEX])

        merged_intervals = []
        for interval in intervals:
            start_time, end_time = interval

            no_inserted_intervals = len(merged_intervals) == 0

            if no_inserted_intervals:
                merged_intervals.append(interval)
                continue

            last_merged_interval = merged_intervals[-1]
            last_merged_interval_end_time = last_merged_interval[END_TIME_INDEX]

            if last_merged_interval_end_time < start_time:
                merged_intervals.append(interval)
            else:
                last_merged_interval[END_TIME_INDEX] = max(end_time, last_merged_interval_end_time)

        return merged_intervals
        
        