/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 var solve = function(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (onBorder(row, col, board)) {
                markEscaped(row, col, board);
            }
        }
    }
    
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (board[row][col] == "O") {
                board[row][col] = "X";
            }
            if (board[row][col] == "E") {
                board[row][col] = "O";
            } 
        }
    }
};

const onBorder = (row, col, board) => {
    if (row == 0 || row == board.length - 1) {
        return true;
    }
    if (col == 0 || col == board[0].length - 1) {
        return true;
    }
    return false;
}

const markEscaped = (row, col, board) => {
    const queue = new Queue();
    queue.enqueue([row, col]);
    
    while (queue.size() > 0){
        const [row, col] = queue.dequeue();
        
        if (!validPosition(row, col, board)) continue;
        
        board[row][col] = "E";
        
        queue.enqueue([row - 1, col]);
        queue.enqueue([row + 1, col]);
        queue.enqueue([row, col + 1]);
        queue.enqueue([row, col - 1]);
    }
}

const validPosition = (row, col, board) => {
    if (row < 0 || row >= board.length) {
        return false;
    }
    if (col < 0 || col >= board[0].length) {
        return false;
    }
    if (board[row][col] != "O") {
        return false;
    }
    return true;
}
