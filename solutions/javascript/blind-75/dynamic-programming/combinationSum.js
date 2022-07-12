const combinationSum = (candidates, target) => {
    let result = [];
    combinationSumHelper(0, candidates, target, [], result, 0);
    return result;
};

const recursion = (sum, candidates, target, path, result, start) => {
    if(sum >= target) {
        if(sum === target) result.push([...path]);
        return;
    }
    
    for(let i = start; i < candidates.length; i++){
        if(sum >= target) continue;
        path.push(candidates[i]);
        combinationSumHelper(sum + candidates[i], candidates, target, path, result, i);
        path.pop();
    }
}