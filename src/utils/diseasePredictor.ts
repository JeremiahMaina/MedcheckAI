import { Disease, diseases, symptoms } from '../data/medicalData';

export interface PredictionResult {
  disease: Disease;
  confidence: number;
  matchedSymptoms: string[];
  totalSymptoms: number;
}

export function predictDiseases(selectedSymptoms: string[]): PredictionResult[] {
  if (selectedSymptoms.length === 0) {
    return [];
  }

  const predictions: PredictionResult[] = [];

  diseases.forEach(disease => {
    const matchedSymptoms = disease.symptoms.filter(symptom => 
      selectedSymptoms.includes(symptom)
    );
    
    if (matchedSymptoms.length > 0) {
      // Calculate confidence based on percentage of matched symptoms
      const confidence = (matchedSymptoms.length / disease.symptoms.length) * 100;
      
      // Boost confidence if many user symptoms match
      const userSymptomMatch = (matchedSymptoms.length / selectedSymptoms.length) * 100;
      const adjustedConfidence = Math.min((confidence + userSymptomMatch) / 2, 100);
      
      predictions.push({
        disease,
        confidence: Math.round(adjustedConfidence),
        matchedSymptoms,
        totalSymptoms: disease.symptoms.length
      });
    }
  });

  // Sort by confidence (highest first)
  return predictions.sort((a, b) => b.confidence - a.confidence);
}

export function getSymptomByName(symptomId: string): string {
  const symptom = symptoms.find(s => s.id === symptomId);
  return symptom ? symptom.name : symptomId;
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'low':
      return 'text-green-600 bg-green-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'high':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 75) return 'text-green-600';
  if (confidence >= 50) return 'text-yellow-600';
  return 'text-red-600';
}