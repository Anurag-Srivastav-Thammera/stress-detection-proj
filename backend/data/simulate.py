import numpy as np

def generate_data():
    """Generates simulated heart rate (bpm) and galvanic skin response (µS)"""
    heart_rate = np.random.randint(60, 110)
    gsr = np.random.uniform(0.1, 1.2)
    return {"heart_rate": heart_rate, "gsr": round(gsr, 3)}
