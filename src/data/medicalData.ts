// Mock medical dataset based on common diseases and symptoms
export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
}

export const symptoms: Symptom[] = [
  // Respiratory
  { id: 'cough', name: 'Cough', category: 'Respiratory' },
  { id: 'shortness_breath', name: 'Shortness of breath', category: 'Respiratory' },
  { id: 'chest_pain', name: 'Chest pain', category: 'Respiratory' },
  { id: 'wheezing', name: 'Wheezing', category: 'Respiratory' },
  { id: 'runny_nose', name: 'Runny nose', category: 'Respiratory' },
  { id: 'sneezing', name: 'Sneezing', category: 'Respiratory' },
  { id: 'sore_throat', name: 'Sore throat', category: 'Respiratory' },
  
  // Gastrointestinal
  { id: 'nausea', name: 'Nausea', category: 'Gastrointestinal' },
  { id: 'vomiting', name: 'Vomiting', category: 'Gastrointestinal' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'Gastrointestinal' },
  { id: 'constipation', name: 'Constipation', category: 'Gastrointestinal' },
  { id: 'abdominal_pain', name: 'Abdominal pain', category: 'Gastrointestinal' },
  { id: 'bloating', name: 'Bloating', category: 'Gastrointestinal' },
  { id: 'heartburn', name: 'Heartburn', category: 'Gastrointestinal' },
  
  // Neurological
  { id: 'headache', name: 'Headache', category: 'Neurological' },
  { id: 'dizziness', name: 'Dizziness', category: 'Neurological' },
  { id: 'confusion', name: 'Confusion', category: 'Neurological' },
  { id: 'memory_loss', name: 'Memory loss', category: 'Neurological' },
  { id: 'seizures', name: 'Seizures', category: 'Neurological' },
  { id: 'numbness', name: 'Numbness', category: 'Neurological' },
  
  // General
  { id: 'fever', name: 'Fever', category: 'General' },
  { id: 'fatigue', name: 'Fatigue', category: 'General' },
  { id: 'weight_loss', name: 'Weight loss', category: 'General' },
  { id: 'weight_gain', name: 'Weight gain', category: 'General' },
  { id: 'loss_appetite', name: 'Loss of appetite', category: 'General' },
  { id: 'night_sweats', name: 'Night sweats', category: 'General' },
  { id: 'chills', name: 'Chills', category: 'General' },
  
  // Musculoskeletal
  { id: 'joint_pain', name: 'Joint pain', category: 'Musculoskeletal' },
  { id: 'muscle_pain', name: 'Muscle pain', category: 'Musculoskeletal' },
  { id: 'back_pain', name: 'Back pain', category: 'Musculoskeletal' },
  { id: 'stiffness', name: 'Stiffness', category: 'Musculoskeletal' },
  { id: 'swelling', name: 'Swelling', category: 'Musculoskeletal' },
  
  // Skin
  { id: 'rash', name: 'Rash', category: 'Skin' },
  { id: 'itching', name: 'Itching', category: 'Skin' },
  { id: 'dry_skin', name: 'Dry skin', category: 'Skin' },
  { id: 'bruising', name: 'Bruising', category: 'Skin' },
  
  // Cardiovascular
  { id: 'palpitations', name: 'Heart palpitations', category: 'Cardiovascular' },
  { id: 'high_bp', name: 'High blood pressure', category: 'Cardiovascular' },
  { id: 'low_bp', name: 'Low blood pressure', category: 'Cardiovascular' },
  
  // Mental Health
  { id: 'anxiety', name: 'Anxiety', category: 'Mental Health' },
  { id: 'depression', name: 'Depression', category: 'Mental Health' },
  { id: 'insomnia', name: 'Insomnia', category: 'Mental Health' },
  { id: 'mood_swings', name: 'Mood swings', category: 'Mental Health' },
];

