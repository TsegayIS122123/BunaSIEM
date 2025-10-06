#!/usr/bin/env python3
"""
BunaSIEM Model Training Script
Trains ML models with Ethiopian security data
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split
import joblib
import json
from datetime import datetime

def generate_training_data():
    """Generate training data with Ethiopian security patterns"""
    np.random.seed(42)
    n_normal = 5000
    n_anomalous = 500
    
    # Normal Ethiopian behavior
    normal_data = np.column_stack([
        np.random.normal(13, 3, n_normal),  # hour_of_day
        np.random.binomial(1, 0.2, n_normal),  # is_weekend
        np.random.poisson(0.5, n_normal),  # failed_attempts
        np.random.normal(3, 1.5, n_normal),  # source_ip_diversity
        np.random.normal(8, 4, n_normal),  # request_frequency
        np.random.binomial(1, 0.85, n_normal),  # is_ethiopian_ip
        np.random.binomial(1, 0.05, n_normal),  # unusual_location
        np.random.binomial(1, 0.7, n_normal),  # is_business_hours
        np.random.exponential(1, n_normal),  # request_size
    ])
    
    # Anomalous behavior patterns
    anomalous_data = np.column_stack([
        np.random.uniform(0, 6, n_anomalous),  # Very early/late hours
        np.random.binomial(1, 0.8, n_anomalous),  # Mostly weekends
        np.random.poisson(5, n_anomalous),  # High failed attempts
        np.random.normal(15, 5, n_anomalous),  # High IP diversity
        np.random.normal(50, 20, n_anomalous),  # High request frequency
        np.random.binomial(1, 0.1, n_anomalous),  # Mostly non-Ethiopian IPs
        np.random.binomial(1, 0.9, n_anomalous),  # Mostly unusual locations
        np.random.binomial(1, 0.1, n_anomalous),  # Rarely business hours
        np.random.exponential(10, n_anomalous),  # Large request sizes
    ])
    
    X = np.vstack([normal_data, anomalous_data])
    y = np.array([1] * n_normal + [-1] * n_anomalous)  # 1=normal, -1=anomaly
    
    return X, y

def train_model():
    """Train the Isolation Forest model"""
    print("Ì¥Ñ Generating Ethiopian security training data...")
    X, y = generate_training_data()
    
    print("ÌøóÔ∏è Training Isolation Forest model...")
    model = IsolationForest(
        n_estimators=150,
        max_samples='auto',
        contamination=0.1,
        random_state=42,
        verbose=1
    )
    
    model.fit(X)
    
    # Save model
    model_path = 'models/anomaly_model.pkl'
    joblib.dump(model, model_path)
    
    print(f"‚úÖ Model trained and saved to {model_path}")
    print(f"Ì≥ä Training samples: {len(X)}")
    print(f"ÌæØ Anomaly rate: {len(y[y == -1]) / len(y):.2%}")
    
    return model

if __name__ == '__main__':
    print("Ì∫Ä BunaSIEM Model Training Starting...")
    print("Ìºç Focus: Ethiopian cybersecurity patterns")
    model = train_model()
    print("Ìæâ Model training completed successfully!")
