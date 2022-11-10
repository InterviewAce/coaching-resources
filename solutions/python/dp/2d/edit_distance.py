EMPTY_STRING_LAST_INDEX = -1


class Solution:
    def min_distance_between_words(self, word1, word2, word1_last_idx, word2_last_idx, min_distance_cache):
        key = f"{word1_last_idx}-{word2_last_idx}"

        if key in min_distance_cache:
            return min_distance_cache[key]

        if word1_last_idx == EMPTY_STRING_LAST_INDEX:
            return word2_last_idx + 1

        if word2_last_idx == EMPTY_STRING_LAST_INDEX:
            return word1_last_idx + 1

        last_char_1 = word1[word1_last_idx]
        last_char_2 = word2[word2_last_idx]

        if last_char_1 == last_char_2:
            min_distance_cache[key] = self.min_distance_between_words(
                word1,
                word2,
                word1_last_idx - 1,
                word2_last_idx - 1,
                min_distance_cache,
            )

            return min_distance_cache[key]

        min_distance_with_deletion = (
            1
            + self.min_distance_between_words(
                word1,
                word2,
                word1_last_idx - 1,
                word2_last_idx,
                min_distance_cache,
            )
        )

        min_distance_with_insertion = (
            1
            + self.min_distance_between_words(
                word1,
                word2,
                word1_last_idx,
                word2_last_idx - 1,
                min_distance_cache,
            )
        )

        min_distance_with_replacement = (
            1
            + self.min_distance_between_words(
                word1,
                word2,
                word1_last_idx - 1,
                word2_last_idx - 1,
                min_distance_cache,
            )
        )

        min_distance_cache[key] = min(
            min_distance_with_deletion,
            min_distance_with_insertion,
            min_distance_with_replacement,
        )

        return min_distance_cache[key]

    def minDistance(self, word1: str, word2: str) -> int:
        min_distance_cache = {}

        word_1_last_idx = len(word1) - 1
        word_2_last_idx = len(word2) - 1

        return self.min_distance_between_words(
            word1,
            word2,
            word_1_last_idx,
            word_2_last_idx,
            min_distance_cache,
        )
