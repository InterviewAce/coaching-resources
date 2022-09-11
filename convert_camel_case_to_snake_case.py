import sys
import re

def get_file_contents(file_path):
    with open(file_path, "r") as file:
        return file.readlines()

def write_file_contents(file_path, file_contents):
    with open(file_path, "w") as file:
        file.writelines(file_contents)

def convert_camel_case_to_snake_case(file_path):
    file_contents = get_file_contents(file_path)
    
    for i, line in enumerate(file_contents):
        file_contents[i] = re.sub(r'(?<!^)(?=[A-Z])', '_', line).lower()

    write_file_contents(file_path, file_contents)

file_path = sys.argv[1]
convert_camel_case_to_snake_case(file_path)