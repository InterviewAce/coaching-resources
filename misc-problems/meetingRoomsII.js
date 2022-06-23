// https://www.npmjs.com/package/heap-js
const heapJS = require('heap-js');

const compareByStart = (intervalOne, intervalTwo) => {
    const [startOne, endOne] = intervalOne;
    const [startTwo, endTwo] = intervalTwo;
    
    if (startOne != startTwo) return startOne - startTwo;
    return endOne - endTwo;
};

const minMeetingRooms = (intervals) => {
    intervals = intervals.sort(compareByStart);
    
    const meetingEndTimes = new heapJS.Heap();
    
    const firstEndTime = intervals[0][1];
    meetingEndTimes.push(firstEndTime);
    
    let numberOfRooms = 1;
    
    for (let i = 1; i < intervals.length; i++) {
        const [startTime, endTime] = intervals[i];
        
        const closestEndTime = meetingEndTimes.peek();
        
        if (closestEndTime > startTime) numberOfRooms++;
        if (closestEndTime <= startTime) meetingEndTimes.pop();
        
        meetingEndTimes.push(endTime);
    }
    
    return numberOfRooms;
};