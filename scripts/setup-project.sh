#!/bin/bash
#
# BunaSIEM Project Setup Script
# Sets up development environment for Ethiopian cybersecurity platform
#

set -e

echo "���️  BunaSIEM Project Setup"
echo "==========================="
echo "Setting up Ethiopian Cybersecurity Development Environment"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

# Check prerequisites
print_info "Checking prerequisites..."

# Check Node.js
if command -v node > /dev/null 2>&1; then
    print_status "Node.js $(node --version) is installed"
else
    print_warning "Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check Python
if command -v python > /dev/null 2>&1; then
    print_status "Python $(python --version) is installed"
else
    print_warning "Python is not installed. Please install Python 3.8+"
    exit 1
fi

# Check Docker
if command -v docker > /dev/null 2>&1; then
    print_status "Docker $(docker --version) is installed"
else
    print_warning "Docker is not installed. Please install Docker"
    exit 1
fi

# Check Docker Compose
if command -v docker-compose > /dev/null 2>&1; then
    print_status "Docker Compose $(docker-compose --version) is installed"
else
    print_warning "Docker Compose is not installed. Please install Docker Compose"
    exit 1
fi

# Check PostgreSQL client
if command -v psql > /dev/null 2>&1; then
    print_status "PostgreSQL client is installed"
else
    print_warning "PostgreSQL client (psql) is not installed"
fi

# Navigate to project root
cd "$(dirname "$0")/.."
PROJECT_ROOT=$(pwd)
print_status "Project root: $PROJECT_ROOT"

# Setup backend
print_info "Setting up backend..."
cd backend
if [ ! -d "node_modules" ]; then
    print_status "Installing backend dependencies..."
    npm install
else
    print_status "Backend dependencies already installed"
fi
cd ..

# Setup ML service
print_info "Setting up ML service..."
cd ml-service
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python -m venv venv
fi

print_status "Activating virtual environment and installing dependencies..."
source venv/Scripts/activate  # For Windows Git Bash
# source venv/bin/activate    # For Linux/Mac

pip install --upgrade pip
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
else
    print_warning "requirements.txt not found in ml-service"
fi
cd ..

# Setup frontend
print_info "Setting up frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
else
    print_status "Frontend dependencies already installed"
fi
cd ..

# Setup database
print_info "Setting up database..."
cd db
print_status "Initializing PostgreSQL database with Docker..."
docker-compose up -d

# Wait for database to be ready
print_status "Waiting for database to be ready..."
sleep 10

# Check if database initialized successfully
if docker exec bunasiem-postgres psql -U postgres -d bunasiem -c "SELECT COUNT(*) FROM users;" > /dev/null 2>&1; then
    print_status "Database initialized successfully"
else
    print_warning "Database may not be fully initialized. Please check docker-compose logs"
fi
cd ..

# Create environment files if they don't exist
print_info "Setting up environment configuration..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    print_status "Creating backend environment file..."
    cat > backend/.env << BACKEND_ENV
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bunasiem
DB_USER=postgres
DB_PASSWORD=123456

# JWT
JWT_SECRET=bunasiem_ethiopia_security_2025
JWT_EXPIRE=30d

# ML Service
ML_SERVICE_URL=http://localhost:5000

# Frontend
FRONTEND_URL=http://localhost:5173
BACKEND_ENV
else
    print_status "Backend environment file already exists"
fi

# ML Service .env
if [ ! -f "ml-service/.env" ]; then
    print_status "Creating ML service environment file..."
    cat > ml-service/.env << ML_ENV
ML_SERVICE_PORT=5000
MODEL_PATH=models/anomaly_model.pkl
TRAINING_DATA_PATH=data/training_logs.json
NODE_ENV=development
ML_ENV
else
    print_status "ML service environment file already exists"
fi

# Make scripts executable
print_info "Making utility scripts executable..."
chmod +x scripts/*.sh
chmod +x scripts/*.py

print_status "Project setup completed successfully!"
echo ""
echo "��� BunaSIEM Development Environment is Ready!"
echo ""
echo "��� Next Steps:"
echo "   1. Start services: ./scripts/deploy.sh"
echo "   2. Run health check: python scripts/health_check.py"
echo "   3. Access frontend: http://localhost:5173"
echo "   4. Generate sample data: python scripts/generate_logs.py"
echo ""
echo "Project Structure:"
echo "    frontend/    - React dashboard (Amharic/English)"
echo "     backend/     - Node.js API"
echo "    ml-service/  - Python ML for Ethiopian threats"
echo "   ���️  db/         - PostgreSQL database"
echo "   ��� scripts/     - Deployment & utilities"
echo ""
echo "��� BunaSIEM - Affordable Cybersecurity for Ethiopia �����"
