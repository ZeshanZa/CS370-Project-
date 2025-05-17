# # Script for matching users with their top 3 best matches (with dummy user)

# import pandas as pd
# import time

# start_time = time.time()  # Start timer

# # Load language and category data from CSV
# data = pd.read_csv('languages.csv')
# langs = data.iloc[:, 0].values
# categories = data.iloc[:, 3].values

# # Create mappings between languages and categories
# category_to_value = {}
# value_to_category = {}

# for i in range(len(langs)):
#     category_to_value.setdefault(categories[i], [])
#     category_to_value[categories[i]].append(langs[i])
#     value_to_category[langs[i]] = categories[i]

# # Define dummy user
# name = 'Leo'
# user_langs = ['python', 'html', 'bash']
# wanted_langs = ['ruby', 'css', 'ocaml']

# # Predefined users and adding the dummy user
# users = {
#     'Sam': [["python", "ocaml", "ruby", "css", "nodejs"], ["python", "html", "css", "nodejs"]],
#     'Mary': [["python", "ocaml"], ["html", "css"]],
#     'Carl': [["python", "java", "ruby"], ["python", "java", "ruby"]]
# }
# users[name] = [user_langs, wanted_langs]

# print("\nAll users:\n", users)

# # Match scoring logic
# best_match = []
# best_score = 0

# for key in users.keys():
#     for key_i in users.keys():
#         score = 0
#         if key != key_i:
#             # key's known langs vs key_i's wanted langs
#             for j in users[key][0]:
#                 if j in users[key_i][1]:
#                     score += 1
#                 else:
#                     for q in users[key_i][1]:
#                         if q in category_to_value.get(value_to_category.get(j, ""), []):
#                             score += 0.5
#                             break
#             # key_i's known langs vs key's wanted langs
#             for j in users[key_i][0]:
#                 if j in users[key][1]:
#                     score += 1
#                 else:
#                     for q in users[key][1]:
#                         if q in category_to_value.get(value_to_category.get(j, ""), []):
#                             score += 0.5
#                             break

#         if score > best_score:
#             best_match = [key, key_i]
#             best_score = score

# # Final result
# print("\nBest Match:", best_match)
# print("Match Score:", best_score)

# # Show execution time
# end_time = time.time()
# print(f"\n⏱️ Execution Time: {end_time - start_time:.4f} seconds")

import pandas as pd
import time

start_time = time.time()  # Start timer

# Load language and category data from CSV
data = pd.read_csv('languages.csv')
langs = data.iloc[:, 0].values
categories = data.iloc[:, 3].values

# Build category and language mappings
category_to_langs = {}
lang_to_category = {}

for lang, cat in zip(langs, categories):
    category_to_langs.setdefault(cat, set()).add(lang)
    lang_to_category[lang] = cat

# Precompute related languages by category
lang_to_related = {
    lang: category_to_langs[lang_to_category[lang]]
    for lang in lang_to_category
}

# Dummy user definition
name = "Leo"
user_langs = set(["python", "html", "bash"])
wanted_langs = set(["ruby", "css", "ocaml"])

# Existing users
users = {
    'Sam': [set(['python', 'ocaml', 'ruby', 'css', 'nodejs']), set(['python', 'html', 'css', 'nodejs'])],
    'Mary': [set(['python', 'ocaml']), set(['html', 'css'])],
    'Carl': [set(['python', 'java', 'ruby']), set(['python', 'java', 'ruby'])]
}
users[name] = [user_langs, wanted_langs]

# Score matching
match_scores = []
user_list = list(users.keys())

for i in range(len(user_list)):
    for j in range(i + 1, len(user_list)):
        u1, u2 = user_list[i], user_list[j]
        u1_know, u1_want = users[u1]
        u2_know, u2_want = users[u2]

        score = 0

        # u1's knowledge vs u2's wants
        for lang in u1_know:
            if lang in u2_want:
                score += 1
            elif lang_to_related[lang] & u2_want:
                score += 0.5

        # u2's knowledge vs u1's wants
        for lang in u2_know:
            if lang in u1_want:
                score += 1
            elif lang_to_related[lang] & u1_want:
                score += 0.5

        match_scores.append((score, u1, u2))

# Sort and show top 3 matches
top_matches = sorted(match_scores, reverse=True)[:3]

print("\nTop 3 Matches:")
for score, u1, u2 in top_matches:
    print(f"{u1} and {u2} — Score: {score}")

end_time = time.time()
print(f"\nExecution Time: {end_time - start_time:.4f} seconds")
