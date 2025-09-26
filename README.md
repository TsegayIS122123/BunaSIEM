# 🛡️ BunaSIEM - Cloud Security Monitoring for Ethiopia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/TsegayIS122123/BunaSIEM)](https://github.com/TsegayIS122123/BunaSIEM/issues)
[![GitHub Stars](https://img.shields.io/github/stars/TsegayIS122123/BunaSIEM)](https://github.com/TsegayIS122123/BunaSIEM/stargazers)

**BunaSIEM** is Ethiopia's first cloud security monitoring solution, providing real-time threat detection with Amharic/English support. Built specifically for Ethiopian organizations moving to cloud infrastructure.

**ቡናSIEM** - የኢትዮጵያ የደህንነት አያያዝ ስርዓት

## 🌟 Features

- 🚨 **Real-time Threat Detection** - ML-powered anomaly detection
- 🌍 **Ethiopia-Aware Monitoring** - Local IP intelligence and patterns
- 🇪🇹 **Amharic/English Interface** - First SIEM with local language support
- 📊 **Interactive Dashboard** - Real-time visualization on Ethiopia map
- 🔔 **Multi-channel Alerts** - Email, SMS, and in-app notifications
- 💰 **Cost-Effective** - 80% cheaper than international solutions

## 🏗️ Architecture
Frontend (React) → Backend (Node.js) → Database (PostgreSQL)
↓ ↓ ↓
Dashboard API Gateway Log Storage
Amharic UI Threat Detection Alert History
Real-time UI Rule Engine User Management

text

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Python 3.8+
- PostgreSQL 13+
- Docker (optional)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/TsegayIS122123/BunaSIEM.git
cd BunaSIEM

# 2. Run automated setup script
chmod +x scripts/setup-project.sh
./scripts/setup-project.sh

# 3. Or setup manually:
# Backend
cd backend && npm install && cp .env.example .env
# Frontend  
cd ../frontend && npm install && cp .env.example .env
# ML Service
cd ../ml-service && pip install -r requirements.txt && cp .env.example .env

# 4. Start services
docker-compose up -d
cd backend && npm run dev
cd ../frontend && npm run dev
cd ../ml-service && python app.py
Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:5000

ML Service: http://localhost:8000

📖 Documentation
📖 Full Documentation

🔧 Setup Guide

🌐 API Reference

🎬 Demo Guide

🎯 Use Cases
For Ethiopian Banks
Monitor AWS/Azure cloud infrastructure

Detect unauthorized access attempts

Compliance reporting for National Bank of Ethiopia

For Government Agencies
Real-time security monitoring

Ethiopia-specific threat intelligence

Amharic interface for local teams

For Ethio Telecom
Cloud security for digital transformation

Custom threat detection rules

Mobile money security monitoring

🛠️ Technology Stack
Component	Technology	Purpose
Frontend	React, Chart.js, Leaflet	Dashboard visualization
Backend	Node.js, Express, Socket.io	API and real-time communication
Database	PostgreSQL	Data storage and analytics
ML Service	Python, Flask, Scikit-learn	Anomaly detection
Deployment	Docker, Vercel, Railway	Cloud deployment
🔧 Configuration
Environment Variables
Copy .env.example to .env and configure:

env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/bunasiem

# AWS Integration (optional)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# Email Alerts
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
🤝 Contributing
We welcome contributions from the Ethiopian tech community! Please see our Contributing Guide for details.

Development Setup
bash
# Fork the repository
git clone https://github.com/TsegayIS122123/BunaSIEM.git
cd BunaSIEM

# Create a feature branch
git checkout -b feature/amharic-enhancements

# Make your changes and test
npm test  # Frontend tests
pytest    # ML service tests

# Submit a pull request
🐛 Reporting Issues
Found a bug? Please create an issue with:

Description of the problem

Steps to reproduce

Expected vs actual behavior

Screenshots if applicable

📞 Support
Documentation: Check our docs folder

Issues: GitHub Issues

Email: [Your Email] (Optional: add your contact)

🙏 Acknowledgments
INSA Ethiopia - Cybersecurity training and support

Addis Ababa University - Academic foundation

Open Source Community - Libraries and tools that made this possible

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🌍 About the Developer
Tsegay - AAU Information Systems Student & INSA Cyber Talent Program Graduate

https://img.shields.io/badge/GitHub-TsegayIS122123-blue
https://img.shields.io/badge/LinkedIn-Connect-blue https://www.linkedin.com/in/tsegay-assefa-95a397336