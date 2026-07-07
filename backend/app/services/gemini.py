import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def generate_tasks_from_notes(notes: str):
    if not GEMINI_API_KEY:
        raise Exception("Gemini API key not configured")

    model = genai.GenerativeModel('gemini-3.5-flash')
    
    prompt = f"""
You are an AI Project Manager.
Extract every actionable task from the meeting notes.

For each task produce:
- task
- owner
- due_date
- priority

Rules:
Owner missing → null
Deadline missing → null
Infer priority
Return ONLY valid JSON.
No markdown.
No explanation.
No code block.

Meeting Notes:
{notes}
"""

    def parse_attempt():
        response = model.generate_content(prompt)
        text = response.text.strip()
        # Remove any potential markdown blocks if the model ignored the instruction
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        
        return json.loads(text)

    try:
        data = parse_attempt()
        return data
    except json.JSONDecodeError:
        # Retry once
        try:
            data = parse_attempt()
            return data
        except json.JSONDecodeError as e:
            raise Exception("Failed to parse Gemini response as JSON after 1 retry.") from e
