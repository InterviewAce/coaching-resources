"""
The colors of the rainbow are specified by the acronym "ROYGBIV" - red, orange, yellow, green, blue, indigo, violet (order matters here). You want to find the length of the shortest sequence of characters in a matrix that creates the acronym "ROYGBIV".

You'll be given a matrix that only consists of the strings "R", "O", "Y", "G", "B", "I", and "V". From each position, you can go up, down, left, or right to find another character. To find a rainbow, you must start at "R", end at "Y", and each intermediate cell should be the next character in "ROYGBIV". For example, "R" => "O" => "Y" => "G" => "B" => "I" => "V" is a valid rainbow.

Additionally, it is okay to use the have the same character more than once as long as it is done consecutively. For example, this is also a valid rainbow: "R" => "R" => "R" => "O" => "Y" => "Y" => "G" => "B" => "I" => "V".

Given this matrix of colors, you should return the length of the shortest sequence that forms a rainbow.
"""

# TODO: write your code here

colors = [
    ['R', 'O', 'V', 'V', 'I'],
    ['B', 'I', 'B', 'G', 'Y'],
    ['Y', 'V', 'R', 'O', 'Y'],
    ['B', 'G', 'R', 'Y', 'R'],
]

print(f"Your answer: {find_shortest_rainbow_length(colors)}")
print(f"Correct answer: {8}")
print()