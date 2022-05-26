/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    let number = 0;
    
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] == "1") {
                number++;
                exploreIsland(row, col, grid);
            }
        }
    }
    
    return number;
};

const exploreIsland = (row, col, grid) => {
    const queue = new Queue();
    queue.enqueue([row, col]);
    
    while (queue.size() > 0){
        const [row, col] = queue.dequeue();
        
        if (!validPosition(row, col, grid)) continue;
        
        console.log([row, col])
        
        grid[row][col] = "0";
        
        queue.enqueue([row - 1, col]);
        queue.enqueue([row + 1, col]);
        queue.enqueue([row, col + 1]);
        queue.enqueue([row, col - 1]);
    }
}

const validPosition = (row, col, grid) => {
    if (row < 0 || row >= grid.length) {
        return false;
    }
    if (col < 0 || col >= grid[0].length) {
        return false;
    }
    if (grid[row][col] == "0") {
        return false;
    }
    return true;
}