import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib
import os
from datetime import datetime

class AnomalyDetector:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.model_path = 'models/anomaly_model.pkl'
        self.load_or_train_model()
    
    def load_or_train_model(self):
        """Load existing model or train a new one with Ethiopian context"""
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                print("Anomaly detection model loaded successfully")
            except Exception as e:
                print(f" Failed to load model: {e}. Training new one")
                self.train_model()
        else:
            print("Training new anomaly detection model with Ethiopian patterns")
            self.train_model()
    
    def train_model(self):
        """Train Isolation Forest model on Ethiopian security patterns"""
        np.random.seed(42)
        n_samples = 2000
        
        # Normal Ethiopian behavior patterns
        # Ethiopian business hours: 8:30 AM - 5:30 PM
        # Common locations: Addis Ababa, Dire Dawa, Adama, Hawassa, Mekele
        
        normal_data = np.column_stack([
            np.random.normal(13, 3, n_samples),  # hour_of_day (peak around 1 PM)
            np.random.binomial(1, 0.2, n_samples),  # is_weekend (20% weekend activity)
            np.random.poisson(0.5, n_samples),  # failed_attempts (mostly 0-1)
            np.random.normal(3, 1.5, n_samples),  # source_ip_diversity
            np.random.normal(8, 4, n_samples),  # request_frequency
            np.random.binomial(1, 0.85, n_samples),  # is_ethiopian_ip (85% Ethiopian IPs)
            np.random.binomial(1, 0.05, n_samples),   # unusual_location (5% unusual)
            np.random.binomial(1, 0.7, n_samples),   # is_business_hours (70% during business)
            np.random.exponential(1, n_samples),     # request_size
        ])
        
        # Add some Ethiopian-specific anomalies for training
        anomalous_data = np.column_stack([
            np.random.uniform(0, 6, 200),  # Very early hours
            np.random.binomial(1, 0.8, 200),  # Mostly weekends
            np.random.poisson(5, 200),  # High failed attempts
            np.random.normal(15, 5, 200),  # High IP diversity
            np.random.normal(50, 20, 200),  # High request frequency
            np.random.binomial(1, 0.1, 200),  # Mostly non-Ethiopian IPs
            np.random.binomial(1, 0.9, 200),  # Mostly unusual locations
            np.random.binomial(1, 0.1, 200),  # Rarely business hours
            np.random.exponential(10, 200),   # Large request sizes
        ])
        
        # Combine data
        X_train = np.vstack([normal_data, anomalous_data])
        
        # Train model
        self.model = IsolationForest(
            contamination=0.1,  # 10% anomalies expected
            random_state=42,
            n_estimators=100,
            max_samples='auto'
        )
        
        self.model.fit(X_train)
        
        # Save model
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, self.model_path)
        print(" Model trained and saved successfully with Ethiopian patterns")
    
    def predict(self, log_data):
        """Predict if features represent an anomaly in Ethiopian context"""
        try:
            features = self.extract_features(log_data)
            feature_array = np.array([list(features.values())])
            
            # Predict anomaly (-1 for anomaly, 1 for normal)
            prediction = self.model.predict(feature_array)[0]
            confidence = abs(self.model.decision_function(feature_array)[0])
            
            is_anomaly = prediction == -1
            
            # Enhance with Ethiopian business rules
            ethiopian_context = self.enhance_with_ethiopian_rules(log_data, features)
            if ethiopian_context['high_risk']:
                is_anomaly = True
                confidence = max(confidence, 0.8)
            
            return {
                'is_anomaly': bool(is_anomaly),
                'confidence': float(confidence),
                'features_used': list(features.keys()),
                'ethiopian_context': ethiopian_context,
                'model_type': 'Isolation Forest with Ethiopian Rules'
            }
            
        except Exception as e:
            print(f"Prediction error: {e}")
            return {
                'is_anomaly': False,
                'confidence': 0.0,
                'error': str(e)
            }
    
    def extract_features(self, log_data):
        """Extract features from log data for Ethiopian ML analysis"""
        event_time = log_data.get('event_time', datetime.now().isoformat())
        try:
            hour = pd.to_datetime(event_time).hour
            is_weekend = 1 if pd.to_datetime(event_time).dayofweek >= 5 else 0
        except:
            hour = 12
            is_weekend = 0
        
        features = {
            'hour_of_day': hour,
            'is_weekend': is_weekend,
            'failed_attempts': log_data.get('failed_attempts', 0),
            'source_ip_diversity': len(set(log_data.get('source_ips', []))),
            'request_frequency': log_data.get('request_count', 1),
            'is_ethiopian_ip': 1 if log_data.get('country_code') == 'ET' else 0,
            'unusual_location': 1 if log_data.get('city') not in ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa', 'Mekele'] else 0,
            'is_business_hours': 1 if 8 <= hour <= 17 else 0,
            'request_size': log_data.get('bytes_transferred', 0) / 1024.0,  # KB
        }
        return features
    
    def enhance_with_ethiopian_rules(self, log_data, features):
        """Enhance ML prediction with Ethiopian-specific business rules"""
        high_risk = False
        reasons = []
        
        # Ethiopian business hours: 8:30 AM - 5:30 PM
        if features['hour_of_day'] < 6 or features['hour_of_day'] > 22:
            high_risk = True
            reasons.append("Activity outside typical Ethiopian hours (6 AM - 10 PM)")
        
        # Ethiopian IP ranges: 196.188.x.x, 197.156.x.x
        source_ip = log_data.get('source_ip', '')
        if source_ip.startswith('196.188.') and features['failed_attempts'] > 3:
            high_risk = True
            reasons.append("Multiple failures from Ethiopian IP range")
        
        # Unusual data transfer sizes for Ethiopian context
        if features['request_size'] > 10000:  # 10MB+ unusual for typical Ethiopian traffic
            high_risk = True
            reasons.append("Unusually large data transfer for Ethiopian context")
        
        return {
            'high_risk': high_risk,
            'reasons': reasons,
            'ethiopian_business_hours': '8:30 AM - 5:30 PM',
            'common_locations': ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa', 'Mekele']
        }
