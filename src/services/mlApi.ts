import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface MLPrediction {
  disease: string;
  confidence: number;
}

export interface MLPredictionResponse {
  predictions: MLPrediction[];
  input_symptoms: string[];
  total_symptoms_in_model: number;
  model_type: string;
}

export interface MLSymptom {
  id: string;
  name: string;
  category: string;
}

export interface ModelInfo {
  model_type: string;
  n_estimators: number;
  max_depth: number;
  total_features: number;
  total_diseases: number;
  top_important_symptoms: Array<{
    symptom: string;
    importance: number;
  }>;
}

class MLApiService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async healthCheck(): Promise<{ status: string; message: string; model_loaded: boolean }> {
    try {
      const response = await this.axiosInstance.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('ML API is not available');
    }
  }

  async predictDiseases(symptoms: string[]): Promise<MLPredictionResponse> {
    try {
      const response = await this.axiosInstance.post('/predict', {
        symptoms: symptoms
      });
      return response.data;
    } catch (error) {
      console.error('Prediction failed:', error);
      throw new Error('Failed to get disease predictions');
    }
  }

  async getSymptoms(): Promise<{ symptoms: MLSymptom[]; total_count: number }> {
    try {
      const response = await this.axiosInstance.get('/symptoms');
      return response.data;
    } catch (error) {
      console.error('Failed to get symptoms:', error);
      throw new Error('Failed to load symptoms');
    }
  }

  async getDiseases(): Promise<{ diseases: any[]; total_count: number }> {
    try {
      const response = await this.axiosInstance.get('/diseases');
      return response.data;
    } catch (error) {
      console.error('Failed to get diseases:', error);
      throw new Error('Failed to load diseases');
    }
  }

  async getModelInfo(): Promise<ModelInfo> {
    try {
      const response = await this.axiosInstance.get('/model-info');
      return response.data;
    } catch (error) {
      console.error('Failed to get model info:', error);
      throw new Error('Failed to load model information');
    }
  }

  async retrainModel(): Promise<{ message: string; accuracy: number; total_samples: number }> {
    try {
      const response = await this.axiosInstance.post('/retrain');
      return response.data;
    } catch (error) {
      console.error('Retraining failed:', error);
      throw new Error('Failed to retrain model');
    }
  }
}

export const mlApiService = new MLApiService();