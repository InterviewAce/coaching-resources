const START_INDEX = 0;
const END_INDEX = 1;

const compareIntervals = (intervalOne, intervalTwo) => {
    const intervalOneStartTime = intervalOne[START_INDEX];
    const intervalTwoStartTime = intervalTwo[START_INDEX];
    return intervalOneStartTime - intervalTwoStartTime;
};

const merge = (intervals) => {
    intervals.sort(compareIntervals);
    
    const mergedIntervals = [];
    
    intervals.forEach((interval) => {
        const [startTime, endTime] = interval;

        const noInsertedIntervals = mergedIntervals.length === 0;
        if (noInsertedIntervals) {
            mergedIntervals.push(interval);
            return;
        }
        
        const lastIndex = mergedIntervals.length - 1;
        
        const lastMergedIntervalEndTime = mergedIntervals[lastIndex][END_INDEX];

        if (lastMergedIntervalEndTime < startTime) {
            mergedIntervals.push(interval);
        } else {
            mergedIntervals[lastIndex][END_INDEX] = Math.max(endTime, lastMergedIntervalEndTime);
        }
    });
    
    return mergedIntervals;
};