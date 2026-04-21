import os
import json
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras

load_dotenv()

# Initialize Cerebras client
client = Cerebras(
    api_key=os.environ.get("CEREBRAS_API_KEY")
)

def predict_stress(data):
    """
    Uses Cerebras AI to analyze physiological data and return a professional stress assessment.
    """
    hr = data["heart_rate"]
    gsr = data["gsr"]

    system_prompt = """
    You are a professional physiological health AI assistant. 
    Analyze the provided Heart Rate (BPM) and Galvanic Skin Response (GSR) values to determine a stress level.
    
    You must return a valid JSON object with the following fields:
    - stress_level: String (one of: "No Stress", "Mild Stress", "Moderate Stress", "Severe Stress")
    - confidence: Integer (0-100)
    - explanation: A professional, clear sentence explaining the physiological indicators.
    - recommendations: An array of 3 specific, context-aware coping strategies.
    
    Guidelines:
    - Normal HR: 60-100. Elevated > 100.
    - Normal GSR: 0.1-0.5. Elevated > 0.6.
    - High HR + High GSR = Severe/Moderate stress.
    
    Be precise and professional. Do not include any other text besides the JSON.
    """
    
    user_content = f"Data -> Heart Rate: {hr} BPM, GSR: {gsr} µS"
    
    try:
        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            model="llama3.1-8b",
            max_completion_tokens=500,
            temperature=0.1, # Lower temperature for consistency
            stream=False
        )
        
        response_text = completion.choices[0].message.content
        # Remove markdown code blocks if present
        response_text = response_text.replace('```json', '').replace('```', '').strip()
        
        result = json.loads(response_text)
        return result
    except Exception as e:
        print(f"Cerebras API Error: {e}")
        # Fallback logic if API fails
        return {
            "stress_level": "Analysis Failed",
            "confidence": 0,
            "explanation": "Unable to verify physiological data via AI engine.",
            "recommendations": ["Ensure internet connectivity", "Check API credentials", "Retry calculation"]
        }
