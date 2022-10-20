class NestedIterator:
    def __init__(self, nested_list: [NestedInteger]):
        self.flattened_list = self.flatten_list(nested_list)
        self.next_position = 0

    def flatten_list(self, nested_list):
        flattened_list = []

        for nested_integer in nested_list:
            if nested_integer.isInteger():
                integer = nested_integer.getInteger()
                flattened_list.append(integer)
            else:
                nested_integer_list = nested_integer.getList()
                flattened_nested_integer_list = self.flatten_list(nested_integer_list)

                for integer in flattened_nested_integer_list:
                    flattened_list.append(integer)

        return flattened_list

    def hasNext(self) -> bool:
        return self.next_position < len(self.flattened_list)
    
    def next(self) -> int:
        integer_to_return = self.flattened_list[self.next_position]
        self.next_position += 1
        
        return integer_to_return