export const diseases: Disease[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    symptoms: ['cough', 'runny_nose', 'sneezing', 'sore_throat', 'fatigue'],
    description: 'A viral infection of the upper respiratory tract',
    severity: 'low',
    category: 'Respiratory'
  },
  {
    id: 'influenza',
    name: 'Influenza (Flu)',
    symptoms: ['fever', 'cough', 'fatigue', 'muscle_pain', 'headache', 'chills'],
    description: 'A viral infection that attacks the respiratory system',
    severity: 'medium',
    category: 'Respiratory'
  },
  {
    id: 'covid19',
    name: 'COVID-19',
    symptoms: ['fever', 'cough', 'shortness_breath', 'fatigue', 'loss_appetite', 'headache'],
    description: 'A viral infection caused by SARS-CoV-2',
    severity: 'high',
    category: 'Respiratory'
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    symptoms: ['fever', 'cough', 'shortness_breath', 'chest_pain', 'fatigue', 'chills'],
    description: 'An infection that inflames air sacs in lungs',
    severity: 'high',
    category: 'Respiratory'
  },
  {
    id: 'asthma',
    name: 'Asthma',
    symptoms: ['shortness_breath', 'wheezing', 'cough', 'chest_pain'],
    description: 'A condition where airways narrow and swell',
    severity: 'medium',
    category: 'Respiratory'
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever', 'fatigue'],
    description: 'Inflammation of the stomach and intestines',
    severity: 'medium',
    category: 'Gastrointestinal'
  },
  {
    id: 'migraine',
    name: 'Migraine',
    symptoms: ['headache', 'nausea', 'vomiting', 'dizziness', 'fatigue'],
    description: 'A severe headache disorder',
    severity: 'medium',
    category: 'Neurological'
  },
  {
    id: 'tension_headache',
    name: 'Tension Headache',
    symptoms: ['headache', 'muscle_pain', 'fatigue', 'stiffness'],
    description: 'Most common type of headache',
    severity: 'low',
    category: 'Neurological'
  },
  {
    id: 'arthritis',
    name: 'Arthritis',
    symptoms: ['joint_pain', 'stiffness', 'swelling', 'fatigue'],
    description: 'Inflammation of joints',
    severity: 'medium',
    category: 'Musculoskeletal'
  },
  {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    symptoms: ['muscle_pain', 'fatigue', 'insomnia', 'headache', 'mood_swings'],
    description: 'A disorder causing widespread musculoskeletal pain',
    severity: 'medium',
    category: 'Musculoskeletal'
  },
  {
    id: 'depression',
    name: 'Depression',
    symptoms: ['depression', 'fatigue', 'insomnia', 'loss_appetite', 'weight_loss'],
    description: 'A mood disorder causing persistent sadness',
    severity: 'medium',
    category: 'Mental Health'
  },
  {
    id: 'anxiety_disorder',
    name: 'Anxiety Disorder',
    symptoms: ['anxiety', 'palpitations', 'shortness_breath', 'dizziness', 'insomnia'],
    description: 'Excessive worry and fear',
    severity: 'medium',
    category: 'Mental Health'
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    symptoms: ['high_bp', 'headache', 'dizziness', 'chest_pain', 'shortness_breath'],
    description: 'High blood pressure condition',
    severity: 'high',
    category: 'Cardiovascular'
  },
  {
    id: 'diabetes',
    name: 'Diabetes Type 2',
    symptoms: ['fatigue', 'weight_loss', 'numbness', 'blurred_vision', 'frequent_urination'],
    description: 'A chronic condition affecting blood sugar levels',
    severity: 'high',
    category: 'Endocrine'
  },
  {
    id: 'eczema',
    name: 'Eczema',
    symptoms: ['rash', 'itching', 'dry_skin', 'swelling'],
    description: 'A condition causing skin inflammation',
    severity: 'low',
    category: 'Skin'
  },
  {
    id: 'allergic_reaction',
    name: 'Allergic Reaction',
    symptoms: ['rash', 'itching', 'swelling', 'runny_nose', 'sneezing'],
    description: 'Body\'s immune response to allergens',
    severity: 'medium',
    category: 'Immune'
  }
];