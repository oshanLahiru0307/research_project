
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

with open('model_list_debug.txt', 'w') as f:
    f.write(f"API KEY: {api_key[:10]}...\n")
    try:
        models = genai.list_models()
        for m in models:
            f.write(f"NAME: {m.name}, METHODS: {m.supported_generation_methods}\n")
    except Exception as e:
        f.write(f"ERROR: {str(e)}\n")
