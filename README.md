##Gender Check
#####by Emma Cote

## What it does
Gender Check draws inspiration from "Gender Guesser [found here.](http://www.hackerfactor.com/GenderGuesser.php)
It works by guessing your gender via analysis of text you submit.

## How Gender Checker Differs
1. More of a server-side dependency for dictionary retrieval and word text analysis.
2. Scoring on-the-fly lifts the burden of anlysis from your browser so Javascript code can be cleaner.


## How To Setup
1. Do a git clone of Gender Checker's repository.
2. Load your clone into a Python IDE. (like Pycharm)
3. Set up Flask iwithin your environment.
4. Run "build_word_dictionary.py". This should create the persistent data store that Gender Checker depends on.
5. Run main.py
6. Open up http://localhost:5000 in your browser.
7. That's all. Have fun and I hope you like it.