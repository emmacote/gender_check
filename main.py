from flask import Flask, redirect, request, jsonify
import shelve
import re

app = Flask(__name__)
app.debug = True


@app.route("/")
def index():
    return redirect("/static/index.html")


@app.route("/wordlists")
def word_lists():
    shelf = shelve.open("word_dictionary.db")
    formal_dict, informal_dict = shelf["formal_dict"], shelf["informal_dict"]
    output = dict(formalDict=formal_dict, informalDict=informal_dict)
    return jsonify(output)


def score_words(text_input):

    shelf = shelve.open("word_dictionary.db")
    formal_dict, informal_dict = shelf["formal_dict"], shelf["informal_dict"]

    splitter_patt = r"[^A-Za-z]+"
    words = re.split(splitter_patt, text_input.lower())
    from pdb import set_trace
    #set_trace()
    male_informal, male_formal, female_informal, female_formal = 0, 0, 0, 0

    for word in words:
        if word in informal_dict:
            if informal_dict[word] > 0:
                male_informal += informal_dict[word]
            if informal_dict[word] < 0:
                female_informal -= informal_dict[word]

        if word in formal_dict:
            if formal_dict[word] > 0:
                male_formal += formal_dict[word]
            if formal_dict[word]  < 0:
                female_formal -= formal_dict[word]

    from collections import namedtuple
    WordScores = namedtuple("WordScores", ["male_formal", "female_formal", "male_informal", "female_informal", "word_count"])
    return WordScores(male_formal, female_formal, male_informal, female_informal, len(words))


@app.route("/genderwriting", methods=["POST"])
def gender_writing():
    json_in = request.json
    source_text = json_in["textToAnalyze"]
    analysis_results = score_words(source_text)
    male_formal, female_formal, male_informal, female_informal, word_count = analysis_results

    json_out = dict(male_formal=male_formal, female_formal=female_formal,
                    male_informal=male_informal, female_informal=female_informal, word_count=word_count)

    return jsonify(json_out)

if __name__ == '__main__':
    app.run()
