import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.metrics import classification_report, accuracy_score
import joblib
import json
import os

class MedicalDataProcessor:
    def __init__(self):
        self.model = None
        self.label_encoder = LabelEncoder()
        self.symptom_encoder = MultiLabelBinarizer()
        self.symptoms_list = []
        self.diseases_list = []
        
    def create_synthetic_dataset(self):
        """Create a synthetic medical dataset similar to Kaggle's Disease-Symptom Dataset"""
        
        # Define symptoms and diseases
        symptoms = [
            'fever', 'cough', 'fatigue', 'headache', 'nausea', 'vomiting', 'diarrhea',
            'abdominal_pain', 'chest_pain', 'shortness_breath', 'dizziness', 'joint_pain',
            'muscle_pain', 'rash', 'sore_throat', 'runny_nose', 'sneezing', 'chills',
            'night_sweats', 'weight_loss', 'loss_appetite', 'confusion', 'seizures',
            'numbness', 'tingling', 'blurred_vision', 'frequent_urination', 'excessive_thirst',
            'dry_mouth', 'constipation', 'bloating', 'heartburn', 'difficulty_swallowing',
            'hoarseness', 'wheezing', 'palpitations', 'swelling', 'bruising', 'itching'
        ]
        
        diseases = [
            'Common Cold', 'Influenza', 'COVID-19', 'Pneumonia', 'Bronchitis',
            'Asthma', 'Diabetes Type 2', 'Hypertension', 'Migraine', 'Tension Headache',
            'Gastroenteritis', 'Food Poisoning', 'Appendicitis', 'Arthritis', 'Fibromyalgia',
            'Depression', 'Anxiety Disorder', 'Allergic Reaction', 'Eczema', 'Urinary Tract Infection'
        ]
        
        # Create disease-symptom mappings
        disease_symptoms = {
            'Common Cold': ['cough', 'runny_nose', 'sneezing', 'sore_throat', 'fatigue'],
            'Influenza': ['fever', 'cough', 'fatigue', 'muscle_pain', 'headache', 'chills'],
            'COVID-19': ['fever', 'cough', 'shortness_breath', 'fatigue', 'loss_appetite', 'headache'],
            'Pneumonia': ['fever', 'cough', 'shortness_breath', 'chest_pain', 'fatigue', 'chills'],
            'Bronchitis': ['cough', 'fatigue', 'chest_pain', 'shortness_breath'],
            'Asthma': ['shortness_breath', 'wheezing', 'cough', 'chest_pain'],
            'Diabetes Type 2': ['fatigue', 'weight_loss', 'frequent_urination', 'excessive_thirst', 'blurred_vision'],
            'Hypertension': ['headache', 'dizziness', 'chest_pain', 'shortness_breath'],
            'Migraine': ['headache', 'nausea', 'vomiting', 'dizziness', 'fatigue'],
            'Tension Headache': ['headache', 'muscle_pain', 'fatigue'],
            'Gastroenteritis': ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever', 'fatigue'],
            'Food Poisoning': ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever'],
            'Appendicitis': ['abdominal_pain', 'nausea', 'vomiting', 'fever', 'loss_appetite'],
            'Arthritis': ['joint_pain', 'swelling', 'fatigue'],
            'Fibromyalgia': ['muscle_pain', 'fatigue', 'headache'],
            'Depression': ['fatigue', 'loss_appetite', 'weight_loss'],
            'Anxiety Disorder': ['palpitations', 'shortness_breath', 'dizziness'],
            'Allergic Reaction': ['rash', 'itching', 'swelling', 'runny_nose', 'sneezing'],
            'Eczema': ['rash', 'itching', 'dry_mouth'],
            'Urinary Tract Infection': ['frequent_urination', 'abdominal_pain', 'fever']
        }
        
        # Generate synthetic data
        data = []
        np.random.seed(42)
        
        for disease, primary_symptoms in disease_symptoms.items():
            # Generate multiple samples for each disease
            for _ in range(50):  # 50 samples per disease
                # Start with primary symptoms
                sample_symptoms = primary_symptoms.copy()
                
                # Add some random symptoms (noise)
                additional_symptoms = np.random.choice(
                    [s for s in symptoms if s not in sample_symptoms],
                    size=np.random.randint(0, 3),
                    replace=False
                ).tolist()
                
                sample_symptoms.extend(additional_symptoms)
                
                # Create binary encoding for symptoms
                symptom_vector = [1 if symptom in sample_symptoms else 0 for symptom in symptoms]
                
                data.append({
                    'disease': disease,
                    'symptoms': sample_symptoms,
                    **{f'symptom_{symptom}': (1 if symptom in sample_symptoms else 0) for symptom in symptoms}
                })
        
        self.df = pd.DataFrame(data)
        self.symptoms_list = symptoms
        self.diseases_list = diseases
        
        return self.df
    
    def train_model(self):
        """Train machine learning model using scikit-learn"""
        if self.df is None:
            self.create_synthetic_dataset()
        
        # Prepare features (symptoms) and target (diseases)
        feature_columns = [f'symptom_{symptom}' for symptom in self.symptoms_list]
        X = self.df[feature_columns].values
        y = self.df['disease'].values
        
        # Encode diseases
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
        )
        
        # Train Random Forest model
        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            max_depth=10,
            min_samples_split=5
        )
        
        self.model.fit(X_train, y_train)
        
        # Evaluate model
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Model Accuracy: {accuracy:.4f}")
        
        # Save model and encoders
        joblib.dump(self.model, 'ml_backend/models/disease_classifier.pkl')
        joblib.dump(self.label_encoder, 'ml_backend/models/label_encoder.pkl')
        
        return accuracy
    
    def predict_disease(self, symptoms_input):
        """Predict disease based on input symptoms"""
        if self.model is None:
            self.load_model()
        
        # Create feature vector
        feature_vector = np.zeros(len(self.symptoms_list))
        for i, symptom in enumerate(self.symptoms_list):
            if symptom in symptoms_input:
                feature_vector[i] = 1
        
        # Get prediction probabilities
        probabilities = self.model.predict_proba([feature_vector])[0]
        
        # Get top predictions
        top_indices = np.argsort(probabilities)[::-1][:5]
        
        predictions = []
        for idx in top_indices:
            if probabilities[idx] > 0.01:  # Only include predictions with >1% probability
                disease = self.label_encoder.inverse_transform([idx])[0]
                confidence = probabilities[idx] * 100
                predictions.append({
                    'disease': disease,
                    'confidence': round(confidence, 2)
                })
        
        return predictions
    
    def load_model(self):
        """Load trained model and encoders"""
        try:
            self.model = joblib.load('ml_backend/models/disease_classifier.pkl')
            self.label_encoder = joblib.load('ml_backend/models/label_encoder.pkl')
            
            # Recreate symptoms list
            self.create_synthetic_dataset()
            
        except FileNotFoundError:
            print("Model not found. Training new model...")
            self.train_model()
    
    def generate_visualizations(self):
        """Generate data visualizations using matplotlib and seaborn"""
        if self.df is None:
            self.create_synthetic_dataset()
        
        # Set style
        plt.style.use('default')
        sns.set_palette("husl")
        
        # Create visualizations directory
        os.makedirs('ml_backend/visualizations', exist_ok=True)
        
        # 1. Disease distribution
        plt.figure(figsize=(12, 8))
        disease_counts = self.df['disease'].value_counts()
        sns.barplot(x=disease_counts.values, y=disease_counts.index)
        plt.title('Distribution of Diseases in Dataset', fontsize=16, fontweight='bold')
        plt.xlabel('Number of Samples')
        plt.ylabel('Disease')
        plt.tight_layout()
        plt.savefig('ml_backend/visualizations/disease_distribution.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # 2. Symptom frequency
        plt.figure(figsize=(14, 10))
        symptom_counts = {}
        for symptoms_list in self.df['symptoms']:
            for symptom in symptoms_list:
                symptom_counts[symptom] = symptom_counts.get(symptom, 0) + 1
        
        symptom_df = pd.DataFrame(list(symptom_counts.items()), columns=['Symptom', 'Frequency'])
        symptom_df = symptom_df.sort_values('Frequency', ascending=True).tail(20)
        
        sns.barplot(data=symptom_df, x='Frequency', y='Symptom')
        plt.title('Top 20 Most Common Symptoms', fontsize=16, fontweight='bold')
        plt.xlabel('Frequency')
        plt.ylabel('Symptom')
        plt.tight_layout()
        plt.savefig('ml_backend/visualizations/symptom_frequency.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # 3. Correlation heatmap
        plt.figure(figsize=(16, 12))
        feature_columns = [f'symptom_{symptom}' for symptom in self.symptoms_list[:20]]  # Top 20 symptoms
        correlation_matrix = self.df[feature_columns].corr()
        
        sns.heatmap(correlation_matrix, annot=False, cmap='coolwarm', center=0)
        plt.title('Symptom Correlation Heatmap (Top 20 Symptoms)', fontsize=16, fontweight='bold')
        plt.xticks(rotation=45, ha='right')
        plt.yticks(rotation=0)
        plt.tight_layout()
        plt.savefig('ml_backend/visualizations/symptom_correlation.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        print("Visualizations saved to ml_backend/visualizations/")

if __name__ == "__main__":
    processor = MedicalDataProcessor()
    
    # Create dataset
    df = processor.create_synthetic_dataset()
    print(f"Dataset created with {len(df)} samples and {len(processor.symptoms_list)} symptoms")
    
    # Train model
    accuracy = processor.train_model()
    print(f"Model trained with accuracy: {accuracy:.4f}")
    
    # Generate visualizations
    processor.generate_visualizations()
    
    # Test prediction
    test_symptoms = ['fever', 'cough', 'fatigue', 'headache']
    predictions = processor.predict_disease(test_symptoms)
    print(f"\nTest prediction for symptoms {test_symptoms}:")
    for pred in predictions:
        print(f"  {pred['disease']}: {pred['confidence']:.2f}%")