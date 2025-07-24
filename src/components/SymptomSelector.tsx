import React, { useState, useMemo } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { symptoms, Symptom } from '../data/medicalData';

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onSymptomsChange: (symptoms: string[]) => void;
}

export function SymptomSelector({ selectedSymptoms, onSymptomsChange }: SymptomSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(symptoms.map(s => s.category)));
    return ['all', ...cats];
  }, []);

  const filteredSymptoms = useMemo(() => {
    return symptoms.filter(symptom => {
      const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addSymptom = (symptomId: string) => {
    if (!selectedSymptoms.includes(symptomId)) {
      onSymptomsChange([...selectedSymptoms, symptomId]);
    }
  };

  const removeSymptom = (symptomId: string) => {
    onSymptomsChange(selectedSymptoms.filter(id => id !== symptomId));
  };

  const getSymptomName = (symptomId: string) => {
    return symptoms.find(s => s.id === symptomId)?.name || symptomId;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Symptoms</h2>
      
      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Selected Symptoms:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map(symptomId => (
              <span
                key={symptomId}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {getSymptomName(symptomId)}
                <button
                  onClick={() => removeSymptom(symptomId)}
                  className="ml-2 hover:text-blue-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Symptom List */}
      <div className="max-h-64 overflow-y-auto">
        <div className="space-y-2">
          {filteredSymptoms.map(symptom => (
            <button
              key={symptom.id}
              onClick={() => addSymptom(symptom.id)}
              disabled={selectedSymptoms.includes(symptom.id)}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 ${
                selectedSymptoms.includes(symptom.id)
                  ? 'bg-blue-50 border-blue-200 text-blue-700 cursor-not-allowed'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{symptom.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({symptom.category})</span>
                </div>
                {!selectedSymptoms.includes(symptom.id) && (
                  <Plus className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}