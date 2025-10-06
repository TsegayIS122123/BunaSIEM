#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BunaSIEM Health Check Script
Monitors all services and their status
"""

import requests
import sys
from datetime import datetime

def check_backend():
    """Check if backend API is running"""
    try:
        response = requests.get('http://localhost:3001/api/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            return True, f"Backend: {data.get('message', 'OK')}"
        else:
            return False, f"Backend: HTTP {response.status_code}"
    except Exception as e:
        return False, f"Backend: {str(e)}"

def check_ml_service():
    """Check if ML service is running"""
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            return True, f"ML Service: {data.get('status', 'OK')}"
        else:
            return False, f"ML Service: HTTP {response.status_code}"
    except Exception as e:
        return False, f"ML Service: {str(e)}"

def check_database():
    """Check if PostgreSQL database is accessible"""
    try:
        import subprocess
        result = subprocess.run([
            'docker', 'exec', 'bunasiem-postgres', 
            'psql', '-U', 'postgres', '-d', 'bunasiem', 
            '-c', "SELECT COUNT(*) FROM users;"
        ], capture_output=True, text=True, timeout=10)
        
        if result.returncode == 0:
            return True, "Database: PostgreSQL 18 - Connected"
        else:
            return False, f"Database: {result.stderr}"
    except Exception as e:
        return False, f"Database: {str(e)}"

def check_frontend():
    """Check if frontend is accessible"""
    try:
        response = requests.get('http://localhost:5173', timeout=10)
        if response.status_code == 200:
            return True, "Frontend: React app running"
        else:
            return False, f"Frontend: HTTP {response.status_code}"
    except Exception as e:
        return False, f"Frontend: {str(e)}"

def main():
    print("BunaSIEM Health Check")
    print("=" * 50)
    print(f"Timestamp: {datetime.now().isoformat()}")
    print()
    
    services = [
        ("Backend API", check_backend),
        ("ML Service", check_ml_service),
        ("Database", check_database),
        ("Frontend", check_frontend)
    ]
    
    all_healthy = True
    for service_name, check_function in services:
        healthy, message = check_function()
        status = "✅" if healthy else "❌"
        print(f"{status} {message}")
        if not healthy:
            all_healthy = False
    
    print()
    if all_healthy:
        print(" ALL SERVICES ARE HEALTHY!")
        print(" BunaSIEM is ready for Ethiopian security monitoring")
        sys.exit(0)
    else:
        print("  Some services are not healthy")
        print(" Start missing services manually")
        sys.exit(1)

if __name__ == "__main__":
    main()
