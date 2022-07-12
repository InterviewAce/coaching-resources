// https://www.npmjs.com/package/heap-js
const heapJS = require('heap-js');

const compareByClosenessToOrigin = (pointOne, pointTwo) => {
    const distanceFromOriginOne = pointOne[0] ** 2 + pointOne[1] ** 2;
    const distanceFromOriginTwo = pointTwo[0] ** 2 + pointTwo[1] ** 2;

    return distanceFromOriginTwo - distanceFromOriginOne;
};

const kClosest = (points, k) => {
    const kClosestPoints = new heapJS.Heap(compareByClosenessToOrigin);
    
    for (const point of points) {
        kClosestPoints.push(point);
        if (kClosestPoints.size() > k) {
            kClosestPoints.pop();
        }
    }
    
    return kClosestPoints.toArray();
};