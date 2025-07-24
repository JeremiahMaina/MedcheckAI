from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from data_processor import MedicalDataProcessor
import os

app = Flask(__name__)
CORS(app)

# Initialize the medical data processor
processor = MedicalDataProcessor()

# Create models directory
os.makedirs('ml_backend/models', exist_ok=True)

# Load or train model on startup
try:
    processor.load_model()
    print("Model loaded successfully")
except:
    print("Training new model...")
    processor.create_synthetic_dataset()
    processor.train_model()
    print("Model trained and saved")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Medical ML API is running',
        'model_loaded': processor.model is not None
    })

@app.route('/api/predict', methods=['POST'])
def predict_disease():
    """Predict diseases based on symptoms"""
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        
        if not symptoms:
            return jsonify({
                'error': 'No symptoms provided'
            }), 400
        
        # Get predictions from ML model
        predictions = processor.predict_disease(symptoms)
        
        # Add additional metadata
        response = {
            'predictions': predictions,
            'input_symptoms': symptoms,
            'total_symptoms_in_model': len(processor.symptoms_list),
            'model_type': 'Random Forest Classifier'
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            'error': f'Prediction failed: {str(e)}'
        }), 500

@app.route('/api/symptoms', methods=['GET'])
def get_symptoms():
    """Get list of all available symptoms"""
    try:
        symptoms_data = [
            {
                'id': symptom,
                'name': symptom.replace('_', ' ').title(),
                'category': 'General'  # You can enhance this with proper categorization
            }
            for symptom in processor.symptoms_list
        ]
        
        return jsonify({
            'symptoms': symptoms_data,
            'total_count': len(symptoms_data)
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Failed to get symptoms: {str(e)}'
        }), 500

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    """Get list of all diseases in the model"""
    try:
        diseases_data = [
            {
                'id': disease.lower().replace(' ', '_'),
                'name': disease,
                'category': 'Medical Condition'
            }
            for disease in processor.diseases_list
        ]
        
        return jsonify({
            'diseases': diseases_data,
            'total_count': len(diseases_data)
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Failed to get diseases: {str(e)}'
        }), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    """Get information about the trained model"""
    try:
        if processor.model is None:
            return jsonify({
                'error': 'Model not loaded'
            }), 500
        
        # Get feature importance
        feature_importance = processor.model.feature_importances_
        top_features = []
        
        for i, importance in enumerate(feature_importance):
            if i < len(processor.symptoms_list):
                top_features.append({
                    'symptom': processor.symptoms_list[i],
                    'importance': float(importance)
                })
        
        # Sort by importance
        top_features.sort(key=lambda x: x['importance'], reverse=True)
        
        model_info = {
            'model_type': 'Random Forest Classifier',
            'n_estimators': processor.model.n_estimators,
            'max_depth': processor.model.max_depth,
            'total_features': len(processor.symptoms_list),
            'total_diseases': len(processor.diseases_list),
            'top_important_symptoms': top_features[:10]
        }
        
        return jsonify(model_info)
        
    except Exception as e:
        return jsonify({
            'error': f'Failed to get model info: {str(e)}'
        }), 500

@app.route('/api/retrain', methods=['POST'])
def retrain_model():
    """Retrain the model with fresh data"""
    try:
        processor.create_synthetic_dataset()
        accuracy = processor.train_model()
        
        return jsonify({
            'message': 'Model retrained successfully',
            'accuracy': accuracy,
            'total_samples': len(processor.df)
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Retraining failed: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)