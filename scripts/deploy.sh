#!/bin/bash
#
# BunaSIEM Deployment Script
# Deploys all services for Ethiopian cybersecurity monitoring
#

set -e

echo "Ì∫Ä BunaSIEM Deployment Started"
echo "Ìºç Deploying Ethiopian Cybersecurity Platform..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}‚úÖ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}‚ö†Ô∏è${NC} $1"
}

print_error() {
    echo -e "${RED}‚ùå${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

print_status "Docker is running"

# Check if we're in the right directory
if [ ! -f "../docker-compose.yml" ]; then
    print_error "Please run this script from the scripts/ directory"
    exit 1
fi

# Navigate to project root
cd ..

# Stop any existing services
print_status "Stopping any running services..."
docker-compose down

# Build and start all services
print_status "Building and starting BunaSIEM services..."
docker-compose up --build -d

# Wait for services to start
print_status "Waiting for services to initialize..."
sleep 30

# Run health checks
print_status "Running health checks..."

# Check backend
if curl -s http://localhost:3001/api/health > /dev/null; then
    print_status "Backend API is healthy"
else
    print_error "Backend API is not responding"
    exit 1
fi

# Check ML service
if curl -s http://localhost:5000/health > /dev/null; then
    print_status "ML Service is healthy"
else
    print_warning "ML Service is not responding (may still be starting)"
fi

# Check database
if docker exec bunasiem-postgres pg_isready -U postgres > /dev/null 2>&1; then
    print_status "PostgreSQL database is healthy"
else
    print_error "PostgreSQL database is not responding"
    exit 1
fi

# Initialize database with sample data
print_status "Initializing database with Ethiopian security data..."
docker exec bunasiem-postgres psql -U postgres -d bunasiem -c "SELECT COUNT(*) FROM users;" > /dev/null 2>&1

# Generate sample logs for demonstration
print_status "Generating sample Ethiopian security logs..."
cd scripts
python generate_logs.py --no-send
cd ..

print_status "Deployment completed successfully!"
echo ""
echo "Ìæâ BunaSIEM is now running!"
echo ""
echo "Ì≥ä Access Points:"
echo "   Frontend:    http://localhost:5173"
echo "   Backend API: http://localhost:3001"
echo "   ML Service:  http://localhost:5000"
echo "   PostgreSQL:  localhost:5432"
echo ""
echo "Ì¥ß Useful Commands:"
echo "   View logs:    docker-compose logs -f"
echo "   Stop:        docker-compose down"
echo "   Restart:     docker-compose restart"
echo "   Health check: python scripts/health_check.py"
echo ""
echo "Ìºç BunaSIEM - Brewing Cybersecurity for Ethiopia Ì∑™Ì∑π"
