#script for matching users with their top 3 best matches
#test github
import pandas as pd
import numpy as np
data = pd.read_csv('languages.csv')
langs = data.iloc[0:, 0].values
categories = data.iloc[0:, 3].values

#print(categories)
#print(langs)

category_to_value = {}
value_to_category = {}

for i in range(len(langs)):
    category_to_value.setdefault(categories[i], [])
    category_to_value[categories[i]].append(langs[i])
    value_to_category[langs[i]] = categories[i]

#print(langs)
name = input("Your name...")
print("Please input your languages")
print("submit '0' when done")
user_langs = []
check = ''
while check != 0:
    check = input("Language...")
    if check == "0":
        break
    if check in value_to_category:
        print("exists")
        if check not in user_langs:
            user_langs.append(check)

print("Please input languages you seek")
print("submit '0' when done")
wanted_langs = []
check = ''
while check != 0:
    check = input("Language...")
    if check == "0":
        break
    if check in value_to_category:
        print("exists")
        if check not in wanted_langs:
            wanted_langs.append(check)

#user = languages they know | languages they seek
users = {'Sam' : [["python", "ocaml", "ruby", "css", "nodejs"], ["python", "html", "css", "nodejs"]], 'Mary' : [["python", "ocaml"], ["html", "css"]], 'Carl' : [["python", "java", "ruby"], ["python", "java", "ruby"]]}
users[name] = [user_langs, wanted_langs]
print(users)
best_match = []
best_score = 0
for key in users.keys():
    for key_i in users.keys():
        score = 0
        if key != key_i:
            for j in users[key][0]:
                if j in users[key_i][1]:
                    score += 1
                else:
                    for q in users[key_i][1]:
                        if q in category_to_value[value_to_category[j]]:
                            score += 0.5
                            break
            for j in users[key_i][0]:
                if j in users[key][1]:
                    score += 1
                else:
                    for q in users[key][1]:
                        if q in category_to_value[value_to_category[j]]:
                            score += 0.5
                            break
        if score > best_score:
            best_match = [key, key_i]
            best_score = score
print(best_match)
print(best_score)