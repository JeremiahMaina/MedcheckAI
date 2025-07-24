import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { PredictionResult, getSymptomByName, getSeverityColor, getConfidenceColor } from '../utils/diseasePredictor';

interface PredictionResultsProps {
  predictions: PredictionResult[];
}

export function PredictionResults({ predictions }: PredictionResultsProps) {
  if (predictions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Predictions Yet</h3>
          <p className="text-gray-500">Select symptoms to get disease predictions</p>
        </div>
      </div>
    );
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="w-5 h-5" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Possible Conditions</h2>
      
      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800 mb-1">Medical Disclaimer</p>
            <p className="text-yellow-700">
              This tool is for informational purposes only and should not replace professional medical advice. 
              Please consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {predictions.slice(0, 6).map((prediction, index) => (
          <div
            key={prediction.disease.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {prediction.disease.name}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(prediction.disease.severity)}`}>
                    {getSeverityIcon(prediction.disease.severity)}
                    <span className="ml-1 capitalize">{prediction.disease.severity}</span>
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{prediction.disease.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                  {prediction.confidence}%
                </div>
                <div className="text-xs text-gray-500">Confidence</div>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Matched Symptoms:</span>
                <span>{prediction.matchedSymptoms.length} of {prediction.totalSymptoms}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {prediction.matchedSymptoms.map(symptomId => (
                  <span
                    key={symptomId}
                    className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                  >
                    {getSymptomByName(symptomId)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {predictions.length > 6 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing top 6 results of {predictions.length} possible conditions
          </p>
        </div>
      )}
    </div>
  );
}