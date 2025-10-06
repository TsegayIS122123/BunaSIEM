#!/bin/bash
#
# BunaSIEM Project Setup Script - Fixed Version
#

set -e

echo "í» ï¸  BunaSIEM Project Setup"
echo "==========================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${GREEN}âœ…${NC} $1"; }
print_info() { echo -e "${BLUE}â„¹ï¸${NC} $1"; }
print_warning() { echo -e "${YELLOW}âš ï¸${NC} $1"; }

# Check prerequisites
print_info "Checking prerequisites..."

# Check Node.js, Python, Docker (already working)
command -v node > /dev/null 2>&1 && print_status "Node.js $(node --version) is installed"
command -v python > /dev/null 2>&1 && print_status "Python $(python --version) is installed"
command -v docker > /dev/null 2>&1 && print_status "Docker $(docker --version) is installed"
command -v docker-compose > /dev/null 2>&1 && print_status "Docker Compose $(docker-compose --version) is installed"
command -v psql > /dev/null 2>&1 && print_status "PostgreSQL client is installed"

# Navigate to project root
cd "$(dirname "$0")/.."
PROJECT_ROOT=$(pwd)
print_status "Project root: $PROJECT_ROOT"

# Setup backend (already done)
print_info "Setting up backend..."
cd backend
[ ! -d "node_modules" ] && npm install || print_status "Backend dependencies already installed"
cd ..

# Setup ML service with proper pip handling
print_info "Setting up ML service..."
cd ml-service

# Activate virtual environment properly
if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate  # Windows
else
    source venv/bin/activate      # Linux/Mac
fi

print_status "Installing ML service dependencies..."
# Use python -m pip to avoid permission issues
python -m pip install --upgrade pip --quiet
python -m pip install -r requirements.txt --quiet

cd ..

# Setup frontend
print_info "Setting up frontend..."
cd frontend
[ ! -d "node_modules" ] && npm install || print_status "Frontend dependencies already installed"
cd ..

# Setup database
print_info "Setting up database..."
cd db
print_status "Initializing PostgreSQL database..."
docker-compose down > /dev/null 2>&1
docker-compose up -d

print_status "Waiting for database to be ready..."
sleep 15

if docker exec bunasiem-postgres psql -U postgres -d bunasiem -c "SELECT COUNT(*) FROM users;" > /dev/null 2>&1; then
    print_status "Database initialized successfully"
else
    print_warning "Database may need manual initialization"
fi
cd ..

print_status "Project setup completed successfully!"
echo ""
echo "í¾‰ BunaSIEM Development Environment is Ready!"
echo ""
echo "íº€ Run: ./scripts/deploy.sh to start all services"
