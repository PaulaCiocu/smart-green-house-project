#run with uvicorn hello:app --reload --host 127.0.0.1 --port 8002

from typing import Union

from fastapi import FastAPI

from openai import OpenAI
import re
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# gets API Key from environment variable OPENAI_API_KEY
key = "sk-proj-aDcDP7CEhSuXdU5R6qKOT3BlbkFJnEWGW8N20gb6ySsyQytv"
client = OpenAI(api_key=key)

@app.get("/{plant_name}")
def read_item(plant_name: str):
    # Use an f-string to insert the plant_name into the content string
    content = "My plant is a {}. Please give me the following details about its maintenance: humidity in percentage, ideal temperature in celsius, ideal lightning and ideal soil wetness. Put the answer in the following format: humidity: x%, temperature: x celsius, lightning: direct or indirect, soil wetness: (1-10).Please be sure to follow the format".format(plant_name)
    print(content)

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "user",
            "content": content,
        },
    ],
)
    pattern = r"humidity:\s(.+)%,\stemperature:\s(.+), lightning:\s(.+),\ssoil wetness:\s(.+)"


    input_str = completion.choices[0].message.content
    # Apply the pattern
    match = re.search(pattern, input_str)

    # Extract the values if match is found
    if match:
        humidity = match.group(1)
        temperature = match.group(2)
        lightning = match.group(3)
        soil_wetness = match.group(4)

        print(f"humidity: {humidity}")
        print(f"temperature: {temperature}")
        print(f"lightning: {lightning}")
        print(f"soil_wetness: {soil_wetness}")

        return {"humidity": humidity, "temperature": temperature, "lightning": lightning, "soil_wetness": soil_wetness}
    else:
        return {"whole": input_str, "plant_name": plant_name}
