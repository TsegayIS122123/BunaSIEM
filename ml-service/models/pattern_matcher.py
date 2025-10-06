import re
from datetime import datetime, time
import pandas as pd

class PatternMatcher:
    def __init__(self):
        self.ethiopian_ip_ranges = [
            '196.188.0.0/16',  # Ethiopian Telecom
            '197.156.0.0/16',  # Ethiopian Telecom
            '10.0.0.0/8',      # Private networks in Ethiopia
        ]
        self.ethiopian_business_hours = {
            'start': time(8, 30),  # 8:30 AM
            'end': time(17, 30)    # 5:30 PM
        }
        self.common_ethiopian_cities = [
            'Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa', 
            'Mekele', 'Bahir Dar', 'Gondar', 'Jimma'
        ]
        
    def detect_ethiopian_patterns(self, logs):
        """Detect Ethiopian-specific security patterns"""
        suspicious_activities = []
        patterns_detected = []
        confidence = 0.0
        
        for log in logs:
            # Check for Ethiopian business hours violations
            if self.is_outside_business_hours(log):
                suspicious_activities.append("Activity outside Ethiopian business hours")
                confidence += 0.3
            
            # Check for unusual geographic patterns
            if self.is_unusual_ethiopian_location(log):
                suspicious_activities.append("Access from unusual Ethiopian location")
                confidence += 0.4
            
            # Check for Ethiopian IP anomalies
            if self.is_suspicious_ethiopian_ip(log):
                suspicious_activities.append("Suspicious activity from Ethiopian IP range")
                confidence += 0.5
            
            # Check for data exfiltration patterns
            if self.is_data_exfiltration(log):
                suspicious_activities.append("Possible data exfiltration pattern")
                confidence += 0.6
        
        # Normalize confidence
        confidence = min(confidence, 1.0)
        
        return {
            'suspicious': len(suspicious_activities) > 0,
            'confidence': confidence,
            'suspicious_activities': suspicious_activities,
            'patterns_detected': list(set(patterns_detected)),
            'total_logs_analyzed': len(logs)
        }
    
    def is_outside_business_hours(self, log):
        """Check if activity is outside Ethiopian business hours"""
        event_time = log.get('event_time')
        if not event_time:
            return False
        
        try:
            event_dt = pd.to_datetime(event_time)
            event_time_only = event_dt.time()
            
            # Check if outside business hours (8:30 AM - 5:30 PM)
            if event_time_only < self.ethiopian_business_hours['start'] or \
               event_time_only > self.ethiopian_business_hours['end']:
                return True
        except:
            pass
        
        return False
    
    def is_unusual_ethiopian_location(self, log):
        """Check if location is unusual for Ethiopian context"""
        city = log.get('city', '')
        country = log.get('country_code', '')
        
        # If it's an Ethiopian IP but from unusual city
        if country == 'ET' and city and city not in self.common_ethiopian_cities:
            return True
        
        # If it's a login attempt from unusual location
        if log.get('event_type') in ['Login', 'SignIn'] and city not in self.common_ethiopian_cities:
            return True
            
        return False
    
    def is_suspicious_ethiopian_ip(self, log):
        """Check for suspicious activities from Ethiopian IP ranges"""
        source_ip = log.get('source_ip', '')
        
        # Check if IP is in Ethiopian ranges
        is_ethiopian_ip = any(source_ip.startswith(prefix.split('.')[0] + '.' + prefix.split('.')[1]) 
                            for prefix in ['196.188', '197.156'])
        
        if is_ethiopian_ip:
            # Check for suspicious patterns
            if log.get('failed_attempts', 0) > 5:
                return True
            if log.get('event_type') in ['DeleteSecurityGroup', 'ModifySecurityGroup']:
                return True
            if log.get('bytes_transferred', 0) > 5000000:  # 5MB
                return True
        
        return False
    
    def is_data_exfiltration(self, log):
        """Detect potential data exfiltration patterns"""
        bytes_out = log.get('bytes_transferred', 0)
        event_type = log.get('event_type', '')
        
        # Large outbound transfers during unusual hours
        if bytes_out > 10000000:  # 10MB
            if self.is_outside_business_hours(log):
                return True
        
        # Specific exfiltration-related events
        exfiltration_events = ['CopyDBClusterSnapshot', 'CreateDBInstanceReadReplica', 
                              'ModifyDBInstance', 'CreateStack', 'UpdateStack']
        
        if event_type in exfiltration_events and bytes_out > 0:
            return True
            
        return False
    
    def get_ethiopian_threat_intelligence(self):
        """Get current Ethiopian threat intelligence"""
        return {
            'high_risk_ips': ['196.188.34.100', '197.156.78.150'],
            'phishing_domains': ['fake-cbe.et', 'ethio-bank-update.et'],
            'common_attack_patterns': [
                'Brute force attacks on banking portals',
                'Phishing targeting government emails',
                'Data exfiltration during off-hours',
                'Unauthorized cloud resource creation'
            ],
            'last_updated': datetime.now().isoformat()
        }
