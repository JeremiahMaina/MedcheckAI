import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Info, Brain, TrendingUp, Database } from 'lucide-react';
import { mlApiService, MLPrediction, ModelInfo } from '../services/mlApi';

interface MLPredictionResultsProps {
  selectedSymptoms: string[];
}

export function MLPredictionResults({ selectedSymptoms }: MLPredictionResultsProps) {
  const [predictions, setPredictions] = useState<MLPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');

  useEffect(() => {
    checkApiStatus();
    loadModelInfo();
  }, []);

  useEffect(() => {
    if (selectedSymptoms.length > 0 && apiStatus === 'available') {
      getPredictions();
    } else {
      setPredictions([]);
    }
  }, [selectedSymptoms, apiStatus]);

  const checkApiStatus = async () => {
    try {
      await mlApiService.healthCheck();
      setApiStatus('available');
    } catch (error) {
      setApiStatus('unavailable');
      setError('ML API is not available. Please ensure the Python backend is running.');
    }
  };

  const loadModelInfo = async () => {
    try {
      const info = await mlApiService.getModelInfo();
      setModelInfo(info);
    } catch (error) {
      console.error('Failed to load model info:', error);
    }
  };

  const getPredictions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await mlApiService.predictDiseases(selectedSymptoms);
      setPredictions(response.predictions);
    } catch (error) {
      setError('Failed to get predictions from ML model');
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 75) return 'text-green-600';
    if (confidence >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadgeColor = (confidence: number): string => {
    if (confidence >= 75) return 'bg-green-100 text-green-800';
    if (confidence >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (apiStatus === 'checking') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Connecting to ML Engine</h3>
          <p className="text-gray-500">Checking ML API status...</p>
        </div>
      </div>
    );
  }

  if (apiStatus === 'unavailable') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-600 mb-2">ML Engine Unavailable</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-800 mb-2">To start the ML backend:</h4>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Install Python dependencies: <code className="bg-gray-200 px-1 rounded">pip install -r requirements.txt</code></li>
              <li>2. Run the API server: <code className="bg-gray-200 px-1 rounded">python ml_backend/api.py</code></li>
              <li>3. Refresh this page</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSymptoms.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">ML-Powered Predictions</h2>
        </div>
        
        {modelInfo && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <Database className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">Model Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Algorithm:</span>
                <span className="text-blue-600 ml-2">{modelInfo.model_type}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Features:</span>
                <span className="text-blue-600 ml-2">{modelInfo.total_features} symptoms</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Diseases:</span>
                <span className="text-blue-600 ml-2">{modelInfo.total_diseases} conditions</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Trees:</span>
                <span className="text-blue-600 ml-2">{modelInfo.n_estimators}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center py-8">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Ready for Analysis</h3>
          <p className="text-gray-500">Select symptoms to get ML-powered disease predictions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">ML Predictions</h2>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>Powered by Random Forest</span>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800 mb-1">Medical Disclaimer</p>
            <p className="text-yellow-700">
              These ML predictions are for educational purposes only. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Brain className="w-8 h-8 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Analyzing symptoms with ML model...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={getPredictions}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : predictions.length === 0 ? (
        <div className="text-center py-8">
          <Info className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No predictions available for selected symptoms</p>
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {prediction.disease}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceBadgeColor(prediction.confidence)}`}>
                    ML Confidence
                  </span>
                  <div className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence.toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    prediction.confidence >= 75 ? 'bg-green-500' :
                    prediction.confidence >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${prediction.confidence}%` }}
                ></div>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">Rank:</span> #{index + 1} most likely condition
              </div>
            </div>
          ))}
        </div>
      )}

      {modelInfo && predictions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-800 mb-3">Top Important Symptoms in Model:</h4>
          <div className="flex flex-wrap gap-2">
            {modelInfo.top_important_symptoms.slice(0, 8).map((symptom, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {symptom.symptom.replace('_', ' ')} ({(symptom.importance * 100).toFixed(1)}%)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}