'''

This script is simply to generate dummy data to use for developing the map.

It takes the states.csv file that denotes which states were lived in the base example and
gives them a random score, 1-5, then writes that data to json for use in developing the app.

'''

import pandas as pd
import json
import random

df = pd.read_csv("states.csv")

df.rename(columns = {'visited':'score'}, inplace = True) 

scoresList = [random.randint(0, 5) for i in range(len(df.index))]

df["score"] = scoresList

with open("state-scores.json", "w") as output:
  parsedJSON = json.loads(df.to_json(orient="records"))
  json.dump(parsedJSON, output)