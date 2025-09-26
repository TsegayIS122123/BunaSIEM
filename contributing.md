# Contributing to BunaSIEM

Thank you for your interest in contributing to BunaSIEM! We welcome contributions from the Ethiopian tech community and beyond.

## How to Contribute

### Reporting Bugs
- Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include steps to reproduce the issue
- Provide error messages and screenshots if possible

### Suggesting Enhancements
- Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem you're trying to solve
- Suggest how the feature should work

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup

### Prerequisites
- Node.js 16+
- Python 3.8+
- PostgreSQL 13+
- Git

### Setup Instructions
```bash
# 1. Fork and clone the repository
git clone https://github.com/TsegayIS122123/BunaSIEM.git
cd BunaSIEM

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install  
cd ../ml-service && pip install -r requirements.txt

# 3. Setup database
docker-compose up -d
npm run db:setup

# 4. Start development servers
npm run dev:backend
npm run dev:frontend
npm run dev:ml