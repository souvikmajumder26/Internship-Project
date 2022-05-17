import sys
import os
import moviepy.editor as mp
import speech_recognition as sr
import nltk
nltk.download('popular')
from rake_nltk import Rake
#print("Hello World")
# Insert Local Video File Path
# Link to the YouTube video : https://www.youtube.com/watch?v=ouncVBiye_M
#video = "https://github.com/souvikmajumder26/Internship-Project/blob/main/docs/videos/7%20ways%20to%20deal%20with%20CSS.mp4?raw=true"
video = sys.argv[1]
clip = mp.VideoFileClip(video)

# Insert Local Audio File Path
clip.audio.write_audiofile("temp_audio.wav",logger=None)
#clip.write_videofile("output.mp4", verbose=False, progress_bar=False)  # Prints nothing

recognizer = sr.Recognizer()
audio_file = sr.AudioFile("temp_audio.wav")
#os.remove("temp_audio.wav")
# type(audio_file)

# Transcribing only first 50 seconds of the audio (from the video), because the FREE Google Audio Recognizer API does not support more than that
with audio_file as source:
  audio_file = recognizer.record(source, duration = 50.0)
  text_result = recognizer.recognize_google(audio_data = audio_file)
#print(text_result)

# Extracting keywords from the text file
text_list = [text_result]
r = Rake(max_length = 3)
r.extract_keywords_from_sentences(text_list)
output_keywords = r.get_ranked_phrases()
print(output_keywords)
sys.stdout.flush()
# output = list of keywords