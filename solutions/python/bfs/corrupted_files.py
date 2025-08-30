"""
The file directory system on your computer has been corrupted by a virus. Random files have been copied throughout, and files have been moved to new locations. You need your team's new engineer to go through and find certain files, but they don't want to do it because they're worried that they might have to go very deep into the file directory system to find files.

You need to convince them that they will NOT need to go that deep. To do so, you'll compute the deepest that they will need to go.

You'll be given a list of required files, a hash map that maps directory names to a list of elements that are in that directory (these will either be directories themselves or filenames), and lastly you'll be given a string representing the directory that you start in.

You must return the minimum depth that your new engineer must go through to find all of the required files. You can assume that this is structured like a normal file system (it's impossible that inside of directory A you have directory B, but inside of directory B you have directory A). If it is NOT possible to find all the required files in the given directory structure, return -1. The depth of the root directory is 0.
"""

from collections import deque
from tracemalloc import start

SOME_FILES_ARE_MISSING = -1

def get_min_depth_to_find_all_files(directory_structure, required_files, start_directory):
    required_files_set = set(required_files)

    queue = deque()
    start_node = (start_directory, 0)
    queue.append(start_node)

    while queue:
        print(queue)
        directory_name, depth = queue.popleft()
        print(directory_name in directory_structure)
        print(directory_structure.keys())

        if directory_name in required_files_set:
            required_files_set.remove(directory_name)
        
        if len(required_files_set) == 0:
            return depth

        is_folder = directory_name in directory_structure
        if not is_folder:
            continue

        children = directory_structure[directory_name]
        for child_directory_name in children:
            child_node = (child_directory_name, depth + 1)
            queue.append(child_node)

    return SOME_FILES_ARE_MISSING

directory_structure = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["D", "E", "F"],
    "D": ["1.js", "2.js"],
    "E": ["G", "H"],
    "F": ["I", "J"],
    "G": ["3.js", "4.js"],
    "H": ["K"],
    "I": ["L", "M"],
    "J": ["emptyFile.js"],
    "K": ["5.js"],
    "L": ["6.js", "7.js", "8.js"],
    "M": ["N"],
    "N": ["9.js", "O"],
    "O": ["P", "Q"],
    "Q": ["R", "S"],
    "R": ["randomFile.js"],
    "S": ["otherRandomFile.js"]
}
required_files = ["1.js", "2.js", "3.js", "4.js", "5.js", "6.js", "7.js", "8.js", "9.js"]
root_directory = "A"

print(f"Your answer: {get_min_depth_to_find_all_files(directory_structure, required_files, root_directory)}")
print(f"Correct answer: {6}")
print()