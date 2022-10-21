"""

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
"""

chars = ['r', 'p', 's']

def generate_all_permutations_of_rps(string_length):
    # Base case
    if string_length == 0:
        return ['']

    all_permutations_at_string_length = []
    all_permutations_at_string_length_minus_one = generate_all_permutations_of_rps(string_length - 1)

    for permutation in all_permutations_at_string_length_minus_one:
        for char in chars:
            add_char = permutation + char
            all_permutations_at_string_length.append(add_char)

    return all_permutations_at_string_length

for i in range(4):
    print(generate_all_permutations_of_rps(i))