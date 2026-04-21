from fastapi import FastAPI, Body
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model.predict import predict_stress
from data.simulate import generate_data

class StressInput(BaseModel):
    heart_rate: float
    gsr: float

app = FastAPI(title="Stress Detection AI API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify the actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Stress Detection AI API is running"}

@app.get("/predict")
def predict_simulated():
    data = generate_data()
    analysis = predict_stress(data)
    return {
        "heart_rate": data["heart_rate"],
        "gsr": data["gsr"],
        "analysis": analysis
    }

@app.post("/predict")
def predict_manual(input_data: StressInput):
    data = {"heart_rate": input_data.heart_rate, "gsr": input_data.gsr}
    analysis = predict_stress(data)
    return {
        "heart_rate": data["heart_rate"],
        "gsr": data["gsr"],
        "analysis": analysis
    }

@app.get("/simulate")
def simulate():
    return generate_data()
