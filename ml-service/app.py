from flask import Flask, request, jsonify
from flask_cors import CORS
from models.anomaly_detector import AnomalyDetector
from models.pattern_matcher import PatternMatcher
import pandas as pd
import numpy as np
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

print("BunaSIEM ML Service Starting...")
print("Loading Ethiopian threat detection models...")

# Initialize ML models
anomaly_detector = AnomalyDetector()
pattern_matcher = PatternMatcher()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'BunaSIEM ML Service',
        'timestamp': datetime.now().isoformat(),
        'models_loaded': True,
        'features': [
            'Ethiopian IP pattern analysis',
            'Business hours anomaly detection',
            'Geographic threat mapping',
            'Behavioral anomaly detection'
        ]
    })

@app.route('/predict/anomaly', methods=['POST'])
def predict_anomaly():
    """Predict if a security log is anomalous with Ethiopian context"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Analyze with ML model
        ml_result = anomaly_detector.predict(data)

        # Analyze with pattern matcher for Ethiopian context
        pattern_result = pattern_matcher.detect_ethiopian_patterns([data])

        # Combine results
        combined_result = {
            'is_anomaly': ml_result['is_anomaly'] or pattern_result['suspicious'],
            'confidence': max(ml_result['confidence'], pattern_result['confidence']),
            'ml_result': ml_result,
            'pattern_result': pattern_result,
            'ethiopian_context': True,
            'analysis_timestamp': datetime.now().isoformat()
        }

        return jsonify(combined_result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analyze/batch', methods=['POST'])
def analyze_batch():
    """Analyze multiple logs for Ethiopian security patterns"""
    try:
        data = request.get_json()
        logs = data.get('logs', [])

        if not logs:
            return jsonify({'error': 'No logs provided'}), 400

        # Analyze with both systems
        ml_results = []
        pattern_results = []

        for log in logs:
            ml_result = anomaly_detector.predict(log)
            ml_results.append(ml_result)

        pattern_result = pattern_matcher.detect_ethiopian_patterns(logs)

        # Calculate overall threat level
        anomaly_count = sum(1 for r in ml_results if r['is_anomaly'])
        threat_level = 'critical' if anomaly_count > 5 else 'high' if anomaly_count > 2 else 'medium' if anomaly_count > 0 else 'low'

        return jsonify({
            'total_logs_analyzed': len(logs),
            'anomalies_detected': anomaly_count,
            'threat_level': threat_level,
            'ethiopian_patterns_found': pattern_result['patterns_detected'],
            'ml_results': ml_results,
            'pattern_analysis': pattern_result
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/threats/ethiopian', methods=['GET'])
def get_ethiopian_threats():
    """Get current Ethiopian threat intelligence"""
    try:
        threats = pattern_matcher.get_ethiopian_threat_intelligence()
        return jsonify({
            'threat_intelligence': threats,
            'last_updated': datetime.now().isoformat(),
            'source': 'BunaSIEM Ethiopian Threat Feed'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('ML_SERVICE_PORT', 5000))
    debug = os.getenv('NODE_ENV') != 'production'

    print(f"ML Models loaded successfully")
    print(f"Ethiopian threat patterns initialized")
    print(f"Starting BunaSIEM ML Service on port {port}")

    app.run(host='0.0.0.0', port=port, debug=debug)