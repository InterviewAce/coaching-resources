number_to_letters_map = {
    "1": [],
    "2": ['a', 'b', 'c'],
    "3": ['d', 'e', 'f'],
    "4": ['g', 'h', 'i'],
    "5": ['j', 'k', 'l'],
    "6": ['m', 'n', 'o'],
    "7": ['p', 'q', 'r', 's'],
    "8": ['t', 'u', 'v'],
    "9": ['w', 'x', 'y', 'z'],
}


class Solution:
    def generate_combinations(self, digits, location, string_so_far, all_combinations):
        # Base case
        if location == len(digits):
            all_combinations.append(string_so_far)
            return

        # Process node

        # Traverse neighbors
        cur_digit = digits[location]
        chars = number_to_letters_map[cur_digit]

        for char in chars:
            self.generate_combinations(
                digits, location + 1, string_so_far + char, all_combinations
            )

    def letterCombinations(self, digits: str) -> List[str]:
        if len(digits) == 0:
            return []

        all_combinations = []

        self.generate_combinations(digits, 0, '', all_combinations)

        return all_combinations
