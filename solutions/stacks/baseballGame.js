const calPoints = (ops) => {
    const stack = [];

    ops.forEach((op) => {
        lastOp = stack.at(-1);
        if (op === '+') {
            lastLastOp = stack.at(-2);
            stack.push(lastOp + lastLastOp);
        } else if (op === 'D') {
            stack.push(lastOp * 2);
        } else if (op === 'C') {
            stack.pop();
        } else {
            stack.push(parseInt(op));
        }
    });

    const sum = stack.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    return sum;
};