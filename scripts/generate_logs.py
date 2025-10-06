#!/usr/bin/env python3
"""
BunaSIEM Ethiopian Log Generator
Generates realistic security logs for Ethiopian context
"""

import json
import random
from datetime import datetime, timedelta
import requests

# Ethiopian cities and IP ranges
ETHIOPIAN_CITIES = ["Addis Ababa", "Dire Dawa", "Adama", "Hawassa", "Mekele", "Bahir Dar", "Gondar", "Jimma"]
ETHIOPIAN_IP_RANGES = ["196.188", "197.156"]
ETHIOPIAN_ORGANIZATIONS = ["Commercial Bank of Ethiopia", "Ethio Telecom", "Ethiopian Airlines", "Ministry of Innovation", "INSA"]

def generate_ethiopian_ip():
    """Generate realistic Ethiopian IP address"""
    base = random.choice(ETHIOPIAN_IP_RANGES)
    return f"{base}.{random.randint(1, 255)}.{random.randint(1, 255)}"

def generate_aws_log():
    """Generate AWS CloudTrail log with Ethiopian context"""
    event_time = datetime.utcnow() - timedelta(minutes=random.randint(1, 1440))
    
    log = {
        "eventVersion": "1.08",
        "userIdentity": {
            "type": "IAMUser",
            "userName": random.choice(["admin@bunasiem.et", "tsegay@bunasiem.et", "alem@ethiotelecom.et"]),
        },
        "eventTime": event_time.isoformat() + "Z",
        "eventSource": random.choice(["signin.amazonaws.com", "ec2.amazonaws.com", "s3.amazonaws.com"]),
        "eventName": random.choice(["ConsoleLogin", "RunInstances", "CreateBucket", "DeleteSecurityGroup"]),
        "awsRegion": "us-east-1",
        "sourceIPAddress": generate_ethiopian_ip(),
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "responseElements": {"ConsoleLogin": "Success"},
        "eventID": f"{(random.randint(1000, 9999))}-{random.randint(1000, 9999)}",
        "readOnly": False,
        "eventType": "AwsApiCall",
        "managementEvent": True,
        "recipientAccountId": "123456789012"
    }
    
    return log

def generate_azure_log():
    """Generate Azure Monitor log with Ethiopian context"""
    event_time = datetime.utcnow() - timedelta(minutes=random.randint(1, 1440))
    
    log = {
        "time": event_time.isoformat() + "Z",
        "resourceId": f"/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/bunasiem-rg/providers/Microsoft.Compute/virtualMachines/web-server-0{random.randint(1, 5)}",
        "operationName": random.choice(["Microsoft.Compute/virtualMachines/start/action", "Microsoft.Sql/servers/firewallRules/write", "Microsoft.Storage/storageAccounts/listKeys/action"]),
        "category": "Administrative",
        "resultType": "Success",
        "durationMs": random.randint(500, 2000),
        "callerIpAddress": generate_ethiopian_ip(),
        "correlationId": f"abcd{random.randint(1000, 9999)}-{random.randint(1000, 9999)}",
        "identity": {
            "authorization": {"scope": "/subscriptions/12345678-1234-1234-1234-123456789012"},
            "claims": {
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn": random.choice(["admin@bunasiem.et", "tsegay@bunasiem.et"]),
                "ipaddr": generate_ethiopian_ip()
            }
        },
        "level": "Information",
        "location": random.choice(["East US", "West Europe"]),
        "properties": {"statusCode": "OK"}
    }
    
    return log

def generate_ethio_telecom_log():
    """Generate Ethio Telecom security log"""
    event_time = datetime.utcnow() - timedelta(minutes=random.randint(1, 1440))
    
    log = {
        "timestamp": event_time.isoformat() + "+03:00",
        "office": f"{random.choice(ETHIOPIAN_CITIES)} {random.choice(['Head Office', 'Branch', 'Data Center'])}",
        "event_type": random.choice(["NetworkAccess", "FailedLogin", "DataTransfer", "UserLogin"]),
        "username": random.choice(["user@ethiotelecom.et", "admin@ethiotelecom.et", "backup@ethiotelecom.et"]),
        "source_ip": generate_ethiopian_ip(),
        "destination_ip": f"10.10.{random.randint(1, 255)}.{random.randint(1, 255)}",
        "access_type": random.choice(["authorized", "unauthorized"]),
        "protocol": random.choice(["HTTPS", "SSH", "FTP", "RDP"]),
        "bytes_sent": random.randint(1024, 10485760),
        "bytes_received": random.randint(1024, 5242880),
        "duration_seconds": random.randint(30, 3600),
        "status": random.choice(["success", "failed"]),
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "location": {
            "city": random.choice(ETHIOPIAN_CITIES),
            "region": "Ethiopia",
            "country": "ET"
        },
        "network_segment": random.choice(["corporate", "dmz", "data_center"]),
        "authentication_method": random.choice(["AD", "password", "certificate"])
    }
    
    return log

def send_to_backend(logs, log_type):
    """Send generated logs to backend API"""
    try:
        url = "http://localhost:3001/api/logs"
        payload = {
            "logs": logs,
            "source": log_type,
            "generated_at": datetime.utcnow().isoformat() + "Z"
        }
        
        response = requests.post(url, json=payload, timeout=10)
        if response.status_code == 200:
            print(f"‚úÖ Sent {len(logs)} {log_type} logs to backend")
            return True
        else:
            print(f"‚ùå Failed to send {log_type} logs: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"‚ùå Error sending {log_type} logs: {str(e)}")
        return False

def main():
    print("Ì∫Ä BunaSIEM Ethiopian Log Generator")
    print("Ìºç Generating realistic security logs for Ethiopia...")
    
    # Generate logs
    aws_logs = [generate_aws_log() for _ in range(5)]
    azure_logs = [generate_azure_log() for _ in range(5)]
    ethio_logs = [generate_ethio_telecom_log() for _ in range(5)]
    
    print(f"Ì≥ä Generated: {len(aws_logs)} AWS, {len(azure_logs)} Azure, {len(ethio_logs)} Ethio Telecom logs")
    
    # Save to files
    with open('../sample-logs/generated-aws-logs.json', 'w') as f:
        json.dump(aws_logs, f, indent=2)
    
    with open('../sample-logs/generated-azure-logs.json', 'w') as f:
        json.dump(azure_logs, f, indent=2)
    
    with open('../sample-logs/generated-ethio-logs.json', 'w') as f:
        json.dump(ethio_logs, f, indent=2)
    
    print("Ì≤æ Logs saved to sample-logs/ directory")
    
    # Ask to send to backend
    send_to_api = input("Ì≥® Send logs to backend API? (y/n): ").lower().strip()
    if send_to_api == 'y':
        print("Ì¥Ñ Sending logs to backend...")
        send_to_backend(aws_logs, "aws_cloudtrail")
        send_to_backend(azure_logs, "azure_monitor")
        send_to_backend(ethio_logs, "ethio_telecom")
        print("Ìæâ Log generation complete!")
    else:
        print("Ì≤æ Logs saved locally. Use them for testing.")

if __name__ == "__main__":
    main()
