START_COMBINATION = '0000'
IMPOSSIBLE_TO_OPEN = -1

COMBINATION = 'combination'
NUM_TURNS_SO_FAR = 'num_turns_so_far'

ZERO_STRING = '0'
NINE_STRING = '9'

class Solution:
    def go_up(self, char):
        if char == NINE_STRING:
            return ZERO_STRING
        
        char_int = int(char)
        new_char_int = char_int + 1
        
        return str(new_char_int)
    
    def go_down(self, char):
        if char == ZERO_STRING:
            return NINE_STRING
        
        char_int = int(char)
        new_char_int = char_int - 1
        
        return str(new_char_int)
    
    def replace_char_at_i(self, combination, i, char):
        before_i = combination[:i]
        after_i = combination[i + 1:]
        
        return before_i + char + after_i
    
    def get_neighbors(self, combination):
        all_neighbors = []
        
        for i, char in enumerate(combination):
            up_char = self.go_up(char)
            down_char = self.go_down(char)
            
            up_string = self.replace_char_at_i(combination, i, up_char)
            down_string = self.replace_char_at_i(combination, i, down_char)
            
            all_neighbors.append(up_string)
            all_neighbors.append(down_string)
            
        return all_neighbors
            
    def get_min_turns(self, target, deadends):
        queue = deque()
        queue.append({
            COMBINATION: START_COMBINATION,
            NUM_TURNS_SO_FAR: 0 
        })
        
        visited = set()
        
        while queue:
            # Remove node
            node = queue.popleft()
            
            combination = node[COMBINATION]
            num_turns_so_far = node[NUM_TURNS_SO_FAR]
            
            # Process node
            if combination in deadends:
                continue
                
            if combination in visited:
                continue
                
            if combination == target:
                return num_turns_so_far
            
            visited.add(combination)
            
            # Add neighbors
            neighbors = self.get_neighbors(combination)
            for neighbor_combination in neighbors:
                queue.append({
                    COMBINATION: neighbor_combination,
                    NUM_TURNS_SO_FAR: num_turns_so_far + 1
                })
        
        return IMPOSSIBLE_TO_OPEN
    
    def openLock(self, deadends: List[str], target: str) -> int:
        print(self.go_up('5'))
        
        deadends_set = set(deadends)
        
        if START_COMBINATION in deadends_set or target in deadends_set:
            return IMPOSSIBLE_TO_OPEN
        
        return self.get_min_turns(target, deadends_set)