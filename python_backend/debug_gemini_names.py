
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print("Accessing models...")
try:
    for m in genai.list_models():
        print(f"MODEL_NAME: {m.name}")
except Exception as e:
    print(f"LIST_ERROR: {e}")
