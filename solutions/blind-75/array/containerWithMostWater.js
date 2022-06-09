const maxArea = (height) => {
    maxWater = 0;
    leftIdx = 0;
    rightIdx = height.length - 1;

    while (leftIdx < rightIdx) {
        minHeight = Math.min(height[leftIdx], height[rightIdx]);
        maxWater = Math.max(maxWater, (rightIdx - leftIdx) * minHeight);

        if (height[leftIdx] < height[rightIdx]) leftIdx++;
        else rightIdx--;
    }

    return maxWater;
};