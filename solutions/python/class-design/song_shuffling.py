import random

'''
Instructions:
There is no starter code for this problem. Simply create your own .js file and write everything
from scratch. There are tests at the bottom of this file, and you should be able to copy
those over to your new file to test your solution (as long as you name your class `Shuffle`
and you expose 2 functions `addSong` and `playSong` which the correct inputs adn outputs, 
then the tests should work). Our solution is also included below for you to reference.


For this problem we'll aim to create a class that plays songs
in a shuffled order. Specifically, you'll need to implement
2 methods:
- `addSong` which takes in a song and adds it to our current song list
- `playSong` which randomly selects a song that has not been played
yet and prints it to the console
Note that a song is represented by a string for its title, e.g. "Hello".
At this point, you should probably ask some follow-up questions to your
interviewer. Since you don't have an interviewer, below we've
shown some important questions along with their answers. Before looking at
them, we encourage you to brainstorm important questions that you'd
ask if this was a real interview.
Questions to ask interviewer (along with responses for each question):
- What should I do when I have played all the songs? 
Start over as if no songs had been played.
- What should I do if a song is added in the middle of us playing songs?
Add it to the pool of songs that can be played (until it is played, of course).
- What should I do if the user tries to play a song when 0 songs have been added?
Print an error message and do nothing else.
We also have a follow-up question that the interviewer might provide you
AFTER you have completed the main question. We strongly recommend that you
fully solve the initial question before thinking about this follow up.
The follow-up question can be found at the end of this file.


Note that we have created a Song class instead of simply using strings. This
is a better design choice because it makes it easier to modify and extend your
code over time. In a real-world situation, you may later decide that you need
to add other fields (e.g. artist, genre, album, etc.). If you simply passed
around the string in your code, it would be hard to add those fields. But,
since we're passing around Song objects, we could simply add those fields in
the Song class and be done.


Conceptually, here's what our solution is doing:
Suppose we have 5 songs:
["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]
  ^
We have a pointer (named `this.startIdxOfUnusedSongs`) that points to the start 
of the unused songs. Songs that have been played will be stored at the beginning
of the array (so before the `this.startIdxOfUnusedSongs` pointer).
Initially, all the songs are unused.
Now supposed we randomly select "Song 4". Then, before returning Song 4, we will
move it to the "already played" section of our array. So, since we have no
"already played songs", we simply move it to the beginning of the array. Thus,
we swap "Song 1" and "Song 4". So, our array now looks like this
["Song 4", "Song 2", "Song 3", "Song 1", "Song 5"]
  ^
But, our pointer is now pointing to a song we've already played. We must increment
it by 1 to make sure it still points to the start of the unused songs. Now we have
this array:
["Song 4", "Song 2", "Song 3", "Song 1", "Song 5"]
            ^
And now we can return "Song 4". We repeat this process any time we select a new song. 
Suppose we selected "Song 5" next, here's what would happen to our array:
["Song 4", "Song 5", "Song 3", "Song 1", "Song 2"]
            ^
["Song 4", "Song 5", "Song 3", "Song 1", "Song 2"]
                      ^
And now we return "Song 5".
'''

class Song: 
    def __init__(self, title, genre): 
        self.title = title 
        self.genre = genre

class Shuffle: 
    def __init__(self, favoriteGenre): 
        self.favoriteGenre = favoriteGenre 
        self.songs = [] 
        self.startIdxOfUnusedSongs = 0

    def addSong(self, newSong): 
        self.songs.append(newSong) 
        if newSong.genre == self.favoriteGenre: 
            self.songs.append(newSong)

    def swapSongs(self, i, j): 
        temp = self.songs[i] 
        self.songs[i] = self.songs[j] 
        self.songs[j] = temp

    def restartShuffle(self): 
        self.startIdxOfUnusedSongs = 0

    def getRandomUnplayedSong(self): 
        num_songs = len(self.songs)

        if num_songs == 0: 
            return None

        if self.startIdxOfUnusedSongs >= num_songs: 
            self.restartShuffle()

        songToPlayIdx = random.randint(self.startIdxOfUnusedSongs, num_songs - 1) 
        songToPlay = self.songs[songToPlayIdx] 
        self.swapSongs(self.startIdxOfUnusedSongs, songToPlayIdx) 
        self.startIdxOfUnusedSongs += 1

        if songToPlayIdx > 0 and self.songs[songToPlayIdx - 1] == songToPlay: 
            self.swapSongs(songToPlayIdx - 1, self.startIdxOfUnusedSongs) 
            self.startIdxOfUnusedSongs += 1

        if songToPlayIdx < num_songs - 1 and self.songs[songToPlayIdx + 1] == songToPlay: 
            self.swapSongs(songToPlayIdx + 1, self.startIdxOfUnusedSongs) 
            self.startIdxOfUnusedSongs += 1

        return songToPlay

    def playSong(self): 
        songToPlay = self.getRandomUnplayedSong() 
        if songToPlay == None: 
            print('Error: no songs have been added, please use `addSong` to add songs to this playlist') 
            return

        print(songToPlay.title)

# Test 1 - add 3 songs and shuffle them 
songShuffler = Shuffle('genre1') 
songShuffler.addSong(Song('Song 1', 'genre1')) 
songShuffler.addSong(Song('Song 2', 'genre2')) 
songShuffler.addSong(Song('Song 3', 'genre1')) 

print('Test 1:') 
songShuffler.playSong() 
songShuffler.playSong() 
songShuffler.playSong() 
print()

# Test 2 - shuffle whole playlist and reset 
songShuffler = Shuffle('genre1') 
songShuffler.addSong(Song('Song 1', 'genre1')) 
songShuffler.addSong(Song('Song 2', 'genre2')) 
songShuffler.addSong(Song('Song 3', 'genre1')) 

print('Test 2:') 
songShuffler.playSong() 
songShuffler.playSong() 
songShuffler.playSong() 

songShuffler.playSong() 
songShuffler.playSong() 
songShuffler.playSong() 
print()

# Test 3 - no songs added 
songShuffler = Shuffle('genre1') 

print('Test 3:') 
print(songShuffler.playSong() == None) 
print()

# Test 4 - add songs, shuffle a few times, then add another song and shuffle more 
songShuffler = Shuffle('genre1') 
songShuffler.addSong(Song('Song 1', 'genre1')) 
songShuffler.addSong(Song('Song 2', 'genre2')) 
songShuffler.addSong(Song('Song 3', 'genre1')) 

print('Test 4:') 
songShuffler.playSong() 
songShuffler.playSong() 

songShuffler.addSong(Song('Song 4', 'genre1')) 
songShuffler.playSong() 
songShuffler.playSong() 
print()

'''
Follow-up: Imagine that we are given the user's favorite genre, and when songs
are added, we also have access to their genre. When shuffling, we want to
give a higher weight to songs from the user's favorite genre. How can we do
this?
Our answer can be found below.
Our answer:
Suppose we wanted to "weight" songs from the user's favorite genre by a factor
of 2. This means that a song from the user's favorite genre should be
about twice as likely to show up compared to a song that is not in the user's
favorite genre. We could implement this by simply pushing 2 copies of a song
into our songs list if the song that we're adding is in the user's favorite
genre. Then, when we randomly select a song (call its index i), we must
check (i - 1) and (i + 1) to see if they contain the same song. If so, we must
also move them to our section of "played songs".
'''