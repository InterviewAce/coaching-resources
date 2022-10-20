import math
import random

class RandomizedSet:
    def __init__(self):
        self.value_to_idx_map = {}
        self.values = []

    def insert(self, new_value):
        if new_value in self.value_to_idx_map:
            return False

        self.values.append(new_value)

        last_idx = len(self.values) - 1
        self.value_to_idx_map[new_value] = last_idx

        return True

    def swap_values(self, i, j):
        # Update self.value_to_idx_map
        i_val = self.values[i]
        j_val = self.values[j]

        self.value_to_idx_map[i_val] = j
        self.value_to_idx_map[j_val] = i

        # Swap the values in the self.values
        temp = self.values[i]
        self.values[i] = self.values[j]
        self.values[j] = temp

    def remove(self, value_to_remove):
        if value_to_remove not in self.value_to_idx_map:
            return False

        idx_to_delete = self.value_to_idx_map[value_to_remove]
        last_idx = len(self.values) - 1

        self.swap_values(idx_to_delete, last_idx)

        del self.value_to_idx_map[value_to_remove]
        self.values.pop()

        return True

    def getRandom(self):
        random_idx = math.floor(random.random() * len(self.values)) # Gets a random idx in self.values
        return self.values[random_idx]