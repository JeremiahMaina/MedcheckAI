import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SymptomSelector } from './components/SymptomSelector';
import { PredictionResults } from './components/PredictionResults';
import { MLPredictionResults } from './components/MLPredictionResults';
import { predictDiseases, PredictionResult } from './utils/diseasePredictor';

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [activeTab, setActiveTab] = useState<'rule-based' | 'ml'>('ml');

  useEffect(() => {
    const results = predictDiseases(selectedSymptoms);
    setPredictions(results);
  }, [selectedSymptoms]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Advanced Medical Symptom Checker
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            rule-based predictions with ML-powered analysis using Random Forest classification.
            Our advanced AI analyzes your symptoms against a comprehensive database of 773 diseases 
            and 377 symptoms to provide potential diagnoses. Select your symptoms below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div>
            <SymptomSelector
              selectedSymptoms={selectedSymptoms}
              onSymptomsChange={setSelectedSymptoms}
            />
          </div>
          
          <div>
            <PredictionResults predictions={predictions} />
          </div>
          
          <div>
            <MLPredictionResults selectedSymptoms={selectedSymptoms} />
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Database Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">20</div>
              <div className="text-sm text-gray-600">ML Diseases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">40</div>
              <div className="text-sm text-gray-600">ML Symptoms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">RF</div>
              <div className="text-sm text-gray-600">ML Algorithm</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            © 2025 MedCheck ML. This tool is for educational purposes only. 
            Always consult with qualified healthcare professionals for medical advice.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;