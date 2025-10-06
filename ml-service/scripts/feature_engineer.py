#!/usr/bin/env python3
"""
BunaSIEM Feature Engineering
Feature extraction for Ethiopian security logs
"""

import pandas as pd
import numpy as np
from datetime import datetime

class EthiopianFeatureEngineer:
    def __init__(self):
        self.ethiopian_holidays = [
            '2025-01-07',  # Ethiopian Christmas
            '2025-01-19',  # Epiphany
            '2025-03-02',  # Adwa Victory Day
            '2025-04-28',  # Ethiopian Good Friday
            '2025-04-30',  # Ethiopian Easter
            '2025-05-01',  # International Workers' Day
            '2025-05-28',  # Downfall of Derg
        ]
    
    def extract_features(self, log_data):
        """Extract comprehensive features for Ethiopian context"""
        features = {}
        
        # Time-based features
        features.update(self._extract_time_features(log_data))
        
        # Location-based features
        features.update(self._extract_location_features(log_data))
        
        # Behavioral features
        features.update(self._extract_behavioral_features(log_data))
        
        # Network features
        features.update(self._extract_network_features(log_data))
        
        return features
    
    def _extract_time_features(self, log_data):
        """Extract time-based features for Ethiopian context"""
        event_time = log_data.get('event_time', datetime.now().isoformat())
        
        try:
            dt = pd.to_datetime(event_time)
            hour = dt.hour
            day_of_week = dt.dayofweek
            is_weekend = 1 if day_of_week >= 5 else 0
            is_holiday = 1 if dt.strftime('%Y-%m-%d') in self.ethiopian_holidays else 0
            
            # Ethiopian business hours: 8:30 AM - 5:30 PM
            is_business_hours = 1 if 8 <= hour <= 17 else 0
            
            # Ethiopian night hours: 10 PM - 6 AM
            is_night_hours = 1 if hour < 6 or hour > 22 else 0
            
        except:
            hour = 12
            is_weekend = 0
            is_holiday = 0
            is_business_hours = 0
            is_night_hours = 0
        
        return {
            'hour_of_day': hour,
            'is_weekend': is_weekend,
            'is_holiday': is_holiday,
            'is_business_hours': is_business_hours,
            'is_night_hours': is_night_hours,
            'day_of_week': day_of_week
        }
    
    def _extract_location_features(self, log_data):
        """Extract location-based features for Ethiopia"""
        city = log_data.get('city', '')
        country = log_data.get('country_code', '')
        source_ip = log_data.get('source_ip', '')
        
        common_cities = ['Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa', 'Mekele']
        
        return {
            'is_ethiopian_ip': 1 if country == 'ET' else 0,
            'is_common_city': 1 if city in common_cities else 0,
            'is_telecom_range': 1 if source_ip.startswith(('196.188.', '197.156.')) else 0,
            'city_unknown': 1 if not city else 0
        }
    
    def _extract_behavioral_features(self, log_data):
        """Extract behavioral features"""
        return {
            'failed_attempts': log_data.get('failed_attempts', 0),
            'request_frequency': log_data.get('request_count', 1),
            'session_duration': log_data.get('session_duration', 0),
            'concurrent_sessions': log_data.get('concurrent_sessions', 1)
        }
    
    def _extract_network_features(self, log_data):
        """Extract network-related features"""
        return {
            'bytes_transferred': log_data.get('bytes_transferred', 0) / 1024.0,  # KB
            'request_size_variance': log_data.get('request_size_variance', 0),
            'unique_destinations': len(log_data.get('destination_ips', [])),
            'protocol_diversity': len(set(log_data.get('protocols', [])))
        }

if __name__ == '__main__':
    engineer = EthiopianFeatureEngineer()
    
    # Test with sample data
    sample_log = {
        'event_time': '2025-01-15T14:30:00Z',
        'city': 'Addis Ababa',
        'country_code': 'ET',
        'source_ip': '196.188.34.100',
        'failed_attempts': 2,
        'request_count': 15,
        'bytes_transferred': 2048
    }
    
    features = engineer.extract_features(sample_log)
    print("í´§ Extracted Features:")
    for key, value in features.items():
        print(f"  {key}: {value}")
