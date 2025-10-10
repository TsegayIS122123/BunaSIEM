#!/bin/bash
#
# BunaSIEM Backup Script
# Backups database and important configuration files
#

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="bunasiem_backup_$TIMESTAMP"

echo "Starting BunaSIEM Backup: $BACKUP_NAME"

# Create backup directory
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Backup PostgreSQL database
echo "Backing up PostgreSQL database..."
docker exec bunasiem-postgres pg_dump -U postgres bunasiem > "$BACKUP_DIR/$BACKUP_NAME/database.sql"

# Backup important configuration files
echo " Backing up configuration files..."
cp ../backend/.env "$BACKUP_DIR/$BACKUP_NAME/backend.env"
cp ../ml-service/.env "$BACKUP_DIR/$BACKUP_NAME/ml-service.env"
cp ../docker-compose.yml "$BACKUP_DIR/$BACKUP_NAME/"

# Backup database schema
echo "���️ Backing up database schema..."
cp ../db/schema.sql "$BACKUP_DIR/$BACKUP_NAME/"

# Create backup info file
cat > "$BACKUP_DIR/$BACKUP_NAME/backup_info.txt" << EOL
BunaSIEM Backup Information
===========================
Backup Name: $BACKUP_NAME
Timestamp: $(date)
Services: PostgreSQL, Backend, ML Service
Database: bunasiem
Backup Size: $(du -sh "$BACKUP_DIR/$BACKUP_NAME" | cut -f1)

Contents:
- database.sql (PostgreSQL dump)
- backend.env (Backend configuration)
- ml-service.env (ML Service configuration)
- docker-compose.yml (Container configuration)
- schema.sql (Database schema)
EOL

# Create compressed archive
echo "���️ Creating compressed archive..."
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" -C "$BACKUP_DIR" "$BACKUP_NAME"

# Remove temporary directory
rm -rf "$BACKUP_DIR/$BACKUP_NAME"

echo "✅ Backup completed: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
echo "��� Backup size: $(du -h "$BACKUP_DIR/$BACKUP_NAME.tar.gz" | cut -f1)"

# Cleanup old backups (keep last 7 days)
find "$BACKUP_DIR" -name "bunasiem_backup_*.tar.gz" -mtime +7 -delete
echo "��� Cleaned up backups older than 7 days"
