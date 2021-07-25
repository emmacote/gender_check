import re
import flask
import shelve

def build_dictionaries():
    formal_dict, informal_dict = {}, {}

    with open("target_words.txt", "rt") as doc:
        for line in doc:
            line = line.strip()
            line = line.replace(";", "")
            word_part, val_part = tuple(line.rsplit("="))

            val_part = int(val_part)

            open_bracket_index = word_part.find("[") + 1
            close_bracket_index = word_part.find("]")
            word_part = word_part[open_bracket_index:close_bracket_index]
            word_part = word_part.replace("'", "")

            if "Informal" in line:
                informal_dict[word_part] = val_part
            else:
                formal_dict[word_part] = val_part

    return formal_dict, informal_dict


formal_dict, informal_dict = build_dictionaries()
shelf = shelve.open("word_dictionary.db")
shelf["formal_dict"] = formal_dict
shelf["informal_dict"] = informal_dict











if __name__ == '__main__':
    pass