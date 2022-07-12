/*
BOTTOM-UP DP SOLUTION
*/
const numSquares = (n) => {
    const cache = new Array(n + 1).fill(Infinity);
    cache[0] = 0;

    for (let target = 1; target <= n; target++) {
        let integer = 1;
        let perfectSquare = 1;
        while (perfectSquare <= target) {
            cache[target] = Math.min(
                cache[target],
                cache[target - perfectSquare] + 1,
            );
            integer++;
            perfectSquare = integer * integer;
        }
    }

    return cache[n];
};

/*
TOP-DOWN DP SOLUTION
*/