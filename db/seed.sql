-- BunaSIEM Sample Data for Ethiopian Organizations
-- Ethiopian-specific security data

-- Insert default users
INSERT INTO users (username, email, password_hash, role, language) VALUES
('admin', 'admin@bunasiem.et', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'en'),
('tsegay', 'tsegay@bunasiem.et', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'analyst', 'am'),
('alem', 'alem@ethiotelecom.et', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'am');

-- Insert Ethiopian threat intelligence
INSERT INTO threat_intelligence (indicator_type, indicator_value, threat_type, description, confidence_level, is_ethiopian_origin, affected_regions) VALUES
('ip_address', '196.188.34.100', 'brute_force', 'Known malicious IP targeting Ethiopian banking sites', 'high', TRUE, '{"Addis Ababa", "Dire Dawa"}'),
('ip_address', '196.188.56.200', 'phishing', 'IP associated with phishing campaigns against Ethiopian government', 'medium', TRUE, '{"Addis Ababa"}'),
('ip_address', '197.156.78.150', 'data_exfiltration', 'Suspicious data transfer patterns', 'high', TRUE, '{"Addis Ababa", "Hawassa"}'),
('domain', 'fake-cbe.et', 'phishing', 'Fake Commercial Bank of Ethiopia phishing domain', 'high', FALSE, '{"Addis Ababa"}');

-- Insert detection rules tailored for Ethiopia
INSERT INTO detection_rules (name, description, rule_type, rule_content, severity, applies_to_regions, business_hours_only) VALUES
(
    'ethiopian_after_hours_access',
    'Detect login attempts outside Ethiopian business hours (8:30 AM - 5:30 PM)',
    'sigma',
    '{
        "condition": "hour < 8 OR hour > 17",
        "event_types": ["ConsoleLogin", "SignIn"],
        "timezone": "Africa/Addis_Ababa"
    }'::jsonb,
    'medium',
    '{"ET"}',
    FALSE
),
(
    'multiple_failed_logins_ethiopian_ip',
    'Multiple failed login attempts from Ethiopian IP ranges',
    'sigma',
    '{
        "condition": "failed_attempts > 5 AND ip_range = ''196.188.0.0/16''",
        "window_minutes": 30
    }'::jsonb,
    'high',
    '{"ET"}',
    FALSE
),
(
    'unusual_data_transfer_ethiopia',
    'Large data transfers during non-business hours in Ethiopia',
    'custom',
    '{
        "condition": "bytes_transferred > 1000000 AND (hour < 8 OR hour > 17)",
        "data_sources": ["Ethio Telecom", "AWS", "Azure"]
    }'::jsonb,
    'high',
    '{"ET"}',
    TRUE
);

-- Insert sample security logs with Ethiopian context
INSERT INTO security_logs (source, event_type, severity, username, source_ip, country_code, city, event_time, description, raw_log) VALUES
(
    'aws_cloudtrail',
    'ConsoleLogin',
    'low',
    'admin@bunasiem.et',
    '196.188.34.142',
    'ET',
    'Addis Ababa',
    NOW() - INTERVAL '2 hours',
    'Successful login from corporate office',
    '{"eventVersion": "1.08", "userIdentity": {"type": "IAMUser"}, "sourceIPAddress": "196.188.34.142"}'::jsonb
),
(
    'azure_monitor',
    'SignIn',
    'medium',
    'tsegay@bunasiem.et',
    '196.188.56.214',
    'ET',
    'Addis Ababa',
    NOW() - INTERVAL '1 hour',
    'Login outside business hours',
    '{"operationName": "SignIn", "resultType": "0", "location": "Addis Ababa"}'::jsonb
),
(
    'ethio_telecom',
    'NetworkAccess',
    'low',
    'user@ethiotelecom.et',
    '10.10.129.225',
    'ET',
    'Addis Ababa',
    NOW() - INTERVAL '30 minutes',
    'Normal network access from branch office',
    '{"office": "Addis Ababa Head Office", "access_type": "authorized"}'::jsonb
),
(
    'aws_cloudtrail',
    'DeleteSecurityGroup',
    'high',
    'admin@bunasiem.et',
    '196.188.34.179',
    'ET',
    'Addis Ababa',
    NOW() - INTERVAL '15 minutes',
    'Security group deletion - requires investigation',
    '{"eventName": "DeleteSecurityGroup", "requestParameters": {"groupId": "sg-123456"}}'::jsonb
);

-- Insert sample alerts
INSERT INTO alerts (log_id, rule_name, rule_description, severity, status, title, description, recommendation, location) 
SELECT 
    sl.id,
    'ethiopian_after_hours_access',
    'Login detected outside Ethiopian business hours',
    'medium',
    'open',
    'After Hours Access Detected',
    'User ' || sl.username || ' logged in outside normal business hours from ' || sl.city,
    'Verify if this is authorized overtime work',
    sl.city
FROM security_logs sl 
WHERE sl.username = 'tsegay@bunasiem.et' AND sl.event_type = 'SignIn';