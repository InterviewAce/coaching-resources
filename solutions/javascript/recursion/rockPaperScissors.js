/*

Return an array of strings (all of length n) whose values are all the possible
ways of creating strings from the letters 'r', 'p', and 's'.

For example:

rps(0) -> ['']
rps(1) -> ['r', 'p', 's']
rps(2) -> ['rr', 'rp', 'rs', 'pr', 'pp', 'ps', 'sr', 'sp', 'ss']
rps(3) -> [
  'rrr', 'rrp', 'rrs', 'rpr', 'rpp', 'rps', 'rsr', 'rsp', 'rss',
  'prr', 'prp', 'prs', 'ppr', 'ppp', 'pps', 'psr', 'psp', 'pss',
  'srr', 'srp', 'srs', 'spr', 'spp', 'sps', 'ssr', 'ssp', 'sss'
]

The strings must be returned in the order suggested above.
*/

const chars = ['r', 'p', 's'];

const generateAllPermutationsOfRps = (stringLength) => {
    // Base case
    if (stringLength === 0) return [''];

    const allPermutationsAtStringLength = [];
    const allPermutationsAtStringLengthMinusOne = generateAllPermutationsOfRps(stringLength - 1);

    for (permutation of allPermutationsAtStringLengthMinusOne) {
        for (const char of chars) {
            const addChar = permutation + char;
            allPermutationsAtStringLength.push(addChar);
        }
    }

    return allPermutationsAtStringLength;
};

for (let i = 0; i < 4; i += 1) {
    console.log(generateAllPermutationsOfRps(i));
}
