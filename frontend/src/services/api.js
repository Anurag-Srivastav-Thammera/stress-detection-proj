const API_BASE_URL = 'http://127.0.0.1:8000';

export const getPrediction = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/predict`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
};

export const postManualPrediction = async (inputData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting manual prediction:', error);
        throw error;
    }
};

export const getSimulatedData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/simulate`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching simulated data:', error);
        throw error;
    }
};
