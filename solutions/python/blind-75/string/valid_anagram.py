
class Solution:
    def get_frequency_count(self, string):
        frequency_count = {}
        
        for char in string:
            if char not in frequency_count:
                frequency_count[char] = 0
            frequency_count[char] += 1
            
        return frequency_count
    
    def are_identical_objects(self, object_one, object_two):
        object_one_keys = object_one.keys()
        
        for key in object_one_keys:
            if key not in object_two or object_one[key] != object_two[key]:
                return False
            
        object_two_keys = object_two.keys()
        
        for key in object_two_keys:
            if key not in object_one or object_one[key] != object_two[key]:
                return False
            
        return True

    def isAnagram(self, string_one: str, string_two: str) -> bool:
        if len(string_one) != len(string_two):
            return False
        
        char_count_one = self.get_frequency_count(string_one)
        char_count_two = self.get_frequency_count(string_two)
        
        return self.are_identical_objects(char_count_one, char_count_two)
    
    