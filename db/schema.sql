-- BunaSIEM PostgreSQL Database Schema
-- Tailored for Ethiopian Security Monitoring

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'analyst', 'user')),
    language VARCHAR(10) DEFAULT 'en' CHECK (language IN ('en', 'am')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security events from various sources
CREATE TABLE security_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source VARCHAR(50) NOT NULL CHECK (source IN ('aws_cloudtrail', 'azure_monitor', 'ethio_telecom', 'firewall', 'ids_ips')),
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    
    -- User and session information
    username VARCHAR(255),
    user_agent TEXT,
    
    -- Network information
    source_ip INET,
    destination_ip INET,
    source_port INTEGER,
    destination_port INTEGER,
    
    -- Geographic information for Ethiopian context
    country_code VARCHAR(5) DEFAULT 'ET',
    city VARCHAR(100),
    region VARCHAR(100),
    
    -- Event details
    event_time TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ DEFAULT NOW(),
    description TEXT,
    
    -- Cloud-specific fields
    aws_region VARCHAR(50),
    azure_tenant_id VARCHAR(100),
    ethio_telecom_office VARCHAR(100),
    
    -- Raw log data
    raw_log JSONB,
    
    -- Processing flags
    is_processed BOOLEAN DEFAULT FALSE,
    has_alert BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts generated from security logs
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    log_id UUID REFERENCES security_logs(id) ON DELETE CASCADE,
    rule_name VARCHAR(100) NOT NULL,
    rule_description TEXT,
    
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'false_positive')),
    
    -- Alert details
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    recommendation TEXT,
    
    -- Assignment and tracking
    assigned_to UUID REFERENCES users(id),
    assigned_at TIMESTAMPTZ,
    
    -- Ethiopian context
    location VARCHAR(100),
    organization VARCHAR(100),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Threat intelligence for Ethiopian IPs and patterns
CREATE TABLE threat_intelligence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    indicator_type VARCHAR(50) NOT NULL CHECK (indicator_type IN ('ip_address', 'domain', 'hash', 'pattern')),
    indicator_value VARCHAR(500) NOT NULL,
    
    -- Threat details
    threat_type VARCHAR(100) NOT NULL,
    description TEXT,
    confidence_level VARCHAR(20) DEFAULT 'medium' CHECK (confidence_level IN ('low', 'medium', 'high')),
    
    -- Ethiopian context
    is_ethiopian_origin BOOLEAN DEFAULT FALSE,
    affected_regions VARCHAR(100)[],
    
    first_seen TIMESTAMPTZ DEFAULT NOW(),
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Detection rules for Ethiopian threat landscape
CREATE TABLE detection_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    
    -- Rule configuration
    rule_type VARCHAR(50) DEFAULT 'sigma' CHECK (rule_type IN ('sigma', 'yara', 'custom')),
    rule_content JSONB NOT NULL,
    
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Ethiopian context
    applies_to_regions VARCHAR(100)[] DEFAULT '{"ET"}',
    business_hours_only BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_security_logs_source_ip ON security_logs(source_ip);
CREATE INDEX idx_security_logs_event_time ON security_logs(event_time);
CREATE INDEX idx_security_logs_source_event ON security_logs(source, event_type);
CREATE INDEX idx_security_logs_ethiopian ON security_logs(country_code, city) WHERE country_code = 'ET';

CREATE INDEX idx_alerts_status_severity ON alerts(status, severity);
CREATE INDEX idx_alerts_created_at ON alerts(created_at);
CREATE INDEX idx_alerts_assigned ON alerts(assigned_to) WHERE assigned_to IS NOT NULL;

CREATE INDEX idx_threat_intel_indicator ON threat_intelligence(indicator_type, indicator_value);
CREATE INDEX idx_threat_intel_ethiopian ON threat_intelligence(is_ethiopian_origin) WHERE is_ethiopian_origin = TRUE;

-- Update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_detection_rules_updated_at BEFORE UPDATE ON detection_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();