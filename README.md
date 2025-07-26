MedcheckAI
# 🧠 AI Disease Prediction Model

This project is an AI-powered web application that predicts **possible infections or diseases in the human body** based on **user-provided symptoms**. It combines a machine learning model with rule-based logic to provide real-time, accurate, and interpretable predictions.

---

## 📊 1. Data Collection

- Created a **synthetic medical dataset** using `pandas` with **1000+ samples**
- Includes **40 symptoms** and **20 diseases**, mapped realistically
- Structured similarly to the **Kaggle Disease-Symptom Dataset** (773 diseases, 377 symptoms)

---

## 🤖 2. Model Selection

- Model: **Random Forest Classifier** (`scikit-learn`)
- Configuration:
  - 100 estimators
  - Maximum depth = 10
  - Tuned hyperparameters
- Encoding:
  - `LabelEncoder` for disease labels
  - Binary feature encoding for symptoms
- Numerical processing handled via `NumPy`

---

## 📈 3. Model Training & Evaluation

- **Train/Test split:** 80/20 with stratified sampling
- **Evaluation metrics:** Accuracy, precision, recall, F1-score
- **Model persistence:** Saved and loaded using `joblib`

### 🔍 Visualizations (via `matplotlib` and `seaborn`):

- Disease distribution bar charts
- Symptom frequency analysis
- Symptom-disease correlation heatmaps

---

## 💻 4. User Interface

### Frontend (React)
- Interactive and professional **medical-themed UI**
- Real-time ML predictions with **confidence scores**
- Displays **feature importance** and **algorithm details**
- Status indicators for prediction success and system health

### Backend (Flask API)
- RESTful API with **CORS** support
- Live communication with the ML model
- Includes **health checks**, model metadata, and prediction endpoints

---

## 🌟 Key Features

- ⚙️ Dual Prediction System: **Rule-based + ML-powered**
- 📈 Auto-generated data visualizations
- 💾 Model persistence and reload
- 📌 Feature importance for transparency
- 🧑‍⚕️ Clean and intuitive UI design tailored for medical prediction
