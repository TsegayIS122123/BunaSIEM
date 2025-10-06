#!/usr/bin/env python3
"""
BunaSIEM Prediction Script
Standalone prediction utility
"""

import sys
import json
import joblib
import numpy as np
from anomaly_detector import AnomalyDetector

def main():
    if len(sys.argv) != 2:
        print("Usage: python predict.py '<json_log_data>'")
        return
    
    try:
        log_data = json.loads(sys.argv[1])
        detector = AnomalyDetector()
        result = detector.predict(log_data)
        
        print("Ì¥ç Prediction Results:")
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"‚ùå Error: {e}")

if __name__ == '__main__':
    main()
